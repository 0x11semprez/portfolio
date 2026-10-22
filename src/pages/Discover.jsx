import { DISCOVER } from "../data/discover";
import bold from "../components/bold";
import Diagrams, { Knowing } from "../components/Diagrams";
import FadeIn from "../components/FadeIn";
import { useTx } from "../i18n";

function Paragraph({ text, delay }) {
  return (
    <FadeIn as="p" delay={delay} className="mt-6">
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {bold(line)}
        </span>
      ))}
    </FadeIn>
  );
}

export default function Discover() {
  const tx = useTx();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 text-center text-base sm:text-lg lg:text-xl leading-relaxed">
      {DISCOVER.map((block, i) => (
        <section key={i} className={i ? "mt-32 sm:mt-40" : ""}>
          {block.title && (
            <FadeIn>
              <h2
                className={`font-bold uppercase tracking-wide ${
                  block.oneLine
                    ? "whitespace-nowrap text-[min(1.75rem,calc((100vw-2.5rem)/22))]"
                    : "text-lg sm:text-xl lg:text-2xl"
                }`}
              >
                {tx(block.title)}
              </h2>
            </FadeIn>
          )}
          {(tx(block.body) || []).map((p, j) => (
            <Paragraph key={j} text={p} delay={0.15 + j * 0.12} />
          ))}

          {block.type === "diagrams" && <Diagrams />}
          {block.type === "knowing" && <Knowing />}
        </section>
      ))}
    </article>
  );
}
