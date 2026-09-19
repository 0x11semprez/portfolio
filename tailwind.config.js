/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    // YDMyungjo only. `sans` is what Tailwind preflight puts on <html>, so
    // every element inherits it without a utility class.
    fontFamily: {
      sans: ['"YDMyungjo"', "serif"],
    },
    extend: {},
  },
  plugins: [],
};
