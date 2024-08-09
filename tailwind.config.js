/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // primary: "#4c83c2",
        primary: "#B05884",
        secondary: "#54424b",
        third: "#f6f6f6",
      },
    },
  },
  plugins: [],
}
