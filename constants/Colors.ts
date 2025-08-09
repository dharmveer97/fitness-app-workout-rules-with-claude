const tintColorLight = '#10B981'
const tintColorDark = '#10B981'

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#0A0A0B',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
}

export const colors = {
  // Base colors
  black: '#000000',
  white: '#FFFFFF',

  // App specific colors
  background: '#0A0A0B',
  card: '#18181B',
  accent: '#F97316',

  // Gray scale
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0B',
  },

  // Primary colors (green)
  primary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981', // Main primary color
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Accent colors (orange)
  accentShades: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316', // Main accent color
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Fitness specific colors
  fitness: {
    strength: '#EF4444',
    cardio: '#3B82F6',
    yoga: '#8B5CF6',
    hiit: '#F97316',
    running: '#10B981',
    cycling: '#06B6D4',
    swimming: '#0EA5E9',
  },

  // Glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  // Gradients
  gradients: {
    primary: ['#10B981', '#059669'],
    accent: ['#F97316', '#EA580C'],
    dark: ['#0A0A0B', '#18181B'],
    glass: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'],
  },
} as const
