import { useParams, Navigate } from "react-router-dom";
import Detail, { Block, Specs } from "../components/Detail";
import { PROJECTS } from "../data/projects";
import { useT, useTx } from "../i18n";

export default function ProjectDetail() {
  const { slug } = useParams();
  const t = useT();
  const tx = useTx();
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/projects" replace />;

  return (
    <Detail
      back={`/projects#${p.slug}`}
      image={p.detailImage || p.image}
      imageFit="contain"
      imageRatio="square"
      imageInset={false}
      bg={p.bg}
      dark={p.ink === "#fff"}
      title={p.name}
      subtitle={tx(p.category)}
      action={{ href: p.link, icon: "github", label: t(p.linkLabel) }}
    >
      <p className="italic opacity-70">{tx(p.tagline)}</p>
      <Block label={t("about")}>
        {tx(p.description).map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </Block>
      <Block label={t("details")}>
        <Specs rows={p.details.map(([k, v]) => [t(k), t(v)])} />
      </Block>
    </Detail>
  );
}
