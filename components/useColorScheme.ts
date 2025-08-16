import { useColorScheme as useRNColorScheme } from 'react-native'

import { usePreferencesStore } from '@/stores'

export function useColorScheme() {
  const system = useRNColorScheme()
  const preferred = usePreferencesStore((state) => state.theme)
  if (preferred === 'system') return system
  return preferred
}
