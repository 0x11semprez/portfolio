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
];
