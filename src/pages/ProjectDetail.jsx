import { useParams, Navigate } from "react-router-dom";
import Detail, { Block, Specs } from "../components/Detail";
import { PROJECTS } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/projects" replace />;

  return (
    <Detail
      back="/projects"
      image={p.detailImage || p.image}
      imageFit="contain"
      imageRatio="square"
      imageInset={false}
      bg={p.bg}
      dark={p.ink === "#fff"}
      title={p.name}
      subtitle={p.category}
      action={{ href: p.link, icon: "github", label: p.linkLabel }}
    >
      <p className="italic opacity-70">{p.tagline}</p>
      <Block label="about">
        {p.description.map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </Block>
      <Block label="details">
        <Specs rows={p.details} />
      </Block>
    </Detail>
  );
}
