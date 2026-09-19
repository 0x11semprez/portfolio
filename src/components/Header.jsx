import Icon from "./Icon";

// `dark`: the page behind is showing the background video, so the bar goes
// transparent and the icons white. `video` = { on, toggle } shows the
// play / pause button for the profile page's background video, top right
// (null when the site has no video configured).
export default function Header({ menuOpen, onToggleMenu, dark = false, video = null }) {
  const color = dark
    ? "text-white hover:text-neutral-400"
    : "text-black hover:text-neutral-400";
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 h-16 transition-colors ${
        dark ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="flex h-full items-center justify-between px-5">
        <button
          onClick={onToggleMenu}
          aria-label={menuOpen ? "close menu" : "open menu"}
          className={`flex items-center justify-center transition-colors ${color}`}
        >
          {/* << like the C++ stream operator; flips to >> while the menu is open */}
          <Icon
            name="chevrons"
            label=""
            className={`h-7 w-7 transition-transform duration-200 ${
              menuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {video && (
          <button
            onClick={video.toggle}
            title={video.on ? "pause background video" : "play background video"}
            aria-pressed={video.on}
            className={`flex items-center justify-center transition-colors ${color}`}
          >
            <Icon
              name={video.on ? "pause" : "play"}
              label={video.on ? "pause video" : "play video"}
              className="h-7 w-7"
            />
          </button>
        )}
      </div>
    </header>
  );
}
