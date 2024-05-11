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
      },
      animation: {
        scrolling: 'scrolling 15s linear 1',
      },
      keyframes: {
        // Keyframe for scrolling overflow text
        scrolling: {
          '10%': {
            transform: 'translateX(0%)',
            left: '0%'
          },
          '50%': {
            transform: 'translateX(-100%)',
            left: '100%'
          },
          '60%': {
            transform: 'translateX(-100%)',
            left: '100%'
          },
          '100%': {
            transform: 'translateX(0%)',
            left: '0%'
          },
        },
      },
    }
  },
  plugins: [],
};
