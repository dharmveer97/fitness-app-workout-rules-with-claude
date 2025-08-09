import { Colors } from '../constants/Colors'
import { useColorScheme } from './useColorScheme'
import { ColorSchemeName } from 'react-native'

export function useThemeColor(
  props: ThemeColorProps,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
): string {
  const theme: ColorSchemeName = useColorScheme() ?? 'light'
  const colorFromProps: unknown = props[theme]

  if (typeof colorFromProps === 'string') {
    return colorFromProps
  }

  return Colors[theme][colorName]
}
