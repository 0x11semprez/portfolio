import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Semprez from "./pages/Semprez";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Stacks from "./pages/Stacks";
import StackDetail from "./pages/StackDetail";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import SecretAlbum from "./pages/SecretAlbum";
import useVideoMode from "./components/useVideoMode";
import BackgroundVideo from "./components/BackgroundVideo";
import { PROFILE } from "./data/profile";
import { PROJECTS } from "./data/projects";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoMode, setVideoMode] = useVideoMode();
  const { pathname } = useLocation();
  const hasVideo = Boolean(PROFILE.video?.src);
  const on = hasVideo && videoMode === true; // interactive mode chosen
  // the only page that shows the background video: white text, transparent bar
  const videoPage = pathname === "/";
  // the project showcase: one slide per project, each in its own colours, so
  // the bar follows the slide showing (0 = the white intro). A project page
  // keeps its slide's colours, so the bar follows that project.
  const [screen, setScreen] = useState(0);
  const project =
    pathname === "/projects"
      ? PROJECTS[screen - 1]
      : PROJECTS.find((p) => pathname === `/projects/${p.slug}`);
  // an album page paints itself its cover's main colour, the bar follows
  const [album, setAlbum] = useState(null);
  const theme = project || (pathname.startsWith("/album/") ? album : null);
  const dark = (on && videoPage) || theme?.ink === "#fff";

  useEffect(() => {
    // the album grid puts itself back where you left it (Albums.jsx)
    if (pathname !== "/album") window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        dark={dark && !menuOpen}
        bg={theme && !menuOpen ? theme.bg : null}
        video={
          hasVideo && videoPage
            ? { on: videoMode === true, toggle: () => setVideoMode((m) => !m) }
            : null
        }
      />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* kept mounted across pages so it doesn't restart when you come back */}
      {on && <BackgroundVideo {...PROFILE.video} hidden={!videoPage} />}

      <main className="pt-[calc(6rem+env(safe-area-inset-top))] mx-auto max-w-[100rem]">
        <Routes>
          <Route
            path="/"
            element={
              <Semprez
                videoMode={videoMode}
                onVideoMode={setVideoMode}
                dark={dark}
              />
            }
          />
          <Route path="/projects" element={<Projects onScreen={setScreen} />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/stacks" element={<Stacks />} />
          <Route path="/stacks/:slug" element={<StackDetail />} />
          <Route path="/album" element={<Albums />} />
          <Route
            path="/album/neverforgetloyalty"
            element={<SecretAlbum onTheme={setAlbum} />}
          />
          <Route
            path="/album/:slug"
            element={<AlbumDetail onTheme={setAlbum} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
