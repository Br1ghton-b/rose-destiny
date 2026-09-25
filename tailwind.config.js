/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          900: '#0A0A0A',
          800: '#141414',
          700: '#1C1C1C',
          600: '#262626',
        },
        ivory: {
          DEFAULT: '#FAF7F0',
          50: '#FDFBF6',
          100: '#FAF7F0',
          200: '#F3EEE2',
          300: '#E8E0CC',
        },
        gold: {
          DEFAULT: '#C9A24C',
          50: '#FBF6E8',
          100: '#F5E9C3',
          200: '#EAD18C',
          300: '#DCBA63',
          400: '#C9A24C',
          500: '#A98538',
          600: '#86692A',
          700: '#5E4A1E',
        },
        rouge: {
          DEFAULT: '#8E1B2A',
          50: '#FBEDEF',
          100: '#F4D1D5',
          200: '#E69BA3',
          300: '#D26370',
          400: '#B23A4A',
          500: '#8E1B2A',
          600: '#6E1320',
          700: '#4D0D17',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      letterSpacing: {
        'widest-2': '0.32em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DCBA63 0%, #C9A24C 50%, #86692A 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #C9A24C 0%, #F5E9C3 50%, #C9A24C 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
