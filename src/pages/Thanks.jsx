import { THANKS, THANKS_INTRO } from "../data/thanks";
import { useT, useTx } from "../i18n";
import FadeIn, { FadeInGroup } from "../components/FadeIn";

export default function Thanks() {
  const t = useT();
  const tx = useTx();

  return (
    <article className="mx-auto flex flex-col items-center max-w-3xl px-5 pb-24 text-center text-base sm:text-lg lg:text-xl leading-relaxed">
      <FadeIn>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wide">
          {t("thanks")}
        </h1>
      </FadeIn>
      <FadeIn delay={0.2} className="mt-8 sm:mt-10">
        {tx(THANKS_INTRO)
          .split("\n")
          .map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
      </FadeIn>
      <FadeInGroup
        stagger={0.06}
        base={0}
        className="mt-16 sm:mt-20 flex flex-col items-center gap-10"
      >
        {THANKS.map((p) => (
          <li key={p.name} className="list-none">
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
      </FadeInGroup>
    </article>
  );
}
