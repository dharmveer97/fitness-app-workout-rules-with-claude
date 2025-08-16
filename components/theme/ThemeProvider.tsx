import React, { createContext, useContext, useEffect, useState } from 'react'

import { Appearance } from 'react-native'

import * as SystemUI from 'expo-system-ui'

import { usePreferencesStore } from '@/stores'

import { themes } from './tokens'

import type { ColorModeType, ThemeTokens } from './tokens'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = ColorModeType

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  isDark: boolean
  isLight: boolean
  colors: ThemeTokens
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  // Use native React Native Appearance API for system theme detection
  const systemColorScheme = Appearance.getColorScheme()
  const { theme: storedTheme, setTheme: setStoredTheme } = usePreferencesStore()

  // Use stored theme preference or fall back to default
  const [theme, setThemeState] = useState<Theme>(storedTheme || defaultTheme)

  // Resolve the actual theme (convert 'system' to 'light' or 'dark')
  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? systemColorScheme || 'light' : theme

  const isDark = resolvedTheme === 'dark'
  const isLight = resolvedTheme === 'light'

  // Get current theme colors
  const colors = themes[resolvedTheme]

  // Listen to system appearance changes using React Native Appearance API
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only update if we're in system mode
      if (theme === 'system') {
        // The resolvedTheme will automatically update due to systemColorScheme change
        // We don't need to do anything here as the component will re-render
      }
    })

    return () => subscription?.remove()
  }, [theme])

  // Update system UI when theme changes (native approach)
  useEffect(() => {
    // Set the system UI background color using expo-system-ui
    SystemUI.setBackgroundColorAsync(colors.surface.primary)
  }, [resolvedTheme, colors.surface.primary])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    setStoredTheme(newTheme)
  }

  const contextValue: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    isDark,
    isLight,
    colors,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Utility hook for getting theme-aware colors (backwards compatibility)
export function useThemeColors() {
  const { colors } = useTheme()

  return {
    // Surface colors (flattened for backwards compatibility)
    surfacePrimary: colors.surface.primary,
    surfaceSecondary: colors.surface.secondary,
    surfaceTertiary: colors.surface.tertiary,

    // Text colors
    textPrimary: colors.text.primary,
    textSecondary: colors.text.secondary,
    textTertiary: colors.text.tertiary,
    textBrand: colors.text.brand,

    // Interactive colors
    interactivePrimary: colors.interactive.primary.default,
    interactivePrimaryHover: colors.interactive.primary.hover,
    interactiveSecondary: colors.interactive.secondary.default,

    // Border colors
    borderPrimary: colors.border.primary,
    borderFocus: colors.border.focus,

    // Semantic colors
    success: colors.semantic.success.default,
    warning: colors.semantic.warning.default,
    error: colors.semantic.error.default,
    info: colors.semantic.info.default,
  }
}

// Native theme token accessor (replaces CSS variable helper)
export function useThemeToken<T extends keyof ThemeTokens>(
  category: T,
): ThemeTokens[T] {
  const { colors } = useTheme()
  return colors[category]
}

// Helper function for backwards compatibility (now returns empty string)
export function getThemeVariable(variableName: string): string {
  // This function is no longer needed with native theming but kept for backwards compatibility
  console.warn(
    'getThemeVariable is deprecated. Use useTheme() or useThemeToken() instead.',
  )
  return ''
}
