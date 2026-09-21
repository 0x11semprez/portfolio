import ProjectShowcase from "../components/ProjectShowcase";
import { PROJECTS, PROJECTS_INTRO } from "../data/projects";
import { useTx } from "../i18n";

// Renders **bold** from the intro string.
function renderIntro(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-bold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

export default function Projects({ onScreen }) {
  const tx = useTx();
  return (
    <ProjectShowcase
      projects={PROJECTS}
      intro={renderIntro(tx(PROJECTS_INTRO))}
      onScreen={onScreen}
    />
  );
}
