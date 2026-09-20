import Grid from "../components/Grid";
import Tile from "../components/Tile";
import { PROJECTS, PROJECTS_INTRO } from "../data/projects";

// Renders **bold** from the intro string.
function renderIntro(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-bold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export default function Projects() {
  return (
    <>
      <p className="mx-auto max-w-2xl px-5 sm:px-10 pb-14 text-center text-base sm:text-lg leading-relaxed">
        {renderIntro(PROJECTS_INTRO)}
      </p>
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
    </>
  );
}
