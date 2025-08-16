import { Appearance } from 'react-native'

import { usePreferencesStore } from '@/stores'

/**
 * Native React Native color scheme hook
 * Uses React Native Appearance API for proper native theme detection
 */
export function useColorScheme() {
  const system = Appearance.getColorScheme()
  const preferred = usePreferencesStore((state) => state.theme)

  if (preferred === 'system') {
    return system || 'light' // fallback to light if system returns null
  }

  return preferred === 'dark' ? 'dark' : 'light'
}
