import React, { useEffect } from 'react'

import {
  Slot,
  useRouter,
  useSegments,
  useRootNavigationState,
} from 'expo-router'

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
  const hasCompletedOnboarding = isOnboarded || isOnboardingCompleted

  useEffect(() => {
    // Don't navigate until navigation is ready
    if (!navigationState?.key) return

    const inAuthGroup = segments[0] === '(auth)'
    const currentPath = segments.join('/')

    console.log('AuthProvider navigation check:', {
      currentPath,
      isAuthenticated,
      hasCompletedOnboarding,
      inAuthGroup,
    })

    // Handle navigation based on auth state
    if (!hasCompletedOnboarding) {
      // User needs onboarding
      if (!currentPath.includes('onboarding')) {
        console.log('Redirecting to onboarding')
        router.replace('/(auth)/onboarding')
      }
    } else if (!isAuthenticated) {
      // User needs to sign in
      if (inAuthGroup && currentPath.includes('onboarding')) {
        console.log('Redirecting to sign-in from onboarding')
        router.replace('/(auth)/sign-in')
      } else if (!inAuthGroup) {
        console.log('Redirecting unauthenticated user to sign-in')
        router.replace('/(auth)/sign-in')
      }
    } else {
      // User is authenticated and onboarded
      if (inAuthGroup) {
        console.log('Redirecting authenticated user to main app')
        router.replace('/(tabs)/')
      }
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
    isOnboarded: isOnboarded || isOnboardingCompleted,
    user,
  }
}

export default AuthProvider
