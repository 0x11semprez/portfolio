import { useParams, Navigate } from "react-router-dom";
import Detail, { Block, Specs } from "../components/Detail";
import { STACKS, stackCategories } from "../data/stacks";
import { useT, useTx } from "../i18n";

export default function StackDetail() {
  const { slug } = useParams();
  const t = useT();
  const tx = useTx();
  const s = STACKS.find((x) => x.slug === slug);
  if (!s) return <Navigate to="/stacks" replace />;
  const cats = stackCategories(s).map(t).join(" / ");

  return (
    <Detail
      back="/stacks"
      image={s.image}
      title={s.name}
      subtitle={cats}
      // one ↗ for every stack, no brand logos next to the name
      action={{ href: s.link, icon: "link", label: t("official site") }}
    >
      <Block label={t("what it is")}>
        <p>{tx(s.what)}</p>
      </Block>
      <Block label={t("how i use it")}>
        <p>{tx(s.how)}</p>
      </Block>
      <Block label={t("details")}>
        <Specs
          rows={[
            [t("level"), t(s.level)],
            [t("category"), cats],
          ]}
        />
      </Block>
    </Detail>
  );
}
