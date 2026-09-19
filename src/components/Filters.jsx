// Filter row (album language, stack category), styled like yeezy's MALE / FEMALE switch.
// `dark`: the page is showing the background video, so the active option is white.
export default function Filters({ options, value, onChange, dark = false }) {
  const all = ["all", ...options];
  const active = dark ? "text-white" : "text-black";
  const idle = dark ? "text-neutral-400 hover:text-white" : "text-neutral-400 hover:text-black";
  return (
    <div className="flex flex-wrap justify-center gap-x-5 px-5 pb-10 text-base sm:text-lg uppercase tracking-wide">
      {all.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          // px-2 -mx-2 py-2: ≥ 40px touch targets on phones, same look
          className={`px-2 -mx-2 py-2 uppercase transition-colors ${o === value ? active : idle}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
