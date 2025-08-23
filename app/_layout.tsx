import { useEffect } from 'react'

import type { ColorSchemeName } from 'react-native'

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import '../global.css'

import { useColorScheme } from '@/components/useColorScheme'

import { AuthProvider } from '../components/navigation/AuthProvider'
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  const colorScheme: ColorSchemeName = useColorScheme()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <>
      {/* Native status bar theming */}
      <StatusBar
        style={colorScheme === 'dark' ? 'dark' : 'light'}
        // backgroundColor={colors.surface.primary}
      />

      <GluestackUIProvider mode={colorScheme || 'light'}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <AuthProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='(tabs)' />
                <Stack.Screen name='(auth)' />
                <Stack.Screen
                  name='modal'
                  options={{ presentation: 'modal', headerShown: true }}
                />
              </Stack>
            </AuthProvider>
          </NavigationThemeProvider>
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </>
  )
}
