import { useParams, Navigate } from "react-router-dom";
import Detail, { Block, Specs } from "../components/Detail";
import useSpotifyCover from "../components/useSpotifyCover";
import { ALBUMS } from "../data/albums";
import { useT } from "../i18n";

// Cover, the three favourite tracks, year and language. Nothing else.
// `dark`: the background video (rendered by App, interactive mode) is showing
// behind the page, so the text goes white.
export default function AlbumDetail({ dark = false }) {
  const { slug } = useParams();
  const t = useT();
  const a = ALBUMS.find((x) => x.slug === slug);
  const cover = useSpotifyCover(a?.spotify, a?.cover);
  if (!a) return <Navigate to="/album" replace />;

  return (
    <>
      <Detail
        back="/album"
        dark={dark}
        image={cover}
        imageFit="cover"
        title={a.title}
        subtitle={a.artist}
        action={{
          href: a.spotify,
          icon: "spotify",
          label: t("open on spotify"),
        }}
      >
        {a.favorites.length > 0 && (
          <Block label={t("favorites")}>
            <ol className="space-y-1">
              {a.favorites.slice(0, 3).map((t, i) => (
                <li key={t.title} className="flex gap-3">
                  <span className="text-neutral-400 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t.spotify ? (
                    <a
                      href={t.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      {t.title}
                    </a>
                  ) : (
                    <span>{t.title}</span>
                  )}
                </li>
              ))}
            </ol>
          </Block>
        )}
        <Block label={t("details")}>
          <Specs
            rows={[
              [t("year"), a.year],
              [t("language"), t(a.language)],
            ]}
          />
        </Block>
      </Detail>
    </>
  );
}
