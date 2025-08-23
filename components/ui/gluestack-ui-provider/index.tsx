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

  useEffect(() => {
    if (mode === 'system') {
      colorSchemeNW.set(mode)
    }
  }, [colorScheme, mode])

  return (
    <View
      style={[
        config[colorSchemeName],

        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  )
}
