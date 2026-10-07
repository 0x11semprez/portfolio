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
        "A **sampler VST** built with JUCE (VST3 & Standalone), on its own **sampling engine written from scratch**. **47 audio formats** supported, with automatic format detection.",
        "Röze also ships with its own **CLI, written in Go**: build, install and manage your sample library without leaving the terminal.",
        "More on GitHub.",
      ],
      fr: [
        "Un **sampler VST** développé avec JUCE (VST3 et Standalone), sur son propre **sampling engine écrit de zéro**. **47 formats audio** pris en charge, avec détection automatique du format.",
        "Röze est aussi livré avec sa propre **CLI, écrite en Golang** : build, installation et gestion de votre bibliothèque de samples, sans quitter le terminal.",
        "Plus d'informations sur GitHub.",
      ],
    },
    details: [
      ["stack", "c++, juce, cmake, go"],
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
        "The name comes from **scopophobia**, the fear of being watched. Privacy coins hide amounts and addresses, but leak at **the network layer**: IP addresses and propagation timing are enough to deanonymize transactions.",
        "ophobia has two parts: **a mixnet in Go** and **a blockchain in Rust**. We're two, and **I built the mixnet**, after the **Loopix** paper: Poisson delays at each hop and cover traffic, so a global passive adversary can't link who talks to whom.",
        "More on GitHub.",
      ],
      fr: [
        "Le nom vient de la **scopophobie**, la peur d'être observé. Les privacy coins cachent les montants et les adresses, mais exposent des informations sur **la network layer** : les adresses IP et le timing de propagation suffisent à désanonymiser des transactions.",
        "ophobia se compose de deux parties : **un mixnet en Golang** et **une blockchain en Rust**. Nous sommes deux, et **j'ai construit le mixnet**, d'après le paper **Loopix** : des Poisson delays à chaque hop et du cover traffic, pour qu'un global passive adversary ne puisse pas savoir qui parle à qui.",
        "Plus d'informations sur GitHub.",
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
        "A marketplace of **lending vaults on the XRP Ledger**. A broker opens a vault and posts **first-loss capital**, lenders fund it, borrowers draw from it, and protection sellers guarantee the loans: **a credit default swap, settled on-chain**.",
        "Everything settles in **native XRP**. Built on XLS-65 vaults, the XLS-66 lending protocol and XLS-70 credentials.",
        "More on GitHub.",
      ],
      fr: [
        "Une marketplace de **lending vaults sur le XRP Ledger**. Un broker ouvre un vault et y dépose du **first-loss capital**, des prêteurs le financent, des emprunteurs y empruntent, et des protection sellers garantissent les prêts : **un credit default swap, settled on-chain**.",
        "Tout se règle en **XRP natif**. Construit sur les vaults XLS-65, le lending protocol XLS-66 et les credentials XLS-70.",
        "Plus d'informations sur GitHub.",
      ],
    },
    details: [
      ["stack", "typescript, next.js, xrpl.js"],
      ["status", "hackathon"],
      ["year", "2026"],
    ],
  },
];
