/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#317ECE",
          success: "#4ECB71",
          100: "#1BA5E2",
          green: "#04AF15",
          red: "#FF7373",
          light: "#E1E7F4",
          blue: "#327ECE",
        },
      },
    },
  },
  plugins: [],
};