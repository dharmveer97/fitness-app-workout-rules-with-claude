/**
 * Native Gluestack UI v3 Configuration
 * Using React Native compatible theme configuration without CSS variables
 */

import { lightTheme, darkTheme } from '../../theme/tokens'

// Create Gluestack UI compatible theme configuration
export const gluestackConfig = {
  light: {
    backgroundColor: lightTheme.surface.primary,
  },
  dark: {
    backgroundColor: darkTheme.surface.primary,
  },
}

// Export the config for use in GluestackUIProvider
export const config = gluestackConfig
