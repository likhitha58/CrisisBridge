/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f7a63',
          light: '#2a9d82',
          dark: '#165c4a',
        },
        accent: '#f3f4f6',
      },
    },
  },
  plugins: [],
}
