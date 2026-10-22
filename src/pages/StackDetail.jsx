import { useParams, Navigate } from "react-router-dom";
import Detail, { Block, Specs } from "../components/Detail";
import { STACKS, stackCategories } from "../data/stacks";
import { useT, useTx } from "../i18n";
import FadeIn from "../components/FadeIn";

export default function StackDetail() {
  const { slug } = useParams();
  const t = useT();
  const tx = useTx();
  const s = STACKS.find((x) => x.slug === slug);
  if (!s) return <Navigate to="/17" replace />;
  const cats = stackCategories(s).map(t).join(" / ");

  return (
    <Detail
      back="/17"
      image={s.image}
      title={s.name}
      subtitle={cats}
      action={{ href: s.link, icon: "link", label: t("official site") }}
    >
      <FadeIn>
        <Block label={t("what it is")}>
          <p>{tx(s.what)}</p>
        </Block>
      </FadeIn>
      <FadeIn delay={0.15}>
        <Block label={t("how i use it")}>
          <p>{tx(s.how)}</p>
        </Block>
      </FadeIn>
      <FadeIn delay={0.3}>
        <Block label={t("details")}>
          <Specs
            rows={[
              [t("level"), t(s.level)],
              [t("category"), cats],
            ]}
          />
        </Block>
      </FadeIn>
    </Detail>
  );
}
