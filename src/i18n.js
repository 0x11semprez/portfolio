import { createContext, useContext, useEffect, useState } from "react";

// Two languages, EN and FR. The choice lives in localStorage; the first visit
// follows the browser. Data files hold `{ en, fr }` objects where a string
// has a translation (plain strings are shown as is), `tx()` picks the one to
// show. UI words (labels, filters, buttons) come from the `UI` table below.
const KEY = "semprez.lang";
export const LANGS = ["en", "fr"];

function read() {
  try {
    const v = localStorage.getItem(KEY);
    if (LANGS.includes(v)) return v;
  } catch {
    /* private mode etc. */
  }
  return (navigator.language || "").toLowerCase().startsWith("fr")
    ? "fr"
    : "en";
}

const LangContext = createContext(["en", () => {}]);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(read);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* the choice just won't persist */
    }
  }, [lang]);
  return (
    <LangContext.Provider value={[lang, setLang]}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

// `tx(value)`: a `{ en, fr }` object → the current language's string (EN when
// the FR is missing), anything else → unchanged.
export function useTx() {
  const [lang] = useLang();
  return (v) => (v && typeof v === "object" && "en" in v ? v[lang] || v.en : v);
}

// `t(word)`: a UI word → its translation, or the word itself when unknown.
export function useT() {
  const [lang] = useLang();
  return (word) => UI[lang]?.[word] ?? word;
}

const UI = {
  en: {},
  fr: {
    // header, menu
    "open menu": "ouvrir le menu",
    "close menu": "fermer le menu",
    "play video": "lire la vidéo",
    "pause video": "mettre la vidéo en pause",
    "play background video": "lire la vidéo de fond",
    "pause background video": "mettre la vidéo de fond en pause",
    copied: "copié",
    // projects
    "next project": "projet suivant",
    "back to top": "retour en haut",
    "view on github": "voir sur github",
    about: "à propos",
    details: "détails",
    stack: "stack",
    status: "statut",
    year: "année",
    active: "actif",
    // stacks
    "what it is": "ce que c'est",
    "how i use it": "comment je l'utilise",
    "official site": "site officiel",
    level: "niveau",
    category: "catégorie",
    primary: "principal",
    working: "courant",
    all: "tout",
    languages: "langages",
    tools: "outils",
    databases: "bases de données",
    "blockchain tools": "outils blockchain",
    // albums
    favorites: "favoris",
    language: "langue",
    english: "anglais",
    french: "français",
    latino: "latino",
    novoices: "sans voix",
    "open on spotify": "ouvrir sur spotify",
    back: "retour",
  },
};
