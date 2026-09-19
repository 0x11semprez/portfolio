#!/usr/bin/env node
// End-to-end smoke test of the whole site. Builds it, serves build/ on a local
// port, drives it with headless Chromium (Playwright) and prints a report.
//
//   node scripts/smoke.js            # build + test
//   node scripts/smoke.js --no-build # reuse the existing build/
//   BUILD_PATH=/tmp/b node scripts/smoke.js   # build + serve somewhere else
//
// Needs Playwright: `npm i -D playwright && npx playwright install chromium`,
// or set PLAYWRIGHT_DIR to a node_modules folder that has it.

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;

// ---------------------------------------------------------------- playwright
function loadPlaywright() {
  const candidates = [
    null,
    process.env.PLAYWRIGHT_DIR,
    path.join(process.env.HOME || "", ".dev-browser/node_modules"),
  ];
  for (const dir of candidates) {
    try {
      return dir ? require(path.join(dir, "playwright")) : require("playwright");
    } catch {
      /* try the next one */
    }
  }
  console.error("playwright not found: npm i -D playwright && npx playwright install chromium");
  process.exit(2);
}

const serve = require("./serve");

// ------------------------------------------------------- data (regex parsed)
// The data files are ESM used by CRA; we don't execute them, we scan them.
const read = (f) => fs.readFileSync(path.join(ROOT, "src/data", f), "utf8");
const strArray = (src, name) => {
  const m = src.match(new RegExp(`export const ${name}\\s*=\\s*\\[([^\\]]*)\\]`));
  return m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : [];
};
const slugs = (src) => [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const field = (src, key) =>
  [...src.matchAll(new RegExp(`${key}:\\s*("([^"]*)"|\\[[^\\]]*\\]|null)`, "g"))].map((m) =>
    m[1] === "null" ? null : m[1].startsWith("[") ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : m[2]
  );

const DATA = {
  stacks: read("stacks.js"),
  albums: read("albums.js"),
  projects: read("projects.js"),
  profile: read("profile.js"),
};
const STACK_CATEGORIES = strArray(DATA.stacks, "STACK_CATEGORIES");
const ALBUM_LANGUAGES = strArray(DATA.albums, "ALBUM_LANGUAGES");
const STACKS = slugs(DATA.stacks);
const ALBUMS = slugs(DATA.albums);
const PROJECTS = slugs(DATA.projects);
const STACK_TAGS = field(DATA.stacks, "category").map((c) => [].concat(c));
const ALBUM_TAGS = field(DATA.albums, "language");

// ----------------------------------------------------------------- reporting
const results = [];
let current = "";
const section = (name) => (current = name);
function check(name, ok, detail = "") {
  results.push({ section: current, name, ok: Boolean(ok), detail });
}
async function attempt(name, fn) {
  try {
    await fn();
  } catch (e) {
    check(name, false, e.message.split("\n")[0]);
  }
}

// -------------------------------------------------------------------- tests
async function main() {
  if (!process.argv.includes("--no-build")) {
    console.log("building…");
    execSync("CI=true npx react-scripts build", { cwd: ROOT, stdio: "pipe" });
  }
  const { chromium } = loadPlaywright();
  const server = await serve(PORT);
  const browser = await chromium.launch();

  // one context per test group so localStorage (interactive choice) is fresh
  const newPage = async (opts = {}) => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, ...opts });
    const page = await ctx.newPage();
    page.errors = [];
    page.failed = [];
    page.on("pageerror", (e) => page.errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() !== "error") return;
      const t = m.text();
      if (/Failed to load resource|ERR_FAILED|CORS policy/.test(t)) return; // covered by "failed requests"
      page.errors.push(t);
    });
    page.on("response", (r) => {
      if (r.status() >= 400 && r.url().startsWith(BASE)) {
        const f = `${r.status()} ${r.url().slice(BASE.length)}`;
        if (!page.failed.includes(f)) page.failed.push(f);
      }
    });
    return page;
  };
  const go = async (page, url) => {
    await page.goto(BASE + url, { waitUntil: "load" });
    await page.waitForSelector("main, [role=dialog]");
    await page.waitForTimeout(150); // let react-router settle
  };
  const chooseMode = (page, mode) => page.evaluate((m) => localStorage.setItem("semprez.video", m ? "1" : "0"), mode);
  const hasVideo = (page) => page.locator("video").count();
  const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

  // ---- data integrity ------------------------------------------------------
  section("data");
  check("stack categories declared", STACK_CATEGORIES.length > 0, STACK_CATEGORIES.join(", "));
  STACK_TAGS.forEach((tags, i) =>
    tags.forEach((t) =>
      check(`stack "${STACKS[i]}" tag "${t}" is a filter option`, STACK_CATEGORIES.includes(t))
    )
  );
  STACK_CATEGORIES.forEach((c) =>
    check(`filter "${c}" matches at least one stack`, STACK_TAGS.some((t) => t.includes(c)))
  );
  ALBUM_TAGS.forEach((t, i) => check(`album "${ALBUMS[i]}" language "${t}" is a filter option`, ALBUM_LANGUAGES.includes(t)));
  ALBUM_LANGUAGES.forEach((l) => check(`filter "${l}" matches at least one album`, ALBUM_TAGS.includes(l)));
  for (const src of Object.values(DATA)) {
    for (const m of src.matchAll(/(?:image|cover|poster|src):\s*"(\/[^"]+)"/g)) {
      check(`file exists ${m[1]}`, fs.existsSync(path.join(PUBLIC, m[1])));
    }
  }
  for (const [name, list] of Object.entries({ stacks: STACKS, albums: ALBUMS, projects: PROJECTS })) {
    check(`${name}: slugs unique`, new Set(list).size === list.length, `${list.length} entries`);
  }

  // ---- profile page + interactive-mode dialog ------------------------------
  section("profile /");
  await attempt("dialog", async () => {
    const page = await newPage();
    await go(page, "/");
    const dialog = page.getByRole("dialog");
    check("first visit shows the interactive-mode dialog", await dialog.isVisible());
    const text = await dialog.innerText();
    check('dialog has no "—" characters', !/[—–]/.test(text), text.replace(/\n/g, " | "));
    check("dialog shows one language at a time", !(text.includes("Interactive mode") && text.includes("mode interactif")));
    check("dialog text is centered", (await dialog.locator("h2").evaluate((e) => getComputedStyle(e).textAlign)) === "center");
    await dialog.getByRole("button", { name: "fr", exact: true }).click();
    check("FR switch shows French copy", (await dialog.innerText()).toLowerCase().includes("mode interactif"));
    await dialog.getByRole("button", { name: "en", exact: true }).click();
    check("EN switch shows English copy", (await dialog.innerText()).toLowerCase().includes("interactive mode?"));

    await dialog.getByRole("button", { name: "static" }).click();
    check("static: dialog closes", !(await dialog.isVisible()));
    check("static: no video", (await hasVideo(page)) === 0);
    check("static: choice persisted", (await page.evaluate(() => localStorage.getItem("semprez.video"))) === "0");
    await page.reload({ waitUntil: "load" });
    check("static: dialog not shown again", (await page.getByRole("dialog").count()) === 0);
    check("no console errors", page.errors.length === 0, page.errors.join(" | "));
    check("no failed requests", page.failed.length === 0, page.failed.join(" | "));
    await page.context().close();
  });

  await attempt("interactive", async () => {
    const page = await newPage();
    await go(page, "/");
    await page.getByRole("dialog").getByRole("button", { name: "interactive" }).click();
    await page.waitForSelector("video");
    check("interactive: video mounted", (await hasVideo(page)) === 1);
    const v = page.locator("video");
    const attrs = await v.evaluate((e) => ({
      controls: e.controls,
      pip: e.disablePictureInPicture,
      muted: e.muted,
      loop: e.loop,
      autoplay: e.autoplay,
      playsinline: e.hasAttribute("playsinline"),
      pointer: getComputedStyle(e).pointerEvents,
      z: getComputedStyle(e.parentElement).zIndex,
      paused: e.paused,
    }));
    check("video: no controls", !attrs.controls);
    check("video: picture-in-picture disabled (Firefox hover button)", attrs.pip);
    check("video: pointer-events none (nothing to hover / click)", attrs.pointer === "none");
    check("video: muted + loop + autoplay + playsinline", attrs.muted && attrs.loop && attrs.autoplay && attrs.playsinline);
    check("video: sits behind the page (z-index < 0)", Number(attrs.z) < 0, `z-index ${attrs.z}`);
    check("video: is playing", !attrs.paused);
    const bioColor = await page.locator("main p").first().evaluate((e) => getComputedStyle(e).color);
    check("bio text is white over the video", bioColor === "rgb(255, 255, 255)", bioColor);
    const header = await page.locator("header").evaluate((e) => getComputedStyle(e).backgroundColor);
    check("header transparent over the video", header === "rgba(0, 0, 0, 0)", header);

    // header pause / play
    await page.getByRole("button", { name: /pause video/ }).click();
    check("header pause removes the video", (await hasVideo(page)) === 0);
    await page.getByRole("button", { name: /play video/ }).click();
    check("header play brings it back", (await hasVideo(page)) === 1);
    check("no console errors", page.errors.length === 0, page.errors.join(" | "));
    check("no failed requests", page.failed.length === 0, page.failed.join(" | "));
    await page.context().close();
  });

  // ---- menu + routing ------------------------------------------------------
  section("menu & routing");
  await attempt("menu", async () => {
    const page = await newPage();
    await go(page, "/");
    await chooseMode(page, false);
    await page.reload({ waitUntil: "load" });
    await page.getByRole("button", { name: "open menu" }).click();
    const links = page.locator("nav a");
    check("menu opens with 4 section links", (await links.count()) === 4);
    for (const [label, target] of [["11", "/projects"], ["17", "/stacks"], ["20", "/album"], ["98", "/"]]) {
      await page.getByRole("button", { name: "open menu" }).click().catch(() => {});
      await page.locator("nav a", { hasText: label }).first().click();
      await page.waitForTimeout(150);
      check(`menu "${label}" → ${target}`, new URL(page.url()).pathname === target, page.url());
      check(`menu closes after "${label}"`, (await page.locator("nav a").count()) === 0);
    }
    await go(page, "/does-not-exist");
    check("unknown route redirects to /", new URL(page.url()).pathname === "/");
    await go(page, "/stacks/nope");
    check("unknown stack redirects to /stacks", new URL(page.url()).pathname === "/stacks");
    await go(page, "/album/nope");
    check("unknown album redirects to /album", new URL(page.url()).pathname === "/album");
    await go(page, "/projects/nope");
    check("unknown project redirects to /projects", new URL(page.url()).pathname === "/projects");
    check("no console errors", page.errors.length === 0, page.errors.join(" | "));
    await page.context().close();
  });

  // ---- grids + filters + details ------------------------------------------
  const tiles = (page) => page.locator("main a[href]").filter({ hasNot: page.locator("[aria-label=back]") });

  for (const [name, route, list, filters, tags] of [
    ["projects", "/projects", PROJECTS, [], null],
    ["stacks", "/stacks", STACKS, STACK_CATEGORIES, STACK_TAGS],
    ["album", "/album", ALBUMS, ALBUM_LANGUAGES, ALBUM_TAGS.map((t) => [t])],
  ]) {
    section(name);
    await attempt(name, async () => {
      const page = await newPage();
      await go(page, "/");
      await chooseMode(page, false);
      await go(page, route);
      check(`${route}: shows all ${list.length} tiles`, (await tiles(page).count()) === list.length, `${await tiles(page).count()} tiles`);

      for (const f of filters) {
        await page.getByRole("button", { name: f, exact: true }).click();
        const expected = tags.filter((t) => t.includes(f)).length;
        const got = await tiles(page).count();
        check(`filter "${f}" shows ${expected} tile(s)`, got === expected && got > 0, `got ${got}`);
      }
      if (filters.length) {
        await page.getByRole("button", { name: "all", exact: true }).click();
        check(`filter "all" restores every tile`, (await tiles(page).count()) === list.length);
      }

      for (const slug of list) {
        await go(page, `${route}/${slug}`);
        const title = await page.locator("main h1").first().innerText().catch(() => "");
        check(`${route}/${slug} opens (title "${title}")`, title.trim().length > 0);
        check(`${route}/${slug}: back link → ${route}`, (await page.locator("main a[aria-label=back]").getAttribute("href")) === route);
      }
      check("no console errors", page.errors.length === 0, page.errors.join(" | "));
      check("no failed requests", page.failed.length === 0, page.failed.join(" | "));
      await page.context().close();
    });
  }

  // ---- video on the album pages, not elsewhere -----------------------------
  section("video pages");
  await attempt("video pages", async () => {
    const page = await newPage();
    await go(page, "/");
    await chooseMode(page, true);
    const expect = { "/": 1, "/album": 1, [`/album/${ALBUMS[0]}`]: 1, "/projects": 0, "/stacks": 0, [`/stacks/${STACKS[0]}`]: 0, [`/projects/${PROJECTS[0]}`]: 0 };
    for (const [route, n] of Object.entries(expect)) {
      await go(page, route);
      // the video stays mounted site-wide (so it never restarts), it's just
      // hidden on pages that don't use it
      const vis = await page.locator("video").evaluate((v) => getComputedStyle(v).visibility).catch(() => "none");
      check(`${route}: background video ${n ? "visible" : "hidden"}`, n ? vis === "visible" : vis !== "visible", `visibility ${vis}`);
      const header = await page.locator("header").evaluate((e) => getComputedStyle(e).backgroundColor);
      check(`${route}: header ${n ? "transparent" : "white"}`, n ? header === "rgba(0, 0, 0, 0)" : header === "rgb(255, 255, 255)", header);
      const white = (sel) => page.locator(sel).first().evaluate((e) => getComputedStyle(e).color === "rgb(255, 255, 255)").catch(() => false);
      if (route === "/album") {
        check("/album: active filter is white", await white("main button[class*='text-white']"));
        check("/album: tile titles are white", await white("main a p"));
      }
      if (route.startsWith("/album/")) check(`${route}: title is white`, await white("main h1"));
    }
    // navigating between video pages must not restart the video
    await go(page, "/album");
    await page.waitForTimeout(1500);
    const before = await page.locator("video").evaluate((v) => v.currentTime);
    await page.locator("main a[href^='/album/']").first().click();
    await page.waitForSelector("main h1");
    const after = await page.locator("video").evaluate((v) => v.currentTime);
    check("video keeps playing across /album → /album/:slug (no restart)", after >= before && before > 1, `${before.toFixed(2)}s → ${after.toFixed(2)}s`);
    const filter = await page.locator("video").evaluate((v) => getComputedStyle(v).filter);
    check("video has the contrast boost", /contrast\(1\.\d+\)/.test(filter), filter);
    check("video loops", await page.locator("video").evaluate((v) => v.loop));
    check("no console errors", page.errors.length === 0, page.errors.join(" | "));
    await page.context().close();
  });

  // ---- spotify covers (network) ---------------------------------------
  section("spotify covers");
  for (const m of DATA.albums.matchAll(/slug:\s*"([^"]+)"[\s\S]*?spotify:\s*"([^"]+)"/g)) {
    const [, slug, url] = m;
    try {
      const r = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);
      check(`"${slug}" cover resolves from Spotify`, r.ok, `${r.status} for ${url}`);
    } catch (e) {
      check(`"${slug}" cover resolves from Spotify`, false, `offline? ${e.message}`);
    }
  }

  // ---- phone width ---------------------------------------------------------
  section("mobile 390px");
  await attempt("mobile", async () => {
    const page = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await go(page, "/");
    check("/: dialog fits (no horizontal scroll)", !(await overflow(page)));
    await chooseMode(page, true);
    for (const route of ["/", "/projects", "/stacks", "/album", `/album/${ALBUMS[0]}`, `/stacks/${STACKS[0]}`, `/projects/${PROJECTS[0]}`]) {
      await go(page, route);
      check(`${route}: no horizontal scroll`, !(await overflow(page)));
    }
    await go(page, "/");
    const bioFits = await page.locator("main p").first().evaluate((e) => e.scrollWidth <= e.clientWidth + 1);
    check("/: bio fits the width", bioFits);
    check("no console errors", page.errors.length === 0, page.errors.join(" | "));
    await page.context().close();
  });

  // ---- responsive: every route at every size ------------------------------
  section("responsive");
  await attempt("responsive", async () => {
    const SIZES = [[320, 568], [360, 740], [390, 844], [414, 896], [768, 1024], [1024, 768], [1280, 800], [1440, 900], [1920, 1080], [2560, 1440], [844, 390], [740, 360]];
    const ROUTES = ["/", "/projects", "/stacks", "/album", `/projects/${PROJECTS[0]}`, `/stacks/${STACKS[0]}`, `/album/${ALBUMS[0]}`];
    // smallest touch target we accept (WCAG 2.5.8 says 24, Apple/Google say 44)
    const MIN = 40;
    const tooSmall = (page, sel, tol = 0) =>
      page.locator(sel).evaluateAll((els, [min, tol]) =>
        els.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < min - tol || r.height < min - tol); })
           .map((e) => `${(e.getAttribute("aria-label") || e.textContent || e.tagName).trim().slice(0, 20)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`), [MIN, tol]);
    for (const [w, h] of SIZES) {
      const touch = w <= 414 || h <= 480;
      const page = await newPage({ viewport: { width: w, height: h }, isMobile: touch, hasTouch: touch });
      const tag = `${w}x${h}`;
      // first visit: dialog
      await go(page, "/");
      check(`${tag}: dialog fits or scrolls`, !(await overflow(page)) && (await page.getByRole("dialog").evaluate((d) => d.scrollHeight <= d.clientHeight + 1 || getComputedStyle(d).overflowY === "auto")));
      if (touch) {
        const small = await tooSmall(page, "[role=dialog] button, [role=dialog] a", 4);
        check(`${tag}: dialog targets ≥ ${MIN}px`, small.length === 0, small.join(", "));
      }
      await chooseMode(page, true);
      for (const route of ROUTES) {
        await go(page, route);
        check(`${tag} ${route}: no horizontal scroll`, !(await overflow(page)));
        if (touch) {
          const small = await tooSmall(page, "header button, main a[aria-label=back], main h1 a, main button");
          check(`${tag} ${route}: touch targets ≥ ${MIN}px`, small.length === 0, small.join(", "));
        }
        if (route === "/") {
          const extra = await page.evaluate(() => document.documentElement.scrollHeight - document.documentElement.clientHeight);
          check(`${tag} /: one screen tall (no scrollbar)`, extra <= 0, `${extra}px too tall`);
        }
        if (h < 600 && route.split("/").length === 3) {
          const imgH = await page.locator("main img").first().evaluate((i) => i.getBoundingClientRect().height).catch(() => 0);
          check(`${tag} ${route}: image ≤ 70% of the screen height`, imgH <= h * 0.7 + 1, `${Math.round(imgH)}px`);
        }
      }
      // menu
      await go(page, "/");
      await page.getByRole("button", { name: "open menu" }).click();
      const menuFits = await page.evaluate(() => { const m = document.querySelector("nav")?.parentElement?.parentElement; return m ? m.scrollHeight <= m.clientHeight + 1 : false; });
      check(`${tag}: menu fits without scrolling`, menuFits || h < 600, menuFits ? "" : "scrolls");
      if (touch) {
        const small = await tooSmall(page, "nav a, nav ~ div a, nav ~ div button");
        check(`${tag}: menu targets ≥ ${MIN}px`, small.length === 0, small.join(", "));
      }
      check(`${tag}: no console errors`, page.errors.length === 0, page.errors.join(" | "));
      await page.context().close();
    }
  });

  await browser.close();
  server.close();

  // ---- report --------------------------------------------------------------
  const pass = results.filter((r) => r.ok).length;
  const fail = results.length - pass;
  let last = "";
  for (const r of results) {
    if (r.section !== last) {
      console.log(`\n## ${r.section}`);
      last = r.section;
    }
    if (r.ok && process.argv.includes("--failures")) continue;
    console.log(`${r.ok ? "  ✓" : "  ✗"} ${r.name}${!r.ok && r.detail ? `  →  ${r.detail}` : ""}`);
  }
  console.log(`\n${pass} passed, ${fail} failed, ${results.length} checks`);
  process.exit(fail ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
