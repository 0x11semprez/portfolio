import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Detail, { Block, Specs } from "../components/Detail";
import useSpotifyCover from "../components/useSpotifyCover";
import useCoverColor from "../components/useCoverColor";
import { ALBUMS } from "../data/albums";
import { useT } from "../i18n";

// Cover, the three favourite tracks, year and language. Nothing else.
// The page takes the cover's main colour, like a project takes its slide's;
// `onTheme` hands it to the app for the header bar.
// `dark`: the background video (rendered by App, interactive mode) is showing
// behind the page, so the text goes white.
export default function AlbumDetail({ dark = false, onTheme }) {
  const { slug } = useParams();
  const t = useT();
  const a = ALBUMS.find((x) => x.slug === slug);
  const { src: cover } = useSpotifyCover(a?.spotify, a?.cover);
  const color = useCoverColor(cover);

  useEffect(() => {
    onTheme?.(color);
    return () => onTheme?.(null);
  }, [color, onTheme]);

  if (!a) return <Navigate to="/20" replace />;

  return (
    <>
      <Detail
        back="/20"
        dark={dark || color?.ink === "#fff"}
        bg={color?.bg}
        accent={color?.accent}
        centered
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
            <ol className="space-y-1 flex flex-col items-center">
              {a.favorites.slice(0, 3).map((t, i) => (
                <li key={t.title} className="flex gap-3 max-w-full">
                  <span className="font-bold text-[color:var(--accent,currentColor)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t.spotify ? (
                    <a
                      href={t.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 [overflow-wrap:anywhere] hover:underline underline-offset-4"
                    >
                      {t.title}
                    </a>
                  ) : (
                    <span className="min-w-0 [overflow-wrap:anywhere]">{t.title}</span>
                  )}
                </li>
              ))}
            </ol>
          </Block>
        )}
        <Block label={t("details")}>
          <Specs
            centered
            rows={[
              [t("year"), a.year],
              [t("language"), a.language && t(a.language)],
            ].filter(([, v]) => v)}
          />
        </Block>
      </Detail>
    </>
  );
}
