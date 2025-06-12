/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        navy: {
          100: '#E0E9FF',
          600: '#004D99',
          700: '#1e3a8a',
          800: '#172554',
          900: '#001A33',
        },
      },
    },
  },
  plugins: [],
};
