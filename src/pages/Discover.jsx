import { DISCOVER } from "../data/discover";
import bold from "../components/bold";
import Diagrams, { Knowing } from "../components/Diagrams";
import { useTx } from "../i18n";

function Paragraph({ text, quote }) {
  const lines = text.split("\n");
  if (!quote) {
    return (
      <p className="mt-6">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {bold(line)}
          </span>
        ))}
      </p>
    );
  }
  return (
    <blockquote className="relative mt-6 px-8 sm:px-12 text-center">
      <span className="absolute left-0 -top-4 text-[4rem] sm:text-[5rem] leading-none font-bold select-none" aria-hidden="true">
        {"“"}
      </span>
      <p className="mt-6 italic">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {bold(line)}
          </span>
        ))}
      </p>
      <span className="block text-right text-[4rem] sm:text-[5rem] leading-none font-bold select-none not-italic -mt-6" aria-hidden="true">
        {"”"}
      </span>
    </blockquote>
  );
}

export default function Discover() {
  const tx = useTx();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 text-left sm:text-center text-base sm:text-lg lg:text-xl leading-relaxed">
      {DISCOVER.map((block, i) => (
        <section key={i} className={i ? "mt-32 sm:mt-40" : ""}>
          {block.title && (
            <h2
              className={`font-bold uppercase tracking-wide text-center ${
                block.oneLine
                  ? "whitespace-nowrap text-[min(1.75rem,calc((100vw-2.5rem)/22))]"
                  : "text-lg sm:text-xl lg:text-2xl"
              }`}
            >
              {tx(block.title)}
            </h2>
          )}
          {(tx(block.body) || []).map((p, j) => (
            <Paragraph key={j} text={p} quote={block.quoteParagraphs?.includes(j)} />
          ))}

          {block.type === "diagrams" && <Diagrams />}
          {block.type === "knowing" && <Knowing />}
        </section>
      ))}
    </article>
  );
}
