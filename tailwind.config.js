// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gold-old': '#c79845',
        'gold-old-light': '#d4a852',
        'gold-old-dark': '#b8893d'
      }
    }
  },
  plugins: [],
};
