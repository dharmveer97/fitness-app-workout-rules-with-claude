/**
 * Professional Themed Components for Daily Deposits Fitness App
 * Using consolidated color system with GlueStack UI v3 compatibility
 * Simplified and optimized for React Native + Expo
 */

import {
  Text as DefaultText,
  View as DefaultView,
  type TextProps,
  type ViewProps,
} from 'react-native'

import { useColorScheme } from '@/components/useColorScheme'
import { Colors, semanticColors } from '@/constants/colors'

// Type definitions for themed components
export interface ThemedTextProps extends TextProps {
  lightColor?: string
  darkColor?: string
}

export interface ThemedViewProps extends ViewProps {
  lightColor?: string
  darkColor?: string
}

/**
 * Enhanced theme color hook with support for semantic colors
 * @param props - Light and dark color overrides
 * @param colorName - Color key from Colors object
 * @returns - Resolved color value
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const colorScheme = useColorScheme()
  const colorFromProps = props[colorScheme]

  if (colorFromProps) {
    return colorFromProps
  }
  return Colors[colorScheme][colorName]
}

/**
 * Get semantic colors based on current theme
 * @param type - Semantic color type (success, error, etc.)
 * @returns - Semantic color object for current theme
 */
export function useSemanticColor(type: keyof typeof semanticColors) {
  const colorScheme = useColorScheme()

  if (
    type === 'surface' ||
    type === 'text' ||
    type === 'border' ||
    type === 'interactive'
  ) {
    return semanticColors[type][colorScheme]
  }

  if (type === 'brand' || type === 'fitness') {
    return semanticColors[type]
  }

  // For success, error, warning, info, positive, negative
  if (
    type === 'success' ||
    type === 'error' ||
    type === 'warning' ||
    type === 'info'
  ) {
    const colorGroup = semanticColors[type]
    return {
      default: colorGroup[colorScheme],
      background: colorGroup.background[colorScheme],
    }
  }

  // For positive, negative (which don't have background property)
  const colorGroup = semanticColors[type]
  return {
    default: colorGroup[colorScheme],
    background: colorGroup[colorScheme], // Use same color as fallback
  }
}

/**
 * Professional themed Text component
 * Supports lightColor/darkColor props for custom theming
 */
export function Text(props: ThemedTextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

/**
 * Professional themed View component
 * Supports lightColor/darkColor props for custom theming
 */
export function View(props: ThemedViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

/**
 * Enhanced themed components with semantic color support
 */

export interface SemanticTextProps extends ThemedTextProps {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'brand' | 'accent'
}

export function SemanticText({ variant, style, ...props }: SemanticTextProps) {
  const colorScheme = useColorScheme()

  let color: string

  if (variant) {
    // Handle semantic colors
    if (variant === 'brand') {
      color = semanticColors.text[colorScheme].brand
    } else if (variant === 'accent') {
      color = semanticColors.text[colorScheme].accent
    } else if (['success', 'error', 'warning', 'info'].includes(variant)) {
      color = semanticColors[variant][colorScheme]
    } else {
      color = Colors[colorScheme].text
    }
  } else {
    color = Colors[colorScheme].text
  }

  return <Text style={[{ color }, style]} {...props} />
}

export interface SemanticViewProps extends ThemedViewProps {
  variant?: 'surface' | 'success' | 'error' | 'warning' | 'info'
  level?: 'primary' | 'secondary' | 'tertiary'
}

export function SemanticView({
  variant = 'surface',
  level = 'primary',
  style,
  ...props
}: SemanticViewProps) {
  const colorScheme = useColorScheme()

  let backgroundColor: string

  if (variant === 'surface') {
    backgroundColor = semanticColors.surface[colorScheme][level]
  } else if (
    variant &&
    ['success', 'error', 'warning', 'info'].includes(variant)
  ) {
    const semanticColor = semanticColors[variant]
    backgroundColor = semanticColor.background[colorScheme]
  } else {
    backgroundColor = Colors[colorScheme].background
  }

  return <View style={[{ backgroundColor }, style]} {...props} />
}
