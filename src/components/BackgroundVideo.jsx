import { useEffect, useRef } from "react";

// Video filling the viewport behind a page: muted, looped, no controls,
// dimmed with a black wash, contrast pushed up a touch. `object-cover`
// handles every screen ratio. `pointer-events-none` + disablePictureInPicture
// keep the browser from showing its hover chrome (Firefox's picture-in-picture
// toggle, etc.). `loop` should be enough, onEnded is a fallback for browsers
// that drop it on a re-mount. `hidden` keeps it mounted (and playing, so it
// doesn't restart) but invisible on pages that don't show it. The box is
// 100lvh tall (the largest viewport, toolbars hidden) so it runs under the
// notch and the home bar; iOS's own play button (shown when it refuses to
// autoplay, low power mode) is hidden in index.css.
export default function BackgroundVideo({ src, poster, dim, contrast, hidden = false }) {
  const ref = useRef(null);

  // Phones pause the video when the browser goes to the background (app
  // switch, lock screen) and don't always resume it when you come back, so
  // play() again on every "we're visible again" signal. If the browser wants
  // a gesture first (iOS low power mode), the first tap does it.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const play = () => {
      if (document.visibilityState === "hidden") return;
      video.play().catch(() => {});
    };
    const onPause = () => {
      if (!video.ended) play();
    };
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pageshow", play);
    window.addEventListener("focus", play);
    window.addEventListener("touchstart", play, { passive: true });
    window.addEventListener("click", play);
    video.addEventListener("pause", onPause);
    return () => {
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pageshow", play);
      window.removeEventListener("focus", play);
      window.removeEventListener("touchstart", play);
      window.removeEventListener("click", play);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const restart = (e) => {
    e.currentTarget.currentTime = 0;
    e.currentTarget.play().catch(() => {});
  };
  return (
    <div
      className={`fixed inset-x-0 top-0 h-lvh min-h-full -z-10 overflow-hidden bg-black pointer-events-none select-none ${
        hidden ? "invisible" : ""
      }`}
      aria-hidden="true"
    >
      <video
        ref={ref}
        className="bg-video h-full w-full object-cover pointer-events-none"
        style={{ filter: `contrast(${contrast ?? 1.15})` }}
        src={src}
        onEnded={restart}
        poster={poster || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-black" style={{ opacity: dim ?? 0.7 }} />
    </div>
  );
}
