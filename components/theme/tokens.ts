/**
 * Native Theme Tokens for Daily Deposits Fitness App
 * Compatible with React Native, Expo, and Gluestack UI v3
 * No web-specific CSS variables - pure React Native approach
 */

export type ColorModeType = 'light' | 'dark'

// Base color palette using hex values (React Native compatible)
export const baseColors = {
  // Brand colors - Professional fitness app palette
  brand: {
    primary: '#0070F0', // Electric blue - energetic and professional
    primaryLight: '#3B8EF3', // Lighter blue for interactive states
    primaryDark: '#0056CC', // Darker blue for pressed states
    accent: '#FF5722', // Energetic coral-red accent
    accentLight: '#FF7043', // Lighter coral for hover states
    accentDark: '#D84315', // Darker coral for pressed states
    secondary: '#6366F1', // Indigo for secondary actions
    tertiary: '#06D6A0', // Mint green for positive actions
  },

  // Enhanced fitness activity colors - Professional and vibrant
  fitness: {
    strength: '#E53935', // Strong red for strength training
    cardio: '#FF5722', // Energetic coral-red for cardio
    yoga: '#9C27B0', // Rich purple for yoga/mindfulness
    hiit: '#FF9800', // Bold orange for high-intensity
    running: '#4CAF50', // Fresh green for running
    cycling: '#00BCD4', // Cyan for cycling
    swimming: '#2196F3', // Ocean blue for swimming
    recovery: '#795548', // Warm brown for recovery
    calories: '#FF6B35', // Energetic orange for calories
    heartRate: '#E91E63', // Pink-red for heart rate
    steps: '#8BC34A', // Light green for steps
    distance: '#3F51B5', // Indigo for distance
    time: '#607D8B', // Blue-gray for time
    achievement: '#FFD700', // Gold for achievements
  },

  // Enhanced semantic colors with better contrast
  semantic: {
    success: '#06D6A0', // Bright mint green - more energetic than standard green
    warning: '#FF9500', // Vibrant orange - better visibility
    error: '#FF3B30', // iOS-style red - more attention-grabbing
    info: '#007AFF', // iOS-style blue - professional and clear
    positive: '#00C896', // For gains/improvements
    negative: '#FF453A', // For losses/decreases
  },

  // Professional neutral grayscale with better contrast
  neutral: {
    50: '#FAFBFC', // Slightly warmer white
    100: '#F4F6F8', // Light gray with better contrast
    200: '#E8ECF0', // Medium light gray
    300: '#D1D9E0', // Visible but subtle
    400: '#9AA5B1', // Better contrast for placeholders
    500: '#677788', // Readable secondary text
    600: '#4A5568', // Strong secondary text
    700: '#2D3748', // Dark text with good contrast
    800: '#1A202C', // Very dark for emphasis
    900: '#171923', // Near black
    950: '#0D1117', // True black alternative
  },

  // Pure colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
}

// Light theme token definitions - Professional fitness app
export const lightTheme = {
  // Surface colors with better hierarchy
  surface: {
    primary: baseColors.white,
    secondary: baseColors.neutral[50], // Subtle background
    tertiary: baseColors.neutral[100], // Card backgrounds
    quaternary: baseColors.neutral[200], // Elevated surfaces
    overlay: 'rgba(0, 0, 0, 0.6)', // Stronger overlay for modals
    glass: 'rgba(255, 255, 255, 0.15)', // Better glass effect
    elevated: baseColors.white, // Cards and floating elements
    accent: 'rgba(0, 112, 240, 0.08)', // Subtle brand tint
    success: 'rgba(6, 214, 160, 0.08)', // Success background tint
    warning: 'rgba(255, 149, 0, 0.08)', // Warning background tint
    error: 'rgba(255, 59, 48, 0.08)', // Error background tint
  },

  // Text colors with improved contrast
  text: {
    primary: baseColors.neutral[900], // High contrast for primary text
    secondary: baseColors.neutral[600], // Good contrast for secondary text
    tertiary: baseColors.neutral[500], // Readable tertiary text
    quaternary: baseColors.neutral[400], // Subtle text (was disabled, now more visible)
    inverse: baseColors.white, // White text on dark backgrounds
    brand: baseColors.brand.primary, // Brand color text
    accent: baseColors.brand.accent, // Accent color text
    muted: baseColors.neutral[500], // Muted but still readable
    disabled: baseColors.neutral[400], // Disabled state with better visibility
    placeholder: baseColors.neutral[400], // Visible placeholder text
    link: baseColors.brand.primary, // Link text
    success: baseColors.semantic.success, // Success text
    warning: baseColors.semantic.warning, // Warning text
    error: baseColors.semantic.error, // Error text
  },

  // Border colors with better definition
  border: {
    primary: baseColors.neutral[200], // Standard borders
    secondary: baseColors.neutral[100], // Subtle borders
    tertiary: baseColors.neutral[50], // Very subtle dividers
    strong: baseColors.neutral[300], // Stronger borders for emphasis
    focus: baseColors.brand.primary, // Focus ring
    error: baseColors.semantic.error, // Error state borders
    success: baseColors.semantic.success, // Success state borders
    warning: baseColors.semantic.warning, // Warning state borders
    disabled: baseColors.neutral[200], // More visible disabled borders
    interactive: baseColors.neutral[300], // Borders that invite interaction
    accent: baseColors.brand.accent, // Accent borders for highlights
  },

  // Interactive colors with professional feel
  interactive: {
    primary: {
      default: baseColors.brand.primary, // Electric blue
      hover: baseColors.brand.primaryLight, // Lighter blue on hover
      active: baseColors.brand.primaryDark, // Darker blue when pressed
      disabled: baseColors.neutral[300], // Better visibility for disabled
      loading: baseColors.brand.primaryLight, // Loading state
    },
    secondary: {
      default: baseColors.neutral[100], // Light gray background
      hover: baseColors.neutral[200], // Darker on hover
      active: baseColors.neutral[300], // Even darker when pressed
      disabled: baseColors.neutral[50], // Very light when disabled
      text: baseColors.neutral[700], // Dark text on light background
    },
    tertiary: {
      default: baseColors.transparent, // Ghost button
      hover: baseColors.neutral[50], // Subtle background on hover
      active: baseColors.neutral[100], // Light background when pressed
      disabled: baseColors.transparent, // Invisible when disabled
      text: baseColors.brand.primary, // Brand colored text
    },
    accent: {
      default: baseColors.brand.accent, // Coral accent
      hover: baseColors.brand.accentLight, // Lighter coral on hover
      active: baseColors.brand.accentDark, // Darker coral when pressed
      disabled: baseColors.neutral[300], // Disabled state
    },
    destructive: {
      default: baseColors.semantic.error, // Red for destructive actions
      hover: '#FF1F0F', // Darker red on hover
      active: '#E60012', // Even darker when pressed
      disabled: baseColors.neutral[300], // Disabled state
    },
  },

  // Enhanced semantic state colors
  semantic: {
    success: {
      default: baseColors.semantic.success, // Mint green
      light: '#F0FDF9', // Very light mint background
      dark: '#00A67D', // Darker mint for emphasis
      contrast: baseColors.white, // White text on success background
    },
    warning: {
      default: baseColors.semantic.warning, // Vibrant orange
      light: '#FFF8F0', // Light orange background
      dark: '#E6820E', // Darker orange for emphasis
      contrast: baseColors.white, // White text on warning background
    },
    error: {
      default: baseColors.semantic.error, // iOS-style red
      light: '#FFF5F5', // Light red background
      dark: '#D70015', // Darker red for emphasis
      contrast: baseColors.white, // White text on error background
    },
    info: {
      default: baseColors.semantic.info, // iOS-style blue
      light: '#F0F8FF', // Light blue background
      dark: '#0056CC', // Darker blue for emphasis
      contrast: baseColors.white, // White text on info background
    },
    positive: {
      default: baseColors.semantic.positive, // For gains/improvements
      light: '#F0FDF4', // Light green background
      dark: '#00A86B', // Darker green
      contrast: baseColors.white, // White text
    },
    negative: {
      default: baseColors.semantic.negative, // For losses/decreases
      light: '#FFF5F5', // Light red background
      dark: '#E6002E', // Darker red
      contrast: baseColors.white, // White text
    },
  },

  // Enhanced fitness activity colors with backgrounds
  fitness: {
    ...baseColors.fitness,
    // Add background variants for light theme
    backgrounds: {
      strength: 'rgba(229, 57, 53, 0.1)', // Light red background
      cardio: 'rgba(255, 87, 34, 0.1)', // Light coral background
      yoga: 'rgba(156, 39, 176, 0.1)', // Light purple background
      hiit: 'rgba(255, 152, 0, 0.1)', // Light orange background
      running: 'rgba(76, 175, 80, 0.1)', // Light green background
      cycling: 'rgba(0, 188, 212, 0.1)', // Light cyan background
      swimming: 'rgba(33, 150, 243, 0.1)', // Light blue background
      recovery: 'rgba(121, 85, 72, 0.1)', // Light brown background
      calories: 'rgba(255, 107, 53, 0.1)', // Light orange background
      heartRate: 'rgba(233, 30, 99, 0.1)', // Light pink background
      steps: 'rgba(139, 195, 74, 0.1)', // Light green background
      distance: 'rgba(63, 81, 181, 0.1)', // Light indigo background
      time: 'rgba(96, 125, 139, 0.1)', // Light blue-gray background
      achievement: 'rgba(255, 215, 0, 0.1)', // Light gold background
    },
  },

  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.15)',
    heavy: 'rgba(0, 0, 0, 0.25)',
  },
}

// Dark theme token definitions - Professional fitness app
export const darkTheme = {
  // Surface colors with proper dark mode hierarchy
  surface: {
    primary: '#0D1117', // GitHub dark - professional
    secondary: '#161B22', // Slightly lighter for cards
    tertiary: '#21262D', // Even lighter for elevated content
    quaternary: '#30363D', // Light surfaces, strong contrast
    overlay: 'rgba(0, 0, 0, 0.85)', // Strong overlay for modals
    glass: 'rgba(255, 255, 255, 0.08)', // Better glass effect in dark
    elevated: '#161B22', // Cards and floating elements
    accent: 'rgba(59, 142, 243, 0.15)', // Subtle brand tint for dark mode
    success: 'rgba(6, 214, 160, 0.15)', // Success background tint
    warning: 'rgba(255, 149, 0, 0.15)', // Warning background tint
    error: 'rgba(255, 59, 48, 0.15)', // Error background tint
  },

  // Text colors optimized for dark backgrounds
  text: {
    primary: '#F0F6FC', // High contrast white for primary text
    secondary: '#C9D1D9', // Good contrast for secondary text
    tertiary: '#8B949E', // Readable tertiary text
    quaternary: '#6E7681', // Subtle text (improved from disabled)
    inverse: baseColors.neutral[900], // Dark text on light backgrounds
    brand: '#3B8EF3', // Lighter brand color for dark mode
    accent: '#FF7043', // Lighter accent color for dark mode
    muted: '#8B949E', // Muted but readable
    disabled: '#6E7681', // Better visibility for disabled state
    placeholder: '#6E7681', // Visible placeholder text
    link: '#58A6FF', // GitHub blue for links
    success: '#7CE38B', // Bright success color
    warning: '#F2CC60', // Bright warning color
    error: '#FF7B72', // Bright error color
  },

  // Border colors optimized for dark mode
  border: {
    primary: '#30363D', // Visible borders in dark mode
    secondary: '#21262D', // Subtle borders
    tertiary: '#161B22', // Very subtle dividers
    strong: '#484F58', // Stronger borders for emphasis
    focus: '#58A6FF', // Bright blue focus ring
    error: '#FF7B72', // Bright red error borders
    success: '#7CE38B', // Bright green success borders
    warning: '#F2CC60', // Bright yellow warning borders
    disabled: '#30363D', // More visible disabled borders
    interactive: '#484F58', // Borders for interactive elements
    accent: '#FF7043', // Bright accent borders
  },

  // Interactive colors optimized for dark mode
  interactive: {
    primary: {
      default: '#1F6FEB', // Darker blue that works on dark backgrounds
      hover: '#58A6FF', // Brighter blue on hover
      active: '#388BFD', // Even brighter when pressed
      disabled: '#484F58', // More visible disabled state
      loading: '#58A6FF', // Loading state
    },
    secondary: {
      default: '#21262D', // Dark background
      hover: '#30363D', // Lighter on hover
      active: '#484F58', // Even lighter when pressed
      disabled: '#161B22', // Very dark when disabled
      text: '#F0F6FC', // Light text on dark background
    },
    tertiary: {
      default: baseColors.transparent, // Ghost button
      hover: '#161B22', // Subtle dark background on hover
      active: '#21262D', // Darker background when pressed
      disabled: baseColors.transparent, // Invisible when disabled
      text: '#58A6FF', // Bright brand color text
    },
    accent: {
      default: '#FD7E14', // Bright coral accent for dark mode
      hover: '#FF7043', // Even brighter on hover
      active: '#FF5722', // Brightest when pressed
      disabled: '#484F58', // Disabled state
    },
    destructive: {
      default: '#DA3633', // Red for destructive actions
      hover: '#FF7B72', // Brighter red on hover
      active: '#FF6B6B', // Even brighter when pressed
      disabled: '#484F58', // Disabled state
    },
  },

  // Enhanced semantic state colors for dark mode
  semantic: {
    success: {
      default: '#7CE38B', // Bright mint green for dark mode
      light: '#0D1A14', // Very dark green background
      dark: '#A2F2B4', // Even brighter mint
      contrast: '#0D1117', // Dark text on success background
    },
    warning: {
      default: '#F2CC60', // Bright orange for dark mode
      light: '#1A1206', // Very dark orange background
      dark: '#F9DC8C', // Even brighter orange
      contrast: '#0D1117', // Dark text on warning background
    },
    error: {
      default: '#FF7B72', // Bright red for dark mode
      light: '#1A0E0D', // Very dark red background
      dark: '#FFA198', // Even brighter red
      contrast: '#0D1117', // Dark text on error background
    },
    info: {
      default: '#58A6FF', // Bright blue for dark mode
      light: '#0C1829', // Very dark blue background
      dark: '#79C0FF', // Even brighter blue
      contrast: '#0D1117', // Dark text on info background
    },
    positive: {
      default: '#7CE38B', // Bright green for gains
      light: '#0D1A14', // Dark background
      dark: '#A2F2B4', // Brighter green
      contrast: '#0D1117', // Dark text
    },
    negative: {
      default: '#FF7B72', // Bright red for losses
      light: '#1A0E0D', // Dark background
      dark: '#FFA198', // Brighter red
      contrast: '#0D1117', // Dark text
    },
  },

  // Enhanced fitness activity colors for dark mode
  fitness: {
    strength: '#FF8A80', // Bright red for strength
    cardio: '#FF8A65', // Bright coral for cardio
    yoga: '#CE93D8', // Bright purple for yoga
    hiit: '#FFB74D', // Bright orange for HIIT
    running: '#81C784', // Bright green for running
    cycling: '#4FC3F7', // Bright cyan for cycling
    swimming: '#64B5F6', // Bright blue for swimming
    recovery: '#BCAAA4', // Warm brown for recovery
    calories: '#FFAB91', // Bright orange for calories
    heartRate: '#F48FB1', // Bright pink for heart rate
    steps: '#C5E1A5', // Bright green for steps
    distance: '#9FA8DA', // Bright indigo for distance
    time: '#B0BEC5', // Blue-gray for time
    achievement: '#FFE082', // Bright gold for achievements
    // Background variants for dark theme
    backgrounds: {
      strength: 'rgba(255, 138, 128, 0.2)', // Dark red background
      cardio: 'rgba(255, 138, 101, 0.2)', // Dark coral background
      yoga: 'rgba(206, 147, 216, 0.2)', // Dark purple background
      hiit: 'rgba(255, 183, 77, 0.2)', // Dark orange background
      running: 'rgba(129, 199, 132, 0.2)', // Dark green background
      cycling: 'rgba(79, 195, 247, 0.2)', // Dark cyan background
      swimming: 'rgba(100, 181, 246, 0.2)', // Dark blue background
      recovery: 'rgba(188, 170, 164, 0.2)', // Dark brown background
      calories: 'rgba(255, 171, 145, 0.2)', // Dark orange background
      heartRate: 'rgba(244, 143, 177, 0.2)', // Dark pink background
      steps: 'rgba(197, 225, 165, 0.2)', // Dark green background
      distance: 'rgba(159, 168, 218, 0.2)', // Dark indigo background
      time: 'rgba(176, 190, 197, 0.2)', // Dark blue-gray background
      achievement: 'rgba(255, 224, 130, 0.2)', // Dark gold background
    },
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
