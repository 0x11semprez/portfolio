#!/usr/bin/env node
// Serves build/ like Vercel does (static files + SPA fallback + Range requests
// for the video). Used by scripts/smoke.js; standalone: node scripts/serve.js 4173
const fs = require("fs");
const path = require("path");
const http = require("http");

// BUILD_PATH: same variable react-scripts uses to build somewhere else
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
    if (!file.startsWith(BUILD) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      // SPA fallback, like vercel.json's rewrite
      if (path.extname(url)) {
        res.writeHead(404);
        return res.end("not found");
      }
      file = path.join(BUILD, "index.html");
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
    res.writeHead(200, { "content-type": type, "content-length": size, "accept-ranges": "bytes" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((ok) => server.listen(port, "127.0.0.1", () => ok(server)));
}

module.exports = serve;
if (require.main === module) {
  const port = Number(process.argv[2]) || 4173;
  serve(port).then(() => console.log(`serving build/ on http://127.0.0.1:${port}`));
}
