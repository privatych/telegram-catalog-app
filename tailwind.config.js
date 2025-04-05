/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'telegram-background': 'var(--tg-theme-bg-color, #ffffff)',
        'telegram-text': 'var(--tg-theme-text-color, #000000)',
        'telegram-hint': 'var(--tg-theme-hint-color, #999999)',
        'telegram-link': 'var(--tg-theme-link-color, #2481cc)',
        'telegram-button': 'var(--tg-theme-button-color, #2481cc)',
        'telegram-button-text': 'var(--tg-theme-button-text-color, #ffffff)',
        'telegram-secondary-bg': 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
        'telegram-border': 'var(--tg-theme-section-header-text-color, #ededed)',
        'telegram-surface': 'rgba(0, 0, 0, 0.05)',
        'telegram-light': 'rgba(0, 0, 0, 0.03)'
      },
      maxWidth: {
        'tma': '480px',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0, 0, 0, 0.08)',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
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