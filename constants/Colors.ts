// Native React Native color system for Daily Deposits Fitness App
// Compatible with Expo + Gluestack UI + NativeWind

// Primary brand colors for fitness app
const brandColors = {
  primary: '#10B981', // Emerald green - main brand color
  primaryLight: '#34D399', // Lighter shade for hover states
  primaryDark: '#059669', // Darker shade for pressed states
  accent: '#F97316', // Orange accent for CTAs and highlights
}

// Fitness activity colors
export const fitnessColors = {
  strength: '#EF4444', // Red for strength training
  cardio: '#3B82F6', // Blue for cardio
  yoga: '#8B5CF6', // Purple for yoga/flexibility
  hiit: '#F97316', // Orange for HIIT
  running: '#10B981', // Green for running
  cycling: '#06B6D4', // Cyan for cycling
  swimming: '#0EA5E9', // Light blue for swimming
  recovery: '#6B7280', // Gray for recovery
}

// Main color export used by legacy components
export const Colors = {
  light: {
    text: '#0F172A',
    background: '#FFFFFF',
    tint: brandColors.primary,
    icon: '#475569',
    tabIconDefault: '#94A3B8',
    tabIconSelected: brandColors.primary,
  },
  dark: {
    text: '#F8FAFC',
    background: '#0A0A0B',
    tint: brandColors.primaryLight,
    icon: '#CBD5E1',
    tabIconDefault: '#64748B',
    tabIconSelected: brandColors.primaryLight,
  },
}

// Extended semantic color palette
export const semanticColors = {
  brand: brandColors,
  fitness: fitnessColors,

  // Surface colors
  surface: {
    light: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
    },
    dark: {
      primary: '#0A0A0B',
      secondary: '#18181B',
      tertiary: '#27272A',
    },
  },

  // Text colors
  text: {
    light: {
      primary: '#0F172A',
      secondary: '#475569',
      tertiary: '#94A3B8',
    },
    dark: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
      tertiary: '#64748B',
    },
  },

  // Border colors
  border: {
    light: {
      primary: '#E2E8F0',
      secondary: '#F1F5F9',
    },
    dark: {
      primary: '#374151',
      secondary: '#27272A',
    },
  },

  // Semantic state colors
  success: {
    light: '#10B981',
    dark: '#34D399',
  },
  warning: {
    light: '#F59E0B',
    dark: '#FBBF24',
  },
  error: {
    light: '#EF4444',
    dark: '#F87171',
  },
  info: {
    light: '#3B82F6',
    dark: '#60A5FA',
  },
}
