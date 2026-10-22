import { useRef } from "react";
import { Label, useInView } from "./Diagrams";
import { useTx } from "../i18n";

const TAU = 2 * Math.PI;

function Arrow({ x1, y1, x2, y2, on, delay = 0 }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="currentColor" strokeWidth="3"
        style={{
          strokeDasharray: len,
          strokeDashoffset: on ? 0 : len,
          transition: `stroke-dashoffset 0.5s ease ${delay}s`,
        }}
      />
      <path
        d="M-20 -12 L0 0 L-20 12 Z"
        transform={`translate(${x2} ${y2}) rotate(${a})`}
        fill="currentColor"
        style={{
          opacity: on ? 1 : 0,
          transition: `opacity 0.3s ease ${delay + 0.3}s`,
        }}
      />
    </g>
  );
}

function Link({ from: [x1, y1, r1], to: [x2, y2, r2], on, delay = 0 }) {
  const d = Math.hypot(x2 - x1, y2 - y1);
  const [ux, uy] = [(x2 - x1) / d, (y2 - y1) / d];
  const g1 = r1 + 8;
  const g2 = r2 + 8;
  return <Arrow x1={x1 + ux * g1} y1={y1 + uy * g1} x2={x2 - ux * g2} y2={y2 - uy * g2} on={on} delay={delay} />;
}

function Circle({ c: [cx, cy, r], on, delay = 0 }) {
  const circ = TAU * r;
  return (
    <circle
      cx={cx} cy={cy} r={r}
      fill="none" stroke="currentColor" strokeWidth="3"
      style={{
        strokeDasharray: circ,
        strokeDashoffset: on ? 0 : circ,
        transition: `stroke-dashoffset 0.7s ease ${delay}s`,
      }}
    />
  );
}

// Röze
const CLI = [350, 85, 70];
const SAMPLES = [100, 320, 95];
const ENGINE = [350, 320, 95];
const PLUGIN = [600, 320, 95];

function Roze({ on }) {
  return (
    <>
      {[CLI, SAMPLES, ENGINE, PLUGIN].map((c, i) => (
        <Circle key={c[0] + c[1]} c={c} on={on} delay={i * 0.15} />
      ))}
      <Link from={SAMPLES} to={ENGINE} on={on} delay={0.5} />
      <Link from={ENGINE} to={PLUGIN} on={on} delay={0.6} />
      <Link from={CLI} to={SAMPLES} on={on} delay={0.7} />
      <Link from={CLI} to={PLUGIN} on={on} delay={0.8} />
      <Arrow x1={600} y1={423} x2={600} y2={470} on={on} delay={0.9} />
      <Label x={350} y={80} lines={["CLI", "GO"]} delay={0.3} show={on} />
      <Label x={100} y={328} lines={["SAMPLES"]} delay={0.45} show={on} />
      <Label x={350} y={315} lines={["ENGINE", "47 FORMATS"]} delay={0.6} show={on} />
      <Label x={600} y={315} lines={["PLUGIN", "VST3"]} delay={0.75} show={on} />
      <Label x={600} y={505} lines={["DAW"]} delay={1.0} show={on} />
    </>
  );
}

// ophobia
const LAYERS = [280, 360, 440].map((x) => [150, 230, 310].map((y) => [x, y]));
const ROUTE = [[40, 230], [150, 230], LAYERS[0][0], LAYERS[1][2], LAYERS[2][1], [570, 230], [680, 230]];

function Ophobia({ on }) {
  const tx = useTx();
  const mesh = [[[150, 230]], ...LAYERS, [[570, 230]]];
  return (
    <>
      <g stroke="currentColor" strokeWidth="1.5">
        {mesh.slice(1).map((layer, i) =>
          layer.flatMap(([x2, y2], j) =>
            mesh[i].map(([x1, y1], k) => {
              const len = Math.hypot(x2 - x1, y2 - y1);
              return (
                <line
                  key={`${i}${x1}${y1}${x2}${y2}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  style={{
                    strokeDasharray: len,
                    strokeDashoffset: on ? 0 : len,
                    transition: `stroke-dashoffset 0.4s ease ${0.1 + (i * 3 + j) * 0.02}s`,
                  }}
                />
              );
            })
          )
        )}
      </g>
      <polyline
        points={ROUTE.slice(0, -1).map((p) => p.join(" ")).join(" ")}
        fill="none" stroke="currentColor" strokeWidth="3"
        style={{
          strokeDasharray: 1200,
          strokeDashoffset: on ? 0 : 1200,
          transition: "stroke-dashoffset 0.8s ease 0.4s",
        }}
      />
      <Arrow x1={570} y1={230} x2={662} y2={230} on={on} delay={0.9} />
      <g fill="currentColor">
        {[...mesh.flat(), [40, 230], [680, 230]].map(([x, y], i) => (
          <circle
            key={`${x}${y}`}
            cx={x} cy={y} r="7"
            style={{
              opacity: on ? 1 : 0,
              transition: `opacity 0.25s ease ${i * 0.03}s`,
            }}
          />
        ))}
      </g>
      <Label x={360} y={95} lines={[tx({ en: "POISSON DELAY AT EACH HOP", fr: "POISSON DELAY À CHAQUE HOP" })]} delay={0.6} show={on} />
      <Label x={40} y={280} lines={["CLIENT"]} delay={0.3} show={on} />
      <Label x={150} y={385} lines={["PROVIDER"]} delay={0.5} show={on} />
      <Label x={360} y={385} lines={["MIXNODES"]} delay={0.7} show={on} />
      <Label x={570} y={385} lines={["PROVIDER"]} delay={0.9} show={on} />
      <Label x={680} y={280} lines={["CLIENT"]} delay={1.1} show={on} />
    </>
  );
}

// AYZE
const VAULT = [350, 250, 85];

function Ayze({ on }) {
  const tx = useTx();
  return (
    <>
      <Circle c={VAULT} on={on} delay={0} />
      <Arrow x1={350} y1={95} x2={350} y2={155} on={on} delay={0.3} />
      <Arrow x1={170} y1={250} x2={255} y2={250} on={on} delay={0.45} />
      <Arrow x1={445} y1={250} x2={528} y2={250} on={on} delay={0.6} />
      <Arrow x1={487} y1={385} x2={487} y2={265} on={on} delay={0.75} />
      <Label x={350} y={244} lines={["VAULT", "XLS-65"]} delay={0.2} show={on} />
      <Label x={350} y={40} lines={["BROKER", "FIRST-LOSS COVER"]} delay={0.5} show={on} />
      <Label x={85} y={258} lines={[tx({ en: "LENDERS", fr: "PRÊTEURS" })]} delay={0.65} show={on} />
      <Label x={640} y={258} lines={[tx({ en: "BORROWERS", fr: "EMPRUNTEURS" })]} delay={0.8} show={on} />
      <Label x={487} y={425} lines={["PROTECTION SELLERS"]} delay={0.95} show={on} />
    </>
  );
}

const DIAGRAMS = {
  roze: {
    view: "-5 0 710 520",
    Draw: Roze,
    label: {
      en: "The Go CLI scans the samples and builds the plugin; the samples go through the engine (47 formats) into the VST3 plugin, played from the DAW",
      fr: "La CLI en Go scanne les samples et build le plugin ; les samples passent par l'engine (47 formats) jusqu'au plugin VST3, joué depuis le DAW",
    },
  },
  ophobia: {
    view: "-30 40 780 370",
    Draw: Ophobia,
    label: {
      en: "A packet goes from a client through its provider, one mixnode in each of three layers with a Poisson delay at each hop, the other provider, then the other client",
      fr: "Un paquet part d'un client, passe par son provider, un mixnode dans chacune des trois couches avec un Poisson delay à chaque hop, l'autre provider, puis l'autre client",
    },
  },
  ayze: {
    view: "-5 0 750 440",
    Draw: Ayze,
    label: {
      en: "Lenders fund the vault, the broker posts first-loss cover, the vault lends to borrowers, protection sellers guarantee the loans",
      fr: "Les prêteurs financent le vault, le broker dépose la first-loss cover, le vault prête aux emprunteurs, les protection sellers garantissent les prêts",
    },
  },
};

export default function ProjectDiagram({ slug }) {
  const tx = useTx();
  const ref = useRef(null);
  const on = useInView(ref);
  const d = DIAGRAMS[slug];
  if (!d) return null;
  const { Draw } = d;
  return (
    <svg ref={ref} viewBox={d.view} role="img" aria-label={tx(d.label)} className="mx-auto w-full max-w-2xl h-auto">
      <Draw on={on} />
    </svg>
  );
}
