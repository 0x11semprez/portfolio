import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Scroll-driven showcase: the screen stays pinned under the header while the
// page scrolls one viewport per project, and each project cross-fades into the
// next (the Duolingo landing page effect). The whole screen is a link to the
// project.
//
// Layout: a track `N × 100svh` tall, with the pinned screen as a sticky child
// and an overlay of N equal invisible sentinels; an IntersectionObserver marks
// the project whose sentinel covers most of the viewport as active.

// Fades the sharp image's four edges into the blurred copy behind it, so an
// image whose ratio doesn't match the screen has no hard border.
const EDGE = "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent), linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)";
const EDGE_MASK = {
  WebkitMaskImage: EDGE,
  WebkitMaskComposite: "source-in",
  maskImage: EDGE,
  maskComposite: "intersect",
};

export default function ProjectShowcase({ projects }) {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const [bleed, setBleed] = useState(null);

  // Full-bleed without `100vw`: main is centered with a max width, so measure
  // how far its left edge is from the viewport and pull the track back by that
  // much. clientWidth excludes the scrollbar, which 100vw would not. Layout
  // effect so the first paint is already full width.
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const left = el.parentElement.getBoundingClientRect().left;
      setBleed({ marginLeft: -left, width: document.documentElement.clientWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const sentinels = Array.from(el.querySelectorAll("[data-index]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        }
      },
      { threshold: 0.5 }
    );
    sentinels.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [projects.length]);

  return (
    <div
      ref={track}
      className="relative"
      style={{ height: `calc(${projects.length} * 100svh)`, ...bleed }}
    >
      {/* pinned screen: below the 4rem header, fills the rest of the viewport */}
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-black">
        {projects.map((p, i) => {
          const on = i === active;
          return (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              aria-hidden={!on}
              tabIndex={on ? 0 : -1}
              className={`group absolute inset-0 flex flex-col justify-end transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                on ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {p.image ? (
                <>
                  {/* blurred copy fills the screen whatever the image's ratio,
                      the sharp one sits on top uncropped */}
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover scale-110 blur-3xl brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* sized to the image itself (not the screen) so the
                        mask fades its real edges */}
                    <img
                      src={p.image}
                      alt=""
                      style={EDGE_MASK}
                      className="max-h-full max-w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                    />
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-neutral-900" />
              )}
              {/* fade so the white text reads on any screenshot */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative px-5 sm:px-10 pb-10 sm:pb-16 text-white">
                <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-wide">
                  {p.name}
                </h2>
                <p className="mt-2 max-w-2xl text-base sm:text-lg leading-snug text-white/80">
                  {p.tagline}
                </p>
                <p className="mt-3 text-sm sm:text-base uppercase tracking-wide text-white/60">
                  {p.category}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* one viewport of scroll per project, laid over the whole track */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {projects.map((p, i) => (
          <div key={p.slug} data-index={i} className="flex-1" />
        ))}
      </div>
    </div>
  );
}
