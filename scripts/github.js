// Fetches my GitHub contribution count for the last 12 months (the number on
// my GitHub profile, private contributions included) once, at build time, so
// the stacks page needs no token and makes no request.
// Writes src/data/github.json. Needs the GitHub CLI, logged in (or GH_TOKEN
// set). Run: npm run github. A daily GitHub Action runs it too
// (.github/workflows/github-stats.yml).
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const OUT = path.join(__dirname, "../src/data/github.json");
const QUERY =
  "{ viewer { contributionsCollection { startedAt endedAt contributionCalendar { totalContributions } } } }";

const res = JSON.parse(execSync(`gh api graphql -f query='${QUERY}'`, { encoding: "utf8" }));
const c = res.data.viewer.contributionsCollection;
const out = {
  contributions: c.contributionCalendar.totalContributions,
  from: c.startedAt.slice(0, 10),
  to: c.endedAt.slice(0, 10),
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`${out.contributions} contributions, ${out.from} → ${out.to}`);
