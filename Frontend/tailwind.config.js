/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#252526",
        lightBlack: "#353535",
        newGreen: "#28a745",
        newRed: "#dc3545",
        NewColor: "#7f8c8d",
      },
    },
  },
  plugins: [],
};
