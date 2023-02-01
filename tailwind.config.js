/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      grayscale: {
        40: "40%",
      },
      colors: {
        cm: {
          primary: "#404895",
          primaryLight: "#4E56A5",
          violetGray: "#F0EFFA",
          tagGreen: "#60A769"
          
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        'mobile': '45rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};