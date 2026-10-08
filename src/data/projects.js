// Text above the grid. Wrap text in ** to bold it.
// Text is `{ en, fr }` wherever it is translated: the language switch in the
// header picks one. `**bold**` works in both.
export const PROJECTS_INTRO = {
  en: "I've built **over 40 projects** in tech since I started designing no-code websites at **10**. Here are the most recent ones I'm proud of.",
  fr: "J'ai réalisé **plus de 40 projets** tech depuis mes premiers sites no-code, à **10 ans**. Voici les plus récents dont je suis fier.",
};

// Each project is a "product". `image` = its logo in public/images/projects/,
// `bg` = the screen behind the logo (the logo is a transparent PNG), `ink` =
// text colour on it (black by default), `color` = the project's accent.
// `detailImage` = a different image for the project page (defaults to `image`).
// `description` takes **bold** too.
// `wave`: the tagline rides a sine wave on the slide.
// `details`: no longer shown on the page, only in the SEO pages (scripts/seo.mjs).
// `link` null → the github icon is grey and inert, `linkLabel` is its tooltip.
export const PROJECTS = [
  {
    slug: "roze",
    name: "Röze",
    category: "audio",
    tagline: {
      en: "a digital audio sampler designed to create atmospheric melodies",
      fr: "un sampler audio numérique pour composer des mélodies atmosphériques",
    },
    image: "/images/projects/roze.png",
    detailImage: "/images/projects/roze-detail.png",
    bg: "#1c1c1c",
    ink: "#fff",
    color: "#fab9c9",
    wave: true, // the tagline rides a sine wave on its slide
    link: "https://github.com/0x11semprez/roze",
    linkLabel: "view on github",
    description: {
      en: [
        "A **sampler VST** built with JUCE, on its own **sampling engine written from scratch**: **47 audio formats**, detected automatically.",
        "Plus a **CLI in Go** to build, install and manage your samples from the terminal.",
      ],
      fr: [
        "Un **sampler VST** développé avec JUCE, sur son propre **sampling engine écrit de zéro** : **47 formats audio**, détectés automatiquement.",
        "Et une **CLI en Golang** pour build, installer et gérer vos samples depuis le terminal.",
      ],
    },
    details: [
      ["stack", "c++, go"],
      ["status", "active"],
      ["year", "2026"],
    ],
  },
  {
    slug: "ophobia",
    name: "ophobia",
    category: "privacy",
    tagline: {
      en: "a privacy blockchain whose nodes talk through a Loopix-style mixnet, hiding network-level metadata from a global passive adversary",
      fr: "une privacy blockchain dont les nodes communiquent via un mixnet inspiré de Loopix, qui cache les metadata réseau à un global passive adversary",
    },
    image: "/images/projects/ophobia.png",
    detailImage: "/images/projects/ophobia-detail.png",
    bg: "#fff",
    color: "#000",
    link: "https://github.com/0x11semprez/ophobia",
    linkLabel: "view on github",
    description: {
      en: [
        "Named after **scopophobia**, the fear of being watched. Privacy coins hide amounts and addresses, but leak at **the network layer**.",
        "We're two: **I built the mixnet in Go**, after the **Loopix** paper. The other half is **a blockchain in Rust**.",
      ],
      fr: [
        "Le nom vient de la **scopophobie**, la peur d'être observé. Les privacy coins cachent montants et adresses, mais exposent des informations sur **la network layer**.",
        "Nous sommes deux : **j'ai construit le mixnet en Golang**, d'après le paper **Loopix**. L'autre moitié est **une blockchain en Rust**.",
      ],
    },
    details: [
      ["role", "mixnet engineer"],
      ["team", "2"],
      ["stack", "go, rust"],
      ["status", "research"],
      ["year", "2026"],
    ],
  },
  {
    slug: "ayze",
    name: "AYZE",
    category: "financial engineering",
    tagline: {
      en: "an on-chain credit default swap on the XRP Ledger, so lending no longer needs collateral",
      fr: "un credit default swap on-chain sur le XRP Ledger, pour prêter sans collatéral",
    },
    image: "/images/projects/ayze.png",
    bg: "#0a1a3f",
    ink: "#fff",
    color: "#0085c7",
    link: "https://github.com/Keuchnotkush/AYZE",
    linkLabel: "view on github",
    description: {
      en: [
        "**Lending vaults on the XRP Ledger**, with **a credit default swap settled on-chain**: protection sellers guarantee the loans.",
        "Everything settles in **native XRP**, on XLS-65, XLS-66 and XLS-70.",
      ],
      fr: [
        "Des **lending vaults sur le XRP Ledger**, avec **un credit default swap settled on-chain** : des protection sellers garantissent les prêts.",
        "Tout se règle en **XRP natif**, sur XLS-65, XLS-66 et XLS-70.",
      ],
    },
    details: [
      ["stack", "typescript, next.js, xrpl.js"],
      ["status", "hackathon"],
      ["year", "2026"],
    ],
  },
];
