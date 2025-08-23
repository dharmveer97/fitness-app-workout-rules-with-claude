/**
 * Professional Fitness App Gluestack UI v3 Configuration
 * Using React Native compatible theme configuration without CSS variables
 * Electric blue theme with energetic accents
 */

import { lightTheme, darkTheme, baseColors } from '../../theme/tokens'

// Create comprehensive Gluestack UI compatible theme configuration
export const gluestackConfig = {
  light: {
    // Surface colors
    backgroundColor: lightTheme.surface.primary,
    surfaceColor: lightTheme.surface.secondary,
    cardColor: lightTheme.surface.elevated,
    // Text colors
    textColor: lightTheme.text.primary,
    secondaryTextColor: lightTheme.text.secondary,
    mutedTextColor: lightTheme.text.tertiary,
    // Interactive colors
    primaryColor: lightTheme.interactive.primary.default,
    primaryHoverColor: lightTheme.interactive.primary.hover,
    accentColor: lightTheme.interactive.accent.default,
    // Border colors
    borderColor: lightTheme.border.primary,
    focusBorderColor: lightTheme.border.focus,
    // Semantic colors
    successColor: lightTheme.semantic.success.default,
    warningColor: lightTheme.semantic.warning.default,
    errorColor: lightTheme.semantic.error.default,
    infoColor: lightTheme.semantic.info.default,
    // Shadow
    shadowColor: lightTheme.shadow.light,
  },
  dark: {
    // Surface colors
    backgroundColor: darkTheme.surface.primary,
    surfaceColor: darkTheme.surface.secondary,
    cardColor: darkTheme.surface.elevated,
    // Text colors
    textColor: darkTheme.text.primary,
    secondaryTextColor: darkTheme.text.secondary,
    mutedTextColor: darkTheme.text.tertiary,
    // Interactive colors
    primaryColor: darkTheme.interactive.primary.default,
    primaryHoverColor: darkTheme.interactive.primary.hover,
    accentColor: darkTheme.interactive.accent.default,
    // Border colors
    borderColor: darkTheme.border.primary,
    focusBorderColor: darkTheme.border.focus,
    // Semantic colors
    successColor: darkTheme.semantic.success.default,
    warningColor: darkTheme.semantic.warning.default,
    errorColor: darkTheme.semantic.error.default,
    infoColor: darkTheme.semantic.info.default,
    // Shadow
    shadowColor: darkTheme.shadow.medium,
  },
}

// Export the enhanced config for use in GluestackUIProvider
export const config = gluestackConfig
