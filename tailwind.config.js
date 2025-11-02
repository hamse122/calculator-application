# Generated commit for documentation improvement
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
        'calc-bg': '#000000',
        'calc-display': '#1c1c1e',
        'calc-button-light': '#d2d2d7',
        'calc-button-dark': '#505050',
        'calc-button-orange': '#ff9500',
        'calc-button-gray': '#a6a6a6',
      },
      fontFamily: {
        'calc': ['SF Pro Display', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        // Apple-inspired button shadows for depth
        'button': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'button-pressed': 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

