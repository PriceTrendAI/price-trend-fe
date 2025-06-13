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
        dark: {
          background: '#1F2428', // 전체 배경
          surface: '#262C31', // 카드, 모달 등 서피스 배경
          border: '#343A40', // 테두리
          text: '#E6EDF3', // 기본 텍스트
          subtext: '#8B949E', // 서브 텍스트
          accent: '#4F7DF9', // 버튼, 링크 등 강조 색
          icon: '#2C3440',
        },
      },
    },
  },
  plugins: [],
};
