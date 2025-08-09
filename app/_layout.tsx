import { useEffect } from 'react'

import { View, Text } from 'react-native'

import { useFonts } from 'expo-font'
import { Slot, Stack, Redirect } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import 'react-native-reanimated'
import '../global.css'

import { PersistGate } from 'redux-persist/integration/react'

import { AuthProvider } from '../components/navigation/AuthProvider'
import { useColorScheme } from '../components/useColorScheme'
import { store, persistor } from '../state/store'

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

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#111827',
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Loading...</Text>
          </View>
        }
        persistor={persistor}
      >
        <RootLayoutNav />
      </PersistGate>
    </Provider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
