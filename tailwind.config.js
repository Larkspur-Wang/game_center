/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'minecraft-green': '#54ff9f',
        'minecraft-blue': '#5454fc',
        'minecraft-red': '#ff5454',
      },
      fontFamily: {
        minecraft: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}