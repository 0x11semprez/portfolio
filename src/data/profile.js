// "SEMPREZ" page: one paragraph that defines you. Edit freely.
export const PROFILE = {
  name: "semprez",
  // One line per sentence (each newline = line break). Wrap text in ** to bold it.
  bio: [
    "semprez likes to talk about everything.",
    "semprez loves y'all.",
    "semprez is a software engineer.",
    'semprez\'s favorite sentence is "all comes with a cost".',
    "Open to DevSecOps roles.",
    "Open to C++ roles in audio, finance or defense.",
  ].join("\n"),
  // Background video for this page ("interactive mode"): a file in
  // public/videos/, autoplayed muted and looped behind the text, dimmed by
  // `dim` (0..1, black), `contrast` (1 = as shot, 1.15 = a touch punchier).
  // `poster` shows while it loads. `credit` is the editor thanked in the
  // warning dialog. Set `src` to null to remove the feature.
  video: {
    src: "/videos/profile.mp4",
    poster: "/videos/profile.jpg",
    dim: 0.7,
    contrast: 1.15,
    credit: { name: "yotsu", url: "https://www.youtube.com/@yot-su" },
  },
};

// `icon` = slug in src/components/icons.js. No `href` → click copies `value`.
export const CONTACTS = [
  {
    label: "email",
    value: "traoresemprez@icloud.com",
    href: "mailto:traoresemprez@icloud.com",
    icon: "apple",
  },
  {
    label: "gmail",
    value: "traoresemprez@gmail.com",
    href: "mailto:traoresemprez@gmail.com",
    icon: "gmail",
  },
  {
    label: "linkedin",
    value: "Kassim Traore-Semprez",
    href: "https://www.linkedin.com/in/kassim-traore-semprez",
    icon: "linkedin",
  },
  {
    label: "github",
    value: "0x11semprez",
    href: "https://github.com/0x11semprez",
    icon: "github",
  },
  {
    label: "telegram",
    value: "pupp3tm4st3r",
    href: "https://t.me/pupp3tm4st3r",
    icon: "telegram",
  },
  { label: "discord", value: "0x11semprez", icon: "discord" },
];

// Menu entries, named after the major C++ releases.
// 98 = semprez (profile), 11 = projects, 17 = stacks, 20 = album.
export const SECTIONS = [
  { label: "98", path: "/" },
  { label: "11", path: "/projects" },
  { label: "17", path: "/stacks" },
  { label: "20", path: "/album" },
];
