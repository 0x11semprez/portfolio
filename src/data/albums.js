// Albums. Paste the Spotify album URL in `spotify` and the cover loads
// automatically (no API key). Or set `cover` to a local file in
// public/images/albums/ to override.
// language: one of ALBUM_LANGUAGES, spelled exactly the same (the filter matches on it)
export const ALBUM_LANGUAGES = ["english", "french", "latino", "novoices"];

export const ALBUMS = [
  {
    slug: "die-lit",
    artist: "Playboi Carti",
    title: "Die Lit",
    year: 2018,
    language: "english",
    spotify: "https://open.spotify.com/album/7dAm8ShwJLFm9SaJ6Yc58O",
    cover: null,
    favorites: [
      { title: "R.I.P.", spotify: "" },
      { title: "Shoota", spotify: "" },
      { title: "Fell In Luv", spotify: "" },
    ],
    note: "the album that defined a whole sound. no filler.",
  },
  {
    slug: "deux-freres",
    artist: "PNL",
    title: "Deux Frères",
    year: 2019,
    language: "french",
    spotify: "https://open.spotify.com/album/1r6YkN7ZbmnzXk1bK6mhjA",
    cover: null,
    favorites: [
      { title: "Au DD", spotify: "" },
      { title: "Deux Frères", spotify: "" },
      { title: "Blanka", spotify: "" },
    ],
    note: "grew up on this.",
  },
  {
    slug: "un-verano-sin-ti",
    artist: "Bad Bunny",
    title: "Un Verano Sin Ti",
    year: 2022,
    language: "latino",
    spotify: "https://open.spotify.com/album/3RQQmkQEvNCY4prGKE6oc5",
    cover: null,
    favorites: [
      { title: "Tití Me Preguntó", spotify: "" },
      { title: "Me Porto Bonito", spotify: "" },
      { title: "Ojitos Lindos", spotify: "" },
    ],
    note: "summer, permanently.",
  },
  {
    slug: "tron-legacy",
    artist: "Daft Punk",
    title: "TRON: Legacy",
    year: 2010,
    language: "novoices",
    spotify: "https://open.spotify.com/album/3Ni4KDlBVy4uXyq2NxEmCC",
    cover: null,
    favorites: [
      { title: "Derezzed", spotify: "" },
      { title: "The Grid", spotify: "" },
      { title: "Solar Sailer", spotify: "" },
    ],
    note: "coding soundtrack.",
  },
];
