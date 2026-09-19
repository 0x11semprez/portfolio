const COLS = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
};

export default function Grid({ cols = 6, children }) {
  return (
    <div className={`grid ${COLS[cols]} gap-x-6 gap-y-14 px-5 sm:px-10 pb-24`}>{children}</div>
  );
}
