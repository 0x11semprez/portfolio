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
// `description` takes **bold** too.
// `wave`: the tagline rides a sine wave on the slide.
// `link` null → the github icon is grey and inert, `linkLabel` is its tooltip.
export const PROJECTS = [
  {
    slug: "roze",
    name: "Röze",
    category: "audio / c++ / go",
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
        "A **sampler VST** built with JUCE (VST3 & Standalone), running on its own **sampling engine written from scratch**. **47 audio formats** supported out of the box, with automatic format detection.",
        "Load, map and play your sounds straight from your DAW. Röze is not only a plugin: it ships with its own **command line tool, written in Go**, that drives the full pipeline, from building the VST to managing your sample library, without leaving the terminal.",
      ],
      fr: [
        "Un **sampler VST** développé avec JUCE (VST3 et version autonome), qui repose sur son propre **moteur d'échantillonnage, écrit de zéro**. Il lit **47 formats audio** sans rien configurer et reconnaît seul le format de chaque fichier.",
        "Chargez vos sons, assignez-les aux touches et jouez-les directement dans votre DAW. Mais Röze ne se limite pas au plugin : il est livré avec son propre **outil en ligne de commande, écrit en Go**, qui gère tout le reste, de la compilation du VST à l'organisation de votre bibliothèque de samples, sans quitter le terminal.",
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
    category: { en: "privacy / networking / go / rust", fr: "vie privée / réseau / go / rust" },
    tagline: {
      en: "a privacy blockchain whose nodes talk through a Loopix-style mixnet, hiding network-level metadata from a global passive adversary",
      fr: "une blockchain privée dont les nœuds communiquent à travers un mixnet inspiré de Loopix, qui cache les métadonnées réseau à un adversaire passif global",
    },
    image: "/images/projects/ophobia.png",
    detailImage: "/images/projects/ophobia-detail.png",
    bg: "#fff",
    color: "#000",
    link: "https://github.com/0x11semprez/ophobia",
    linkLabel: "view on github",
    description: {
      en: [
        "The name comes from **scopophobia**, the intense fear of being watched. Privacy coins hide amounts and addresses, but leak at **the network layer**: IP addresses, propagation timing and peer topology are enough to deanonymize a share of transactions. ophobia has two parts: **a mixnet** that hides that metadata, and **a Rust chain** (ring signatures, PoW, mempool) whose nodes gossip their blocks and transactions through it.",
        "We're two. **I built the mixnet**, in Go, after the **Loopix** paper: clients, providers and a stratified topology of mix nodes, **Poisson-distributed delays** at each hop, and **cover traffic** (loop and drop messages), so an adversary watching the whole internet can't link who talks to whom.",
        "A local **TCP bridge** plugs each chain node into its own mixnet client. Three nodes run over it and all end at the same height and tip.",
      ],
      fr: [
        "Le nom vient de la **scopophobie**, la peur intense d'être observé. Les privacy coins cachent les montants et les adresses, mais laissent fuiter des informations par **la couche réseau** : adresses IP, timing de propagation et topologie des pairs suffisent à désanonymiser une partie des transactions. ophobia a deux parties : **un mixnet** qui cache ces métadonnées, et **une chaîne Rust** (ring signatures, PoW, mempool) dont les nœuds font transiter leurs blocs et leurs transactions par ce mixnet.",
        "Nous sommes deux. **J'ai construit le mixnet**, en Go, d'après le papier **Loopix** : clients, providers et une topologie de mix nodes en couches, des **délais tirés selon une loi de Poisson** à chaque saut, et du **trafic de couverture** (messages loop et drop), pour qu'un adversaire qui observe tout internet ne puisse pas relier qui parle à qui.",
        "Un **bridge TCP** local branche chaque nœud de la chaîne sur son propre client mixnet. Trois nœuds lancés dessus finissent tous à la même hauteur, sur le même dernier bloc.",
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
        "A marketplace of **lending vaults on the XRP Ledger**. A broker opens a vault and posts first-loss cover, lenders fund it, borrowers draw fixed tickets against it, and accredited protection sellers guarantee individual loans with conditional escrows: **a credit default swap, settled on-chain**.",
        "Everything settles in **native XRP**, no issuer, no trust lines, no IOU. Built on the XLS-65 vault and XLS-66 lending protocol with XLS-70 credentials.",
      ],
      fr: [
        "Une place de marché de **vaults de prêt sur le XRP Ledger**. Un broker ouvre un vault et dépose une couverture de première perte, des prêteurs le financent, des emprunteurs y tirent des tickets fixes, et des vendeurs de protection accrédités garantissent chaque prêt avec des escrows conditionnels : **un credit default swap, réglé on-chain**.",
        "Tout se règle en **XRP natif**, sans émetteur, sans trust line, sans IOU. Construit sur le vault XLS-65 et le protocole de prêt XLS-66 avec les credentials XLS-70.",
      ],
    },
    details: [
      ["stack", "typescript, next.js, xrpl.js"],
      ["status", "hackathon"],
      ["year", "2026"],
    ],
  },
];
