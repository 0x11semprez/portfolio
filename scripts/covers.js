// Resolves every album cover once, at build time, so the page doesn't ask
// Spotify's oEmbed endpoint for 200+ covers on each visit.
// Writes src/data/covers.json: { "<spotify album url>": "<image id>" }.
// Only fetches albums missing from the file. Run: npm run covers
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "../src/data/covers.json");

async function main() {
  const { ALBUMS } = await import("../src/data/albums.js");
  const covers = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
  const todo = ALBUMS.filter((a) => a.spotify && !a.cover && !covers[a.spotify]);
  const failed = [];

  // 8 at a time: fast, without getting rate-limited
  for (let i = 0; i < todo.length; i += 8) {
    await Promise.all(
      todo.slice(i, i + 8).map(async (a) => {
        try {
          const r = await fetch(
            `https://open.spotify.com/oembed?url=${encodeURIComponent(a.spotify)}`
          );
          const url = r.ok ? (await r.json()).thumbnail_url : null;
          const id = url && url.split("/").pop().slice(-24);
          if (id) covers[a.spotify] = id;
          else failed.push(a.slug);
        } catch {
          failed.push(a.slug);
        }
      })
    );
  }

  const sorted = Object.fromEntries(Object.entries(covers).sort());
  fs.writeFileSync(OUT, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`covers: ${todo.length - failed.length} added, ${Object.keys(sorted).length} total`);
  if (failed.length) console.log(`no cover for: ${failed.join(", ")}`);
}

main();
