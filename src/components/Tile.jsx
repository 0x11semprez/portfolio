import { Link } from "react-router-dom";

const RATIO = {
  square: "aspect-square",
  portrait: "aspect-[2/3]",
  wide: "aspect-[16/10]",
};

// One "product" in the grid: image on top, uppercase label below.
// `dark`: the page is showing the background video, so the label is white.
export default function Tile({
  to,
  image,
  label,
  sublabel,
  ratio = "square",
  fit = "contain",
  dark = false,
}) {
  return (
    <Link to={to} className="group flex flex-col items-center">
      <div
        className={`w-full ${RATIO[ratio]} flex items-center justify-center overflow-hidden`}
      >
        {image ? (
          <img
            src={image}
            alt={label}
            loading="lazy"
            className={`max-h-full max-w-full transition-opacity duration-300 group-hover:opacity-70 ${
              fit === "cover"
                ? "h-full w-full object-cover object-top"
                : "object-contain"
            } ${fit === "contain" ? "p-6" : ""}`}
          />
        ) : (
          <div
            className={`h-full w-full flex items-center justify-center px-2 text-center text-sm sm:text-base uppercase ${
              dark ? "bg-white/10 text-white/60" : "bg-neutral-100 text-neutral-400"
            }`}
          >
            {sublabel || label}
          </div>
        )}
      </div>
      <p
        className={`mt-4 text-base sm:text-lg font-bold uppercase tracking-wide text-center transition-colors ${
          dark ? "text-white" : ""
        }`}
      >
        {label}
      </p>
      {sublabel && (
        <p className="mt-1 text-sm sm:text-base uppercase text-neutral-400 text-center">
          {sublabel}
        </p>
      )}
    </Link>
  );
}
