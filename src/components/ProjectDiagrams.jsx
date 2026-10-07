import { Label } from "./Diagrams";
import { useTx } from "../i18n";

// One diagram per project, in the style of the "03" diagrams: black lines,
// circles, bold labels in the site's font, the same label size.

// A line with a filled head at (x2, y2).
function Arrow({ x1, y1, x2, y2 }) {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3" />
      <path d="M-20 -12 L0 0 L-20 12 Z" transform={`translate(${x2} ${y2}) rotate(${a})`} fill="currentColor" />
    </g>
  );
}

// From one circle's edge to another's, leaving a small gap.
function Link({ from: [x1, y1, r1], to: [x2, y2, r2] }) {
  const d = Math.hypot(x2 - x1, y2 - y1);
  const [ux, uy] = [(x2 - x1) / d, (y2 - y1) / d];
  const g1 = r1 + 8;
  const g2 = r2 + 8;
  return <Arrow x1={x1 + ux * g1} y1={y1 + uy * g1} x2={x2 - ux * g2} y2={y2 - uy * g2} />;
}

function Circle({ c: [cx, cy, r] }) {
  return <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="3" />;
}

// Röze: the CLI scans the samples and builds the plugin; samples go through
// the engine into the plugin, played from the DAW.
const CLI = [350, 85, 70];
const SAMPLES = [100, 320, 95];
const ENGINE = [350, 320, 95];
const PLUGIN = [600, 320, 95];

function Roze() {
  return (
    <>
      {[CLI, SAMPLES, ENGINE, PLUGIN].map((c) => (
        <Circle key={c[0] + c[1]} c={c} />
      ))}
      <Link from={SAMPLES} to={ENGINE} />
      <Link from={ENGINE} to={PLUGIN} />
      <Link from={CLI} to={SAMPLES} />
      <Link from={CLI} to={PLUGIN} />
      <Arrow x1={600} y1={423} x2={600} y2={470} />
      <Label x={350} y={80} lines={["CLI", "GO"]} />
      <Label x={100} y={328} lines={["SAMPLES"]} />
      <Label x={350} y={315} lines={["ENGINE", "47 FORMATS"]} />
      <Label x={600} y={315} lines={["PLUGIN", "VST3"]} />
      <Label x={600} y={505} lines={["DAW"]} />
    </>
  );
}

// ophobia: a packet leaves a client, goes through its provider, one mixnode
// per layer (each holds it for a Poisson delay), the other provider, then
// the other client. Thin lines: every route it could have taken.
const LAYERS = [280, 360, 440].map((x) => [150, 230, 310].map((y) => [x, y]));
const ROUTE = [[40, 230], [150, 230], LAYERS[0][0], LAYERS[1][2], LAYERS[2][1], [570, 230], [680, 230]];

function Ophobia() {
  const tx = useTx();
  const mesh = [[[150, 230]], ...LAYERS, [[570, 230]]];
  return (
    <>
      <g stroke="currentColor" strokeWidth="1.5">
        {mesh.slice(1).map((layer, i) =>
          layer.flatMap(([x2, y2]) =>
            mesh[i].map(([x1, y1]) => <line key={`${i}${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />)
          )
        )}
      </g>
      <polyline points={ROUTE.slice(0, -1).map((p) => p.join(" ")).join(" ")} fill="none" stroke="currentColor" strokeWidth="3" />
      <Arrow x1={570} y1={230} x2={662} y2={230} />
      <g fill="currentColor">
        {[...mesh.flat(), [40, 230], [680, 230]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="7" />
        ))}
      </g>
      <Label x={360} y={95} lines={[tx({ en: "POISSON DELAY AT EACH HOP", fr: "POISSON DELAY À CHAQUE HOP" })]} />
      <Label x={40} y={280} lines={["CLIENT"]} />
      <Label x={150} y={385} lines={["PROVIDER"]} />
      <Label x={360} y={385} lines={["MIXNODES"]} />
      <Label x={570} y={385} lines={["PROVIDER"]} />
      <Label x={680} y={280} lines={["CLIENT"]} />
    </>
  );
}

// AYZE: lenders fund the vault, the broker posts first-loss cover, the vault
// lends to borrowers, protection sellers guarantee each loan.
const VAULT = [350, 250, 85];

function Ayze() {
  const tx = useTx();
  return (
    <>
      <Circle c={VAULT} />
      <Arrow x1={350} y1={95} x2={350} y2={155} />
      <Arrow x1={170} y1={250} x2={255} y2={250} />
      <Arrow x1={445} y1={250} x2={528} y2={250} />
      <Arrow x1={487} y1={385} x2={487} y2={265} />
      <Label x={350} y={244} lines={["VAULT", "XLS-65"]} />
      <Label x={350} y={40} lines={["BROKER", "FIRST-LOSS COVER"]} />
      <Label x={85} y={258} lines={[tx({ en: "LENDERS", fr: "PRÊTEURS" })]} />
      <Label x={640} y={258} lines={[tx({ en: "BORROWERS", fr: "EMPRUNTEURS" })]} />
      <Label x={487} y={425} lines={["PROTECTION SELLERS"]} />
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

// The diagram of a project, or nothing when it has none.
export default function ProjectDiagram({ slug }) {
  const tx = useTx();
  const d = DIAGRAMS[slug];
  if (!d) return null;
  const { Draw } = d;
  return (
    <svg viewBox={d.view} role="img" aria-label={tx(d.label)} className="mx-auto w-full max-w-2xl h-auto">
      <Draw />
    </svg>
  );
}
