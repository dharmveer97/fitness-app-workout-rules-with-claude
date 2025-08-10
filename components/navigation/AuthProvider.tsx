import React, { useEffect } from 'react'

import { useRouter, useSegments, useRootNavigationState } from 'expo-router'

import { useSelector } from 'react-redux'

import type { RootState } from '@/state/store'

/**
 * AuthProvider following Expo blog patterns for protected routes
 * Handles automatic navigation based on authentication state
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const segments = useSegments()
  const router = useRouter()
  const navigationState = useRootNavigationState()

  const { isOnboarded, accessToken } = useSelector(
    (state: RootState) => state.auth,
  )
  const { isOnboardingCompleted } = useSelector(
    (state: RootState) => state.onboarding,
  )

  const isAuthenticated = Boolean(accessToken)
  const hasCompletedOnboarding = isOnboarded ?? isOnboardingCompleted

  useEffect(() => {
    // Don't navigate until navigation is ready
    if (!navigationState?.key) return

    const inAuthGroup = segments[0] === '(auth)'
    const inTabsGroup = segments[0] === '(tabs)'
    const currentPath = segments.join('/')

    // Don't redirect if already in the correct location
    if (inTabsGroup && isAuthenticated) return
    if (inAuthGroup && !isAuthenticated) return

    console.log('AuthProvider navigation check:', {
      currentPath,
      isAuthenticated,
      hasCompletedOnboarding,
      inAuthGroup,
      inTabsGroup,
    })

    // Only redirect if clearly needed
    if (
      !hasCompletedOnboarding &&
      !currentPath.includes('onboarding') &&
      !inTabsGroup
    ) {
      console.log('Redirecting to onboarding')
      router.replace('/(auth)/onboarding')
    } else if (isAuthenticated && hasCompletedOnboarding && inAuthGroup) {
      // User is authenticated and trying to access auth screens
      console.log('Redirecting authenticated user to main app')
      router.replace('/(tabs)/index')
    } else if (!isAuthenticated && !inAuthGroup && hasCompletedOnboarding) {
      // User is not authenticated and trying to access protected screens
      console.log('Redirecting unauthenticated user to sign-in')
      router.replace('/(auth)/sign-in')
    }
  }, [segments, isAuthenticated, hasCompletedOnboarding, navigationState?.key])

  return <>{children}</>
}

/**
 * Simple auth hook for accessing auth state
 */
export const useAuth = () => {
  const { isOnboarded, accessToken, user } = useSelector(
    (state: RootState) => state.auth,
  )
  const { isOnboardingCompleted } = useSelector(
    (state: RootState) => state.onboarding,
  )

  return {
    isAuthenticated: Boolean(accessToken),
    isOnboarded: isOnboarded ?? isOnboardingCompleted,
    user,
  }
}

export default AuthProvider
