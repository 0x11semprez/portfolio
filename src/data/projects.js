// Each project is a "product". `image` = screenshot in public/images/projects/.
// `link` null → the github icon is grey and inert, `linkLabel` is its tooltip.
export const PROJECTS = [
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
