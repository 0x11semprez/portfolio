import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTx } from "../i18n";

// Full-screen showcase as a vertical slider, no page scroll at all:
//   1. the intro alone, big bold text on white, like the menu;
//   2. one slide per project: the logo at one height (narrower screens cap
//      its width instead, the box always hugs the visible logo), the tagline
//      at one fixed gap under it, the pair centered on the slide. The whole
//      slide is the link to the project.
// The slides sit in a fixed, viewport-sized frame and a track slides up and
// down inside it (translateY, CSS transition). One wheel tick, swipe or arrow
// key moves exactly one slide, so a small gesture always lands on a project.
// `onScreen(i)` tells the app which slide is showing (0 = intro), for the
// header colour, and for the robot dog (App), who sits on the intro dreaming
// of the way down: tapping him sends "companion:next", which moves one slide.

const STEP = 700; // ms, the slide transition

export default function ProjectShowcase({ projects, intro, onScreen }) {
  const [i, setI] = useState(0);
  const count = projects.length + 1;
  const tx = useTx(); // `{ en, fr }` strings in the data → the current language

  useEffect(() => {
    onScreen?.(i);
    // colour the browser chrome (status bar, Safari's toolbar) like the slide
    const bg = i === 0 ? "#ffffff" : projects[i - 1].bg;
    const meta = document.querySelector('meta[name="theme-color"]');
    const prev = {
      meta: meta?.getAttribute("content"),
      body: document.body.style.backgroundColor,
    };
    meta?.setAttribute("content", bg);
    document.body.style.backgroundColor = bg;
    return () => {
      meta?.setAttribute("content", prev.meta || "#ffffff");
      document.body.style.backgroundColor = prev.body;
    };
  }, [i, onScreen, projects]);

  useEffect(() => {
    // the lock swallows the rest of a trackpad's inertia: one flick = one slide
    let locked = false;
    const go = (dir) => {
      if (locked) return;
      setI((at) => {
        const to = Math.min(count - 1, Math.max(0, at + dir));
        if (to !== at) {
          locked = true;
          setTimeout(() => (locked = false), STEP + 200);
        }
        return to;
      });
    };
    const onNext = () => go(1);
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
    window.addEventListener("companion:next", onNext);
    return () => {
      window.removeEventListener("companion:next", onNext);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [count]);

  // fixed frame under the header (z-40) and the menu (z-30)
  return (
    <div className="fixed inset-0 z-20 overflow-hidden">
      <div
        className="h-full transition-transform ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
        style={{
          transform: `translateY(-${i * 100}%)`,
          transitionDuration: `${STEP}ms`,
        }}
      >
        {/* 1. the intro alone */}
        <section className="flex h-full items-center justify-center bg-white px-5 sm:px-10">
          <p className="max-w-4xl text-center text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {intro}
          </p>
        </section>

        {/* 2. one slide per project */}
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="flex h-full flex-col items-center justify-center px-5 sm:px-10 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pb-[env(safe-area-inset-bottom)]"
            style={{ backgroundColor: p.bg, color: p.ink || "#000" }}
          >
            <img
              src={p.image}
              alt=""
              aria-hidden
              className="max-h-[24vh] sm:max-h-[36vh] max-w-full h-auto w-auto"
            />
            <div className="mt-8 sm:mt-12 text-center">
              <p className="mx-auto max-w-2xl text-base sm:text-2xl leading-snug">
                {tx(p.tagline)}
              </p>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base uppercase tracking-wide">
                {tx(p.category)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
