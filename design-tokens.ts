/**
 * Professional Fitness App Design Tokens
 * Complete color system configuration for React Native / Expo
 *
 * This file provides a centralized location for all design tokens
 * and can be used for theming components across the application.
 *
 * Features:
 * - Electric blue primary with energetic coral accents
 * - Professional contrast ratios (WCAG AA compliant)
 * - Comprehensive light and dark mode support
 * - Fitness-specific activity and metric colors
 * - Enhanced semantic colors for better UX
 * - Fixed weak colors (placeholders, borders, disabled states)
 */

export {
  // Core theme tokens
  baseColors,
  lightTheme,
  darkTheme,
  themes,

  // Typography and spacing
  typography,
  spacing,
  borderRadius,
  elevation,
  animation,

  // Default theme configuration
  defaultThemeConfig,

  // Type definitions
  type ColorModeType,
  type ThemeTokens,
} from './components/theme/tokens'

export {
  // Legacy color exports for gradual migration
  Colors,
  semanticColors,
  fitnessColors,
} from './constants/Colors-old'

// Design system usage examples and utility functions
export const DesignSystemUsage = {
  // Primary action button
  primaryButton: {
    light: {
      backgroundColor: '#0070F0', // Electric blue
      color: '#FFFFFF',
      borderColor: '#0070F0',
      ':hover': {
        backgroundColor: '#3B8EF3',
      },
      ':active': {
        backgroundColor: '#0056CC',
      },
    },
    dark: {
      backgroundColor: '#1F6FEB',
      color: '#0D1117',
      borderColor: '#1F6FEB',
      ':hover': {
        backgroundColor: '#58A6FF',
      },
      ':active': {
        backgroundColor: '#388BFD',
      },
    },
  },

  // Secondary action button
  secondaryButton: {
    light: {
      backgroundColor: '#F4F6F8',
      color: '#4A5568',
      borderColor: '#E8ECF0',
      ':hover': {
        backgroundColor: '#E8ECF0',
      },
      ':active': {
        backgroundColor: '#D1D9E0',
      },
    },
    dark: {
      backgroundColor: '#21262D',
      color: '#F0F6FC',
      borderColor: '#30363D',
      ':hover': {
        backgroundColor: '#30363D',
      },
      ':active': {
        backgroundColor: '#484F58',
      },
    },
  },

  // Accent/CTA button
  accentButton: {
    light: {
      backgroundColor: '#FF5722', // Coral accent
      color: '#FFFFFF',
      borderColor: '#FF5722',
      ':hover': {
        backgroundColor: '#FF7043',
      },
      ':active': {
        backgroundColor: '#D84315',
      },
    },
    dark: {
      backgroundColor: '#FD7E14',
      color: '#0D1117',
      borderColor: '#FD7E14',
      ':hover': {
        backgroundColor: '#FF7043',
      },
      ':active': {
        backgroundColor: '#FF5722',
      },
    },
  },

  // Input field
  input: {
    light: {
      backgroundColor: '#FFFFFF',
      color: '#171923',
      borderColor: '#E8ECF0',
      placeholderColor: '#9AA5B1',
      ':focus': {
        borderColor: '#0070F0',
        boxShadow: '0 0 0 3px rgba(0, 112, 240, 0.1)',
      },
    },
    dark: {
      backgroundColor: '#21262D',
      color: '#F0F6FC',
      borderColor: '#30363D',
      placeholderColor: '#6E7681',
      ':focus': {
        borderColor: '#58A6FF',
        boxShadow: '0 0 0 3px rgba(88, 166, 255, 0.2)',
      },
    },
  },

  // Card component
  card: {
    light: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E8ECF0',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      backgroundColor: '#161B22',
      borderColor: '#30363D',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
  },

  // Navigation
  navigation: {
    light: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E8ECF0',
      activeColor: '#0070F0',
      inactiveColor: '#9AA5B1',
    },
    dark: {
      backgroundColor: '#161B22',
      borderColor: '#30363D',
      activeColor: '#58A6FF',
      inactiveColor: '#8B949E',
    },
  },

  // Fitness activity indicators
  fitnessActivities: {
    strength: {
      light: { color: '#E53935', backgroundColor: 'rgba(229, 57, 53, 0.1)' },
      dark: { color: '#FF8A80', backgroundColor: 'rgba(255, 138, 128, 0.2)' },
    },
    cardio: {
      light: { color: '#FF5722', backgroundColor: 'rgba(255, 87, 34, 0.1)' },
      dark: { color: '#FF8A65', backgroundColor: 'rgba(255, 138, 101, 0.2)' },
    },
    yoga: {
      light: { color: '#9C27B0', backgroundColor: 'rgba(156, 39, 176, 0.1)' },
      dark: { color: '#CE93D8', backgroundColor: 'rgba(206, 147, 216, 0.2)' },
    },
    hiit: {
      light: { color: '#FF9800', backgroundColor: 'rgba(255, 152, 0, 0.1)' },
      dark: { color: '#FFB74D', backgroundColor: 'rgba(255, 183, 77, 0.2)' },
    },
  },
}

// Color accessibility helpers
export const ColorAccessibility = {
  // Minimum contrast ratios for WCAG compliance
  contrastRatios: {
    normal: 4.5, // WCAG AA for normal text
    large: 3, // WCAG AA for large text (18px+ or 14px+ bold)
  },

  // Text color recommendations based on background
  getTextColor: (backgroundColor: 'light' | 'dark') =>
    backgroundColor === 'light' ? '#171923' : '#F0F6FC',

  // Get appropriate text color for semantic states
  getSemanticTextColor: (
    state: 'success' | 'warning' | 'error' | 'info',
    mode: 'light' | 'dark',
  ) => {
    const colors = {
      light: {
        success: '#00A67D',
        warning: '#E6820E',
        error: '#D70015',
        info: '#0056CC',
      },
      dark: {
        success: '#7CE38B',
        warning: '#F2CC60',
        error: '#FF7B72',
        info: '#58A6FF',
      },
    }
    return colors[mode][state]
  },
}

// Migration helpers for existing components
export const LegacyMigration = {
  // Map old color names to new ones
  colorMapping: {
    'emerald-500': '#0070F0', // Primary changed from green to blue
    'emerald-400': '#3B8EF3',
    'emerald-600': '#0056CC',
    'orange-500': '#FF5722', // More vibrant orange
    'slate-100': '#F4F6F8', // Warmer grays
    'slate-200': '#E8ECF0',
    'slate-300': '#D1D9E0',
    'slate-400': '#9AA5B1',
    'slate-500': '#677788',
  },

  // Component style migration examples
  migrateButton: (oldClassName: string) =>
    oldClassName
      .replace('bg-emerald-500', 'bg-brand-primary')
      .replace('hover:bg-emerald-600', 'hover:bg-brand-primary-light')
      .replace('text-slate-600', 'text-text-secondary')
      .replace('border-slate-200', 'border-border-primary'),
}
