// Brand icons, by slug. Paths come from simple-icons (same set as the stack
// logos); `linkedin` and `aws` were removed from that package on brand request,
// so LinkedIn's path is inlined and `link` (↗) is the fallback for anything
// with no brand mark.
import {
  siApple,
  siGithub,
  siTelegram,
  siDiscord,
  siSpotify,
  siRust,
  siSolidity,
  siGo,
  siPython,
  siDocker,
  siGit,
  siGithubactions,
  siCplusplus,
  siPostgresql,
} from "simple-icons";

const ICONS = {
  apple: siApple.path,
  github: siGithub.path,
  telegram: siTelegram.path,
  discord: siDiscord.path,
  spotify: siSpotify.path,
  rust: siRust.path,
  solidity: siSolidity.path,
  go: siGo.path,
  python: siPython.path,
  docker: siDocker.path,
  cplusplus: siCplusplus.path,
  postgresql: siPostgresql.path,
  git: siGit.path,
  githubactions: siGithubactions.path,
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  // arrow ↗, 24-grid, stroke drawn as a fill path
  link: "M7 5v2h8.586L4.293 18.293l1.414 1.414L17 8.414V17h2V5H7z",
  // arrow ←, same 24-grid / stroke weight (Material "arrow back")
  back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  // «<<» double chevron, same grid (Material "keyboard double arrow left")
  chevrons: "M17.59 18L19 16.59 14.42 12 19 7.41 17.59 6l-6 6zM11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z",
  // background-video toggle in the menu (Material play / pause)
  play: "M8 5v14l11-7z",
  pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
};

export default ICONS;
