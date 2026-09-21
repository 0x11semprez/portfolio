import Icon from "./Icon";
import { LANGS, useLang, useT } from "../i18n";

// `dark`: the page behind is showing the background video, so the bar goes
// transparent and the icons white. Top right: the EN / FR language switch
// (the active one in the bar's colour, the other grey, same look as the
// video prompt's picker), then `video` = { on, toggle }, the play / pause
// button for the profile page's background video (null when the page has
// none). Icons are 44px (48px from sm), p-2 -m-2 pads the touch target
// without changing the layout.
export default function Header({
  menuOpen,
  onToggleMenu,
  dark = false,
  video = null,
}) {
  const [lang, setLang] = useLang();
  const t = useT();
  const color = dark
    ? "text-white hover:text-neutral-400"
    : "text-black hover:text-neutral-400";
  const active = dark ? "text-white" : "text-black";
  const idle = dark
    ? "text-neutral-400 hover:text-white"
    : "text-neutral-400 hover:text-black";
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 h-16 transition-colors ${
        // over the video or a dark screen: no bar at all, the page shows through
        dark ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="flex h-full items-center justify-between px-5 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]">
        <button
          onClick={onToggleMenu}
          aria-label={t(menuOpen ? "close menu" : "open menu")}
          className={`flex items-center justify-center p-2 -m-2 transition-colors ${color}`}
        >
          {/* << like the C++ stream operator; flips to >> while the menu is open */}
          <Icon
            name="chevrons"
            label=""
            className={`h-11 w-11 sm:h-12 sm:w-12 transition-transform duration-200 ${
              menuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center text-xl sm:text-2xl font-bold leading-none tracking-tight">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={l === lang}
                // px-2 py-2: ≥ 40px touch targets, same look
                className={`px-2 py-2 uppercase transition-colors ${l === lang ? active : idle}`}
              >
                {l}
              </button>
            ))}
          </div>

          {video && (
            <button
              onClick={video.toggle}
              title={t(
                video.on ? "pause background video" : "play background video",
              )}
              aria-pressed={video.on}
              className={`flex items-center justify-center p-2 -m-2 transition-colors ${color}`}
            >
              <Icon
                name={video.on ? "pause" : "play"}
                label={t(video.on ? "pause video" : "play video")}
                className="h-11 w-11 sm:h-12 sm:w-12"
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
