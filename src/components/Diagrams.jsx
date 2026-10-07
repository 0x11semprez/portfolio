import { useTx } from "../i18n";

// The two diagrams of the "03" page, redrawn from their Pinterest originals
// as SVG: black lines on white, labels in the site's font (inherited), in the
// current language. Coordinates are the originals' pixels.

// Centered label, one <tspan> per line.
function Label({ x, y, lines, size = 26 }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
      fontWeight="700"
      fill="currentColor"
      style={{ fontFamily: "inherit" }}
    >
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i ? size * 1.3 : 0}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

const VENN = [
  { x: 540, y: 362, en: "ARTIST", fr: "ARTISTE" },
  { x: 387, y: 466, en: "INTELLECTUAL", fr: "INTELLECTUEL", size: 21 },
  { x: 693, y: 466, en: "SPIRITUAL", fr: "SPIRITUEL", size: 21 },
  { x: 540, y: 583, en: "POLYMATH", fr: "POLYMATHE" },
  { x: 270, y: 700, en: "ENTREPRENEUR", fr: "ENTREPRENEUR", size: 22 },
  { x: 540, y: 736, en: "PHYSICAL", fr: "PHYSIQUE" },
  { x: 805, y: 700, en: "ATHLETE", fr: "ATHLÈTE" },
];

// Artist, entrepreneur and athlete: where they meet, the polymath.
function Venn({ label }) {
  const tx = useTx();
  return (
    <svg viewBox="120 140 840 800" role="img" aria-label={label} className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="4">
        <circle cx="540" cy="422" r="267" />
        <circle cx="405" cy="657" r="267" />
        <circle cx="675" cy="657" r="267" />
      </g>
      {VENN.map((l) => (
        <Label key={l.en} x={l.x} y={l.y} size={l.size} lines={[tx(l)]} />
      ))}
    </svg>
  );
}

// From the inside out, lighter to darker, all touching on the left.
const ZONES = [
  { cx: 389, r: 101, stroke: "#aaa", x: 389, en: ["COMFORT", "ZONE"], fr: ["ZONE DE", "CONFORT"] },
  { cx: 469, r: 181, stroke: "#888", x: 566, en: ["FEAR", "ZONE"], fr: ["ZONE DE", "PEUR"] },
  { cx: 576, r: 288, stroke: "#555", x: 749, en: ["LEARNING", "ZONE"], fr: ["ZONE D'", "APPRENTISSAGE"] },
  { cx: 676, r: 388, stroke: "#000", x: 957, en: ["GROWTH", "ZONE"], fr: ["ZONE DE", "CROISSANCE"] },
];

// Comfort, fear, learning, growth: the arrow goes out.
function Zones({ label }) {
  const tx = useTx();
  return (
    <svg viewBox="260 490 920 820" role="img" aria-label={label} className="w-full h-auto">
      <g fill="none" strokeWidth="3">
        {ZONES.map((z) => (
          <circle key={z.r} cx={z.cx} cy="900" r={z.r} stroke={z.stroke} />
        ))}
      </g>
      <line x1="389" y1="943" x2="1135" y2="943" stroke="currentColor" strokeWidth="3" />
      <path d="M1135 931 L1155 943 L1135 955 Z" fill="currentColor" />
      {ZONES.map((z) => (
        <Label key={z.r} x={z.x} y={872} size={21} lines={tx(z)} />
      ))}
    </svg>
  );
}

export default function Diagrams() {
  const tx = useTx();
  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2">
      <figure>
        <figcaption className="mb-4 font-bold">
          {tx({ en: "1 - What is a polymath?", fr: "1 - Qu'est-ce qu'un polymathe ?" })}
        </figcaption>
        <Venn
          label={tx({
            en: "Venn diagram of artist, entrepreneur and athlete: intellectual, spiritual and physical where two meet, polymath in the middle",
            fr: "Diagramme de Venn artiste, entrepreneur et athlète : intellectuel, spirituel et physique aux croisements, polymathe au centre",
          })}
        />
      </figure>
      <figure>
        <figcaption className="mb-4 font-bold">
          {tx({ en: "2 - How to get out of your comfort zone?", fr: "2 - Comment sortir de sa zone de confort ?" })}
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
