import { useParams, Navigate } from "react-router-dom";
import Detail, { Block } from "../components/Detail";
import { PROJECTS } from "../data/projects";
import { useT, useTx } from "../i18n";
import bold from "../components/bold";
import ProjectDiagram from "../components/ProjectDiagrams";

export default function ProjectDetail() {
  const { slug } = useParams();
  const t = useT();
  const tx = useTx();
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/11" replace />;

  return (
    <Detail
      back={`/11#${p.slug}`}
      image={p.detailImage || p.image}
      imageFit="contain"
      imageRatio="square"
      imageInset={false}
      centered
      bg={p.bg}
      dark={p.ink === "#fff"}
      title={p.name}
      hideTitle
      subtitle={tx(p.category)}
      action={{ href: p.link, icon: "github", label: t(p.linkLabel) }}
    >
      <p className="italic">{tx(p.tagline)}</p>
      <Block label={t("about")}>
        <div className="pb-6">
          <ProjectDiagram slug={p.slug} />
        </div>
        {tx(p.description).map((d, i) => (
          <p key={i}>{bold(d)}</p>
        ))}
      </Block>
    </Detail>
  );
}
