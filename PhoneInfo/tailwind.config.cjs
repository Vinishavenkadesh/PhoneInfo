/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./HTML/compare.html",
    "./HTML/track.html",
    "./JavaScript/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImage: "url('')",
      },
    },
  },
  plugins: [],
};
