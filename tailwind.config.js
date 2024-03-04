
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
        fontFamily:{

            "fredoka":['"Fredoka"',...defaultTheme.fontFamily.sans]
        }
    },
  },
  plugins: [],
}