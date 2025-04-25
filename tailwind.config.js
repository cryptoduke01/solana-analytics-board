/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#040512",
          neon: "#C4FF61",
        },
      },
    },
  },
  plugins: [],
}
