// Filter row (album language, stack category), styled like yeezy's MALE / FEMALE switch.
export default function Filters({ options, value, onChange }) {
  const all = ["all", ...options];
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 px-5 pb-12 text-base sm:text-lg uppercase tracking-wide">
      {all.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`uppercase ${o === value ? "text-black" : "text-neutral-400 hover:text-black"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
