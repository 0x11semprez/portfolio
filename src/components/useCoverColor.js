import { useEffect, useState } from "react";

const cache = new Map();

// Spotify's 300px size: enough detail for the palette, quick to load
const small = (src) => src.replace("ab67616d0000b273", "ab67616d00001e02");

const N = 48; // the cover is read at N×N pixels
const K = 6; // colours in the palette

// relative luminance (sRGB) and WCAG contrast
const lum = (c) =>
  c
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
// saturation (HSL) and lightness, 0..1
const sat = ([r, g, b]) => {
  const mx = Math.max(r, g, b) / 255;
  const mn = Math.min(r, g, b) / 255;
  const l = (mx + mn) / 2;
  return mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1));
};
const light = ([r, g, b]) => (Math.max(r, g, b) + Math.min(r, g, b)) / 510;
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const css = (c) => `rgb(${c.map(Math.round).join(",")})`;

// HSL <-> RGB, all 0..1 except RGB 0..255
const toHsl = ([r, g, b]) => {
  [r, g, b] = [r / 255, g / 255, b / 255];
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  const l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn;
  const s = d / (1 - Math.abs(2 * l - 1));
  const h =
    mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
};
const toRgb = ([h, s, l]) => {
  const k = (n) => (n + h * 12) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)].map((v) => v * 255);
};

// a cover colour turned into an accent: vivid (saturation ≥ 0.65), then
// lighter or darker, away from bg, until it reads on it (contrast ≥ 3)
function vivid(c, bg) {
  let [h, s, l] = toHsl(c);
  s = Math.max(s, 0.65);
  const up = lum(bg) < 0.18;
  for (let i = 0; i < 25 && contrast(toRgb([h, s, l]), bg) < 3; i++) {
    l = Math.min(0.95, Math.max(0.05, l + (up ? 0.03 : -0.03)));
  }
  const out = toRgb([h, s, l]);
  return contrast(out, bg) >= 3 ? out : null;
}

// k-means over the pixels: the cover's K main colours and their share
function palette(px) {
  const pts = [];
  for (let i = 0; i < px.length; i += 4) pts.push([px[i], px[i + 1], px[i + 2]]);
  // start from colours far apart, so a small bright patch gets its own centre
  const centres = [pts[Math.floor(pts.length / 2)]];
  while (centres.length < K) {
    let best = pts[0];
    let far = -1;
    for (const p of pts) {
      const d = Math.min(...centres.map((c) => dist(p, c)));
      if (d > far) [far, best] = [d, p];
    }
    centres.push(best);
  }
  let groups = [];
  for (let it = 0; it < 8; it++) {
    groups = centres.map(() => [0, 0, 0, 0]);
    for (const p of pts) {
      let j = 0;
      for (let k = 1; k < K; k++) if (dist(p, centres[k]) < dist(p, centres[j])) j = k;
      const g = groups[j];
      g[0] += p[0];
      g[1] += p[1];
      g[2] += p[2];
      g[3]++;
    }
    groups.forEach((g, k) => {
      if (g[3]) centres[k] = [g[0] / g[3], g[1] / g[3], g[2] / g[3]];
    });
  }
  return centres
    .map((c, k) => ({ c, share: groups[k][3] / pts.length }))
    .filter((s) => s.share > 0);
}

// The page's colours from a cover:
//   bg: the colour that covers the most, favouring real colour over plain
//       black, white or grey, so a dark cover with a red title goes red-ish
//       only when the red is a real part of it;
//   accent: the cover's most vivid colour, pushed to read on bg (contrast
//       ≥ 3), for the title and the labels; ink when the cover has none;
//   ink: black or white, whichever has more contrast on bg, for the text.
// null while loading or when the image can't be read (no CORS).
function pick(px) {
  const pal = palette(px);
  const score = (s) => {
    const l = light(s.c);
    const dull = l < 0.08 || l > 0.94 ? 0.45 : 1;
    return s.share * (0.55 + sat(s.c)) * dull;
  };
  const bg = pal.reduce((a, b) => (score(b) > score(a) ? b : a)).c;
  const ink = contrast(bg, [0, 0, 0]) >= contrast(bg, [255, 255, 255]) ? "#000" : "#fff";
  // the accent comes from a real colour of the cover, never from a grey
  const hue = pal
    .filter((s) => s.share > 0.01 && sat(s.c) >= 0.3 && light(s.c) > 0.12 && light(s.c) < 0.9)
    .sort((a, b) => sat(b.c) * Math.sqrt(b.share) - sat(a.c) * Math.sqrt(a.share))[0];
  const accent = hue && vivid(hue.c, bg);
  return { bg: css(bg), ink, accent: accent ? css(accent) : ink };
}

export default function useCoverColor(src) {
  const [color, setColor] = useState(() => cache.get(src) || null);

  useEffect(() => {
    if (!src) return;
    if (cache.has(src)) {
      setColor(cache.get(src));
      return;
    }
    setColor(null);
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = c.height = N;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, N, N);
        const out = pick(ctx.getImageData(0, 0, N, N).data);
        cache.set(src, out);
        if (!cancelled) setColor(out);
      } catch {
        // tainted canvas: keep the page white
      }
    };
    img.src = small(src);
    return () => {
      cancelled = true;
    };
  }, [src]);

  return color;
}
