import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SECTIONS, CONTACTS } from "../data/profile";
import Icon from "./Icon";

// Full-screen overlay behind the header `+`: section links on top, one brand
// icon per contact pinned to the bottom. Contacts without `href` copy on click.
export default function Menu({ open, onClose }) {
  const [copied, setCopied] = useState(null);

  const copy = (value, label) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-white pt-16 overflow-y-auto">
      <div className="px-5 py-10 flex flex-col min-h-full">
        <nav className="flex flex-col gap-3">
          {SECTIONS.map((s) => (
            <NavLink
              key={s.path}
              to={s.path}
              end={s.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `uppercase text-3xl sm:text-5xl font-bold tracking-tight ${
                  isActive ? "text-black" : "text-neutral-300 hover:text-black"
                }`
              }
            >
              {s.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-16 flex flex-col items-start gap-6">
          {CONTACTS.map((c) =>
            c.href ? (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                title={c.label}
                className="text-black hover:text-neutral-400 transition-colors"
              >
                <Icon name={c.icon} label={c.label} />
              </a>
            ) : (
              <button
                key={c.label}
                onClick={() => copy(c.value, c.label)}
                title={`${c.label}: ${c.value}`}
                className="text-black hover:text-neutral-400 transition-colors"
              >
                <Icon name={c.icon} label={c.label} />
              </button>
            ),
          )}
          <span
            className="text-xs uppercase text-neutral-400 transition-opacity"
            style={{ opacity: copied ? 1 : 0 }}
          >
            copied
          </span>
        </div>
      </div>
    </div>
  );
}
