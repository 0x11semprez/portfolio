import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Full-screen showcase, one screen after the other, plain scroll:
//   1. the intro alone, big bold text on white, like the menu;
//   2. one screen per project: the logo in a box of fixed height (so every
//      logo, whatever its shape, leaves the text at the same place), the
//      tagline centered under it. Every screen is exactly one viewport and
//      scrolling is paged: one wheel tick, swipe or arrow key moves one
//      screen, so a small gesture always lands on a project. The whole screen is the link to the project.

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

  // paged scrolling: any gesture moves exactly one screen. The lock swallows
  // the rest of a trackpad's inertia so one flick is one screen, not three.
  const screens = projects.length + 1;
  useEffect(() => {
    let locked = false;
    const go = (dir) => {
      if (locked) return;
      const h = window.innerHeight;
      const at = Math.round(window.scrollY / h);
      const to = Math.min(screens - 1, Math.max(0, at + dir));
      if (to === at) return;
      locked = true;
      window.scrollTo({ top: to * h, behavior: "smooth" });
      setTimeout(() => (locked = false), 900);
    };
    const onWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      go(e.deltaY > 0 ? 1 : -1);
    };
    let y0 = null;
    const onTouchStart = (e) => (y0 = e.touches[0].clientY);
    const onTouchMove = (e) => e.preventDefault();
    const onTouchEnd = (e) => {
      if (y0 === null) return;
      const dy = y0 - e.changedTouches[0].clientY;
      y0 = null;
      if (Math.abs(dy) > 30) go(dy > 0 ? 1 : -1);
    };
    const onKey = (e) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [screens]);

  return (
    <div ref={root} className="-mt-24" style={bleed}>
      {/* 1. the intro alone */}
      <section className="flex h-screen supports-[height:100dvh]:h-[100dvh] items-center justify-center bg-white px-5 sm:px-10">
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
          className="flex h-screen supports-[height:100dvh]:h-[100dvh] flex-col items-center justify-center px-5 sm:px-10 pb-[env(safe-area-inset-bottom)]"
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
