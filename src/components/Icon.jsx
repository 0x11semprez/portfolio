import ICONS from "./icons";

// Inline monochrome brand icon. Fills with currentColor so the surrounding
// text-* / hover:text-* classes drive its colour. Unknown slug → ↗. `tight`:
// the box hugs the glyph's ink (TIGHT viewBox) instead of the 24-grid, so it
// can be sized and aligned like a letter.
const TIGHT = { play: "8 5 11 14", pause: "6 5 12 14" };

export default function Icon({ name, label, tight = false, className = "h-6 w-6" }) {
  const d = ICONS[name] || ICONS.link;
  return (
    <svg
      viewBox={(tight && TIGHT[name]) || "0 0 24 24"}
      role="img"
      aria-label={label}
      className={`${className} fill-current`}
    >
      <path d={d} />
    </svg>
  );
}
