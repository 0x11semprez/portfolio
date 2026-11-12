// "03" page (/03): who I am beyond the code, reached from "discover me" on the
// home page. Blocks in order: `text` = paragraphs (one per array item, ** for
// bold), `diagrams` = the two diagrams.
// `{ en, fr }`: the language switch in the header picks one.
export const DISCOVER = [
  {
    // drawn in src/components/Diagrams.jsx, in the site's font
    type: "diagrams",
    oneLine: true, // the title never wraps, it shrinks to the screen instead
    title: {
      en: "The first diagram shows how to become what I want to be, the second how to get there",
      fr: "Le premier schéma montre comment devenir ce que je veux être, le second comment y parvenir",
    },
  },
  {
    type: "text",
    title: { en: "software alchemist", fr: "software alchimiste" },
    body: {
      en: [
        "*Alchemist:* **a person who seeks to understand the hidden properties of the world through observation, experimentation and transformation.** *Historically, alchemists* **studied the nature of matter, metals, minerals and chemical reactions.** They notably sought to turn ordinary metals into gold or to discover the elixir of eternal life.",
        "In One Piece, ~~**the scholars of Ohara**~~ devoted their lives to understanding the world through science and research. They sought to reconstruct the history of the world, to uncover its most deeply buried secrets and to access knowledge deemed forbidden by the ~~**World Government**~~.",
        "I see software as a form of modern alchemy. Through code, mathematics and experimentation, we can transform abstract ideas into something concrete. I love finding solutions, exploring complex problems, designing things with elegance. I am particularly drawn to this search for balance between **technical complexity**, **simplicity** and the **beauty of a design**.",
        "I believe technology must push the boundaries of human creativity and make new possibilities accessible to all.",
        "**My ambition: to become rich, with a kind of richness that money can never buy.**",
      ],
      fr: [
        "*Alchimiste :* **personne qui cherche à comprendre les propriétés cachées du monde à travers l'observation, l'expérimentation et la transformation.** *Historiquement, les alchimistes* **étudiaient la nature de la matière, les métaux, les minéraux et les réactions chimiques.** Ils cherchaient notamment à transformer des métaux ordinaires en or ou à découvrir l'élixir de longue vie.",
        "Dans One Piece, ~~**les chercheurs d'Ohara**~~ consacraient leur vie à comprendre le monde à travers la science et la recherche. Ils cherchaient à reconstituer l'histoire du monde, à découvrir ses secrets les plus enfouis et à accéder à des connaissances considérées comme interdites par le ~~**Gouvernement mondial**~~.",
        "Je vois le software comme une forme d'alchimie moderne. À travers le code, les mathématiques et l'expérimentation, nous pouvons transformer des idées abstraites en quelque chose de concret. J'aime trouver des solutions, explorer des problèmes complexes, concevoir des choses avec élégance. Je suis particulièrement attiré par cette recherche d'équilibre entre la **complexité technique**, la **simplicité** et la **beauté d'une conception**.",
        "Je crois que la technologie doit repousser les frontières de la créativité humaine et rendre de nouvelles possibilités accessibles à tous.",
        "**Mon ambition : devenir riche, mais d'une richesse que l'argent ne pourra jamais acheter.**",
      ],
    },
  },
  { type: "knowing" },
];
