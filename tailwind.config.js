



/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {
      colors: {
        "black": "#000000",
        "ash": "rgb(235, 235, 235)",
        "ash2": "rgb(137,137,137)"
      },
      animation: {
        'slide-in': 'slideIn 0.5s forwards',
        'pop-up': 'popUp 0.8s forwards',
      },
      keyframes: {
        slideIn: {
          'from': {
            transform: 'translateX(-100%)',  // Start from left off-screen
          },
          'to': {
            transform: 'translateX(0)'
          },
        },

        popUp: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.7)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },

  },
  plugins: [],

})

