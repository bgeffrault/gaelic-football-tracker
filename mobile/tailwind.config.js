/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./App.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        orange: {
          400: "#DC4925",
          500: "#E44D26",
          800: "#421407",
        },
        blue: {
          200: "#90CBD7",
          400: "#6F9FA8",
          600: "#47666B",
          800: "#1C282B",
        },
      },
      fontFamily: {
        sans: ["Lexend"],
      },
    },
  },
  plugins: ["nativewind/babel"],
};
