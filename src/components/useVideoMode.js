import { useEffect, useState } from "react";

// "Interactive mode": whether the profile page plays its background video.
// null = the visitor hasn't chosen yet (the warning dialog is shown),
// true / false = their choice, remembered in localStorage.
const KEY = "semprez.video";

function read() {
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
