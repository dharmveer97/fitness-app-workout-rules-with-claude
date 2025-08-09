import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, Redirect } from 'expo-router';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '../components/useColorScheme';
import { store, persistor } from '../state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';
import type { RootState } from '../state/store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: '#111827' 
          }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Loading...</Text>
          </View>
        } 
        persistor={persistor}
      >
        <RootLayoutNav />
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isOnboarded = useSelector((s: RootState) => s.auth.isOnboarded);
  const isOnboardingCompleted = useSelector((s: RootState) => s.onboarding.isOnboardingCompleted);
  const isAuthenticated = useSelector((s: RootState) => Boolean(s.auth.accessToken));

  // Remove the hydration check that was causing white screen
  // Since we set _hasHydrated to true by default, this was blocking rendering
  
  console.log('Navigation State:', {
    isOnboarded,
    isOnboardingCompleted,
    isAuthenticated
  });

  // Combined onboarding check - either from auth slice or onboarding slice
  const hasCompletedOnboarding = isOnboarded || isOnboardingCompleted;

  // Handle redirects BEFORE rendering the Stack to prevent loops
  if (!hasCompletedOnboarding) {
    console.log('Redirecting to onboarding');
    return <Redirect href="/(auth)/onboarding-test" />;
  }
  
  if (hasCompletedOnboarding && !isAuthenticated) {
    console.log('Redirecting to sign-in');
    return <Redirect href="/(auth)/sign-in" />;
  }

  console.log('Rendering main app');
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true }} />
      </Stack>
    </ThemeProvider>
  );
}
