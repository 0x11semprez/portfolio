// Text above the grid. Wrap text in ** to bold it.
export const PROJECTS_INTRO =
  "I've built **over 40 projects** in tech since I started designing no-code websites at **10**. Here are the recent ones I'm the proudest of.";

// Each project is a "product". `image` = its logo in public/images/projects/,
// `bg` = the screen behind the logo (the logo is a transparent PNG), `ink` =
// text colour on it (black by default), `color` = the project's accent.
// `detailImage` = a different image for the project page (defaults to `image`).
// `link` null → the github icon is grey and inert, `linkLabel` is its tooltip.
export const PROJECTS = [
  {
    slug: "roze",
    name: "Röze",
    category: "audio / c++ / go",
    tagline:
      "a digital audio sampler designed to create atmospheric melodies in a sad, melancholic world",
    image: "/images/projects/roze.png",
    bg: "#1c1c1c",
    ink: "#fff",
    color: "#fab9c9",
    link: "https://github.com/0x11semprez/roze",
    linkLabel: "view on github",
    description: [
      "A sampler VST built with JUCE (VST3 & Standalone), running on its own sampling engine written from scratch. 47 audio formats supported out of the box, with automatic format detection.",
      "Load, map and play your sounds straight from your DAW. Röze also ships with its own command line tool, written in Go, so the whole workflow (build, install, scan a sample folder, build a keymap) lives in one place.",
    ],
    details: [
      ["stack", "c++, juce, cmake, go"],
      ["status", "active"],
      ["year", "2026"],
    ],
  },
  {
    slug: "itzamna",
    name: "itzamna",
    category: "systems / c / go",
    tagline:
      "a system VM to safely run and test critical or dangerous code in CI pipelines and CTF environments",
    image: "/images/projects/itzamna.png",
    detailImage: "/images/projects/itzamna-detail.png",
    bg: "#fff",
    color: "#422107",
    link: "https://github.com/0x11semprez/itzamna",
    linkLabel: "view on github",
    description: [
      "A system VM written from scratch in C. Untrusted binaries run in an isolated sandbox with no access to the host by default, under CPU, memory and time limits, with a full trace of every syscall the guest makes.",
      "itzamna also ships with its own command line tool, written in Go, so the whole workflow (build, install, run, trace, check a binary) lives in one place.",
    ],
    details: [
      ["stack", "c, cmake, go"],
      ["status", "active"],
      ["year", "2026"],
    ],
  },
  {
    slug: "ayze",
    name: "AYZE",
    category: "financial engineering",
    tagline:
      "an on-chain credit default swap on the XRP Ledger, so lending no longer needs collateral",
    image: "/images/projects/ayze.png",
    detailImage: "/images/projects/ayze-detail.png",
    bg: "#0a1a3f",
    ink: "#fff",
    color: "#0085c7",
    link: "https://github.com/Keuchnotkush/AYZE",
    linkLabel: "view on github",
    description: [
      "A marketplace of lending vaults on the XRP Ledger. A broker opens a vault and posts first-loss cover, lenders fund it, borrowers draw fixed tickets against it, and accredited protection sellers guarantee individual loans with conditional escrows: a credit default swap, settled on-chain.",
      "Everything settles in native XRP, no issuer, no trust lines, no IOU. Built on the XLS-65 vault and XLS-66 lending protocol with XLS-70 credentials.",
    ],
    details: [
      ["stack", "typescript, next.js, xrpl.js"],
      ["status", "hackathon"],
      ["year", "2026"],
    ],
  },
];
