// Text above the grid. Wrap text in ** to bold it.
export const PROJECTS_INTRO =
  "I've built **over 40 projects** in tech since I started designing no-code websites at **10**. Here are the recent ones I'm the proudest of.";

// Each project is a "product". `image` = screenshot in public/images/projects/.
// `link` null → the github icon is grey and inert, `linkLabel` is its tooltip.
export const PROJECTS = [
  {
    slug: "roze",
    name: "Röze",
    category: "audio / c++",
    tagline:
      "a digital audio sampler designed to create atmospheric melodies in a sad, melancholic world",
    image: "/images/projects/roze.png",
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
    slug: "yesod",
    name: "Yesod",
    category: "ethereum / evm",
    tagline: "a laboratory for hyper-efficient smart contracts",
    image: "/images/projects/yesod.png",
    link: "https://github.com/0x11semprez/yesod",
    linkLabel: "view on github",
    description: [
      "An experimental Ethereum library stripped down to raw EVM opcodes. Minimal abstractions, maximal control.",
      "Built in the tradition of Solmate and Solady, where every line of bytecode is scrutinized and gas is treated as a scarce resource, not an afterthought.",
    ],
    details: [
      ["stack", "solidity, yul, foundry"],
      ["status", "active"],
      ["year", "2025"],
    ],
  },
  {
    slug: "ophobia",
    name: "Ophobia",
    category: "research / cryptography",
    tagline:
      "a privacy-first blockchain built against a global passive adversary",
    image: null,
    link: null,
    linkLabel: "private, research",
    description: [
      "Existing privacy coins hide the ledger but leave the wire exposed. Ophobia co-designs the cryptographic, diffusion and network layers as one architecture, rather than bolting a privacy network onto an existing chain.",
      "Designed and implemented the mixnet layer, the transport responsible for hiding IP-level metadata and unlinking broadcast traffic.",
    ],
    details: [
      ["stack", "rust, noir"],
      ["status", "research, repository private for confidentiality"],
      ["year", "2025"],
    ],
  },
];
