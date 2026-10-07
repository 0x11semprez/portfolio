import { DISCOVER } from "../data/discover";
import bold from "../components/bold";
import Diagrams from "../components/Diagrams";
import { useTx } from "../i18n";

// One paragraph: line breaks kept, ** bold.
function Paragraph({ text }) {
  return (
    <p className="mt-6">
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {bold(line)}
        </span>
      ))}
    </p>
  );
}

// "03": the text in one column, the diagrams side by side (stacked on phones),
// then what I'm doing now. Plain page, text centered, no effects.
export default function Discover() {
  const tx = useTx();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 text-center text-lg sm:text-xl leading-relaxed">
      {DISCOVER.map((block, i) => (
        <section key={i} className={i ? "mt-16" : ""}>
          <h2
            className={`font-bold uppercase tracking-wide ${
              block.oneLine
                ? "whitespace-nowrap text-[min(1.5rem,calc((100vw-2.5rem)/22))]"
                : "text-xl sm:text-2xl"
            }`}
          >
            {tx(block.title)}
          </h2>
          {(tx(block.body) || []).map((p, j) => (
            <Paragraph key={j} text={p} />
          ))}

          {block.type === "diagrams" && <Diagrams />}

        </section>
      ))}
    </article>
  );
}
