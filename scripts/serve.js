#!/usr/bin/env node
// Serves build/ like Vercel does (static files, a folder's index.html,
// vercel.json's album rewrite, 404.html with a 404, Range requests for the
// video). Used by scripts/smoke.js; standalone: node scripts/serve.js 4173
const fs = require("fs");
const path = require("path");
const http = require("http");

// BUILD_PATH: same variable vite.config.mjs uses to build somewhere else
const BUILD = path.resolve(process.env.BUILD_PATH || path.join(__dirname, "../build"));
const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
};

function serve(port) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(BUILD, url);
    let status = 200;
    if (file.startsWith(BUILD) && fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    if (!file.startsWith(BUILD) || !fs.existsSync(file)) {
      if (path.extname(url)) {
        res.writeHead(404);
        return res.end("not found");
      }
      // like vercel.json's rewrite, else Vercel's 404.html
      if (url.startsWith("/20/")) file = path.join(BUILD, "album-shell.html");
      else {
        file = path.join(BUILD, "404.html");
        status = 404;
      }
    }
    const type = MIME[path.extname(file)] || "application/octet-stream";
    const size = fs.statSync(file).size;
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      res.writeHead(206, {
        "content-type": type,
        "content-range": `bytes ${start}-${end}/${size}`,
        "content-length": end - start + 1,
        "accept-ranges": "bytes",
      });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(status, { "content-type": type, "content-length": size, "accept-ranges": "bytes" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((ok) => server.listen(port, "127.0.0.1", () => ok(server)));
}

module.exports = serve;
if (require.main === module) {
  const port = Number(process.argv[2]) || 4173;
  serve(port).then(() => console.log(`serving build/ on http://127.0.0.1:${port}`));
}
