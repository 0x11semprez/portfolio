import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Full-screen showcase, one screen after the other, plain scroll:
//   1. the intro alone, big bold text on white, like the menu;
//   2. one screen per project: the logo in a box of fixed height (so every
//      logo, whatever its shape, leaves the text at the same place), the
//      tagline centered under it. Every screen is exactly one viewport and
//      the page snaps to them. The whole screen is the link to the project.

export default function ProjectShowcase({ projects, intro }) {
  const root = useRef(null);
  const [bleed, setBleed] = useState(null);

  // Full-bleed without `100vw`: main is centered with a max width, so measure
  // how far its left edge is from the viewport and pull the block back by that
  // much. clientWidth excludes the scrollbar, which 100vw would not. Layout
  // effect so the first paint is already full width.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const measure = () => {
      const left = el.parentElement.getBoundingClientRect().left;
      setBleed({
        marginLeft: -left,
        width: document.documentElement.clientWidth,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // snap the document to the screens while this page is up
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollSnapType;
    html.style.scrollSnapType = "y mandatory";
    return () => {
      html.style.scrollSnapType = prev;
    };
  }, []);

  return (
    <div ref={root} className="-mt-24" style={bleed}>
      {/* 1. the intro alone */}
      <section className="flex h-screen supports-[height:100dvh]:h-[100dvh] snap-start items-center justify-center bg-white px-5 sm:px-10">
        <p className="max-w-4xl text-center text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          {intro}
        </p>
      </section>

      {/* 2. one screen per project: the logo fills the screen on its own
          background (same colour as the logo file, so it has no edge) */}
      {projects.map((p) => (
        <Link
          key={p.slug}
          to={`/projects/${p.slug}`}
          className="flex h-screen supports-[height:100dvh]:h-[100dvh] snap-start flex-col items-center justify-center px-5 sm:px-10 pb-[env(safe-area-inset-bottom)]"
          style={{ backgroundColor: p.bg, color: p.ink || "#000" }}
        >
          <div className="flex h-[26vh] sm:h-[40vh] w-full max-w-5xl items-end justify-center">
            <img
              src={p.image}
              alt=""
              aria-hidden
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="mt-8 sm:mt-12 min-h-[18vh] text-center">
            <p className="mx-auto max-w-2xl text-base sm:text-2xl leading-snug">
              {p.tagline}
            </p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base uppercase tracking-wide">
              {p.category}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
