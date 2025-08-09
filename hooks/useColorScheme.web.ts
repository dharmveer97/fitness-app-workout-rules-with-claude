import { useEffect, useState } from 'react'

import type { ColorSchemeName } from 'react-native'

import { useColorScheme as useRNColorScheme } from 'nativewind'

/**
 * A custom hook that ensures consistent color scheme usage across platforms,
 * including proper hydration handling for web static rendering.
 */
export function useColorScheme(): ColorSchemeName {
  const [hasHydrated, setHasHydrated]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false)

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  const colorScheme: ColorSchemeName = useRNColorScheme().colorScheme ?? 'light'

  return hasHydrated ? colorScheme : 'light'
}
