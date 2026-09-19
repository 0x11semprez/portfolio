import { Link } from "react-router-dom";

const RATIO = {
  square: "aspect-square",
  portrait: "aspect-[2/3]",
  wide: "aspect-[16/10]",
};

// One "product" in the grid: image on top, uppercase label below.
export default function Tile({
  to,
  image,
  label,
  sublabel,
  ratio = "square",
  fit = "contain",
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
          <div className="h-full w-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm sm:text-base uppercase">
            {sublabel || label}
          </div>
        )}
      </div>
      <p className="mt-4 text-base sm:text-lg font-bold uppercase tracking-wide text-center">
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
