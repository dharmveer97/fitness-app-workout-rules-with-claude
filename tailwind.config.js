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
    {
      pattern:
        /(bg|border|text|stroke|fill)-(surface|text|border|interactive|semantic|brand|fitness|primary|secondary|tertiary|error|success|warning|info|gray|neutral)-(primary|secondary|tertiary|quaternary|hover|active|default|light|dark|disabled|50|100|200|300|400|500|600|700|800|900|950)/,
    },
    // Fitness activity colors
    {
      pattern:
        /(bg|border|text|stroke|fill)-(strength|cardio|yoga|hiit|running|cycling|swimming|recovery)/,
    },
    // Legacy support patterns
    {
      pattern:
        /(bg|border|text|stroke|fill)-(typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        // NATIVE THEME TOKENS (no CSS variables)
        // Surface colors
        surface: {
          primary: '#FFFFFF', // Will be overridden by NativeWind theming
          secondary: '#F8FAFC',
          tertiary: '#F1F5F9',
          quaternary: '#E2E8F0',
          overlay: 'rgba(0, 0, 0, 0.5)',
          glass: 'rgba(255, 255, 255, 0.1)',
          elevated: '#FFFFFF',
        },

        // Text colors
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          tertiary: '#94A3B8',
          inverse: '#FFFFFF',
          brand: '#10B981',
          muted: '#64748B',
          disabled: '#CBD5E1',
        },

        // Border colors
        border: {
          primary: '#E2E8F0',
          secondary: '#F1F5F9',
          tertiary: '#F8FAFC',
          focus: '#10B981',
          error: '#EF4444',
          disabled: '#F1F5F9',
        },

        // Interactive colors
        interactive: {
          primary: {
            default: '#10B981',
            hover: '#059669',
            active: '#047857',
            disabled: '#CBD5E1',
          },
          secondary: {
            default: '#F1F5F9',
            hover: '#E2E8F0',
            active: '#CBD5E1',
            disabled: '#F8FAFC',
          },
          tertiary: {
            default: 'transparent',
            hover: '#F8FAFC',
            active: '#F1F5F9',
            disabled: 'transparent',
          },
        },

        // Semantic colors
        semantic: {
          success: {
            default: '#10B981',
            light: '#ECFDF5',
            dark: '#047857',
          },
          warning: {
            default: '#F59E0B',
            light: '#FFFBEB',
            dark: '#D97706',
          },
          error: {
            default: '#EF4444',
            light: '#FEF2F2',
            dark: '#DC2626',
          },
          info: {
            default: '#3B82F6',
            light: '#EFF6FF',
            dark: '#2563EB',
          },
        },

        // Brand colors
        brand: {
          primary: '#10B981',
          'primary-light': '#34D399',
          'primary-dark': '#059669',
          accent: '#F97316',
          'accent-light': '#FB923C',
          'accent-dark': '#EA580C',
        },

        // Fitness activity colors
        fitness: {
          strength: '#EF4444',
          cardio: '#3B82F6',
          yoga: '#8B5CF6',
          hiit: '#F97316',
          running: '#10B981',
          cycling: '#06B6D4',
          swimming: '#0EA5E9',
          recovery: '#6B7280',
        },

        // Enhanced neutral palette
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
