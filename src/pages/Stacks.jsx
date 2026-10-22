import Grid from "../components/Grid";
import Tile from "../components/Tile";
import { STACKS } from "../data/stacks";
import GITHUB from "../data/github.json";
import { useT } from "../i18n";
import FadeIn from "../components/FadeIn";

export default function Stacks() {
  const t = useT();

  return (
    <>
      <FadeIn className="px-5 pb-10 text-center">
        <p className="text-[min(12vh,22vw)] font-bold leading-none tracking-tight">
          {GITHUB.contributions.toLocaleString("fr-FR")}
        </p>
        <p className="mt-3 text-sm sm:text-base">
          {t("contributions on GitHub in the last 12 months")}
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <Grid cols={6}>
          {STACKS.map((s) => (
            <Tile
              key={s.slug}
              to={`/17/${s.slug}`}
              image={s.image}
              label={s.name}
              upper={false}
            />
          ))}
        </Grid>
      </FadeIn>
    </>
  );
}
