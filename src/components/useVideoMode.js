import { useEffect, useState } from "react";

// "Interactive mode": whether the profile page plays its background video.
// null = the visitor hasn't chosen yet (the warning dialog is shown),
// true / false = their choice, remembered in localStorage until the next
// reload of the page.
const KEY = "semprez.video";

// A reload (F5, Ctrl+Shift+R, pull-to-refresh) asks again: the stored
// choice only carries over to visits that don't reload the page. Browsers
// report a hard refresh and a plain one the same way, so both ask.
function reloaded() {
  try {
    return performance.getEntriesByType("navigation")[0]?.type === "reload";
  } catch {
    return false;
  }
}

function read() {
  if (reloaded()) return null;
  try {
    const v = localStorage.getItem(KEY);
    return v === null ? null : v === "1";
  } catch {
    return null;
  }
}

export default function useVideoMode() {
  const [mode, setMode] = useState(read);
  useEffect(() => {
    if (mode === null) return;
    try {
      localStorage.setItem(KEY, mode ? "1" : "0");
    } catch {
      /* private mode etc. — the choice just won't persist */
    }
  }, [mode]);
  return [mode, setMode];
}
