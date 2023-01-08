/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ".src/screens/**/*.{js,ts,jsx,tsx}",
    ".src/pages/**/*.{js,ts,jsx,tsx}",
    ".src/components/**/*.{js,ts,jsx,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: ["nativewind/babel"],
};
