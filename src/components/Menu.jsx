import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SECTIONS, CONTACTS } from "../data/profile";
import Icon from "./Icon";
import { useT } from "../i18n";

// Full-screen overlay behind the header `+`: section links centered on top,
// the four contact icons in one centered row pinned to the bottom. Contacts without `href` copy on click.
// Contact icons get p-2 -m-2: 40px touch targets, same look.
export default function Menu({ open, onClose }) {
  const [copied, setCopied] = useState(null);
  const t = useT();

  const copy = (value, label) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-white pt-16 overflow-y-auto">
      {/* numbers sized in vh so the four of them fill the screen on any height */}
      <div className="px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col min-h-full">
        <nav className="flex-1 flex flex-col items-center justify-evenly">
          {SECTIONS.map((s) => (
            <NavLink
              key={s.path}
              to={s.path}
              end={s.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `uppercase text-[min(15vh,22vw)] leading-none font-bold tracking-tight text-center ${
                  isActive ? "text-black" : "text-neutral-300 hover:text-black"
                }`
              }
            >
              {s.label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-8 flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {CONTACTS.map((c) =>
              c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={c.label}
                  className="p-2 -m-2 text-black hover:text-neutral-400 transition-colors"
                >
                  <Icon name={c.icon} label={c.label} />
                </a>
              ) : (
                <button
                  key={c.label}
                  onClick={() => copy(c.value, c.label)}
                  title={`${c.label}: ${c.value}`}
                  className="p-2 -m-2 text-black hover:text-neutral-400 transition-colors"
                >
                  <Icon name={c.icon} label={c.label} />
                </button>
              ),
            )}
          </div>
          <span
            className="text-xs uppercase text-neutral-400 transition-opacity"
            style={{ opacity: copied ? 1 : 0 }}
          >
            {t("copied")}
          </span>
        </div>
      </div>
    </div>
  );
}
