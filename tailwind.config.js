/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette personnalisée pour le thème piscine
        primary: {
          50: '#e6f3fa',
          100: '#cce7f5',
          200: '#99cfeb',
          300: '#66b7e1',
          400: '#339fd7',
          500: '#0087cd', // Bleu piscine principal
          600: '#006ca4',
          700: '#00517b',
          800: '#003652',
          900: '#001b29',
        },
        secondary: {
          50: '#f0f9f4',
          100: '#d9f0e3',
          200: '#b3e1c7',
          300: '#8cd2ab',
          400: '#66c38f',
          500: '#40b473', // Vert nature/jardin
          600: '#339059',
          700: '#266c43',
          800: '#1a482d',
          900: '#0d2416',
        },
        accent: {
          500: '#f59e0b', // Orange pour les CTAs
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
