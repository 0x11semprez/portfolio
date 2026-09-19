import ICONS from "./icons";

// Inline monochrome brand icon. Fills with currentColor so the surrounding
// text-* / hover:text-* classes drive its colour. Unknown slug → ↗.
export default function Icon({ name, label, className = "h-6 w-6" }) {
  const d = ICONS[name] || ICONS.link;
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={label}
      className={`${className} fill-current`}
    >
      <path d={d} />
    </svg>
  );
}
