// Native React Native color system for Daily Deposits Fitness App
// Compatible with Expo + Gluestack UI + NativeWind

// Professional fitness app brand colors - Electric blue theme
const brandColors = {
  primary: '#0070F0', // Electric blue - energetic and professional
  primaryLight: '#3B8EF3', // Lighter blue for interactive states
  primaryDark: '#0056CC', // Darker blue for pressed states
  accent: '#FF5722', // Energetic coral-red accent for CTAs
  secondary: '#6366F1', // Indigo for secondary actions
  tertiary: '#06D6A0', // Mint green for positive actions
}

// Professional fitness activity colors with metrics
export const fitnessColors = {
  strength: '#E53935', // Strong red for strength training
  cardio: '#FF5722', // Energetic coral-red for cardio
  yoga: '#9C27B0', // Rich purple for yoga/mindfulness
  hiit: '#FF9800', // Bold orange for high-intensity
  running: '#4CAF50', // Fresh green for running
  cycling: '#00BCD4', // Cyan for cycling
  swimming: '#2196F3', // Ocean blue for swimming
  recovery: '#795548', // Warm brown for recovery
  // Fitness metrics colors
  calories: '#FF6B35', // Energetic orange for calories
  heartRate: '#E91E63', // Pink-red for heart rate
  steps: '#8BC34A', // Light green for steps
  distance: '#3F51B5', // Indigo for distance
  time: '#607D8B', // Blue-gray for time
  achievement: '#FFD700', // Gold for achievements
}

// Main color export for legacy components - Professional fitness theme
export const Colors = {
  light: {
    text: '#171923', // High contrast dark text
    background: '#FFFFFF', // Clean white background
    tint: brandColors.primary, // Electric blue tint
    icon: '#4A5568', // Darker icons for better visibility
    tabIconDefault: '#9AA5B1', // More visible inactive tabs
    tabIconSelected: brandColors.primary, // Electric blue for selected tabs
    surface: '#FAFBFC', // Slightly warm white for surfaces
    border: '#E8ECF0', // Subtle borders
    accent: brandColors.accent, // Coral accent
  },
  dark: {
    text: '#F0F6FC', // High contrast light text
    background: '#0D1117', // Professional dark background (GitHub style)
    tint: '#58A6FF', // Brighter blue for dark mode
    icon: '#C9D1D9', // Light gray icons
    tabIconDefault: '#8B949E', // Subtle inactive tabs
    tabIconSelected: '#58A6FF', // Bright blue for selected tabs
    surface: '#161B22', // Dark surface color
    border: '#30363D', // Visible dark borders
    accent: '#FF7043', // Bright coral accent for dark mode
  },
}

// Professional semantic color palette for fitness app - GlueStack compatible
export const semanticColors = {
  brand: brandColors,
  fitness: fitnessColors,

  // Professional surface colors
  surface: {
    light: {
      primary: '#FFFFFF', // Clean white
      secondary: '#FAFBFC', // Slightly warm white
      tertiary: '#F4F6F8', // Light gray surfaces
      elevated: '#FFFFFF', // Elevated white surfaces
      accent: 'rgba(0, 112, 240, 0.08)', // Subtle brand tint
    },
    dark: {
      primary: '#0D1117', // Professional dark (GitHub style)
      secondary: '#161B22', // Card backgrounds
      tertiary: '#21262D', // Elevated surfaces
      elevated: '#161B22', // Floating elements
      accent: 'rgba(88, 166, 255, 0.15)', // Subtle brand tint for dark
    },
  },

  // Professional text colors with better contrast
  text: {
    light: {
      primary: '#171923', // High contrast black
      secondary: '#4A5568', // Readable secondary text
      tertiary: '#677788', // Subtle but visible
      muted: '#9AA5B1', // Muted text
      placeholder: '#9AA5B1', // Visible placeholders
      brand: brandColors.primary, // Brand color text
      accent: brandColors.accent, // Accent text
    },
    dark: {
      primary: '#F0F6FC', // High contrast white
      secondary: '#C9D1D9', // Readable secondary text
      tertiary: '#8B949E', // Subtle but visible
      muted: '#6E7681', // Muted text
      placeholder: '#6E7681', // Visible placeholders
      brand: '#58A6FF', // Bright brand color for dark
      accent: '#FF7043', // Bright accent for dark
    },
  },

  // Professional border colors
  border: {
    light: {
      primary: '#E8ECF0', // Standard borders
      secondary: '#F4F6F8', // Subtle borders
      strong: '#D1D9E0', // Emphasized borders
      interactive: '#D1D9E0', // Interactive element borders
      focus: brandColors.primary, // Focus ring
      accent: brandColors.accent, // Accent borders
    },
    dark: {
      primary: '#30363D', // Visible dark borders
      secondary: '#21262D', // Subtle dark borders
      strong: '#484F58', // Emphasized borders
      interactive: '#484F58', // Interactive element borders
      focus: '#58A6FF', // Bright focus ring
      accent: '#FF7043', // Bright accent borders
    },
  },

  // Interactive colors for GlueStack components
  interactive: {
    light: {
      primary: {
        default: brandColors.primary,
        hover: brandColors.primaryLight,
        pressed: brandColors.primaryDark,
        disabled: '#9AA5B1',
      },
      accent: {
        default: brandColors.accent,
        hover: '#FF7043',
        pressed: '#E64A19',
        disabled: '#FFAB91',
      },
    },
    dark: {
      primary: {
        default: '#58A6FF',
        hover: '#79B8FF',
        pressed: '#388BFD',
        disabled: '#6E7681',
      },
      accent: {
        default: '#FF7043',
        hover: '#FF8A65',
        pressed: '#FF5722',
        disabled: '#FFAB91',
      },
    },
  },

  // Enhanced semantic state colors
  success: {
    light: '#06D6A0', // Bright mint green
    dark: '#7CE38B', // Bright success for dark mode
    background: {
      light: '#F0FDF9', // Light success background
      dark: '#0D1A14', // Dark success background
    },
  },
  warning: {
    light: '#FF9500', // Vibrant orange
    dark: '#F2CC60', // Bright warning for dark mode
    background: {
      light: '#FFF8F0', // Light warning background
      dark: '#1A1206', // Dark warning background
    },
  },
  error: {
    light: '#FF3B30', // iOS-style red
    dark: '#FF7B72', // Bright error for dark mode
    background: {
      light: '#FFF5F5', // Light error background
      dark: '#1A0E0D', // Dark error background
    },
  },
  info: {
    light: '#007AFF', // iOS-style blue
    dark: '#58A6FF', // Bright info for dark mode
    background: {
      light: '#F0F8FF', // Light info background
      dark: '#0C1829', // Dark info background
    },
  },
  // Additional semantic colors for fitness metrics
  positive: {
    light: '#00C896', // For gains/improvements
    dark: '#7CE38B', // Bright positive for dark
  },
  negative: {
    light: '#FF453A', // For losses/decreases
    dark: '#FF7B72', // Bright negative for dark
  },
}
