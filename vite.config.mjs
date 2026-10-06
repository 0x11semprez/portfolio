import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import seo from "./scripts/seo.mjs";

// Output in build/ (not Vite's dist/): what Vercel, scripts/serve.js and
// scripts/smoke.js expect. BUILD_PATH builds somewhere else, as before.
export default defineConfig({
  // seo: one HTML file per page + sitemap.xml, after the build
  plugins: [react(), seo()],
  build: { outDir: process.env.BUILD_PATH || "build" },
  server: { port: 3000 },
});
