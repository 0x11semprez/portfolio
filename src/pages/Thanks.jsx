import { THANKS, THANKS_INTRO } from "../data/thanks";
import { useT, useTx } from "../i18n";

// "20": thank you to the people who inspired me. Plain page like 03: the
// text centered, one person per line, the name links out when it has a link.
export default function Thanks() {
  const t = useT();
  const tx = useTx();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 text-center text-base sm:text-lg lg:text-xl leading-relaxed">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wide">
        {t("thanks")}
      </h1>
      <p className="mt-6">{tx(THANKS_INTRO)}</p>
      <ul className="mt-16 sm:mt-20 flex flex-col gap-10">
        {THANKS.map((p) => (
          <li key={p.name}>
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase hover:underline underline-offset-4"
              >
                {p.name}
              </a>
            ) : (
              <span className="font-bold uppercase">{p.name}</span>
            )}
            {p.why && <p className="mt-2">{tx(p.why)}</p>}
          </li>
        ))}
      </ul>
    </article>
  );
}
