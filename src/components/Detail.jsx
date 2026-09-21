import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { useT } from "../i18n";

// "Product page": image left, info right. `action` = { href, icon, label }:
// one brand icon that links out (github, spotify, the stack's own mark…),
// shown inline next to the title. href null renders it grey and inert,
// `label` becomes the tooltip. `imageInset`: contain images sit at 60% of
// their box (small logos); false lets them fill it. `bg`: paint the whole
// page (body, browser chrome) that colour, so a project page keeps the
// universe of the slide it was opened from. `dark`: the page is on a dark
// background (the video, or a dark `bg`), so the text and links go white.
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
  imageInset = true,
  title,
  subtitle,
  action,
  children,
  bg = null,
  dark = false,
}) {
  useEffect(() => {
    if (!bg) return;
    const meta = document.querySelector('meta[name="theme-color"]');
    const prev = {
      body: document.body.style.backgroundColor,
      meta: meta?.getAttribute("content"),
    };
    document.body.style.backgroundColor = bg;
    meta?.setAttribute("content", bg);
    return () => {
      document.body.style.backgroundColor = prev.body;
      meta?.setAttribute("content", prev.meta || "#ffffff");
    };
  }, [bg]);

  const t = useT();
  const hover = dark ? "hover:text-white" : "hover:text-black";
  return (
    <div
      className={`px-5 sm:px-10 pb-24 transition-colors ${dark ? "text-white" : ""}`}
    >
      <Link
        to={back}
        aria-label={t("back")}
        className={`inline-flex p-2 -m-2 text-neutral-400 ${hover} transition-colors`}
      >
        <Icon name="back" label={t("back")} className="h-7 w-7 sm:h-8 sm:w-8" />
      </Link>

      <div className="mt-6 sm:mt-8 grid md:grid-cols-2 gap-8 md:gap-16">
        <div
          className={`md:[@media(min-height:600px)]:sticky md:top-24 self-start w-full mx-auto md:[@media(min-height:600px)]:max-w-none ${
            // phones (and any screen under 600px tall): logos (contain) don't
            // need a full-width square, and in landscape neither does a cover
            // (70vh cap). Sticky only when the whole image fits on screen.
            imageFit === "contain" && imageInset
              ? "max-w-[min(20rem,70vh)]"
              : "max-w-[min(24rem,70vh)]"
          }`}
        >
          {/* cover: a fixed-ratio box. contain: the box hugs the image, so
              the gap to the text is the grid's own, same on every page */}
          <div
            className={`w-full flex items-center justify-center overflow-hidden ${
              imageFit === "cover" ? RATIO[imageRatio] : ""
            }`}
          >
            {image ? (
              <img
                src={image}
                alt={imageAlt || title}
                className={
                  imageFit === "cover"
                    ? "h-full w-full object-cover object-top"
                    : imageInset
                      ? "max-h-48 max-w-48 md:max-h-80 md:max-w-80 object-contain"
                      : "max-h-[45dvh] md:max-h-[60vh] w-full object-contain"
                }
              />
            ) : (
              <div
                className={`h-full w-full flex items-center justify-center px-2 text-center text-sm sm:text-base uppercase ${
                  dark
                    ? "bg-white/10 text-white/60"
                    : "bg-neutral-100 text-neutral-400"
                }`}
              >
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
                  className="inline-flex p-3 -m-3 hover:text-neutral-400 transition-colors"
                >
                  <Icon
                    name={action.icon}
                    label={action.label}
                    className="h-5 w-5"
                  />
                </a>
              ) : (
                <span
                  title={action.label}
                  aria-disabled="true"
                  className="inline-flex p-3 -m-3 text-neutral-300"
                >
                  <Icon
                    name={action.icon}
                    label={action.label}
                    className="h-5 w-5"
                  />
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
    <dl className="grid grid-cols-[6rem_1fr] sm:grid-cols-[7rem_1fr] gap-y-1 text-sm sm:text-base uppercase">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-neutral-400">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
