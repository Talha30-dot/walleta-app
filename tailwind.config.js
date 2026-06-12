/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        walleta: {
          deep: '#28145F',
          purple: '#8B4CF6',
          soft: '#F1EAFE',
          text: '#242536',
          muted: '#9AA0AF'
        }
      }
    }
  },
  plugins: []
};
