import { useEffect, useRef, useState } from "react";
import Detail, { Block } from "../components/Detail";
import Icon from "../components/Icon";
import useCoverColor from "../components/useCoverColor";
import { SECRET_ALBUM as A } from "../data/secretAlbum";
import { useT } from "../i18n";

const time = (s) =>
  Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";

// The easter egg's page: an album page like the others, plus a player. A
// track plays when you tap it, then the next one follows, in order, to the
// end of the album. Same colours trick as an album: the cover's.
export default function SecretAlbum({ onTheme }) {
  const t = useT();
  const color = useCoverColor(A.cover);
  const audio = useRef(null);
  const [at, setAt] = useState(null); // index of the track loaded
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState([0, 0]); // [current time, duration]

  useEffect(() => {
    onTheme?.(color);
    return () => onTheme?.(null);
  }, [color, onTheme]);

  const play = (i) => {
    const el = audio.current;
    if (i === at) {
      el.paused ? el.play() : el.pause();
      return;
    }
    setAt(i);
    el.src = A.tracks[i].src;
    el.play();
  };

  return (
    <Detail
      back="/album"
      image={A.cover}
      imageFit="cover"
      imageRatio="tall"
      title={A.title}
      subtitle={A.artist}
      bg={color?.bg}
      accent={color?.accent}
      dark={color?.ink === "#fff"}
      centered
    >
      <audio
        ref={audio}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setPos([e.target.currentTime, e.target.duration])}
        onEnded={() => (at < A.tracks.length - 1 ? play(at + 1) : setPlaying(false))}
      />
      <Block label={t("tracks")}>
        <ol className="space-y-1 flex flex-col items-center">
          {A.tracks.map((tr, i) => (
            <li key={tr.src}>
              <button
                onClick={() => play(i)}
                className={`flex items-center gap-3 hover:underline underline-offset-4 ${
                  i === at ? "font-bold" : ""
                }`}
              >
                <span className="font-bold text-[color:var(--accent,currentColor)]">
                  {i === at ? (
                    <Icon
                      name={playing ? "pause" : "play"}
                      label={t(playing ? "pause" : "play")}
                      className="inline h-4 w-4"
                    />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                {tr.title}
              </button>
            </li>
          ))}
        </ol>
        {at !== null && (
          <p className="text-sm sm:text-base tabular-nums">
            {time(pos[0])} / {time(pos[1])}
          </p>
        )}
      </Block>
    </Detail>
  );
}
