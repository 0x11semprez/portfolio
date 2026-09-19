import Grid from "../components/Grid";
import Tile from "../components/Tile";
import { PROJECTS } from "../data/projects";

export default function Projects() {
  return (
    <Grid cols={3}>
      {PROJECTS.map((p) => (
        <Tile
          key={p.slug}
          to={`/projects/${p.slug}`}
          image={p.image}
          label={p.name}
          sublabel={p.category}
          ratio="wide"
          fit="cover"
        />
      ))}
    </Grid>
  );
}
