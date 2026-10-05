// The easter egg: my own album. It isn't in the grid; tapping the album
// count on the albums page 3 times in a row opens it. The tracks play in this order,
// one after the other. Files in public/audio/neverforgetloyalty/.
const DIR = "/audio/neverforgetloyalty";

export const SECRET_ALBUM = {
  slug: "neverforgetloyalty",
  artist: "UNKNOWN",
  title: "NEVERFORGETLOYALTY",
  cover: "/images/albums/neverforgetloyalty.jpg",
  tracks: [
    { title: "MARIANNE EST MORTE", src: `${DIR}/01.m4a` },
    { title: "Y’A LES ANGES QUI PLEURENT", src: `${DIR}/02.m4a` },
    { title: "EXCLU (SKIT) MODE AVION", src: `${DIR}/03.m4a` },
    { title: "TOISON D’OR", src: `${DIR}/04.m4a` },
    { title: "LAWSON", src: `${DIR}/05.m4a` },
    { title: "test et continue", src: `${DIR}/06.m4a` },
  ],
};
