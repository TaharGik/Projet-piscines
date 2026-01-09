/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charte graphique BBH SERVICE - Couleurs officielles
        primary: {
          DEFAULT: '#0F2A44', // Bleu foncé principal
          50: '#E8EDF2',
          100: '#C5D3E0',
          500: '#0F2A44',
          600: '#0C2238',
          700: '#091A2B',
          dark: '#0F2A44',
        },
        secondary: {
          DEFAULT: '#2FB8B3', // Bleu secondaire/accent - CTA
        },
        accent: {
          light: '#33A7E4',    // Bleu clair
          lighter: '#99DFEC',  // Bleu très clair
          pastel: '#8FD7FE',   // Bleu pastel
        },
        neutral: {
          50: '#F3F5F9',       // Alias pour bg-neutral-50
          white: '#FFFFFF',
          light: '#F3F5F9',    // Gris très clair - fonds
          black: '#000000',
        },
        // Gris Tailwind standards pour compatibilité
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        // Typographies BBH SERVICE
        sans: ['Lato', 'system-ui', 'sans-serif'],      // Texte courant
        heading: ['Montserrat', 'sans-serif'],          // Titres
      },
      fontWeight: {
        // Poids autorisés par la charte
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        // Coins légèrement arrondis selon la charte
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        // Ombres légères uniquement
        'soft': '0 2px 8px rgba(15, 42, 68, 0.08)',
        'card': '0 4px 12px rgba(15, 42, 68, 0.1)',
      },
      keyframes: {
        'slow-bounce': {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-15px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'slow-bounce': 'slow-bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
