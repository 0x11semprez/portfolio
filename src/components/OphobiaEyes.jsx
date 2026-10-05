import { useEffect, useRef } from "react";
import EYES from "../data/ophobiaEyes.json";

// The ophobia logo, alive: a crowd of eyes around the wordmark.
// The artwork is cut by scripts/ophobia/eyes.py into the drawing without its
// pupils, a sheet of pupils and eye whites, and their positions; a canvas
// puts them back together each frame.
//   - the pointer moves: every pupil follows it, each at its own pace, so the
//     crowd turns like people, not like one machine;
//   - no pointer (touch, or it stopped moving): the crowd stares around,
//     jumping from one spot to the next together, a little out of sync;
//   - a tap stares at the tap for a moment;
//   - the slide arrives: every eye was looking away, all snap to the viewer;
//   - eyes blink on their own, now and then all at once.
// A pupil only travels as far as its eye lets it (`lim`, measured in 16
// directions). The loop runs only while the slide shows (`active`).
// prefers-reduced-motion: the drawing, still.

const BASE = "/images/projects/ophobia-base.png";
const SHEET = "/images/projects/ophobia-pupils.png";
const { w: W, h: H, eyes: DATA } = EYES;
const STARE = 2500; // ms without moving before the pointer is ignored
const SNAP = 650; // ms after the slide starts arriving, the eyes snap to you
const HOLD = 1100; // ms they keep staring at you after that
const BLINK = 170; // ms, one blink

const rand = (a, b) => a + Math.random() * (b - a);

// how far an eye's pupil can go in direction `t`
function reach(e, t) {
  const n = e.lim.length;
  const a = (((t / (2 * Math.PI)) * n) % n + n) % n;
  const i = Math.floor(a);
  const f = a - i;
  const d = e.lim[i] * (1 - f) + e.lim[(i + 1) % n] * f;
  return Math.min(d, e.r * 0.6);
}

// the offset that makes an eye look at canvas point (x, y)
function lookAt(e, x, y) {
  const dx = x - e.c[0];
  const dy = y - e.c[1];
  const t = Math.atan2(dy, dx);
  const k = reach(e, t) * Math.min(1, Math.hypot(dx, dy) / 260);
  return [Math.cos(t) * k, Math.sin(t) * k];
}

export default function OphobiaEyes({ active, className = "" }) {
  const ref = useRef(null);
  const state = useRef(null);

  // images and per-eye state, once
  useEffect(() => {
    const base = new Image();
    const sheet = new Image();
    const s = {
      base,
      sheet,
      ready: false,
      eyes: DATA.map(() => ({
        o: [0, 0], // current offset
        to: [0, 0], // where it heads
        speed: rand(0.1, 0.2), // share of the gap closed per frame
        lag: rand(0, 220), // ms before reacting to a new idle spot
        blinkAt: performance.now() + rand(1500, 7000),
      })),
      pointer: null, // { x, y, at } in client px
      draw: () => {},
    };
    state.current = s;
    let left = 2;
    const done = () => {
      if (--left) return;
      s.ready = true;
      s.draw(performance.now());
    };
    base.onload = sheet.onload = done;
    base.src = BASE;
    sheet.src = SHEET;
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    const s = state.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    s.draw = (now) => {
      if (!s.ready) return;
      ctx.drawImage(s.base, 0, 0);
      DATA.forEach((e, i) => {
        const [sx, sy, w, h, x, y] = e.p;
        const [ox, oy] = s.eyes[i].o;
        ctx.drawImage(s.sheet, sx, sy, w, h, x + ox, y + oy, w, h);
        // blink: the eye's white comes down over the pupil, then goes up
        const b = (now - (s.eyes[i].blinkAt - BLINK)) / BLINK;
        if (b > 0 && b < 1) {
          const [lx, ly, lw, lh, dx, dy] = e.l;
          const shut = Math.max(1, lh * Math.sin(b * Math.PI));
          ctx.drawImage(s.sheet, lx, ly, lw, shut, dx, dy, lw, shut);
        }
      });
    };
    s.eyes.forEach((st) => (st.o = [0, 0]));
    s.draw(0);
    if (!active || still) return;

    // arriving: everyone looks away, then at you
    const t0 = performance.now();
    s.eyes.forEach((st, i) => {
      const t = rand(0, 2 * Math.PI);
      const k = reach(DATA[i], t) * rand(0.6, 1);
      st.o = [Math.cos(t) * k, Math.sin(t) * k];
      st.to = [0, 0];
    });

    let idle = { x: W / 2, y: H / 2, at: 0, next: 0 };
    const pickIdle = (now) => {
      idle = { x: rand(-W * 0.2, W * 1.2), y: rand(-H * 0.4, H * 1.4), at: now, next: now + rand(900, 2600) };
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      s.pointer = { x: e.clientX, y: e.clientY, at: performance.now() };
    };
    const onDown = (e) => {
      // a tap: stare at it a moment (a mouse keeps following anyway)
      s.pointer = { x: e.clientX, y: e.clientY, at: performance.now() };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    let raf = 0;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const since = now - t0;
      const p = s.pointer;
      let follow = null;
      if (since > SNAP + HOLD) {
        if (p && now - p.at < STARE) {
          const r = canvas.getBoundingClientRect();
          follow = [((p.x - r.left) * W) / r.width, ((p.y - r.top) * H) / r.height];
        } else if (now > idle.next) {
          pickIdle(now);
        }
      }
      DATA.forEach((e, i) => {
        const st = s.eyes[i];
        if (since < SNAP) st.to = st.o;
        else if (since < SNAP + HOLD) st.to = [0, 0];
        else if (follow) st.to = lookAt(e, follow[0], follow[1]);
        else if (now - idle.at > st.lag) st.to = lookAt(e, idle.x, idle.y);
        // snapping and idle jumps are saccades: fast. Following is smooth.
        const k = since < SNAP + HOLD || !follow ? 0.32 : st.speed;
        st.o = [st.o[0] + (st.to[0] - st.o[0]) * k, st.o[1] + (st.to[1] - st.o[1]) * k];
        if (now > st.blinkAt) st.blinkAt = now + BLINK + rand(2500, 9000);
      });
      // now and then the whole crowd blinks together
      if (Math.random() < 0.0006) {
        s.eyes.forEach((st) => (st.blinkAt = now + BLINK + rand(0, 60)));
      }
      s.draw(now);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [active]);

  return (
    <canvas
      ref={ref}
      width={W}
      height={H}
      role="img"
      aria-label="ophobia"
      className={className}
      style={{ backgroundColor: "#fff" }}
    />
  );
}
