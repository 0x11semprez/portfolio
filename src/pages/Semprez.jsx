import { useLayoutEffect, useRef } from "react";
import { PROFILE } from "../data/profile";

// Font-size bounds for the bio, in rem. MAX = text-xl (desktop). MIN = text-sm,
// the smallest size used anywhere else on phones; below it we let lines wrap
// rather than shrink further.
const MAX = 1.25;
const MIN = 0.875;

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
        )
      )}
    </span>
  ));
}

// Picks the largest font size (≤ MAX) at which the widest line still fits the
// container on a single line. Re-runs on resize and once the font has loaded.
function useFitLines(ref) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = Array.from(el.children);

    const fit = () => {
      lines.forEach((l) => (l.style.whiteSpace = "nowrap"));
      el.style.fontSize = "100px";
      const widest = Math.max(...lines.map((l) => l.scrollWidth));
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      let size = Math.min(MAX * rem, (el.clientWidth / widest) * 100);
      const wrap = size < MIN * rem;
      if (wrap) size = MIN * rem;
      el.style.fontSize = `${size}px`;
      lines.forEach((l) => (l.style.whiteSpace = wrap ? "normal" : "nowrap"));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [ref]);
}

// First-visit choice between the video ("interactive") and a plain page,
// with the flashing-images warning and the credit. English + French.
function VideoPrompt({ credit, onChoose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-prompt-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white px-5"
    >
      <div className="w-full max-w-md text-base sm:text-lg leading-relaxed">
        <h2 id="video-prompt-title" className="text-lg sm:text-xl font-bold uppercase tracking-wide">
          interactive mode?
        </h2>

        <p className="mt-6">
          Interactive mode plays a video in the background of this page.
          <br />
          <strong>Warning: it contains flashing images.</strong> Sound is off.
        </p>
        <p className="mt-4 text-neutral-500">
          Le mode interactif lit une vidéo en fond de page.
          <br />
          <strong>Attention : elle contient des flashs lumineux.</strong> Le son est coupé.
        </p>

        <div className="mt-8 flex gap-8 uppercase tracking-wide font-bold">
          <button onClick={() => onChoose(true)} className="hover:text-neutral-400 transition-colors">
            interactive
          </button>
          <button onClick={() => onChoose(false)} className="text-neutral-400 hover:text-black transition-colors">
            static
          </button>
        </div>

        {credit && (
          <p className="mt-10 text-sm sm:text-base text-neutral-400">
            Video by{" "}
            <a href={credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black">
              {credit.name}
            </a>{" "}
            — thank you for this edit. / Vidéo de {credit.name} — merci pour ce montage.
          </p>
        )}
      </div>
    </div>
  );
}

// `videoMode`: null = not chosen yet (show the dialog), true / false = chosen.
// `dark`: the background video (rendered by App) is showing, text goes white.
export default function Semprez({ videoMode = false, onVideoMode = () => {}, dark = false }) {
  const bioRef = useRef(null);
  useFitLines(bioRef);

  const video = PROFILE.video?.src ? PROFILE.video : null;
  const on = dark;

  return (
    <>
      {video && videoMode === null && (
        <VideoPrompt credit={video.credit} onChoose={onVideoMode} />
      )}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-3 pb-24">
        <p
          ref={bioRef}
          className={`w-full leading-loose text-center transition-colors ${on ? "text-white" : ""}`}
        >
          {renderBio(PROFILE.bio)}
        </p>
      </div>
    </>
  );
}
