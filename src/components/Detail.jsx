import { Link } from "react-router-dom";
import Icon from "./Icon";

// "Product page": image left, info right. `action` = { href, icon, label }:
// one brand icon that links out (github, spotify, the stack's own mark…),
// shown inline next to the title. href null renders it grey and inert,
// `label` becomes the tooltip.
const RATIO = {
  square: "aspect-square",
  portrait: "aspect-[2/3]",
  wide: "aspect-[16/10]",
};

export default function Detail({
  back,
  image,
  imageAlt,
  imageFit = "contain",
  imageRatio = "square",
  title,
  subtitle,
  action,
  children,
}) {
  return (
    <div className="px-5 sm:px-10 pb-24">
      <Link
        to={back}
        aria-label="back"
        className="inline-flex text-neutral-400 hover:text-black transition-colors"
      >
        <Icon name="back" label="back" className="h-7 w-7 sm:h-8 sm:w-8" />
      </Link>

      <div className="mt-8 grid md:grid-cols-2 gap-10 md:gap-16">
        <div
          className={`md:sticky md:top-24 self-start w-full ${
            // logos (contain) don't need a full-width square on phones
            imageFit === "contain" ? "max-w-xs mx-auto md:max-w-none" : ""
          }`}
        >
          <div
            className={`w-full ${RATIO[imageRatio]} flex items-center justify-center overflow-hidden`}
          >
            {image ? (
              <img
                src={image}
                alt={imageAlt || title}
                className={
                  imageFit === "cover"
                    ? "h-full w-full object-cover object-top"
                    : "max-h-[60%] max-w-[60%] object-contain"
                }
              />
            ) : (
              <div className="h-full w-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm sm:text-base uppercase">
                {title}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="flex items-center gap-3 text-lg sm:text-xl font-bold uppercase tracking-wide">
            {title}
            {action &&
              (action.href ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={action.label}
                  className="inline-flex text-black hover:text-neutral-400 transition-colors"
                >
                  <Icon name={action.icon} label={action.label} className="h-5 w-5" />
                </a>
              ) : (
                <span
                  title={action.label}
                  aria-disabled="true"
                  className="inline-flex text-neutral-300"
                >
                  <Icon name={action.icon} label={action.label} className="h-5 w-5" />
                </span>
              ))}
          </h1>
          {subtitle && (
            <p className="mt-1 text-base sm:text-lg uppercase text-neutral-400">
              {subtitle}
            </p>
          )}

          <div className="mt-10 space-y-8 text-base sm:text-lg leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Small labelled block inside a Detail: "WHAT IT IS", "FAVORITES", ...
export function Block({ label, children }) {
  return (
    <section>
      <h2 className="text-sm sm:text-base font-bold uppercase text-neutral-400 mb-2">
        {label}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

// key / value rows
export function Specs({ rows }) {
  return (
    <dl className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-y-1 text-sm sm:text-base uppercase">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-neutral-400">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
