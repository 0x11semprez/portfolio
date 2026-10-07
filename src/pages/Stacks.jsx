import Grid from "../components/Grid";
import Tile from "../components/Tile";
import { STACKS } from "../data/stacks";
import GITHUB from "../data/github.json";
import { useT } from "../i18n";

// Every stack in one grid, no filters.
export default function Stacks() {
  const t = useT();

  return (
    <>
      {/* GitHub contributions over the last 12 months (npm run github) */}
      <div className="px-5 pb-10 text-center">
        {/* as big as the menu's numbers */}
        <p className="text-[min(12vh,22vw)] font-bold leading-none tracking-tight">
          {GITHUB.contributions.toLocaleString("fr-FR")}
        </p>
        <p className="mt-3 text-sm sm:text-base">
          {t("contributions on GitHub in the last 12 months")}
        </p>
      </div>
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
    </>
  );
}
