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
import useVideoMode from "./components/useVideoMode";
import BackgroundVideo from "./components/BackgroundVideo";
import { PROFILE } from "./data/profile";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoMode, setVideoMode] = useVideoMode();
  const { pathname } = useLocation();
  const hasVideo = Boolean(PROFILE.video?.src);
  const on = hasVideo && videoMode === true; // interactive mode chosen
  // pages that show the background video: white text, transparent bar
  const videoPage = pathname === "/" || pathname.startsWith("/album");
  // the project showcase is black from edge to edge
  const dark = (on && videoPage) || pathname === "/projects";

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        dark={dark && !menuOpen}
        video={
          hasVideo
            ? { on: videoMode === true, toggle: () => setVideoMode((m) => !m) }
            : null
        }
      />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* mounted once for the whole site so it doesn't restart when you move
          between the profile, the album grid and an album */}
      {on && <BackgroundVideo {...PROFILE.video} hidden={!videoPage} />}

      <main className="pt-24 mx-auto max-w-[100rem]">
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
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/stacks" element={<Stacks />} />
          <Route path="/stacks/:slug" element={<StackDetail />} />
          <Route path="/album" element={<Albums dark={dark} />} />
          <Route path="/album/:slug" element={<AlbumDetail dark={dark} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
