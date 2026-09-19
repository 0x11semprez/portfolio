import { useParams, Navigate } from "react-router-dom";
import Detail, { Block, Specs } from "../components/Detail";
import { STACKS, stackCategories } from "../data/stacks";

export default function StackDetail() {
  const { slug } = useParams();
  const s = STACKS.find((x) => x.slug === slug);
  if (!s) return <Navigate to="/stacks" replace />;

  return (
    <Detail
      back="/stacks"
      image={s.image}
      title={s.name}
      subtitle={stackCategories(s).join(" / ")}
      // one ↗ for every stack, no brand logos next to the name
      action={{ href: s.link, icon: "link", label: "official site" }}
    >
      <Block label="what it is">
        <p>{s.what}</p>
      </Block>
      <Block label="how i use it">
        <p>{s.how}</p>
      </Block>
      <Block label="details">
        <Specs
          rows={[
            ["level", s.level],
            ["category", stackCategories(s).join(" / ")],
          ]}
        />
      </Block>
    </Detail>
  );
}
