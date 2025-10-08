/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.html",       // All HTML files in src/
    "./src/js/**/*.js",   // All JS files in src/js/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(hover:)?(bg|text|border|ring)-\[#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\]/,
    },
    {
      pattern: /ring-\[#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\]\/40/,
    },
    {
      pattern: /(border|bg|text)-gray-(100|200|300|500)/,
    }
  ]
}
