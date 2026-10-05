import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "../components/Grid";
import Tile from "../components/Tile";
import useSpotifyCover from "../components/useSpotifyCover";
import { ALBUMS } from "../data/albums";
import { SECRET_ALBUM } from "../data/secretAlbum";
import { useT } from "../i18n";

// Easter egg: an album by SECRET_ALBUM.door is a hidden door. One tap opens
// it as usual (a beat later); 3 quick taps (each within 400ms of the last)
// open the hidden album instead.
function useDoor(album) {
  const navigate = useNavigate();
  const taps = useRef({ n: 0, timer: 0 });
  useEffect(() => () => clearTimeout(taps.current.timer), []);
  if (album.artist !== SECRET_ALBUM.door) return undefined;
  return (e) => {
    e.preventDefault();
    const t = taps.current;
    clearTimeout(t.timer);
    t.n += 1;
    if (t.n >= 3) {
      t.n = 0;
      navigate(`/album/${SECRET_ALBUM.slug}`);
      return;
    }
    t.timer = setTimeout(() => {
      t.n = 0;
      navigate(`/album/${album.slug}`);
    }, 400);
  };
}

function AlbumTile({ album, dark }) {
  const { src, srcSet } = useSpotifyCover(album.spotify, album.cover);
  const door = useDoor(album);
  return (
    <Tile
      to={`/album/${album.slug}`}
      onClick={door}
      image={src}
      srcSet={srcSet}
      // 2 columns on phones, 3 from md
      sizes="(min-width: 768px) 33vw, 50vw"
      label={album.title}
      sublabel={album.artist}
      ratio="square"
      fit="cover"
      dark={dark}
    />
  );
}

// An album's letter: the first letter of its title without its accent, "#"
// for titles starting with a digit or a sign.
const letter = (title) => {
  const c = title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .charAt(0)
    .toUpperCase();
  return c >= "A" && c <= "Z" ? c : "#";
};
const ORDER = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Every album, A to Z by title (accents and case ignored), letter by letter.
// An album with `last: true` goes at the end of its letter.
const SORTED = [...ALBUMS].sort(
  (x, y) =>
    ORDER.indexOf(letter(x.title)) - ORDER.indexOf(letter(y.title)) ||
    Boolean(x.last) - Boolean(y.last) ||
    x.title.localeCompare(y.title, "fr", { sensitivity: "base" }),
);
// the alphabet row: "all", "#", then only the letters that have albums
const LETTERS = [
  "all",
  ...[...ORDER].filter((l) =>
    SORTED.some((a) => letter(a.title) === l),
  ),
];

// The letter picked and where the grid was scrolled to (per letter), so
// leaving an album (its back arrow, the browser's back, the menu) lands
// where you were. Kept for the tab's life.
const load = (key, fallback) => {
  try {
    return sessionStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};
const keep = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch {}
};
const scrollKey = (l) => `albums-scroll-${l}`;

// `dark`: the background video (rendered by App, interactive mode) is showing
// behind the grid, so the text goes white.
export default function Albums({ dark = false }) {
  const t = useT();
  const [at, setAt] = useState(() => {
    const l = load("albums-letter", "all");
    return LETTERS.includes(l) ? l : "all";
  });
  const list = at === "all" ? SORTED : SORTED.filter((a) => letter(a.title) === at);

  // before the first paint, so the grid never flashes at the top
  useLayoutEffect(() => {
    window.scrollTo(0, Number(load(scrollKey(at), 0)) || 0);
  }, [at]);
  useEffect(() => {
    keep("albums-letter", at);
    let raf = 0;
    const save = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => keep(scrollKey(at), String(window.scrollY)));
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", save);
    };
  }, [at]);

  return (
    <>
      {/* the alphabet, picked like the menu: the current letter bold, the
          others regular */}
      <nav
        aria-label={t("albums")}
        className={`px-5 pb-6 flex flex-wrap justify-center gap-x-1 sm:gap-x-2 text-lg sm:text-2xl uppercase ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {LETTERS.map((l) => (
          <button
            key={l}
            onClick={() => {
              keep(scrollKey(l), "0");
              setAt(l);
            }}
            aria-pressed={l === at}
            // px-2 py-2: ≥ 40px touch targets
            className={`px-2 py-2 ${
              l === at
                ? "font-bold"
                : "font-normal hover:underline underline-offset-4"
            }`}
          >
            {l === "all" ? t("all") : l}
          </button>
        ))}
      </nav>
      {/* how many albums the letter shows */}
      <p
        className={`pb-10 text-center text-sm sm:text-base uppercase tracking-wide ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {list.length} {t(list.length === 1 ? "album" : "albums")}
      </p>
      <Grid cols={3}>
        {list.map((a) => (
          <AlbumTile key={a.slug} album={a} dark={dark} />
        ))}
      </Grid>
    </>
  );
}
