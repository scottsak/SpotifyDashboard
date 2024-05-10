/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
      colors: {
        primary: '#37d760',
        dark: '#252525',
        darker: '#121212',
        muted: '#b3b3b3'
      }
    }
  },
  plugins: [],
}