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
      en: "two diagrams describe me well",
      fr: "deux schémas qui me représentent",
    },
  },
  {
    type: "text",
    title: { en: "a human. you and I are.", fr: "un être humain. comme vous et moi." },
    body: {
      en: [
        "I think humans need several passions to give meaning to their lives, and to find what they are made for.",
        "A human possibly needs four passions or more:",
        "a passion to develop creativity,\na passion to earn money,\na passion to train the body,\na passion to disconnect.",
      ],
      fr: [
        "Je crois que chaque être humain a besoin de plusieurs passions pour donner un sens à sa vie et trouver ce pour quoi il est fait.",
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
        "**My first passions are music and writing.**\nI love to create music, code music, and of course listen to it.\nI love to write and create stories. Since my childhood, I have always romanticized everything.",
        "**My second passion is breaking down problems and research.**\nHow to explain it? My brain lights up when I find the solution.\nI have gone through so much in my life that now I welcome problems gladly.",
        "**My third passion is being strong.**\nI love seeing my progress when I add more weight at the gym, learn new techniques in combat sports, or even see a new basketball system in action.",
        "**My fourth passion is walking.**\nWalking leaves my head empty.",
        "**My aim: to become rich, with a kind of richness that money can't buy.**"
      ],
      fr: [
        "**Mes premières passions : la musique et l'écriture.**\nJ'aime composer, programmer de la musique, et bien sûr en écouter.\nJ'aime écrire et inventer des histoires. Depuis tout petit, je romance tout.",
        "**Ma deuxième passion : résoudre des problèmes, et la recherche.**\nComment l'expliquer ? Mon cerveau exulte lorsque je trouve la solution.\nJ'ai traversé tant d'épreuves que, désormais, j'accueille les problèmes avec plaisir.",
        "**Ma troisième passion : devenir fort.**\nJ'aime voir mes progrès : ajouter du poids à la salle, apprendre de nouvelles techniques dans les sports de combat, ou même voir en action un nouveau système de jeu au basket.",
        "**Ma quatrième passion : la marche.**\nMarcher me vide la tête.",
        "**Mon but : devenir riche, mais d'une richesse qui ne s'achète pas.**",
      ],
    },
  },
  { type: "knowing" },
];
