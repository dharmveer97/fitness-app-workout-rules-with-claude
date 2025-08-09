import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/state/store';
import { setHasHydrated, initializeOnboarding } from '@/state/slices/onboardingSlice';
import * as SplashScreen from 'expo-splash-screen';

export interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { _hasHydrated, isOnboardingCompleted } = useSelector(
    (state: RootState) => state.onboarding
  );
  const { isOnboarded } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize onboarding if not completed
        if (!isOnboardingCompleted && !isOnboarded) {
          await dispatch(initializeOnboarding());
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        // Mark as hydrated and hide splash screen
        dispatch(setHasHydrated(true));
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [dispatch, isOnboardingCompleted, isOnboarded]);

  // Don't render children until hydrated
  if (!_hasHydrated) {
    return null;
  }

  return <>{children}</>;
};

export default NavigationProvider;