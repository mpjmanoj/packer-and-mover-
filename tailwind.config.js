/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#EAF4FF',
          blue: '#2563EB',
          darkBlue: '#1D4ED8',
          navy: '#1E293B',
          slate: '#0F172A',
          ice: '#F8FAFC',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-glow': '0 20px 40px -15px rgba(37, 99, 235, 0.12)',
        'card-hover': '0 25px 50px -12px rgba(30, 41, 59, 0.12)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      borderRadius: {
        'xl': '1rem',      // 16px
        '2xl': '1.25rem',  // 20px
        '3xl': '1.5rem',   // 24px
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'truck-drive': 'truckDrive 8s linear infinite',
        'wheel-spin': 'wheelSpin 0.6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        truckDrive: {
          '0%': { transform: 'translateX(-120%)' },
          '20%': { transform: 'translateX(0%)' },
          '80%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        wheelSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
