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
          200: '#C3D6F5',
          300: '#94B6E5',
          400: '#5D90C8',
          500: '#2C5FA5',
          600: '#004D99',
          700: '#1e3a8a',
          800: '#172554',
          900: '#001A33',
        },
        dark: {
          background: '#1F2428',
          surface: '#262C31',
          border: '#343A40',
          text: '#E6EDF3',
          subtext: '#8B949E',
          accent: '#4F7DF9',
          icon: '#2C3440',
          btn: '#1A1F26',
          chip: '#2A2F35',
          chipHover: '#3A3F45',
        },
      },
    },
  },
  plugins: [],
};
