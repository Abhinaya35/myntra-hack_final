/** @type {import('tailwindcss').Config} */
import { THEME } from './src/constants/theme.js';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: THEME.colors.primary,
        secondary: THEME.colors.secondary,
        accent: THEME.colors.accent,
        background: THEME.colors.background,
        surface: THEME.colors.surface,
        text: THEME.colors.text,
        border: THEME.colors.border,
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
      },
      boxShadow: THEME.shadows,
      borderRadius: THEME.borderRadius,
      maxWidth: {
        'content': '80rem', // 7xl (1280px)
      }
    },
  },
  plugins: [],
}
