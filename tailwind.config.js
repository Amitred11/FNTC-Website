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
      // Safelist all patterns for borders, rings, backgrounds, and text with hex colors
      pattern: /(border|ring|bg|text)-\[#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\]/,
    },
    {
      // Safelist ring opacity classes like ring-opacity-40
      pattern: /ring-opacity-\d+/,
    },
    {
      // Safelist gray color utilities used in the 'Inactive' theme
      pattern: /(border|bg|text)-gray-(100|200|300|500)/,
    }
  ]
}
