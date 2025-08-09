import type { ColorSchemeName } from 'react-native'

import { Colors } from '../constants/colors'

import { useColorScheme } from './useColorScheme'

export function useThemeColor(
  props: { light: string; dark: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
): string {
  const theme: ColorSchemeName = useColorScheme() ?? 'light'
  const colorFromProps: unknown = props[theme]

  if (typeof colorFromProps === 'string') {
    return colorFromProps
  }

  return Colors[theme][colorName]
}
