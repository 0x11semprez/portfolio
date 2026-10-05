import ProjectShowcase from "../components/ProjectShowcase";
import { PROJECTS, PROJECTS_INTRO } from "../data/projects";
import { useTx } from "../i18n";
import bold from "../components/bold";

export default function Projects({ onScreen }) {
  const tx = useTx();
  return (
    <ProjectShowcase
      projects={PROJECTS}
      intro={bold(tx(PROJECTS_INTRO))}
      onScreen={onScreen}
    />
  );
}
