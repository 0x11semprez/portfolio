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
import Companion from "./components/Companion";
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
  const dark = (on && videoPage) || project?.ink === "#fff";

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
          hasVideo && videoPage
            ? { on: videoMode === true, toggle: () => setVideoMode((m) => !m) }
            : null
        }
      />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* the robot dog wanders every page in the page's ink; hidden behind
          the menu, it sits on the projects intro dreaming of the way down */}
      {!menuOpen && (
        <Companion
          ink={dark ? "#fff" : "#000"}
          hint={pathname === "/projects" && screen === 0}
        />
      )}

      {/* kept mounted across pages so it doesn't restart when you come back */}
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
          <Route path="/projects" element={<Projects onScreen={setScreen} />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/stacks" element={<Stacks />} />
          <Route path="/stacks/:slug" element={<StackDetail />} />
          <Route path="/album" element={<Albums />} />
          <Route path="/album/:slug" element={<AlbumDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
