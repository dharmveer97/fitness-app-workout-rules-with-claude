import React from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import type { RootState } from '@/state/store';
import { Text } from '@/components/atoms';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
  requireVerification?: boolean;
  fallback?: string;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireOnboarding = true,
  requireVerification = false,
  fallback,
  loadingComponent,
  unauthorizedComponent,
}) => {
  const { isOnboarded, accessToken, user } = useSelector((state: RootState) => state.auth);
  const { isOnboardingCompleted, _hasHydrated } = useSelector(
    (state: RootState) => state.onboarding
  );

  // Show loading while hydrating
  if (!_hasHydrated) {
    return (
      loadingComponent || (
        <View className="flex-1 bg-dark-900 items-center justify-center">
          <Text color="gray">Loading...</Text>
        </View>
      )
    );
  }

  // Check onboarding requirement
  if (requireOnboarding && !isOnboarded && !isOnboardingCompleted) {
    if (fallback) {
      return <Redirect href={fallback} />;
    }
    return <Redirect href="/(auth)/onboarding" />;
  }

  // Check authentication requirement
  if (requireAuth && !accessToken) {
    if (fallback) {
      return <Redirect href={fallback} />;
    }
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Check email verification requirement
  if (requireVerification && user && !user.emailVerified) {
    if (fallback) {
      return <Redirect href={fallback} />;
    }
    return <Redirect href="/(auth)/verify-email" />;
  }

  // All requirements met, render children
  return <>{children}</>;
};

export default ProtectedRoute;