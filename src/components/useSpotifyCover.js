import { useEffect, useState } from "react";
import COVERS from "../data/covers.json";

const cache = new Map();

// Spotify serves each cover in several sizes; the id's prefix picks one.
const img = (id, size) => `https://i.scdn.co/image/ab67616d${size}${id}`;

// Cover for a Spotify album URL. Covers are resolved ahead of time by
// `npm run covers` (src/data/covers.json), so normally there's no request at
// all. An album missing from that file falls back to the public oEmbed
// endpoint (no API key). Returns { src, srcSet } (srcSet: 300px and 640px),
// or { src: override } when a local cover is set.
export default function useSpotifyCover(spotifyUrl, override) {
  const id = COVERS[spotifyUrl];
  const [fetched, setFetched] = useState(cache.get(spotifyUrl) || null);

  useEffect(() => {
    if (override || id || !spotifyUrl) return;
    if (cache.has(spotifyUrl)) {
      setFetched(cache.get(spotifyUrl));
      return;
    }
    let cancelled = false;
    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const url = json?.thumbnail_url || null;
        cache.set(spotifyUrl, url);
        if (!cancelled) setFetched(url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [spotifyUrl, override, id]);

  if (override) return { src: override };
  if (id)
    return {
      src: img(id, "0000b273"),
      srcSet: `${img(id, "00001e02")} 300w, ${img(id, "0000b273")} 640w`,
    };
  return { src: fetched };
}
