import { DISCOVER } from "../data/discover";
import bold from "../components/bold";
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
// then where to follow what I'm doing now. Plain page, no effects.
export default function Discover() {
  const tx = useTx();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 text-lg sm:text-xl leading-relaxed">
      {DISCOVER.map((block, i) => (
        <section key={i} className={i ? "mt-16" : ""}>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
            {tx(block.title)}
          </h2>
          {(tx(block.body) || []).map((p, j) => (
            <Paragraph key={j} text={p} />
          ))}

          {block.type === "images" && (
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {block.images.map((img) => (
                <figure key={img.src}>
                  <img
                    src={img.src}
                    alt={tx(img.alt)}
                    loading="lazy"
                    className="w-full h-auto border border-black"
                  />
                  <figcaption className="mt-2 text-sm">
                    <a
                      href={img.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      pinterest
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {block.type === "link" && (
            <p className="mt-6">
              <a
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide underline underline-offset-4"
              >
                {block.label}
              </a>
            </p>
          )}
        </section>
      ))}
    </article>
  );
}
