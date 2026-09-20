import { useState } from "react";
import Icon from "./Icon";

// Filter row (album language, stack category), styled like yeezy's MALE / FEMALE switch.
// On phones the row doesn't fit, so it becomes a dropdown: the current choice
// with the menu's chevron turned downwards, tap it and the other options list underneath.
// `dark`: the page is showing the background video, so the active option is white.
export default function Filters({ options, value, onChange, dark = false }) {
  const [open, setOpen] = useState(false);
  const all = ["all", ...options];
  const active = dark ? "text-white" : "text-black";
  const idle = dark ? "text-neutral-400 hover:text-white" : "text-neutral-400 hover:text-black";
  const pick = (o) => {
    onChange(o);
    setOpen(false);
  };
  return (
    <div className="px-5 pb-10 text-base sm:text-lg uppercase tracking-wide">
      {/* phones: dropdown */}
      <div className="sm:hidden flex flex-col items-center">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`flex items-center gap-2 px-2 py-2 uppercase ${active}`}
        >
          {value}
          {/* same chevron as the menu's <<, turned downwards; flips up while open */}
          <Icon
            name="chevron"
            label=""
            className={`h-5 w-5 transition-transform duration-200 ${open ? "-rotate-90" : "rotate-90"}`}
          />
        </button>
        {open && (
          <ul role="listbox" className="flex flex-col items-center">
            {all.filter((o) => o !== value).map((o) => (
              <li key={o} role="option" aria-selected={false}>
                <button onClick={() => pick(o)} className={`px-2 py-2 uppercase transition-colors ${idle}`}>
                  {o}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* desktop: the row */}
      <div className="hidden sm:flex flex-wrap justify-center gap-x-5">
        {all.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            // px-2 -mx-2 py-2: ≥ 40px touch targets, same look
            className={`px-2 -mx-2 py-2 uppercase transition-colors ${o === value ? active : idle}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
