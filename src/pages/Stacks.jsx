import { useState } from "react";
import Grid from "../components/Grid";
import Tile from "../components/Tile";
import Filters from "../components/Filters";
import { STACKS, STACK_CATEGORIES, stackCategories } from "../data/stacks";

export default function Stacks() {
  const [cat, setCat] = useState("all");
  const list =
    cat === "all"
      ? STACKS
      : STACKS.filter((s) => stackCategories(s).includes(cat));

  return (
    <>
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
