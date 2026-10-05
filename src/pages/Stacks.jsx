import { useState } from "react";
import Grid from "../components/Grid";
import Tile from "../components/Tile";
import Filters from "../components/Filters";
import { STACKS, STACK_CATEGORIES, stackCategories } from "../data/stacks";
import GITHUB from "../data/github.json";
import { useT } from "../i18n";

export default function Stacks() {
  const [cat, setCat] = useState("all");
  const t = useT();
  const list =
    cat === "all"
      ? STACKS
      : STACKS.filter((s) => stackCategories(s).includes(cat));

  return (
    <>
      {/* GitHub contributions over the last 12 months (npm run github) */}
      <div className="pb-10 text-center uppercase tracking-wide">
        {/* as big as the menu's numbers */}
        <p className="text-[min(15vh,22vw)] font-bold leading-none tracking-tight">
          {GITHUB.contributions.toLocaleString("fr-FR")}
        </p>
        <p className="mt-3 text-sm sm:text-base">
          {t("contributions on github in the last 12 months")}
        </p>
      </div>
      <Filters options={STACK_CATEGORIES} value={cat} onChange={setCat} />
      <Grid cols={6}>
        {list.map((s) => (
          <Tile
            key={s.slug}
            to={`/stacks/${s.slug}`}
            image={s.image}
            label={s.name}
          />
        ))}
      </Grid>
    </>
  );
}
