/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Soft brand palette — deliberately lighter than the logo's deep
        // navy and cerise, per the brief ("soft, not too deep").
        navy: {
          50: '#F3F6FC',
          100: '#E6ECF7',
          200: '#CCD8EF',
          300: '#A3B7DE',
          400: '#7390C7',
          500: '#5373B3',
          600: '#415E9C',
          700: '#354D84',
          800: '#2D406B',
          900: '#233254',
        },
        rose: {
          50: '#FDF4F8',
          100: '#FBE8F1',
          200: '#F6CDE0',
          300: '#EFA8C8',
          400: '#E580AF',
          500: '#D95F98',
          600: '#C44A84',
          700: '#A33A6C',
        },
        pearl: {
          DEFAULT: '#FCFAF9',
          100: '#F8F4F3',
          200: '#F1EBEA',
        },
        // Legacy tokens kept for the unused florist files still in the repo.
        ink: { DEFAULT: '#0A0A0A' },
        ivory: { DEFAULT: '#FAF7F0', 50: '#FDFBF6' },
        gold: { DEFAULT: '#C9A24C', 500: '#A98538' },
        rouge: { DEFAULT: '#8E1B2A' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        script: ['Allura', '"Pinyon Script"', 'cursive'],
      },
      boxShadow: {
        soft: '0 20px 50px -24px rgba(45, 64, 107, 0.22)',
        lift: '0 30px 70px -30px rgba(45, 64, 107, 0.35)',
        rose: '0 16px 36px -14px rgba(217, 95, 152, 0.55)',
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        float: 'float 7s ease-in-out infinite',
        twinkle: 'twinkle 3.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
};
