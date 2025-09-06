/**
 * GlueStack UI Provider with consolidated theming
 * Uses our professional color system from constants/colors.ts
 */

import React, { useEffect } from 'react'

import {
  useColorScheme,
  View,
  type ColorSchemeName,
  type ViewProps,
} from 'react-native'

import { OverlayProvider } from '@gluestack-ui/core/overlay/creator'
import { ToastProvider } from '@gluestack-ui/core/toast/creator'
import { colorScheme as colorSchemeNW } from 'nativewind'

import { semanticColors } from '@/constants/colors'

import { config } from './config'

type ModeType = 'light' | 'dark' | 'system'

const getColorSchemeName = (
  colorScheme: ColorSchemeName,
  mode: ModeType,
): 'light' | 'dark' => {
  if (mode === 'system') {
    return colorScheme ?? 'light'
  }
  return mode
}

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: 'light' | 'dark' | 'system'
  children?: React.ReactNode
  style?: ViewProps['style']
}): React.JSX.Element {
  const colorScheme: ColorSchemeName = useColorScheme()

  const colorSchemeName: 'light' | 'dark' = getColorSchemeName(
    colorScheme,
    mode,
  )

  // Sync with NativeWind
  useEffect(() => {
    colorSchemeNW.set(colorSchemeName)
  }, [colorScheme, mode, colorSchemeName])

  // Use our consolidated theme colors
  const backgroundColor = semanticColors.surface[colorSchemeName].primary

  return (
    <View
      style={[
        config[colorSchemeName],
        {
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor,
        },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  )
}
