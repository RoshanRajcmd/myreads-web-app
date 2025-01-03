/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-280': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
    },
  },
  plugins: [],
}

