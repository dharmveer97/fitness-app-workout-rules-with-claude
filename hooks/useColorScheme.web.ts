import { useEffect, useState } from 'react'
import {
  useColorScheme as useRNColorScheme,
  ColorSchemeName,
} from 'react-native'

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

  const colorScheme: ColorSchemeName = useRNColorScheme()

  return hasHydrated ? colorScheme : 'light'
}
