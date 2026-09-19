import { useEffect, useState } from "react";

const cache = new Map();

// Resolves an album cover from a Spotify URL via the public oEmbed endpoint.
// No API key needed. Returns `override` untouched when provided.
export default function useSpotifyCover(spotifyUrl, override) {
  const [cover, setCover] = useState(override || cache.get(spotifyUrl) || null);

  useEffect(() => {
    if (override || !spotifyUrl) return;
    if (cache.has(spotifyUrl)) {
      setCover(cache.get(spotifyUrl));
      return;
    }
    let cancelled = false;
    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const url = json?.thumbnail_url || null;
        cache.set(spotifyUrl, url);
        if (!cancelled) setCover(url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [spotifyUrl, override]);

  return cover;
}
