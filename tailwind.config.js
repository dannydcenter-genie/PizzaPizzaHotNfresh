/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pizza: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          red: '#FF2A3B',
          darkred: '#C81525',
        },
        cheese: {
          400: '#FBBF24',
          500: '#F59E0B',
          neon: '#FFB800',
        },
        fresh: {
          green: '#10B981',
          emerald: '#059669',
        },
        dark: {
          bg: '#0D0F14',
          card: '#161922',
          border: '#242938',
          text: '#F3F4F6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace']
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 2s infinite ease-in-out',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 25px rgba(255, 42, 59, 0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 10px rgba(255, 42, 59, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
