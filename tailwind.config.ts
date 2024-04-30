/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#37d760',
        dark: '#252525',
        muted: '#b3b3b3'
      }
    }
  },
  plugins: [],
}