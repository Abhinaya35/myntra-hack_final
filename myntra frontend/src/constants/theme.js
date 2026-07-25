/**
 * Regional Fashion Icons - Centralized Design Tokens & Theme System
 */
export const THEME = {
  colors: {
    primary: {
      DEFAULT: '#C2185B',
      hover: '#A3134C',
      light: '#FCE4EC',
    },
    secondary: {
      DEFAULT: '#8E24AA',
      hover: '#7B1FA2',
      light: '#F3E5F5',
    },
    accent: {
      DEFAULT: '#F6C453',
      hover: '#E5B13D',
      light: '#FEF9E7',
    },
    background: '#FAFAF8',
    surface: '#FFFFFF',
    text: {
      primary: '#1E293B',
      muted: '#64748B',
    },
    border: '#E2E8F0',
  },
  typography: {
    fontSerif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    fontSans: "'Plus Jakarta Sans', 'Inter', sans-serif",
  },
  spacing: {
    sectionPy: 'py-10 md:py-14',
    pagePadding: 'px-4 sm:px-6 lg:px-8 py-8 md:py-12',
    containerGap: 'gap-6 md:gap-8',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    subtle: '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',
    card: '0 4px 20px -2px rgba(30, 41, 59, 0.05)',
    elevated: '0 12px 30px -4px rgba(30, 41, 59, 0.08)',
  },
  animation: {
    durationFast: 0.15,
    durationNormal: 0.25,
    durationSlow: 0.4,
    easeDefault: 'easeOut',
  },
  layout: {
    maxContentWidth: 'max-w-7xl',
    narrowWidth: 'max-w-xl',
  },
};

export const COLOR_PALETTE = THEME.colors;

export const APP_CONFIG = {
  appName: 'Regional Fashion Icons',
  tagline: 'Discover India’s Authentic Fashion Ecosystem',
  defaultCity: 'Jaipur',
  defaultCoordinates: {
    lat: 26.9124,
    lng: 75.7873,
  },
};

export default THEME;
