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
  return (
    <>
      <p className="mx-auto max-w-2xl px-5 sm:px-10 pb-14 text-center text-base sm:text-lg leading-relaxed">
        {renderIntro(PROJECTS_INTRO)}
      </p>
      <ProjectShowcase projects={PROJECTS} />
    </>
  );
}
