import { useParams, Navigate } from "react-router-dom";
import Detail, { Block } from "../components/Detail";
import { PROJECTS } from "../data/projects";
import { useT, useTx } from "../i18n";
import bold from "../components/bold";
import ProjectDiagram from "../components/ProjectDiagrams";
import FadeIn from "../components/FadeIn";

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
      <FadeIn as="p" className="italic">{tx(p.tagline)}</FadeIn>
      <FadeIn delay={0.15}>
        <Block label={t("about")}>
          <div className="pb-6">
            <ProjectDiagram slug={p.slug} />
          </div>
          {tx(p.description).map((d, i) => (
            <FadeIn as="p" key={i} delay={0.3 + i * 0.12}>{bold(d)}</FadeIn>
          ))}
        </Block>
      </FadeIn>
      {p.demo && (
        <FadeIn delay={0.4}>
          <Block label={t("in action")}>
            <video
              src={p.demo.src}
              poster={p.demo.poster}
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto"
            />
          </Block>
        </FadeIn>
      )}
    </Detail>
  );
}
