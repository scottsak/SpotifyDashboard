/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        spacing: 'margin, padding',
        left: 'left',
      },
      colors: {
        primary: '#1cd760',
        medium: '#282828',
        dark: '#252525',
        darker: '#121212',
        muted: '#b3b3b3',
      },
      animation: {
        scrolling: 'scrolling 15s linear 1',
      },
      keyframes: {
        // Keyframe for scrolling overflow text
        scrolling: {
          '10%': {
            transform: 'translateX(0%)',
            left: '0%',
          },
          '50%': {
            transform: 'translateX(-100%)',
            left: '100%',
          },
          '60%': {
            transform: 'translateX(-100%)',
            left: '100%',
          },
          '100%': {
            transform: 'translateX(0%)',
            left: '0%',
          },
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
