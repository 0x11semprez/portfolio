import { useLayoutEffect, useRef } from "react";
import { PROFILE } from "../data/profile";
import { useLang, useTx } from "../i18n";

// Font-size bounds for the bio, in rem. MAX = text-6xl, the projects intro's
// desktop size. Every sentence stays on one line on every screen: the size
// follows the widest line down to MIN (text-xs), and only below that (very
// narrow phones) do lines wrap.
const MAX = 3.75;
const MIN = 0.75;

// Renders **bold** and line breaks from the bio string. One block per line.
function renderBio(text) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
        part.startsWith("**") ? (
          <strong key={j} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </span>
  ));
}

// Picks the largest font size (≤ MAX) at which the widest line still fits the
// container on a single line and all the lines fit its height. Re-runs on
// resize, once the font has loaded, and when the text changes (`key`: the
// language).
function useFitLines(ref, key) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = Array.from(el.children);

    const fit = () => {
      lines.forEach((l) => (l.style.whiteSpace = "nowrap"));
      el.style.fontSize = "100px";
      const widest = Math.max(...lines.map((l) => l.scrollWidth));
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      // fit the width, and the height too (phone in landscape): the lines'
      // stack must fit between the container's top and the bottom of the
      // screen, above its bottom padding (the box is min-h, so measure the
      // screen, not the box)
      const box = el.parentElement;
      const free =
        window.innerHeight -
        box.getBoundingClientRect().top -
        parseFloat(getComputedStyle(box).paddingBottom);
      const lineHeight =
        parseFloat(getComputedStyle(el).lineHeight) /
        parseFloat(el.style.fontSize);
      let size = Math.min(
        MAX * rem,
        (el.clientWidth / widest) * 100,
        free / (lines.length * lineHeight),
      );
      // glyph advances don't scale exactly linearly at small sizes (hinting),
      // so check the real width at the chosen size and correct, a few times
      for (let k = 0; k < 3 && size >= MIN * rem; k++) {
        el.style.fontSize = `${size}px`;
        const real = Math.max(...lines.map((l) => l.scrollWidth));
        if (real <= el.clientWidth) break;
        size *= el.clientWidth / real;
      }
      const wrap = size < MIN * rem;
      if (wrap) size = MIN * rem;
      el.style.fontSize = `${size}px`;
      lines.forEach((l) => (l.style.whiteSpace = wrap ? "normal" : "nowrap"));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    // the font swaps in after the first fit (a new face = new widths, same
    // height, so the observer doesn't see it): refit on every font load
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener("loadingdone", fit);
    return () => {
      ro.disconnect();
      document.fonts?.removeEventListener("loadingdone", fit);
    };
  }, [ref, key]);
}

// Copy for the first-visit dialog, per language.
const PROMPT = {
  en: {
    title: "interactive mode?",
    body: "Interactive mode plays a video in the background of this page.",
    warning: "Warning: it contains flashing images.",
    sound: "Sound is off.",
    yes: "interactive",
    no: "static",
    credit: (name) => <>Video by {name}, thank you for this edit.</>,
  },
  fr: {
    title: "mode interactif ?",
    body: "Le mode interactif lit une vidéo en fond de page.",
    warning: "Attention : elle contient des flashs lumineux.",
    sound: "Le son est coupé.",
    yes: "interactif",
    no: "statique",
    credit: (name) => <>Vidéo de {name}, merci pour ce montage.</>,
  },
};

// First-visit choice between the video ("interactive") and a plain page,
// with the flashing-images warning and the credit. The visitor picks the
// language (EN / FR) at the top: it is the site's language (same as the
// header switch), starting on the browser's.
function VideoPrompt({ credit, onChoose }) {
  const [lang, setLang] = useLang();
  const t = PROMPT[lang];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-prompt-title"
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-white px-5 py-8"
    >
      {/* my-auto: centered when it fits, scrollable when the screen is too
          short (phone in landscape with the browser bars out) */}
      <div className="my-auto w-full max-w-md text-center text-base sm:text-lg leading-relaxed">
        <div className="flex justify-center gap-2 text-sm sm:text-base uppercase tracking-wide">
          {Object.keys(PROMPT).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={l === lang}
              className={`px-4 py-3 -my-3 transition-colors ${
                l === lang ? "text-black" : "text-neutral-400 hover:text-black"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <h2
          id="video-prompt-title"
          className="mt-8 text-lg sm:text-xl font-bold uppercase tracking-wide"
        >
          {t.title}
        </h2>

        <p className="mt-6">
          {t.body}
          <br />
          <strong>{t.warning}</strong> {t.sound}
        </p>

        <div className="mt-6 flex justify-center gap-2 uppercase tracking-wide font-bold">
          <button
            onClick={() => onChoose(true)}
            className="px-3 py-2 hover:text-neutral-400 transition-colors"
          >
            {t.yes}
          </button>
          <button
            onClick={() => onChoose(false)}
            className="px-3 py-2 text-neutral-400 hover:text-black transition-colors"
          >
            {t.no}
          </button>
        </div>

        {credit && (
          <p className="mt-8 text-sm sm:text-base text-neutral-400">
            {t.credit(
              <a
                href={credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-2 -mx-2 py-2.5 -my-2.5 underline underline-offset-4 hover:text-black"
              >
                {credit.name}
              </a>,
            )}
          </p>
        )}
      </div>
    </div>
  );
}

// `videoMode`: null = not chosen yet (show the dialog), true / false = chosen.
// `dark`: the background video (rendered by App) is showing, text goes white.
export default function Semprez({
  videoMode = false,
  onVideoMode = () => {},
  dark = false,
}) {
  const [lang] = useLang();
  const tx = useTx();
  const bioRef = useRef(null);
  useFitLines(bioRef, lang);

  const video = PROFILE.video?.src ? PROFILE.video : null;
  const on = dark;

  return (
    <>
      {video && videoMode === null && (
        <VideoPrompt credit={video.credit} onChoose={onVideoMode} />
      )}
      {/* 6rem + notch = main's top padding, so the page is exactly one screen tall (no
          scrollbar on a one-line page). dvh ignores the phone browser bars. */}
      <div className="min-h-[calc(100vh-6rem-env(safe-area-inset-top))] supports-[height:100dvh]:min-h-[calc(100dvh-6rem-env(safe-area-inset-top))] flex items-center justify-center px-4 pb-24">
        <p
          ref={bioRef}
          className={`w-full font-bold leading-snug tracking-tight text-center transition-colors ${on ? "text-white" : ""}`}
        >
          {renderBio(tx(PROFILE.bio))}
        </p>
      </div>
    </>
  );
}
