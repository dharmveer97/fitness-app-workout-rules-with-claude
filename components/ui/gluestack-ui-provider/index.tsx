import React, { useEffect } from 'react'

import { View, type ViewProps } from 'react-native'

import { OverlayProvider } from '@gluestack-ui/core/overlay/creator'
import { ToastProvider } from '@gluestack-ui/core/toast/creator'
import { useColorScheme } from 'nativewind'

import { Colors } from '@/constants/colors'

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

  const resolvedMode = mode === 'system' ? 'light' : mode

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
