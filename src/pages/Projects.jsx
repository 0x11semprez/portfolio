import ProjectShowcase from "../components/ProjectShowcase";
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
  return <ProjectShowcase projects={PROJECTS} intro={renderIntro(PROJECTS_INTRO)} />;
}
