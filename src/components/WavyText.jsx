// Text riding a sine wave: each letter bobs up and down, a little behind the
// one before it, so a wave runs through the line, left to right. The negative
// delays start every letter mid-wave, no ramp-up. Words never break in the
// middle; screen readers get the plain text. prefers-reduced-motion: still.
const STEP = 70; // ms between one letter and the next
const PERIOD = 1600; // ms, one wave (same as `animate-wave`)

export default function WavyText({ text }) {
  let n = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {[...word].map((c, i) => (
              <span
                key={i}
                className="inline-block motion-safe:animate-wave"
                style={{
                  animationDelay: `-${PERIOD - ((n++ * STEP) % PERIOD)}ms`,
                }}
              >
                {c}
              </span>
            ))}
          </span>
        </span>
      ))}
    </>
  );
}
