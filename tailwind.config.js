/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        telegram: {
          primary: '#3390ec',
          secondary: '#2481cc',
          background: '#ffffff',
          surface: '#f4f4f5',
          light: '#f8f9fa',
          text: '#000000',
          'text-secondary': '#707579',
          border: '#dadce0',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(31, 41, 55, 0.1)',
        'card-hover': '0 2px 4px rgba(31, 41, 55, 0.15)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 