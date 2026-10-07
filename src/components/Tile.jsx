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
  srcSet,
  sizes,
  label,
  sublabel,
  ratio = "square",
  fit = "contain",
  dark = false,
  onClick,
}) {
  return (
    <Link to={to} onClick={onClick} className="group flex flex-col items-center">
      <div
        className={`w-full ${RATIO[ratio]} flex items-center justify-center overflow-hidden`}
      >
        {image ? (
          <img
            src={image}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            alt={label}
            loading="lazy"
            className={`max-h-full max-w-full transition-transform duration-300 group-hover:scale-105 ${
              fit === "cover"
                ? "h-full w-full object-cover object-top"
                : "object-contain"
            } ${fit === "contain" ? "p-4 sm:p-6" : ""}`}
          />
        ) : (
          <div
            className={`h-full w-full flex items-center justify-center px-2 text-center text-sm sm:text-base uppercase ${
              dark ? "border border-white text-white" : "border border-black text-black"
            }`}
          >
            {sublabel || label}
          </div>
        )}
      </div>
      <p
        className={`mt-4 text-base sm:text-lg font-bold uppercase tracking-wide text-center [overflow-wrap:anywhere] transition-colors ${
          dark ? "text-white" : ""
        }`}
      >
        {label}
      </p>
      {sublabel && (
        <p
          className={`mt-1 text-sm sm:text-base uppercase text-center [overflow-wrap:anywhere] ${
            dark ? "text-white" : ""
          }`}
        >
          {sublabel}
        </p>
      )}
    </Link>
  );
}
