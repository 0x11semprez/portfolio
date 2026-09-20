import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

// Scroll-driven showcase, in three moves:
//   1. the intro, white text alone on black, one screen;
//   2. as you scroll the project's logo grows until it fills the screen;
//   3. keep scrolling and you dive through the logo into the project's own
//      universe: a screen in the logo's colour, with the name and the tagline.
//      That screen is the link to the project.
// Every project gets moves 2 and 3, one after the other.
//
// Layout: a track `N × PHASES` viewports tall with the screen sticky inside
// it. A scroll listener turns the track's position into one progress value
// per project, in [0, 1], which drives the transforms below.

const PHASES = 3; // viewports of scroll per project

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);
// where `t` sits between `a` and `b`, in [0, 1]
const span = (t, a, b) => clamp((t - a) / (b - a), 0, 1);

export default function ProjectShowcase({ projects, intro }) {
  const track = useRef(null);
  const [y, setY] = useState(0); // how far the track has scrolled past the top
  const [unit, setUnit] = useState(0); // one viewport, in px
  const [bleed, setBleed] = useState(null);
  const [reduce, setReduce] = useState(false);

  // Full-bleed without `100vw`: main is centered with a max width, so measure
  // how far its left edge is from the viewport and pull the block back by that
  // much. clientWidth excludes the scrollbar, which 100vw would not. Layout
  // effect so the first paint is already full width.
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const left = el.parentElement.getBoundingClientRect().left;
      setBleed({ marginLeft: -left, width: document.documentElement.clientWidth });
      setUnit(el.firstElementChild.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      if (track.current) setY(-track.current.getBoundingClientRect().top);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // The intro and the page behind it take the first logo's own black, so the
  // intro, the screen and the logo are one continuous dark, overscroll
  // included.
  const black = projects[0]?.bg || "#000";
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = black;
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, [black]);

  return (
    <div className="-mt-24 text-white" style={{ backgroundColor: black, ...bleed }}>
      {/* 1. the intro alone */}
      <section className="flex h-[100svh] items-center justify-center px-5 sm:px-10">
        <p className="max-w-2xl text-center text-xl sm:text-3xl leading-relaxed">
          {intro}
        </p>
      </section>

      {/* 2 + 3, one project after the other */}
      <div
        ref={track}
        className="relative"
        style={{ height: `calc(${projects.length * PHASES + 1} * 100svh)` }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {projects.map((p, i) => {
            const t = unit ? clamp((y / unit - i * PHASES) / PHASES, 0, 1) : 0;
            // 0 → .5  the logo grows to the screen
            // .5 → .8 it keeps growing, the universe comes up through it
            const grow = ease(span(t, 0, 0.5));
            const dive = span(t, 0.5, 0.8);
            const scale = reduce ? 1 + dive : 0.35 + 0.65 * grow + 1.5 * dive;
            // the next project's logo fades in over this one's universe
            const on = i === 0 ? 1 : span(t, 0, 0.1);
            const ink = p.ink || "#000";
            return (
              <div
                key={p.slug}
                className="absolute inset-0"
                style={{ zIndex: i, opacity: on, backgroundColor: p.bg }}
              >
                <img
                  src={p.image}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-contain will-change-transform"
                  style={{ transform: `scale(${scale})` }}
                />
                <Link
                  to={`/projects/${p.slug}`}
                  aria-hidden={dive < 0.5}
                  tabIndex={dive < 0.5 ? -1 : 0}
                  className={`absolute inset-0 flex flex-col justify-end px-5 sm:px-10 pb-10 sm:pb-16 ${
                    dive < 0.5 ? "pointer-events-none" : ""
                  }`}
                  style={{ opacity: dive, backgroundColor: p.color, color: ink }}
                >
                  <div
                    className="motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
                    style={{ transform: `translateY(${(1 - dive) * 2}rem)` }}
                  >
                    <h2 className="flex items-center gap-4 text-5xl sm:text-8xl font-bold uppercase tracking-wide">
                      {p.name}
                      <Icon name="link" label="open" className="h-8 w-8 sm:h-12 sm:w-12" />
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg sm:text-2xl leading-snug">
                      {p.tagline}
                    </p>
                    <p className="mt-4 text-sm sm:text-base uppercase tracking-wide opacity-60">
                      {p.category}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
