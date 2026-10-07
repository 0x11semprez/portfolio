// Vite plugin: after the build, writes one HTML file per page, each with its
// own title, description, canonical, Open Graph tags, JSON-LD and a <noscript>
// version of its content. Without it every URL served the same index.html,
// whose canonical pointed at the home page: search engines read every page as
// a duplicate of it. Also writes sitemap.xml, the album shell and 404.html.
//
//   build/projects/roze/index.html   one per project, stack and section
//   build/album-shell.html           every /20/:slug (vercel.json rewrite), noindex
//   build/404.html                   any unknown URL, served with a 404, noindex
//   build/sitemap.xml
//
// The app itself does not change: these files load the same bundle, React
// renders over them. They only change what crawlers and link previews read.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { runnerImport } from "vite";

const ORIGIN = "https://www.traoresemprez.xyz";
const SITE = "Kassim Traore-Semprez";
const PERSON_ID = `${ORIGIN}/#person`;

// `**bold**` in the data files
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const plain = (s) => String(s).replace(/\*\*/g, "");
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const en = (v) => (v && typeof v === "object" && "en" in v ? v.en : v);
// a meta description: whole sentences up to ~160 characters
function clip(s, max = 160) {
  s = plain(s).replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const end = cut.lastIndexOf(". ");
  return end > 80 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(" ")) + "…";
}
const sentence = (s) => s.charAt(0).toUpperCase() + s.slice(1) + (/[.!?]$/.test(s) ? "" : ".");

// last commit date of the files a page is built from, for the sitemap.
// No git (or no history): no <lastmod>, rather than a wrong one.
function lastmod(root, files) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], { cwd: root });
    return out.toString().trim() || null;
  } catch {
    return null;
  }
}

function breadcrumb(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: ORIGIN + url,
    })),
  };
}

// every page the sitemap lists, with what goes in its <head> and <noscript>
function pages({ PROJECTS, PROJECTS_INTRO, STACKS, DISCOVER }, root) {
  const mod = (...f) => lastmod(root, f.map((x) => `src/data/${x}`));
  const projectsDate = mod("projects.js");
  const stacksDate = mod("stacks.js");
  const nav = `<p><a href="/">home</a> · <a href="/11">projects</a> · <a href="/17">stacks</a></p>`;

  const list = [
    {
      url: "/",
      lastmod: lastmod(root, ["index.html", "src/data/profile.js"]),
      // the home keeps index.html's own head and noscript
    },
    {
      url: "/03",
      lastmod: mod("discover.js"),
      title: `Discover me | ${SITE}`,
      description: clip(
        `${SITE} beyond the code: music and writing, breaking down problems, being strong, walking.`,
      ),
      jsonld: [breadcrumb([["home", "/"], ["discover me", "/03"]])],
      body:
        DISCOVER.map(
          (b) =>
            `<h2>${esc(en(b.title))}</h2>` +
            (en(b.body) || []).map((p) => `<p>${rich(p)}</p>`).join("") +
            (b.href ? `<p><a href="${esc(b.href)}">${esc(b.label)}</a></p>` : ""),
        ).join("") + nav,
    },
    {
      url: "/11",
      lastmod: projectsDate,
      title: `Projects | ${SITE}`,
      description: clip(
        `Projects by ${SITE}: ${PROJECTS.map((p) => `${p.name}, ${en(p.tagline)}`).join("; ")}.`,
      ),
      jsonld: [breadcrumb([["home", "/"], ["projects", "/11"]])],
      body:
        `<h1>Projects</h1><p>${rich(en(PROJECTS_INTRO))}</p><ul>` +
        PROJECTS.map(
          (p) => `<li><a href="/11/${p.slug}">${esc(p.name)}</a>: ${esc(en(p.tagline))}.</li>`,
        ).join("") +
        `</ul>${nav}`,
    },
    ...PROJECTS.map((p) => {
      const stack = Object.fromEntries(p.details).stack;
      return {
        url: `/11/${p.slug}`,
        lastmod: projectsDate,
        title: `${p.name} (${en(p.category)}) | ${SITE}`,
        description: clip(`${p.name}: ${sentence(en(p.tagline))} ${en(p.description).join(" ")}`),
        jsonld: [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: p.name,
            description: plain(sentence(en(p.tagline))),
            url: `${ORIGIN}/projects/${p.slug}`,
            ...(p.link && { codeRepository: p.link }),
            ...(stack && { programmingLanguage: stack.split(/,\s*/) }),
            image: ORIGIN + (p.detailImage || p.image),
            author: { "@id": PERSON_ID },
          },
          breadcrumb([["home", "/"], ["projects", "/11"], [p.name, `/11/${p.slug}`]]),
        ],
        body:
          `<h1>${esc(p.name)}</h1><p>${esc(sentence(en(p.tagline)))}</p>` +
          en(p.description).map((d) => `<p>${rich(d)}</p>`).join("") +
          `<ul>${p.details.map(([k, v]) => `<li>${esc(k)}: ${esc(v)}</li>`).join("")}</ul>` +
          (p.link ? `<p><a href="${esc(p.link)}">source code</a></p>` : "") +
          nav,
      };
    }),
    {
      url: "/17",
      lastmod: stacksDate,
      title: `Stacks | ${SITE}`,
      description: clip(
        `The languages and tools ${SITE} works with: ${STACKS.map((s) => s.name).join(", ")}.`,
      ),
      jsonld: [breadcrumb([["home", "/"], ["stacks", "/17"]])],
      body:
        `<h1>Stacks</h1><ul>` +
        STACKS.map((s) => `<li><a href="/17/${s.slug}">${esc(s.name)}</a>: ${esc(en(s.how))}</li>`).join("") +
        `</ul>${nav}`,
    },
    ...STACKS.map((s) => ({
      url: `/17/${s.slug}`,
      lastmod: stacksDate,
      title: `${s.name} | ${SITE}`,
      description: clip(`How ${SITE} uses ${s.name}: ${en(s.how)} ${en(s.what)}`),
      jsonld: [breadcrumb([["home", "/"], ["stacks", "/17"], [s.name, `/17/${s.slug}`]])],
      body:
        `<h1>${esc(s.name)}</h1><p>${esc(en(s.what))}</p><p>${esc(en(s.how))}</p>` +
        (s.link ? `<p><a href="${esc(s.link)}">${esc(s.link)}</a></p>` : "") +
        nav,
    })),
    {
      url: "/20",
      lastmod: mod("albums.js", "albumsListened.js"),
      title: `Album | ${SITE}`,
      description: `The albums ${SITE} listens to, A to Z.`,
      body: `<h1>Album</h1><p>The albums ${esc(SITE)} listens to, A to Z.</p>${nav}`,
    },
  ];
  return list;
}

// one tag swap; throws if index.html changed and the tag is gone, so the build
// fails loudly instead of shipping pages that all say they are the home page
function swap(html, re, value) {
  if (!re.test(html)) throw new Error(`seo: ${re} not found in index.html`);
  return html.replace(re, value);
}
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  return swap(html, re, `$1${esc(value)}$2`);
}

function render(template, page) {
  let html = template;
  const url = ORIGIN + page.url;
  // <title> stays index.html's on every page: the tab never changes name.
  // page.title only goes to link previews.
  html = setMeta(html, "name", "description", page.description);
  html = swap(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "property", "og:url", url);
  // profile:* only fits og:type profile, the home page
  html = setMeta(html, "property", "og:type", "website");
  html = html.replace(/\s*<meta property="profile:[^>]*>/g, "");
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  const ld = (page.jsonld || [])
    .map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`)
    .join("\n    ");
  if (ld) html = html.replace("</head>", `    ${ld}\n  </head>`);
  html = swap(html, /<noscript>[\s\S]*?<\/noscript>/, `<noscript>${page.body}</noscript>`);
  return html;
}

// a page no search engine should list: no canonical, noindex
function shell(template) {
  const html = swap(template, /\s*<link rel="canonical"[^>]*>/, "");
  return html.replace("<head>", `<head>\n    <meta name="robots" content="noindex" />`);
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

export default function seo() {
  let config;
  return {
    name: "seo-pages",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    async closeBundle() {
      const root = config.root;
      const out = path.resolve(root, config.build.outDir);
      const load = async (f) => (await runnerImport(path.join(root, "src/data", f))).module;
      const data = {
        ...(await load("projects.js")),
        ...(await load("stacks.js")),
        ...(await load("discover.js")),
      };
      const template = fs.readFileSync(path.join(out, "index.html"), "utf8");

      const list = pages(data, root);
      for (const page of list) {
        if (page.url === "/") continue;
        write(path.join(out, page.url, "index.html"), render(template, page));
      }
      // the album pages: the listening history, personal, not what this
      // site is found for. One shell serves them all (vercel.json).
      write(path.join(out, "album-shell.html"), shell(template));
      // unknown URLs: a real 404 status, the app then sends you home
      write(path.join(out, "404.html"), shell(template));

      const urls = list
        .map(
          (p) =>
            `  <url><loc>${ORIGIN}${p.url}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ""}</url>`,
        )
        .join("\n");
      write(
        path.join(out, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
      config.logger.info(`seo: ${list.length} pages, album shell, 404, sitemap.xml`);
    },
  };
}
