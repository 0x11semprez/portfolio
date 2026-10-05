// Text above the grid. Wrap text in ** to bold it.
// Text is `{ en, fr }` wherever it is translated: the language switch in the
// header picks one. `**bold**` works in both.
export const PROJECTS_INTRO = {
  en: "I've built **over 40 projects** in tech since I started designing no-code websites at **10**. Here are the recent ones I'm the proudest of.",
  fr: "J'ai construit **plus de 40 projets** tech depuis mes premiers sites no-code à **10 ans**. Voici les récents dont je suis le plus fier.",
};

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
    tagline: {
      en: "a digital audio sampler designed to create atmospheric melodies in a sad, melancholic world",
      fr: "un sampler audio numérique conçu pour créer des mélodies atmosphériques dans un monde triste et mélancolique",
    },
    image: "/images/projects/roze.png",
    bg: "#1c1c1c",
    ink: "#fff",
    color: "#fab9c9",
    link: "https://github.com/0x11semprez/roze",
    linkLabel: "view on github",
    description: {
      en: [
        "A sampler VST built with JUCE (VST3 & Standalone), running on its own sampling engine written from scratch. 47 audio formats supported out of the box, with automatic format detection.",
        "Load, map and play your sounds straight from your DAW. Röze also ships with its own command line tool, written in Go, so the whole workflow (build, install, scan a sample folder, build a keymap) lives in one place.",
      ],
      fr: [
        "Un sampler VST construit avec JUCE (VST3 et Standalone), sur un moteur de sampling écrit from scratch. 47 formats audio pris en charge nativement, avec détection automatique du format.",
        "Chargez, mappez et jouez vos sons directement depuis votre DAW. Röze embarque aussi son propre outil en ligne de commande, écrit en Go : tout le workflow (build, installation, scan d'un dossier de samples, création d'un keymap) au même endroit.",
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
    category: { en: "privacy / networking / go", fr: "vie privée / réseau / go" },
    tagline: {
      en: "a Loopix-style mixnet that hides network-level metadata from a global passive adversary",
      fr: "un mixnet inspiré de Loopix qui cache les métadonnées réseau à un adversaire passif global",
    },
    image: "/images/projects/ophobia.png",
    detailImage: "/images/projects/ophobia-detail.png",
    bg: "#fff",
    color: "#000",
    link: "https://github.com/0x11semprez/ophobia",
    linkLabel: "view on github",
    description: {
      en: [
        "The name comes from scopophobia, the intense fear of being watched. ophobia started as a privacy-first blockchain, co-designing the cryptographic, diffusion and network layers. We cut the scope down to the mixnet: the network layer, where today's privacy coins leak the most.",
        "Designed after the Loopix paper: a stratified topology of mix nodes, Poisson-distributed delays at each hop, and cover traffic (loop and drop messages), so an adversary watching the whole internet can't link who talks to whom.",
      ],
      fr: [
        "Le nom vient de la scopophobie, la peur intense d'être observé. ophobia a commencé comme une blockchain pensée pour la vie privée, qui concevait ensemble les couches cryptographique, de diffusion et réseau. Nous avons réduit le périmètre au mixnet : la couche réseau, là où les privacy coins actuelles fuient le plus.",
        "Conçu d'après le papier Loopix : une topologie de mix nodes en couches, des délais tirés selon une loi de Poisson à chaque saut, et du trafic de couverture (messages loop et drop), pour qu'un adversaire qui observe tout internet ne puisse pas relier qui parle à qui.",
      ],
    },
    details: [
      ["stack", "go"],
      ["status", "research"],
      ["year", "2026"],
    ],
  },
  {
    slug: "ayze",
    name: "AYZE",
    category: { en: "financial engineering", fr: "ingénierie financière" },
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
        "A marketplace of lending vaults on the XRP Ledger. A broker opens a vault and posts first-loss cover, lenders fund it, borrowers draw fixed tickets against it, and accredited protection sellers guarantee individual loans with conditional escrows: a credit default swap, settled on-chain.",
        "Everything settles in native XRP, no issuer, no trust lines, no IOU. Built on the XLS-65 vault and XLS-66 lending protocol with XLS-70 credentials.",
      ],
      fr: [
        "Une place de marché de vaults de prêt sur le XRP Ledger. Un broker ouvre un vault et dépose une couverture de première perte, des prêteurs le financent, des emprunteurs y tirent des tickets fixes, et des vendeurs de protection accrédités garantissent chaque prêt avec des escrows conditionnels : un credit default swap, réglé on-chain.",
        "Tout se règle en XRP natif, sans émetteur, sans trust line, sans IOU. Construit sur le vault XLS-65 et le protocole de prêt XLS-66 avec les credentials XLS-70.",
      ],
    },
    details: [
      ["stack", "typescript, next.js, xrpl.js"],
      ["status", "hackathon"],
      ["year", "2026"],
    ],
  },
];
