/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    // One Myeongjo: YDMyungjo when its (licensed) files are there, Nanum
    // Myeongjo otherwise. `sans` is what Tailwind preflight puts on <html>,
    // so every element inherits it without a utility class.
    fontFamily: {
      sans: ['"YDMyungjo"', '"Nanum Myeongjo"', "serif"],
    },
    // Every step of the type scale is ~15% bigger than Tailwind's default.
    fontSize: {
      xs: ["0.875rem", { lineHeight: "1.25rem" }],
      sm: ["1rem", { lineHeight: "1.5rem" }],
      base: ["1.125rem", { lineHeight: "1.75rem" }],
      lg: ["1.3125rem", { lineHeight: "2rem" }],
      xl: ["1.4375rem", { lineHeight: "2rem" }],
      "2xl": ["1.75rem", { lineHeight: "2.25rem" }],
      "3xl": ["2.125rem", { lineHeight: "2.5rem" }],
      "4xl": ["2.5rem", { lineHeight: "2.75rem" }],
      "5xl": ["3.5rem", { lineHeight: "1" }],
      "6xl": ["4.25rem", { lineHeight: "1" }],
    },
    extend: {
      // one letter of a wavy line: up and down on an eased (sine-like) curve
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateY(0.12em)" },
          "50%": { transform: "translateY(-0.12em)" },
        },
      },
      animation: { wave: "wave 1.6s ease-in-out infinite" },
    },
  },
  plugins: [],
};
