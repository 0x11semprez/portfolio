// "03" page (/03): who I am beyond the code, reached from "discover me" on the
// home page. Blocks in order: `text` = paragraphs (one per array item, ** for
// bold), `images` = the diagrams (black on white), `link` = an outside link.
// `{ en, fr }`: the language switch in the header picks one.
export const DISCOVER = [
  {
    type: "text",
    title: { en: "a human. you and I are.", fr: "un humain. toi et moi le sommes." },
    body: {
      en: [
        "I think humans need several passions to drive their lives, and to know what they are looking for.",
        "A human possibly needs four passions or more:",
        "a passion to develop creativity,\na passion to earn money,\na passion to train the body,\na passion to disconnect.",
      ],
      fr: [
        "Je pense qu'un humain a besoin de plusieurs passions pour guider sa vie, et de savoir ce qu'il cherche.",
        "Un humain a sans doute besoin de quatre passions ou plus :",
        "une passion pour développer sa créativité,\nune passion pour gagner de l'argent,\nune passion pour entraîner son corps,\nune passion pour déconnecter.",
      ],
    },
  },
  {
    type: "text",
    title: { en: "for me", fr: "pour moi" },
    body: {
      en: [
        "**My first passions are music and writing.**\nI love to create music, code music, listen to music.\nI love to write and create stories. Since my childhood, I have always romanticized everything.",
        "**My second passion is breaking down problems and research.**\nHow to explain it? When I am breaking down problems, my brain is exalted.\nI have gone through so much in my life that now I welcome problems.",
        "**My third passion is being strong.**\nI love seeing my progress when I add more weight at the gym, learn a new technique in martial arts, or even learn a new system in basketball.",
        "**My fourth passion is walking.**\nWalking leaves my head empty.",
        "And then, my aim is to be rich, with a kind of richness that money can't buy.\nI want to train my skills to their peak.",
      ],
      fr: [
        "**Mes premières passions sont la musique et l'écriture.**\nJ'aime créer de la musique, coder de la musique, écouter de la musique.\nJ'aime écrire et inventer des histoires. Depuis l'enfance, je romance tout.",
        "**Ma deuxième passion : décortiquer les problèmes et la recherche.**\nComment l'expliquer ? Quand je décortique un problème, mon cerveau exulte.\nJ'ai traversé tellement de choses dans ma vie qu'aujourd'hui, j'accueille les problèmes.",
        "**Ma troisième passion : être fort.**\nJ'aime voir ma progression quand j'ajoute du poids à la salle, que j'apprends une nouvelle technique en arts martiaux, ou même un nouveau système au basket.",
        "**Ma quatrième passion : la marche.**\nMarcher me vide la tête.",
        "Et puis, mon but est d'être riche, d'une richesse qui ne s'achète pas.\nJe veux entraîner mes compétences à leur sommet.",
      ],
    },
  },
  {
    type: "images",
    title: {
      en: "two diagrams literally describe me. what I'm looking for.",
      fr: "deux schémas me décrivent littéralement. ce que je cherche.",
    },
    images: [
      {
        src: "/images/discover/polymath.jpg",
        alt: {
          en: "Venn diagram of artist, entrepreneur and athlete: intellectual, spiritual and physical where two meet, polymath in the middle",
          fr: "Diagramme de Venn artiste, entrepreneur et athlète : intellectuel, spirituel et physique aux croisements, polymathe au centre",
        },
        source: "https://fr.pinterest.com/pin/921126930028160383/",
      },
      {
        src: "/images/discover/growth-zone.jpg",
        alt: {
          en: "Nested circles from the comfort zone to the fear zone, the learning zone and the growth zone",
          fr: "Cercles imbriqués de la zone de confort à la zone de peur, la zone d'apprentissage et la zone de croissance",
        },
        source: "https://fr.pinterest.com/pin/480126010297495495/",
      },
    ],
  },
  {
    type: "link",
    title: { en: "what am I doing right now?", fr: "qu'est-ce que je fais en ce moment ?" },
    body: { en: [], fr: [] },
    label: "linkedin",
    href: "https://www.linkedin.com/in/kassim-traore-semprez",
  },
];
