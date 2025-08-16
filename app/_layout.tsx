import { useEffect } from 'react'

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import '../global.css'

import { AuthProvider } from '../components/navigation/AuthProvider'
import { ThemeProvider, useTheme } from '../components/theme/ThemeProvider'
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

  return <RootLayoutNav />
}

function ThemedApp() {
  const { resolvedTheme, isDark, colors } = useTheme()

  // Set system UI colors based on theme
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.surface.primary)
  }, [colors.surface.primary])

  // Create custom navigation theme based on our design tokens
  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.interactive.primary.default,
      background: colors.surface.primary,
      card: colors.surface.secondary,
      text: colors.text.primary,
      border: colors.border.primary,
      notification: colors.semantic.info.default,
    },
  }

  return (
    <>
      {/* Native status bar theming */}
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor={colors.surface.primary}
      />

      <GluestackUIProvider mode={resolvedTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationThemeProvider value={navigationTheme}>
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

function RootLayoutNav() {
  return (
    <ThemeProvider defaultTheme='system'>
      <ThemedApp />
    </ThemeProvider>
  )
}
