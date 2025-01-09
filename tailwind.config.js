/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shrink: {
          to: {
            height: "0"
          }
        }
      },
        animation: {
          shrinkAfterDelay: "shrink 3s 1s forwards"
        }
    },
  },
  plugins: [],
}

