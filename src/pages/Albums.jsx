import { useState } from "react";
import Grid from "../components/Grid";
import Tile from "../components/Tile";
import Filters from "../components/Filters";
import useSpotifyCover from "../components/useSpotifyCover";
import { ALBUMS, ALBUM_LANGUAGES } from "../data/albums";
import { useT } from "../i18n";

function AlbumTile({ album, dark }) {
  const { src, srcSet } = useSpotifyCover(album.spotify, album.cover);
  return (
    <Tile
      to={`/album/${album.slug}`}
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

// `dark`: the background video (rendered by App, interactive mode) is showing
// behind the grid, so the text goes white.
export default function Albums({ dark = false }) {
  const [lang, setLang] = useState("all");
  const t = useT();
  const on = dark;
  const list =
    lang === "all" ? ALBUMS : ALBUMS.filter((a) => a.language === lang);

  return (
    <>
      <Filters
        options={ALBUM_LANGUAGES}
        value={lang}
        onChange={setLang}
        dark={on}
      />
      {/* how many albums the current filter shows */}
      <p
        className={`-mt-6 pb-10 text-center text-sm sm:text-base uppercase tracking-wide ${
          on ? "text-white/60" : "text-neutral-400"
        }`}
      >
        {list.length} {t(list.length === 1 ? "album" : "albums")}
      </p>
      <Grid cols={3}>
        {list.map((a) => (
          <AlbumTile key={a.slug} album={a} dark={on} />
        ))}
      </Grid>
    </>
  );
}
