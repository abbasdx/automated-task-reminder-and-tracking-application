/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      brandBlue: "#60a5fa",
      brandPurple: "#a78bfa",
      brandGreen: "#4ade80",
      brandYellow: "#facc15",
      brandRed: "#f87171",
      ink: "#020617",
    },
  },
},

  plugins: [],
}