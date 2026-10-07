import { useTx } from "../i18n";

// The two diagrams of the "03" page, redrawn from their Pinterest originals
// as SVG: black lines on white (no grey), labels in the site's font (inherited), in the
// current language. Coordinates are the originals' pixels.

// Both diagrams share one viewBox size and one label size, so they draw at
// the same scale side by side: POLYMATH is as big as COMFORT ZONE.
const VIEW = "920 820";
const SIZE = 23;

// Centered label, one <tspan> per line.
export function Label({ x, y, lines }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={SIZE}
      fontWeight="700"
      fill="currentColor"
      style={{ fontFamily: "inherit" }}
    >
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i ? SIZE * 1.3 : 0}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

const VENN = [
  { x: 540, y: 362, en: "ARTIST", fr: "ARTISTE" },
  { x: 387, y: 466, en: "INTELLECTUAL", fr: "INTELLECTUEL" },
  { x: 693, y: 466, en: "SPIRITUAL", fr: "SPIRITUEL" },
  { x: 540, y: 583, en: "POLYMATH", fr: "POLYMATHE" },
  { x: 270, y: 700, en: "ENTREPRENEUR", fr: "ENTREPRENEUR" },
  { x: 540, y: 736, en: "PHYSICAL", fr: "PHYSIQUE" },
  { x: 805, y: 700, en: "ATHLETE", fr: "ATHLÈTE" },
];

// Artist, entrepreneur and athlete: where they meet, the polymath.
function Venn({ label }) {
  const tx = useTx();
  return (
    <svg viewBox={`80 130 ${VIEW}`} role="img" aria-label={label} className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="540" cy="422" r="267" />
        <circle cx="405" cy="657" r="267" />
        <circle cx="675" cy="657" r="267" />
      </g>
      {VENN.map((l) => (
        <Label key={l.en} x={l.x} y={l.y} lines={[tx(l)]} />
      ))}
    </svg>
  );
}

// From the inside out, all touching on the left. All black: no grey on the site.
const ZONES = [
  { cx: 389, r: 101, x: 389, en: ["COMFORT", "ZONE"], fr: ["ZONE DE", "CONFORT"] },
  { cx: 469, r: 181, x: 566, en: ["FEAR", "ZONE"], fr: ["ZONE DE", "PEUR"] },
  { cx: 576, r: 288, x: 749, en: ["LEARNING", "ZONE"], fr: ["ZONE D'", "APPRENTISSAGE"] },
  { cx: 676, r: 388, x: 957, en: ["GROWTH", "ZONE"], fr: ["ZONE DE", "CROISSANCE"] },
];

// Comfort, fear, learning, growth: the arrow goes out.
function Zones({ label }) {
  const tx = useTx();
  return (
    <svg viewBox={`260 490 ${VIEW}`} role="img" aria-label={label} className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="3">
        {ZONES.map((z) => (
          <circle key={z.r} cx={z.cx} cy="900" r={z.r} />
        ))}
      </g>
      <line x1="389" y1="943" x2="1135" y2="943" stroke="currentColor" strokeWidth="3" />
      <path d="M1135 931 L1155 943 L1135 955 Z" fill="currentColor" />
      {ZONES.map((z) => (
        <Label key={z.r} x={z.x} y={872} lines={tx(z)} />
      ))}
    </svg>
  );
}

// Twelve dots on a ring and one in the middle. Knowing: the dots alone.
// Understanding: each dot joined to the fifth one after it (a 12-point star)
// and to the one opposite, through the middle.
const DOTS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  return [Math.round(Math.sin(a) * 92), Math.round(-Math.cos(a) * 92)];
});

function Dots({ cx, linked }) {
  return (
    <g transform={`translate(${cx} 330)`} fill="currentColor">
      {linked && (
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          {DOTS.map(([x, y], i) => {
            const [x2, y2] = DOTS[(i + 5) % 12];
            return <line key={i} x1={x} y1={y} x2={x2} y2={y2} />;
          })}
          {DOTS.slice(0, 6).map(([x, y], i) => (
            <line key={`d${i}`} x1={x} y1={y} x2={-x} y2={-y} />
          ))}
        </g>
      )}
      {[...DOTS, [0, 0]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" />
      ))}
    </g>
  );
}

// Knowing vs understanding: the same dots, connected or not.
export function Knowing() {
  const tx = useTx();
  return (
    <svg
      viewBox="110 231 520 251"
      role="img"
      aria-label={tx({
        en: "Knowing: twelve separate dots. Understanding: the same dots, all connected",
        fr: "Savoir : douze points séparés. Comprendre : les mêmes points, tous reliés",
      })}
      className="mx-auto w-full max-w-2xl h-auto"
    >
      <Dots cx={234} />
      <Dots cx={502} linked />
      <Label x={234} y={480} lines={[tx({ en: "KNOWING", fr: "SAVOIR" })]} />
      <Label x={502} y={480} lines={[tx({ en: "UNDERSTANDING", fr: "COMPRENDRE" })]} />
    </svg>
  );
}

export default function Diagrams() {
  const tx = useTx();
  return (
    // wider than the text column from lg up (centered on the page), so each
    // question fits on one line over its diagram; on phones they stack, the
    // question sized to the screen width
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
