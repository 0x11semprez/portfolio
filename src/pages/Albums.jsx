import { useState } from "react";
import Grid from "../components/Grid";
import Tile from "../components/Tile";
import Filters from "../components/Filters";
import useSpotifyCover from "../components/useSpotifyCover";
import { ALBUMS, ALBUM_LANGUAGES } from "../data/albums";

function AlbumTile({ album, dark }) {
  const cover = useSpotifyCover(album.spotify, album.cover);
  return (
    <Tile
      to={`/album/${album.slug}`}
      image={cover}
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
      <Grid cols={3}>
        {list.map((a) => (
          <AlbumTile key={a.slug} album={a} dark={on} />
        ))}
      </Grid>
    </>
  );
}
