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
// `stacked`: one column, like a GitHub README: the image centered on top,
// the text under it. `centered`: stacked, and the text centered too.
// `accent`: colour for the title and the labels (an album's cover accent).
// `hideTitle`: the image already spells the name (a project logo), so the
// title is for screen readers only and the action icon stands alone.
const RATIO = {
  square: "aspect-square",
  portrait: "aspect-[2/3]",
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4]",
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
  stacked = false,
  centered = false,
  accent = null,
  hideTitle = false,
}) {
  stacked = stacked || centered;
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
  // one colour everywhere: labels bold, values regular, no grey
  return (
    <div
      className={`px-5 sm:px-10 pb-24 transition-colors ${dark ? "text-white" : ""}`}
      style={accent ? { "--accent": accent } : undefined}
    >
      <Link
        to={back}
        aria-label={t("back")}
        className="inline-flex p-2 -m-2 hover:scale-110 transition-transform"
      >
        <Icon name="back" label={t("back")} className="h-7 w-7 sm:h-8 sm:w-8" />
      </Link>

      <div
        className={`mt-6 sm:mt-8 ${
          stacked
            ? "mx-auto max-w-4xl flex flex-col gap-10 sm:gap-14"
            : "grid md:grid-cols-2 gap-8 md:gap-16"
        }`}
      >
        <div
          className={
            stacked && imageFit !== "cover"
              ? // a logo: as big as on its slide, wider than the text column
                // (self-center keeps it centered when it overflows)
                "w-[min(calc(100vw-2.5rem),60rem)] self-center"
              : stacked
              ? "w-full"
              : `md:[@media(min-height:600px)]:sticky md:top-[calc(6rem+env(safe-area-inset-top))] self-start w-full mx-auto md:[@media(min-height:600px)]:max-w-none ${
                  // phones (and any screen under 600px tall): logos (contain) don't
                  // need a full-width square, and in landscape neither does a cover
                  // (70vh cap). Sticky only when the whole image fits on screen.
                  imageFit === "contain" && imageInset
                    ? "max-w-[min(20rem,70vh)]"
                    : "max-w-[min(24rem,70vh)]"
                }`
          }
        >
          {/* cover: a fixed-ratio box. contain: the box hugs the image, so
              the gap to the text is the grid's own, same on every page */}
          <div
            className={`w-full flex items-center justify-center overflow-hidden ${
              imageFit === "cover" && !stacked ? RATIO[imageRatio] : ""
            }`}
          >
            {image ? (
              <img
                src={image}
                alt={imageAlt || title}
                className={
                  stacked && imageFit === "cover"
                    ? `${RATIO[imageRatio]} w-full object-cover shadow-2xl ${
                        // the cover's height stays under about 60vh
                        imageRatio === "tall"
                          ? "max-w-[min(30rem,45vh)]"
                          : "max-w-[min(30rem,60vh)]"
                      }`
                    : stacked
                    ? "w-full h-auto max-h-[52vh] object-contain"
                    : imageFit === "cover"
                      ? "h-full w-full object-cover object-top"
                      : imageInset
                        ? "max-h-48 max-w-48 md:max-h-80 md:max-w-80 object-contain"
                        : "max-h-[45dvh] md:max-h-[60vh] w-full object-contain"
                }
              />
            ) : (
              <div
                className={`h-full w-full flex items-center justify-center px-2 text-center text-sm sm:text-base uppercase ${
                  dark ? "border border-white text-white" : "border border-black text-black"
                }`}
              >
                {title}
              </div>
            )}
          </div>
        </div>

        <div
          className={
            centered ? "w-full text-center" : stacked ? "w-full" : "max-w-2xl"
          }
        >
          <h1
            className={`flex items-center gap-3 text-4xl sm:text-6xl font-bold uppercase tracking-wide text-[color:var(--accent,currentColor)] ${
              centered ? "justify-center" : ""
            }`}
          >
            {/* one long word (an album title) breaks instead of pushing the page sideways */}
            <span
              className={
                hideTitle ? "sr-only" : "min-w-0 [overflow-wrap:anywhere]"
              }
            >
              {title}
            </span>
            {action &&
              (action.href ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={action.label}
                  className="inline-flex p-3 -m-3 hover:scale-110 transition-transform"
                >
                  <Icon
                    name={action.icon}
                    label={action.label}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  />
                </a>
              ) : (
                <span
                  title={action.label}
                  aria-disabled="true"
                  className="inline-flex p-3 -m-3 cursor-not-allowed"
                >
                  <Icon
                    name={action.icon}
                    label={action.label}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  />
                </span>
              ))}
          </h1>
          {subtitle && (
            <p className="mt-2 text-2xl sm:text-4xl uppercase">{subtitle}</p>
          )}

          <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12 text-lg sm:text-3xl leading-relaxed">
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
      <h2 className="text-xl sm:text-3xl font-bold uppercase mb-3 sm:mb-4 text-[color:var(--accent,currentColor)]">
        {label}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

// key / value rows. `centered`: each row "KEY value" centered on its own.
export function Specs({ rows, centered = false }) {
  return (
    <dl
      className={`text-base sm:text-2xl uppercase ${
        centered
          ? "flex flex-col items-center gap-y-1"
          : "grid grid-cols-[9rem_minmax(0,1fr)] sm:grid-cols-[12rem_minmax(0,1fr)] gap-y-1"
      }`}
    >
      {rows.map(([k, v]) => (
        <div key={k} className={centered ? "flex gap-3" : "contents"}>
          <dt className="font-bold text-[color:var(--accent,currentColor)]">{k}</dt>
          <dd className="[overflow-wrap:anywhere]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
