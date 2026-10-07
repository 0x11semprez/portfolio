// "03" page (/03): who I am beyond the code, reached from "discover me" on the
// home page. Blocks in order: `text` = paragraphs (one per array item, ** for
// bold), `diagrams` = the two diagrams, `link` = an outside link.
// `{ en, fr }`: the language switch in the header picks one.
export const DISCOVER = [
  {
    type: "text",
    title: { en: "a human. you and I are.", fr: "un être humain. comme vous et moi." },
    body: {
      en: [
        "I think humans need several passions to drive their lives, and to know what they are looking for.",
        "A human possibly needs four passions or more:",
        "a passion to develop creativity,\na passion to earn money,\na passion to train the body,\na passion to disconnect.",
      ],
      fr: [
        "Je crois que chaque être humain a besoin de plusieurs passions pour donner un cap à sa vie, et de savoir ce qu'il recherche.",
        "Il en faut sans doute au moins quatre :",
        "une pour développer sa créativité,\nune pour gagner sa vie,\nune pour entretenir son corps,\nune pour décrocher.",
      ],
    },
  },
  {
    type: "text",
    title: { en: "for me", fr: "les miennes" },
    body: {
      en: [
        "**My first passions are music and writing.**\nI love to create music, code music, listen to music.\nI love to write and create stories. Since my childhood, I have always romanticized everything.",
        "**My second passion is breaking down problems and research.**\nHow to explain it? When I am breaking down problems, my brain is exalted.\nI have gone through so much in my life that now I welcome problems.",
        "**My third passion is being strong.**\nI love seeing my progress when I add more weight at the gym, learn a new technique in martial arts, or even learn a new system in basketball.",
        "**My fourth passion is walking.**\nWalking leaves my head empty.",
        "**And then, my aim is to be rich, with a kind of richness that money can't buy.**\n**I want to train my skills to their peak.**",
      ],
      fr: [
        "**Mes premières passions : la musique et l'écriture.**\nJ'aime composer, programmer de la musique, en écouter.\nJ'aime écrire et inventer des histoires. Depuis tout petit, je romance tout.",
        "**Ma deuxième passion : résoudre des problèmes, et la recherche.**\nComment l'expliquer ? Quand je m'attaque à un problème, mon cerveau s'emballe.\nJ'ai traversé tant d'épreuves que, désormais, les problèmes, je les accueille.",
        "**Ma troisième passion : devenir fort.**\nJ'aime voir mes progrès : ajouter du poids à la salle, apprendre une nouvelle technique en arts martiaux, ou même un nouveau système de jeu au basket.",
        "**Ma quatrième passion : la marche.**\nMarcher me vide la tête.",
        "**Mon but : être riche, mais d'une richesse qui ne s'achète pas.**\n**Je veux pousser mes compétences à leur plus haut niveau.**",
      ],
    },
  },
  {
    // drawn in src/components/Diagrams.jsx, in the site's font
    type: "diagrams",
    title: {
      en: "two diagrams literally describe me. what I'm looking for.",
      fr: "deux schémas me résument : ce que je recherche.",
    },
  },
  {
    type: "link",
    title: { en: "what am I doing right now?", fr: "ce que je fais en ce moment" },
    body: {
      en: [
        "**Research Assistant, Audio Programming**\nUniversité de Lorraine · Oct 2026 – today · Paris\nTaking part in a PhD research project, contributing to the thesis.",
        "**Head of Blockchain Research and Development**\nPoC Innovation · Jul 2026 – today · Paris\nLeading blockchain R&D initiatives. Before that, R&D developer since Mar 2026: research projects using blockchain technology.",
        "**Instructor**\nMagic Makers · Sep 2026 – today · Paris\nHelping children learn computer science.",
        "**Bachelor's Degree in Computer Science**\nEpitech · Sep 2025 – Jun 2028",
      ],
      fr: [
        "**Assistant de recherche en programmation audio**\nUniversité de Lorraine · depuis oct. 2026 · Paris\nJe contribue à une thèse dans le cadre d'un projet de recherche doctoral.",
        "**Responsable R&D blockchain**\nPoC Innovation · depuis juil. 2026 · Paris\nJe pilote les projets de R&D blockchain. J'y suis aussi développeur R&D depuis mars 2026, sur des projets de recherche autour de la blockchain.",
        "**Animateur**\nMagic Makers · depuis sept. 2026 · Paris\nJ'initie des enfants à l'informatique.",
        "**Bachelor en informatique**\nEpitech · sept. 2025 – juin 2028",
      ],
    },
    label: "linkedin",
    href: "https://www.linkedin.com/in/kassim-traore-semprez",
  },
];
