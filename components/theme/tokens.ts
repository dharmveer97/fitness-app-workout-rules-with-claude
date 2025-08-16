/**
 * Native Theme Tokens for Daily Deposits Fitness App
 * Compatible with React Native, Expo, and Gluestack UI v3
 * No web-specific CSS variables - pure React Native approach
 */

export type ColorModeType = 'light' | 'dark'

// Base color palette using hex values (React Native compatible)
export const baseColors = {
  // Brand colors
  brand: {
    primary: '#10B981', // emerald-500
    primaryLight: '#34D399', // emerald-400
    primaryDark: '#059669', // emerald-600
    accent: '#F97316', // orange-500
    accentLight: '#FB923C', // orange-400
    accentDark: '#EA580C', // orange-600
  },

  // Fitness activity colors
  fitness: {
    strength: '#EF4444', // red-500
    cardio: '#3B82F6', // blue-500
    yoga: '#8B5CF6', // violet-500
    hiit: '#F97316', // orange-500
    running: '#10B981', // emerald-500
    cycling: '#06B6D4', // cyan-500
    swimming: '#0EA5E9', // sky-500
    recovery: '#6B7280', // gray-500
  },

  // Semantic colors
  semantic: {
    success: '#10B981', // emerald-500
    warning: '#F59E0B', // amber-500
    error: '#EF4444', // red-500
    info: '#3B82F6', // blue-500
  },

  // Neutral grayscale
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // Pure colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
}

// Light theme token definitions
export const lightTheme = {
  // Surface colors
  surface: {
    primary: baseColors.white,
    secondary: baseColors.neutral[50],
    tertiary: baseColors.neutral[100],
    quaternary: baseColors.neutral[200],
    overlay: 'rgba(0, 0, 0, 0.5)',
    glass: 'rgba(255, 255, 255, 0.1)',
    elevated: baseColors.white,
  },

  // Text colors
  text: {
    primary: baseColors.neutral[900],
    secondary: baseColors.neutral[600],
    tertiary: baseColors.neutral[400],
    inverse: baseColors.white,
    brand: baseColors.brand.primary,
    muted: baseColors.neutral[500],
    disabled: baseColors.neutral[300],
  },

  // Border colors
  border: {
    primary: baseColors.neutral[200],
    secondary: baseColors.neutral[100],
    tertiary: baseColors.neutral[50],
    focus: baseColors.brand.primary,
    error: baseColors.semantic.error,
    disabled: baseColors.neutral[100],
  },

  // Interactive colors
  interactive: {
    primary: {
      default: baseColors.brand.primary,
      hover: baseColors.brand.primaryDark,
      active: '#047857', // emerald-700
      disabled: baseColors.neutral[300],
    },
    secondary: {
      default: baseColors.neutral[100],
      hover: baseColors.neutral[200],
      active: baseColors.neutral[300],
      disabled: baseColors.neutral[50],
    },
    tertiary: {
      default: baseColors.transparent,
      hover: baseColors.neutral[50],
      active: baseColors.neutral[100],
      disabled: baseColors.transparent,
    },
  },

  // Semantic state colors
  semantic: {
    success: {
      default: baseColors.semantic.success,
      light: '#ECFDF5', // emerald-50
      dark: '#047857', // emerald-700
    },
    warning: {
      default: baseColors.semantic.warning,
      light: '#FFFBEB', // amber-50
      dark: '#D97706', // amber-600
    },
    error: {
      default: baseColors.semantic.error,
      light: '#FEF2F2', // red-50
      dark: '#DC2626', // red-600
    },
    info: {
      default: baseColors.semantic.info,
      light: '#EFF6FF', // blue-50
      dark: '#2563EB', // blue-600
    },
  },

  // Fitness activity colors (same in both themes)
  fitness: baseColors.fitness,

  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.15)',
    heavy: 'rgba(0, 0, 0, 0.25)',
  },
}

// Dark theme token definitions
export const darkTheme = {
  // Surface colors
  surface: {
    primary: '#0A0A0B', // zinc-950
    secondary: '#18181B', // zinc-900
    tertiary: '#27272A', // zinc-800
    quaternary: '#3F3F46', // zinc-700
    overlay: 'rgba(0, 0, 0, 0.8)',
    glass: 'rgba(255, 255, 255, 0.05)',
    elevated: '#18181B', // zinc-900
  },

  // Text colors
  text: {
    primary: baseColors.neutral[50],
    secondary: baseColors.neutral[300],
    tertiary: baseColors.neutral[500],
    inverse: baseColors.neutral[900],
    brand: baseColors.brand.primaryLight,
    muted: baseColors.neutral[400],
    disabled: baseColors.neutral[600],
  },

  // Border colors
  border: {
    primary: '#374151', // gray-700
    secondary: '#27272A', // zinc-800
    tertiary: '#18181B', // zinc-900
    focus: baseColors.brand.primaryLight,
    error: '#F87171', // red-400
    disabled: '#27272A', // zinc-800
  },

  // Interactive colors
  interactive: {
    primary: {
      default: baseColors.brand.primary,
      hover: baseColors.brand.primaryLight,
      active: '#6EE7B7', // emerald-300
      disabled: '#374151', // gray-700
    },
    secondary: {
      default: '#27272A', // zinc-800
      hover: '#3F3F46', // zinc-700
      active: '#52525B', // zinc-600
      disabled: '#18181B', // zinc-900
    },
    tertiary: {
      default: baseColors.transparent,
      hover: '#18181B', // zinc-900
      active: '#27272A', // zinc-800
      disabled: baseColors.transparent,
    },
  },

  // Semantic state colors
  semantic: {
    success: {
      default: baseColors.brand.primaryLight,
      light: '#064E3B', // emerald-900
      dark: '#6EE7B7', // emerald-300
    },
    warning: {
      default: '#FBBF24', // amber-400
      light: '#78350F', // amber-900
      dark: '#FCD34D', // amber-300
    },
    error: {
      default: '#F87171', // red-400
      light: '#7F1D1D', // red-900
      dark: '#FCA5A5', // red-300
    },
    info: {
      default: '#60A5FA', // blue-400
      light: '#1E3A8A', // blue-900
      dark: '#93C5FD', // blue-300
    },
  },

  // Fitness activity colors (brighter variants for dark mode)
  fitness: {
    strength: '#F87171', // red-400
    cardio: '#60A5FA', // blue-400
    yoga: '#A78BFA', // violet-400
    hiit: '#FB923C', // orange-400
    running: '#34D399', // emerald-400
    cycling: '#22D3EE', // cyan-400
    swimming: '#38BDF8', // sky-400
    recovery: '#9CA3AF', // gray-400
  },

  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.8)',
  },
}

// Theme object structure
export interface ThemeTokens {
  surface: typeof lightTheme.surface
  text: typeof lightTheme.text
  border: typeof lightTheme.border
  interactive: typeof lightTheme.interactive
  semantic: typeof lightTheme.semantic
  fitness: typeof lightTheme.fitness
  shadow: typeof lightTheme.shadow
}

// Export themes with proper typing
export const themes: Record<ColorModeType, ThemeTokens> = {
  light: lightTheme,
  dark: darkTheme,
}

// Typography scale (React Native compatible)
export const typography = {
  fontSizes: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },

  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
}

// Spacing scale (React Native compatible)
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
}

// Border radius scale
export const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  '4xl': 32,
  full: 9999,
}

// Elevation/Shadow scale for React Native
export const elevation = {
  0: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  1: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  2: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  3: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  4: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  5: {
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
}

// Animation durations
export const animation = {
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
}

// Export default theme configuration
export const defaultThemeConfig = {
  themes,
  typography,
  spacing,
  borderRadius,
  elevation,
  animation,
  baseColors,
}
