import React, { useEffect, useMemo } from 'react'

import { useRouter, useSegments, useRootNavigationState } from 'expo-router'

import { useAuthStore, useOnboardingStore } from '@/stores'

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

  const isOnboarded = useAuthStore((state) => state.isOnboarded)
  const accessToken = useAuthStore((state) => state.accessToken)
  const isOnboardingCompleted = useOnboardingStore(
    (state) => state.isOnboardingCompleted,
  )

  const authState = useMemo(() => ({
    isAuthenticated: Boolean(accessToken),
    hasCompletedOnboarding: isOnboarded ?? isOnboardingCompleted,
  }), [accessToken, isOnboarded, isOnboardingCompleted])

  useEffect(() => {
    // Don't navigate until navigation is ready
    if (!navigationState?.key) return

    const inAuthGroup = segments[0] === '(auth)'
    const inTabsGroup = segments[0] === '(tabs)'
    const currentPath = segments.join('/')

    // Don't redirect if already in the correct location
    if (inTabsGroup && authState.isAuthenticated) return
    if (inAuthGroup && !authState.isAuthenticated) return

    console.log('AuthProvider navigation check:', {
      currentPath,
      isAuthenticated: authState.isAuthenticated,
      hasCompletedOnboarding: authState.hasCompletedOnboarding,
      inAuthGroup,
      inTabsGroup,
    })

    // Only redirect if clearly needed
    if (
      !authState.hasCompletedOnboarding &&
      !currentPath.includes('onboarding') &&
      !inTabsGroup
    ) {
      console.log('Redirecting to onboarding')
      router.replace('/(auth)/onboarding')
    } else if (authState.isAuthenticated && authState.hasCompletedOnboarding && inAuthGroup) {
      // User is authenticated and trying to access auth screens
      console.log('Redirecting authenticated user to main app')
      router.replace('/(tabs)/index')
    } else if (!authState.isAuthenticated && !inAuthGroup && authState.hasCompletedOnboarding) {
      // User is not authenticated and trying to access protected screens
      console.log('Redirecting unauthenticated user to sign-in')
      router.replace('/(auth)/sign-in')
    }
  }, [segments, authState, navigationState?.key, router])

  return <>{children}</>
}

/**
 * Simple auth hook for accessing auth state
 */
export const useAuth = () => {
  const isOnboarded = useAuthStore((state) => state.isOnboarded)
  const accessToken = useAuthStore((state) => state.accessToken)
  const user = useAuthStore((state) => state.user)
  const isOnboardingCompleted = useOnboardingStore(
    (state) => state.isOnboardingCompleted,
  )

  return useMemo(() => ({
    isAuthenticated: Boolean(accessToken),
    isOnboarded: isOnboarded ?? isOnboardingCompleted,
    user,
  }), [accessToken, isOnboarded, isOnboardingCompleted, user])
}

export default AuthProvider
