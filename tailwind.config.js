
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx}"],

  theme: {
    colors: {
      white: "#ffffff",
      ash: "#adaf9b",
      black: "#000000"
    },
    extend: {
      animation: {
        'custom-spin': 'customSpin 2s linear infinite',
      },

    }

  },
  plugins: [],
})