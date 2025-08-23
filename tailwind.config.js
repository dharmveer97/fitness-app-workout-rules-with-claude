/** @type {import('tailwindcss').Config} */
module.exports = {
  // Native-compatible dark mode configuration for React Native
  darkMode: 'class',
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  safelist: [
    // Main color system patterns
    'bg-surface-primary',
    'bg-surface-secondary',
    'bg-surface-tertiary',
    'text-primary',
    'text-secondary',
    'text-tertiary',
    'text-brand',
    'text-accent',
    'border-primary',
    'border-secondary',
    'border-focus',
    'bg-interactive-primary-default',
    'bg-interactive-primary-hover',
    'bg-interactive-secondary-default',
    'bg-interactive-accent-default',
    // Semantic colors
    'bg-semantic-success-bg',
    'bg-semantic-warning-bg',
    'bg-semantic-error-bg',
    'bg-semantic-info-bg',
    'text-semantic-success',
    'text-semantic-warning',
    'text-semantic-error',
    'text-semantic-info',
    // Common utility classes
    'text-white',
    'text-black',
    'bg-white',
    'bg-black',
    'bg-transparent',
    'border-transparent',
    'border-white',
    'border-black',
  ],
  theme: {
    extend: {
      colors: {
        // PROFESSIONAL FITNESS THEME TOKENS (React Native compatible)
        // Surface colors with professional hierarchy
        surface: {
          primary: '#FFFFFF', // Clean white background
          secondary: '#FAFBFC', // Slightly warm white
          tertiary: '#F4F6F8', // Light gray surfaces
          quaternary: '#E8ECF0', // Medium light gray
          overlay: 'rgba(0, 0, 0, 0.6)', // Stronger overlay
          glass: 'rgba(255, 255, 255, 0.15)', // Better glass effect
          elevated: '#FFFFFF', // Cards and floating elements
          accent: 'rgba(0, 112, 240, 0.08)', // Subtle brand tint
          // Dark mode surfaces
          'primary-dark': '#0D1117', // Professional dark (GitHub style)
          'secondary-dark': '#161B22', // Card backgrounds
          'tertiary-dark': '#21262D', // Elevated surfaces
          'quaternary-dark': '#30363D', // Light surfaces with strong contrast
          'overlay-dark': 'rgba(0, 0, 0, 0.85)', // Strong dark overlay
          'glass-dark': 'rgba(255, 255, 255, 0.08)', // Dark glass effect
          'elevated-dark': '#161B22', // Dark floating elements
          'accent-dark': 'rgba(88, 166, 255, 0.15)', // Dark brand tint
        },

        // Professional text colors with improved contrast
        text: {
          primary: '#171923', // High contrast dark text
          secondary: '#4A5568', // Readable secondary text
          tertiary: '#677788', // Subtle but visible tertiary
          quaternary: '#9AA5B1', // Subtle text (better than disabled)
          inverse: '#FFFFFF', // White on dark backgrounds
          brand: '#0070F0', // Electric blue brand text
          accent: '#FF5722', // Coral accent text
          muted: '#677788', // Muted but readable
          disabled: '#9AA5B1', // Better visibility for disabled
          placeholder: '#9AA5B1', // Visible placeholder text
          link: '#0070F0', // Link text
          success: '#06D6A0', // Success text
          warning: '#FF9500', // Warning text
          error: '#FF3B30', // Error text
          // Dark mode text colors
          'primary-dark': '#F0F6FC', // High contrast light text
          'secondary-dark': '#C9D1D9', // Readable secondary
          'tertiary-dark': '#8B949E', // Subtle but visible
          'quaternary-dark': '#6E7681', // Subtle text
          'brand-dark': '#58A6FF', // Bright brand for dark
          'accent-dark': '#FF7043', // Bright accent for dark
          'muted-dark': '#8B949E', // Muted dark text
          'disabled-dark': '#6E7681', // Better disabled visibility
          'placeholder-dark': '#6E7681', // Dark placeholder
          'link-dark': '#58A6FF', // Dark link text
          'success-dark': '#7CE38B', // Dark success text
          'warning-dark': '#F2CC60', // Dark warning text
          'error-dark': '#FF7B72', // Dark error text
        },

        // Professional border colors with better definition
        border: {
          primary: '#E8ECF0', // Standard borders
          secondary: '#F4F6F8', // Subtle borders
          tertiary: '#FAFBFC', // Very subtle dividers
          strong: '#D1D9E0', // Emphasized borders
          focus: '#0070F0', // Electric blue focus ring
          error: '#FF3B30', // Error borders
          success: '#06D6A0', // Success borders
          warning: '#FF9500', // Warning borders
          disabled: '#E8ECF0', // More visible disabled borders
          interactive: '#D1D9E0', // Interactive element borders
          accent: '#FF5722', // Accent borders
          // Dark mode borders
          'primary-dark': '#30363D', // Visible dark borders
          'secondary-dark': '#21262D', // Subtle dark borders
          'tertiary-dark': '#161B22', // Very subtle dark dividers
          'strong-dark': '#484F58', // Emphasized dark borders
          'focus-dark': '#58A6FF', // Bright focus for dark
          'error-dark': '#FF7B72', // Dark error borders
          'success-dark': '#7CE38B', // Dark success borders
          'warning-dark': '#F2CC60', // Dark warning borders
          'disabled-dark': '#30363D', // Dark disabled borders
          'interactive-dark': '#484F58', // Dark interactive borders
          'accent-dark': '#FF7043', // Dark accent borders
        },

        // Professional interactive colors
        interactive: {
          primary: {
            default: '#0070F0', // Electric blue
            hover: '#3B8EF3', // Lighter blue on hover
            active: '#0056CC', // Darker blue when pressed
            disabled: '#9AA5B1', // Better disabled visibility
            loading: '#3B8EF3', // Loading state
            text: '#FFFFFF', // White text on primary
            // Dark mode variants
            'default-dark': '#1F6FEB', // Darker blue for dark backgrounds
            'hover-dark': '#58A6FF', // Brighter on hover
            'active-dark': '#388BFD', // Brightest when pressed
            'disabled-dark': '#484F58', // Dark disabled state
            'text-dark': '#0D1117', // Dark text when needed
          },
          secondary: {
            default: '#F4F6F8', // Light gray background
            hover: '#E8ECF0', // Darker on hover
            active: '#D1D9E0', // Even darker when pressed
            disabled: '#FAFBFC', // Very light disabled
            text: '#4A5568', // Dark text on light background
            // Dark mode variants
            'default-dark': '#21262D', // Dark background
            'hover-dark': '#30363D', // Lighter on hover
            'active-dark': '#484F58', // Even lighter when pressed
            'disabled-dark': '#161B22', // Very dark disabled
            'text-dark': '#F0F6FC', // Light text on dark
          },
          tertiary: {
            default: 'transparent', // Ghost button
            hover: '#FAFBFC', // Subtle background on hover
            active: '#F4F6F8', // Light background when pressed
            disabled: 'transparent', // Invisible when disabled
            text: '#0070F0', // Brand colored text
            // Dark mode variants
            'default-dark': 'transparent', // Ghost button
            'hover-dark': '#161B22', // Subtle dark background on hover
            'active-dark': '#21262D', // Darker background when pressed
            'text-dark': '#58A6FF', // Bright brand text
          },
          accent: {
            default: '#FF5722', // Coral accent
            hover: '#FF7043', // Lighter coral on hover
            active: '#D84315', // Darker coral when pressed
            disabled: '#9AA5B1', // Disabled state
            text: '#FFFFFF', // White text on accent
            // Dark mode variants
            'default-dark': '#FD7E14', // Bright coral for dark
            'hover-dark': '#FF7043', // Even brighter on hover
            'active-dark': '#FF5722', // Brightest when pressed
            'text-dark': '#0D1117', // Dark text when needed
          },
          destructive: {
            default: '#FF3B30', // Red for destructive actions
            hover: '#FF1F0F', // Darker red on hover
            active: '#E60012', // Even darker when pressed
            disabled: '#9AA5B1', // Disabled state
            text: '#FFFFFF', // White text on red
            // Dark mode variants
            'default-dark': '#DA3633', // Dark mode red
            'hover-dark': '#FF7B72', // Brighter red on hover
            'active-dark': '#FF6B6B', // Even brighter when pressed
            'text-dark': '#0D1117', // Dark text when needed
          },
        },

        // Enhanced semantic colors for fitness app
        semantic: {
          success: {
            default: '#06D6A0', // Bright mint green
            light: '#F0FDF9', // Light success background
            dark: '#00A67D', // Darker mint for emphasis
            contrast: '#FFFFFF', // White text on success
            // Dark mode variants
            'default-dark': '#7CE38B', // Bright mint for dark
            'light-dark': '#0D1A14', // Very dark green background
            'dark-dark': '#A2F2B4', // Even brighter mint
            'contrast-dark': '#0D1117', // Dark text on success
          },
          warning: {
            default: '#FF9500', // Vibrant orange
            light: '#FFF8F0', // Light orange background
            dark: '#E6820E', // Darker orange for emphasis
            contrast: '#FFFFFF', // White text on warning
            // Dark mode variants
            'default-dark': '#F2CC60', // Bright orange for dark
            'light-dark': '#1A1206', // Very dark orange background
            'dark-dark': '#F9DC8C', // Even brighter orange
            'contrast-dark': '#0D1117', // Dark text on warning
          },
          error: {
            default: '#FF3B30', // iOS-style red
            light: '#FFF5F5', // Light red background
            dark: '#D70015', // Darker red for emphasis
            contrast: '#FFFFFF', // White text on error
            // Dark mode variants
            'default-dark': '#FF7B72', // Bright red for dark
            'light-dark': '#1A0E0D', // Very dark red background
            'dark-dark': '#FFA198', // Even brighter red
            'contrast-dark': '#0D1117', // Dark text on error
          },
          info: {
            default: '#007AFF', // iOS-style blue
            light: '#F0F8FF', // Light blue background
            dark: '#0056CC', // Darker blue for emphasis
            contrast: '#FFFFFF', // White text on info
            // Dark mode variants
            'default-dark': '#58A6FF', // Bright blue for dark
            'light-dark': '#0C1829', // Very dark blue background
            'dark-dark': '#79C0FF', // Even brighter blue
            'contrast-dark': '#0D1117', // Dark text on info
          },
          positive: {
            default: '#00C896', // For gains/improvements
            light: '#F0FDF4', // Light background
            dark: '#00A86B', // Darker variant
            contrast: '#FFFFFF', // White text
            // Dark mode variants
            'default-dark': '#7CE38B', // Bright positive
            'light-dark': '#0D1A14', // Dark background
            'dark-dark': '#A2F2B4', // Brighter positive
            'contrast-dark': '#0D1117', // Dark text
          },
          negative: {
            default: '#FF453A', // For losses/decreases
            light: '#FFF5F5', // Light background
            dark: '#E6002E', // Darker variant
            contrast: '#FFFFFF', // White text
            // Dark mode variants
            'default-dark': '#FF7B72', // Bright negative
            'light-dark': '#1A0E0D', // Dark background
            'dark-dark': '#FFA198', // Brighter negative
            'contrast-dark': '#0D1117', // Dark text
          },
        },

        // Professional fitness brand colors
        brand: {
          primary: '#0070F0', // Electric blue - main brand
          'primary-light': '#3B8EF3', // Lighter blue for interactions
          'primary-dark': '#0056CC', // Darker blue for pressed states
          accent: '#FF5722', // Energetic coral-red accent
          'accent-light': '#FF7043', // Lighter coral for hover
          'accent-dark': '#D84315', // Darker coral for pressed
          secondary: '#6366F1', // Indigo for secondary actions
          'secondary-light': '#818CF8', // Lighter indigo
          'secondary-dark': '#4F46E5', // Darker indigo
          tertiary: '#06D6A0', // Mint green for positive actions
          'tertiary-light': '#34D399', // Lighter mint
          'tertiary-dark': '#059669', // Darker mint
          // Dark mode brand variants
          'primary-dm': '#58A6FF', // Bright blue for dark mode
          'accent-dm': '#FF7043', // Bright coral for dark mode
          'secondary-dm': '#A78BFA', // Bright indigo for dark mode
          'tertiary-dm': '#7CE38B', // Bright mint for dark mode
        },

        // Professional fitness activity colors with metrics
        fitness: {
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
          'heart-rate': '#E91E63', // Pink-red for heart rate
          steps: '#8BC34A', // Light green for steps
          distance: '#3F51B5', // Indigo for distance
          time: '#607D8B', // Blue-gray for time
          achievement: '#FFD700', // Gold for achievements
          // Dark mode fitness variants (brighter colors)
          'strength-dark': '#FF8A80', // Bright red for dark mode
          'cardio-dark': '#FF8A65', // Bright coral for dark mode
          'yoga-dark': '#CE93D8', // Bright purple for dark mode
          'hiit-dark': '#FFB74D', // Bright orange for dark mode
          'running-dark': '#81C784', // Bright green for dark mode
          'cycling-dark': '#4FC3F7', // Bright cyan for dark mode
          'swimming-dark': '#64B5F6', // Bright blue for dark mode
          'recovery-dark': '#BCAAA4', // Warm brown for dark mode
          'calories-dark': '#FFAB91', // Bright orange for dark mode
          'heart-rate-dark': '#F48FB1', // Bright pink for dark mode
          'steps-dark': '#C5E1A5', // Bright green for dark mode
          'distance-dark': '#9FA8DA', // Bright indigo for dark mode
          'time-dark': '#B0BEC5', // Blue-gray for dark mode
          'achievement-dark': '#FFE082', // Bright gold for dark mode
        },

        // Professional neutral palette with better contrast
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
          950: '#0D1117', // Professional dark (GitHub style)
        },

        // Legacy color support (for gradual migration)
        gray: {
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

        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },

        secondary: {
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

        tertiary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },

        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },

        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
          950: '#450A0A',
        },

        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },

        info: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
      },
      fontFamily: {
        heading: undefined,
        body: undefined,
        mono: undefined,
        jakarta: ['var(--font-plus-jakarta-sans)'],
        roboto: ['var(--font-roboto)'],
        code: ['var(--font-source-code-pro)'],
        inter: ['var(--font-inter)'],
        'space-mono': ['var(--font-space-mono)'],
      },
      fontWeight: {
        extrablack: '950',
      },
      fontSize: {
        '2xs': '10px',
      },
      boxShadow: {
        'hard-1': '-2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-2': '0px 3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-3': '2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-4': '0px -3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-5': '0px 2px 10px 0px rgba(38, 38, 38, 0.10)',
        'soft-1': '0px 0px 10px rgba(38, 38, 38, 0.1)',
        'soft-2': '0px 0px 20px rgba(38, 38, 38, 0.2)',
        'soft-3': '0px 0px 30px rgba(38, 38, 38, 0.1)',
        'soft-4': '0px 0px 40px rgba(38, 38, 38, 0.1)',
        // Theme-aware shadows
        'soft-light': '0px 0px 10px rgba(0, 0, 0, 0.1)',
        'soft-dark': '0px 0px 10px rgba(255, 255, 255, 0.05)',
      },
      // Add theme-aware spacing and sizing
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
