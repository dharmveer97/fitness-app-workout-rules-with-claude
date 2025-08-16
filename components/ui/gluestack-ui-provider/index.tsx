import React, { useEffect } from 'react'

import type { ViewProps } from 'react-native'
import { View } from 'react-native'

import { OverlayProvider } from '@gluestack-ui/core/overlay/creator'
import { ToastProvider } from '@gluestack-ui/core/toast/creator'
import { useColorScheme } from 'nativewind'

import { Colors } from '@/constants/colors'

import { config } from './config'

export type ModeType = 'light' | 'dark' | 'system'

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType
  children?: React.ReactNode
  style?: ViewProps['style']
}) {
  const { setColorScheme } = useColorScheme()

  // Resolve system mode to actual color scheme
  const resolvedMode = mode === 'system' ? 'light' : mode // Default fallback

  useEffect(() => {
    setColorScheme(resolvedMode)
  }, [resolvedMode, setColorScheme])

  return (
    <View
      style={[
        {
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: Colors[resolvedMode]?.background || '#FFFFFF',
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
