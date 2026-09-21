/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    // One Myeongjo: YDMyungjo when its (licensed) files are there, Nanum
    // Myeongjo otherwise. `sans` is what Tailwind preflight puts on <html>,
    // so every element inherits it without a utility class.
    fontFamily: {
      sans: ['"YDMyungjo"', '"Nanum Myeongjo"', "serif"],
    },
    extend: {},
  },
  plugins: [],
};
