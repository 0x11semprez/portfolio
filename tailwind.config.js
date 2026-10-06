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
