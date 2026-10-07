import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Semprez from "./pages/Semprez";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Stacks from "./pages/Stacks";
import Discover from "./pages/Discover";
import StackDetail from "./pages/StackDetail";
import useVideoMode from "./components/useVideoMode";
import BackgroundVideo from "./components/BackgroundVideo";
import { PROFILE } from "./data/profile";
import { PROJECTS } from "./data/projects";

// The album pages carry the whole listening history (~400 KB of data): they
// load in their own chunk, only when one of them is opened.
const Albums = lazy(() => import("./pages/Albums"));
const AlbumDetail = lazy(() => import("./pages/AlbumDetail"));
const SecretAlbum = lazy(() => import("./pages/SecretAlbum"));

// The sections used to live under words (/projects, /stacks, /album): old
// links land on their number, same page, same hash. Vercel redirects them
// first (vercel.json), this covers the dev server and in-app history.
const OLD = { projects: "11", stacks: "17", album: "20" };
function Moved({ to }) {
  const { "*": rest } = useParams();
  const { hash } = useLocation();
  return <Navigate to={`/${to}${rest ? `/${rest}` : ""}${hash}`} replace />;
}

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
    pathname === "/11"
      ? PROJECTS[screen - 1]
      : PROJECTS.find((p) => pathname === `/11/${p.slug}`);
  // an album page paints itself its cover's main colour, the bar follows
  const [album, setAlbum] = useState(null);
  const theme = project || (pathname.startsWith("/20/") ? album : null);
  const dark = (on && videoPage) || theme?.ink === "#fff";

  useEffect(() => {
    // the album grid puts itself back where you left it (Albums.jsx)
    if (pathname !== "/20") window.scrollTo(0, 0);
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
        <Suspense fallback={null}>
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
            <Route path="/03" element={<Discover />} />
            <Route
              path="/11"
              element={<Projects onScreen={setScreen} />}
            />
            <Route path="/11/:slug" element={<ProjectDetail />} />
            <Route path="/17" element={<Stacks />} />
            <Route path="/17/:slug" element={<StackDetail />} />
            <Route path="/20" element={<Albums />} />
            <Route
              path="/20/neverforgetloyalty"
              element={<SecretAlbum onTheme={setAlbum} />}
            />
            <Route
              path="/20/:slug"
              element={<AlbumDetail onTheme={setAlbum} />}
            />
            <Route path="/98" element={<Navigate to="/" replace />} />
            {Object.entries(OLD).map(([word, n]) => (
              <Route key={word} path={`/${word}/*`} element={<Moved to={n} />} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
