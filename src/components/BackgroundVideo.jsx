// Video filling the viewport behind a page: muted, looped, no controls,
// dimmed with a black wash, contrast pushed up a touch. `object-cover`
// handles every screen ratio. `pointer-events-none` + disablePictureInPicture
// keep the browser from showing its hover chrome (Firefox's picture-in-picture
// toggle, etc.). `loop` should be enough, onEnded is a fallback for browsers
// that drop it on a re-mount. `hidden` keeps it mounted (and playing, so it
// doesn't restart) but invisible on pages that don't show it.
export default function BackgroundVideo({ src, poster, dim, contrast, hidden = false }) {
  const restart = (e) => {
    e.currentTarget.currentTime = 0;
    e.currentTarget.play().catch(() => {});
  };
  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden bg-black pointer-events-none select-none ${
        hidden ? "invisible" : ""
      }`}
      aria-hidden="true"
    >
      <video
        className="h-full w-full object-cover pointer-events-none"
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
