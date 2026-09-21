import { useEffect, useRef, useState } from "react";

// A small robot dog with a camera for a head that wanders along the bottom of
// every page: walks to a random spot, stops, scans with the camera, sometimes
// sits and daydreams (a thought bubble), walks on. Drawn in the page's ink
// (currentColor), strokes for the details so it needs no background colour.
//
// `hint`: the projects intro is showing — the dog trots to the middle, sits,
// and dreams of the way down; tapping it goes to the next slide (the
// showcase listens for the "companion:next" event).

const SIZE = { w: 84, h: 56 }; // the drawing's box, in px, on phones
const SPEED = 45; // px per second, a stroll

const rand = (a, b) => a + Math.random() * (b - a);

export default function Companion({ ink = "#000", hint = false }) {
  const [x, setX] = useState(() => rand(0.1, 0.4));
  const [dur, setDur] = useState(0); // ms of the current walk
  const [state, setState] = useState("idle"); // idle | walk | dream
  const [dir, setDir] = useState(1); // 1 faces right, -1 faces left
  const [reduce, setReduce] = useState(false);
  const hintRef = useRef(hint);
  hintRef.current = hint;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // the behaviour loop: one timer, each step schedules the next
  useEffect(() => {
    if (reduce) {
      setState("dream");
      return;
    }
    let timer = 0;
    let at = x;
    const width = () => window.innerWidth - SIZE.w;
    const walkTo = (to, then) => {
      const px = Math.abs(to - at) * width();
      const ms = Math.max(400, (px / SPEED) * 1000);
      setDir(to > at ? 1 : -1);
      setDur(ms);
      setX(to);
      setState("walk");
      at = to;
      timer = setTimeout(then, ms);
    };
    const step = () => {
      if (hintRef.current) {
        // projects intro: go to the middle and dream of the way down
        if (Math.abs(at - 0.5) > 0.02) return walkTo(0.5, step);
        setState("dream");
        timer = setTimeout(step, 2000);
        return;
      }
      const roll = Math.random();
      if (roll < 0.5) {
        setState("idle");
        timer = setTimeout(step, rand(1800, 4200));
      } else if (roll < 0.7) {
        setState("dream");
        timer = setTimeout(step, rand(3500, 6500));
      } else {
        walkTo(rand(0.04, 0.96), step);
      }
    };
    timer = setTimeout(step, 1200);
    return () => clearTimeout(timer);
  }, [reduce, hint]);

  const dreamingDown = hint && state === "dream";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[25] h-16 sm:h-20"
      aria-hidden="true"
    >
      <style>{`
        @keyframes companion-walk { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
        @keyframes companion-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes companion-scan { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(10deg); } }
        @keyframes companion-blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
        @keyframes companion-dots { 0%, 100% { opacity: .25; } 50% { opacity: 1; } }
        @keyframes companion-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      `}</style>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("companion:next"))}
        tabIndex={-1}
        className={`absolute bottom-0 h-14 w-[84px] sm:h-[72px] sm:w-[108px] ${
          hint ? "pointer-events-auto cursor-pointer" : ""
        }`}
        style={{
          left: `calc(${x} * (100% - ${SIZE.w}px))`,
          transition: `left ${dur}ms linear`,
          color: ink,
        }}
      >
        <svg
          viewBox="0 0 120 80"
          className="h-full w-full overflow-visible"
          style={{
            transform: `scaleX(${dir})`,
            animation:
              state === "walk"
                ? "companion-bob .4s ease-in-out infinite"
                : "none",
          }}
        >
          {/* thought bubble: three dots, or the way down on the intro */}
          <g
            style={{
              opacity: state === "dream" ? 1 : 0,
              transition: "opacity .4s",
              transformOrigin: "96px 12px",
              animation:
                state === "dream"
                  ? "companion-float 3s ease-in-out infinite"
                  : "none",
            }}
          >
            <circle cx="84" cy="30" r="2" fill="currentColor" />
            <circle cx="90" cy="23" r="3" fill="currentColor" />
            <ellipse
              cx="102"
              cy="11"
              rx="16"
              ry="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            {dreamingDown ? (
              // a small chevron pointing down, flipped back if the dog faces left
              <path
                d="M96 8 l6 6 l6 -6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: `scaleX(${dir})`,
                  transformOrigin: "102px 11px",
                }}
              />
            ) : (
              [94, 102, 110].map((cx, k) => (
                <circle
                  key={cx}
                  cx={cx}
                  cy="11"
                  r="2.2"
                  fill="currentColor"
                  style={{
                    animation: `companion-dots 1.8s ${k * 0.3}s ease-in-out infinite`,
                  }}
                />
              ))
            )}
          </g>

          {/* legs, two pairs; they swing while walking, fold when sitting */}
          {[
            [30, 0],
            [40, 1],
            [76, 0],
            [86, 1],
          ].map(([lx, phase]) => (
            <rect
              key={lx}
              x={lx}
              y={state === "dream" ? 60 : 56}
              width="8"
              height={state === "dream" ? 12 : 22}
              rx="3"
              fill="currentColor"
              style={{
                transformOrigin: `${lx + 4}px 58px`,
                animation:
                  state === "walk"
                    ? `companion-walk .4s ${phase ? ".2s" : "0s"} ease-in-out infinite`
                    : "none",
                transition: "height .3s, y .3s",
              }}
            />
          ))}

          {/* body, sits lower when dreaming */}
          <g
            style={{
              transform: state === "dream" ? "translateY(6px)" : "none",
              transition: "transform .3s",
            }}
          >
            <rect
              x="22"
              y="34"
              width="72"
              height="28"
              rx="10"
              fill="currentColor"
            />
            {/* tail */}
            <path
              d="M22 44 q-12 -6 -10 -18"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* neck */}
            <rect
              x="80"
              y="26"
              width="10"
              height="14"
              rx="3"
              fill="currentColor"
            />
          </g>

          {/* camera head: a box, the lens, a small antenna; scans when idle */}
          <g
            style={{
              transformOrigin: "88px 30px",
              transform:
                state === "dream" ? "translateY(6px) rotate(6deg)" : "none",
              transition: "transform .3s",
              animation:
                state === "idle"
                  ? "companion-scan 2.6s ease-in-out infinite"
                  : "none",
            }}
          >
            <mask id="companion-lens">
              <rect x="0" y="0" width="120" height="80" fill="#fff" />
              <circle cx="100" cy="21" r="8.5" fill="#000" />
            </mask>
            <rect
              x="72"
              y="8"
              width="44"
              height="26"
              rx="6"
              fill="currentColor"
              mask="url(#companion-lens)"
            />
            <line
              x1="100"
              y1="8"
              x2="106"
              y2="0"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="106" cy="0" r="2.5" fill="currentColor" />
            {/* the lens sits in a hole punched through the head: a ring and
                the pupil, which blinks now and then */}
            <g
              style={{
                transformOrigin: "100px 21px",
                animation: "companion-blink 5s ease-in-out infinite",
              }}
            >
              <circle
                cx="100"
                cy="21"
                r="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <circle cx="100" cy="21" r="2.5" fill="currentColor" />
            </g>
            {/* ear */}
            <rect
              x="76"
              y="2"
              width="8"
              height="10"
              rx="2"
              fill="currentColor"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}
