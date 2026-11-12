import { useRef, useState, useEffect } from "react";
import { useTx } from "../i18n";

const VIEW = "920 808";
const SIZE = 23;
const TAU = 2 * Math.PI;

// Fires once when the element scrolls into view.
export function useInView(ref) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: mobile ? 0.05 : 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return on;
}

// Centered label. When `delay` is passed, fades in with `show`.
export function Label({ x, y, lines, delay, show }) {
  const anim = delay != null;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={SIZE}
      fontWeight="700"
      fill="currentColor"
      style={{
        fontFamily: "inherit",
        ...(anim && {
          opacity: show ? 1 : 0,
          transition: `opacity 0.4s ease ${delay}s`,
        }),
      }}
    >
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i ? SIZE * 1.3 : 0}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

// ---- Venn (polymath) ----

const VENN_R = 267;
const VENN_C = TAU * VENN_R;
const VENN_CIRCLES = [
  [540, 422],
  [405, 657],
  [675, 657],
];
const VENN = [
  { x: 540, y: 362, en: "ARTIST", fr: "ARTISTE" },
  { x: 387, y: 466, en: "INTELLECTUAL", fr: "INTELLECTUEL" },
  { x: 693, y: 466, en: "SPIRITUAL", fr: "SPIRITUEL" },
  { x: 540, y: 583, en: "POLYMATH", fr: "POLYMATHE" },
  { x: 270, y: 700, en: "ENTREPRENEUR", fr: "ENTREPRENEUR" },
  { x: 540, y: 736, en: "PHYSICAL", fr: "PHYSIQUE" },
  { x: 805, y: 700, en: "ATHLETE", fr: "ATHLÈTE" },
];

function Venn({ label }) {
  const tx = useTx();
  const ref = useRef(null);
  const on = useInView(ref);
  return (
    <svg ref={ref} viewBox={`80 130 ${VIEW}`} role="img" aria-label={label} className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="3">
        {VENN_CIRCLES.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={VENN_R}
            style={{
              strokeDasharray: VENN_C,
              strokeDashoffset: on ? 0 : VENN_C,
              transition: `stroke-dashoffset 0.8s ease ${i * 0.15}s`,
            }}
          />
        ))}
      </g>
      {VENN.map((l, i) => (
        <Label key={l.en} x={l.x} y={l.y} lines={[tx(l)]} delay={0.7 + i * 0.06} show={on} />
      ))}
    </svg>
  );
}

// ---- Comfort zones ----

const ZONES = [
  { cx: 389, r: 101, x: 389, en: ["COMFORT", "ZONE"], fr: ["ZONE DE", "CONFORT"] },
  { cx: 469, r: 181, x: 566, en: ["FEAR", "ZONE"], fr: ["ZONE DE", "PEUR"] },
  { cx: 576, r: 288, x: 749, en: ["LEARNING", "ZONE"], fr: ["ZONE D'", "APPRENTISSAGE"] },
  { cx: 676, r: 388, x: 957, en: ["GROWTH", "ZONE"], fr: ["ZONE DE", "CROISSANCE"] },
];

function Zones({ label }) {
  const tx = useTx();
  const ref = useRef(null);
  const on = useInView(ref);
  return (
    <svg ref={ref} viewBox={`260 490 ${VIEW}`} role="img" aria-label={label} className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="3">
        {ZONES.map((z, i) => {
          const c = TAU * z.r;
          return (
            <circle
              key={z.r}
              cx={z.cx}
              cy={900}
              r={z.r}
              style={{
                strokeDasharray: c,
                strokeDashoffset: on ? 0 : c,
                transition: `stroke-dashoffset 0.7s ease ${i * 0.15}s`,
              }}
            />
          );
        })}
      </g>
      <line
        x1="389" y1="943" x2="1135" y2="943"
        stroke="currentColor" strokeWidth="3"
        style={{
          strokeDasharray: 746,
          strokeDashoffset: on ? 0 : 746,
          transition: "stroke-dashoffset 0.5s ease 0.7s",
        }}
      />
      <path
        d="M1135 931 L1155 943 L1135 955 Z"
        fill="currentColor"
        style={{ opacity: on ? 1 : 0, transition: "opacity 0.3s ease 1.1s" }}
      />
      {ZONES.map((z, i) => (
        <Label key={z.r} x={z.x} y={872} lines={tx(z)} delay={0.8 + i * 0.1} show={on} />
      ))}
    </svg>
  );
}

// ---- Knowing vs understanding ----

const DOTS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  return [Math.round(Math.sin(a) * 92), Math.round(-Math.cos(a) * 92)];
});

function AnimDots({ cx, linked, on, base = 0 }) {
  return (
    <g transform={`translate(${cx} 330)`}>
      {linked && (
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          {DOTS.map(([x, y], i) => {
            const [x2, y2] = DOTS[(i + 5) % 12];
            const len = Math.hypot(x2 - x, y2 - y);
            return (
              <line
                key={i}
                x1={x} y1={y} x2={x2} y2={y2}
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: on ? 0 : len,
                  transition: `stroke-dashoffset 0.5s ease ${base + 0.3 + i * 0.03}s`,
                }}
              />
            );
          })}
          {DOTS.slice(0, 6).map(([x, y], i) => {
            const len = Math.hypot(2 * x, 2 * y);
            return (
              <line
                key={`d${i}`}
                x1={x} y1={y} x2={-x} y2={-y}
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: on ? 0 : len,
                  transition: `stroke-dashoffset 0.5s ease ${base + 0.3 + (12 + i) * 0.03}s`,
                }}
              />
            );
          })}
        </g>
      )}
      <g fill="currentColor">
        {[...DOTS, [0, 0]].map(([x, y], i) => (
          <circle
            key={i}
            cx={x} cy={y} r="4.5"
            style={{
              opacity: on ? 1 : 0,
              transition: `opacity 0.25s ease ${base + i * 0.02}s`,
            }}
          />
        ))}
      </g>
    </g>
  );
}

export function Knowing() {
  const tx = useTx();
  const ref = useRef(null);
  const on = useInView(ref);
  return (
    <svg
      ref={ref}
      viewBox="110 231 520 251"
      role="img"
      aria-label={tx({
        en: "Knowing: twelve separate dots. Understanding: the same dots, all connected",
        fr: "Savoir : douze points séparés. Comprendre : les mêmes points, tous reliés",
      })}
      className="mx-auto w-full max-w-2xl h-auto"
    >
      <AnimDots cx={234} on={on} base={0} />
      <AnimDots cx={502} linked on={on} base={0.4} />
      <Label x={234} y={480} lines={[tx({ en: "KNOWING", fr: "SAVOIR" })]} delay={0.3} show={on} />
      <Label x={502} y={480} lines={[tx({ en: "UNDERSTANDING", fr: "COMPRENDRE" })]} delay={1.2} show={on} />
    </svg>
  );
}

export default function Diagrams() {
  const tx = useTx();
  return (
    <div className="mt-8 grid gap-10 sm:gap-8 sm:grid-cols-2 lg:relative lg:left-1/2 lg:w-[min(72rem,calc(100vw-2.5rem))] lg:-translate-x-1/2">
      <figure>
        <figcaption className="mb-4 font-bold text-center whitespace-nowrap text-[min(1.45rem,4.2vw)] sm:text-[min(1.45rem,2vw)]">
          {tx({ en: "What is a polymath?", fr: "Qu'est-ce qu'un polymathe ?" })}
        </figcaption>
        <Venn
          label={tx({
            en: "Venn diagram of artist, entrepreneur and athlete: intellectual, spiritual and physical where two meet, polymath in the middle",
            fr: "Diagramme de Venn artiste, entrepreneur et athlète : intellectuel, spirituel et physique aux croisements, polymathe au centre",
          })}
        />
      </figure>
      <figure>
        <figcaption className="mb-4 font-bold text-center whitespace-nowrap text-[min(1.45rem,4.2vw)] sm:text-[min(1.45rem,2vw)]">
          {tx({ en: "How to get out of your comfort zone?", fr: "Comment sortir de sa zone de confort ?" })}
        </figcaption>
        <Zones
          label={tx({
            en: "Nested circles from the comfort zone to the fear zone, the learning zone and the growth zone",
            fr: "Cercles imbriqués de la zone de confort à la zone de peur, la zone d'apprentissage et la zone de croissance",
          })}
        />
      </figure>
    </div>
  );
}
