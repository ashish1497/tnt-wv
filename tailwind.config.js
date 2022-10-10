/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  experimental: {
    optimizeUniversalDefaults: false,
  },
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1200px',
      xxl: '1655px',
    },
    extend: {
      height: {
        128: '32rem',
      },
      width: {
        128: '32rem',
      },
      // color gradients created from main at mycolor.space
      colors: {
        primary: {
          100: '#EC9C20',
          200: '#514538',
          300: '#B8A99A',
        },
        secondary: {
          100: '#47B2E6',
          200: '#374955',
          300: '#9AAEBC',
        },
      },
    },
  },
  plugins: [],
};
