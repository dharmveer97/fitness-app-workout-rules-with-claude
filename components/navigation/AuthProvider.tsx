import React, { useEffect, useMemo, useRef } from 'react'

import { useRouter, useSegments, useRootNavigationState } from 'expo-router'

import { useAuthStore, useOnboardingStore } from '@/stores'

// Stable selectors to prevent infinite re-renders - using useCallback for absolute stability
const selectIsOnboarded = (state: any) => state.isOnboarded
const selectAccessToken = (state: any) => state.accessToken
const selectOnboardingCompleted = (state: any) => state.isOnboardingCompleted

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
  const isNavigatingRef = useRef(false)

  const isOnboarded = useAuthStore(selectIsOnboarded)
  const accessToken = useAuthStore(selectAccessToken)
  const isOnboardingCompleted = useOnboardingStore(selectOnboardingCompleted)

  const authState = useMemo(
    () => ({
      isAuthenticated: Boolean(accessToken),
      hasCompletedOnboarding: isOnboarded ?? isOnboardingCompleted,
    }),
    [accessToken, isOnboarded, isOnboardingCompleted],
  )

  useEffect(() => {
    // Don't navigate until navigation is ready
    if (!navigationState?.key || isNavigatingRef.current) return

    const inAuthGroup = segments[0] === '(auth)'
    const inTabsGroup = segments[0] === '(tabs)'
    const currentPath = segments.join('/')

    // Early returns to prevent infinite loops
    if (inTabsGroup && authState.isAuthenticated) return
    if (
      inAuthGroup &&
      !authState.isAuthenticated &&
      authState.hasCompletedOnboarding
    ) {
      return
    }
    if (
      currentPath.includes('onboarding') &&
      !authState.hasCompletedOnboarding
    ) {
      return
    }

    if (__DEV__) {
      console.log('AuthProvider navigation check:', {
        currentPath,
        isAuthenticated: authState.isAuthenticated,
        hasCompletedOnboarding: authState.hasCompletedOnboarding,
        inAuthGroup,
        inTabsGroup,
      })
    }

    // Throttle navigation to prevent loops
    const timeoutId = setTimeout(() => {
      if (isNavigatingRef.current) return

      // Only redirect if clearly needed and not already in the right place
      if (
        !authState.hasCompletedOnboarding &&
        !currentPath.includes('onboarding') &&
        !inTabsGroup &&
        currentPath !== ''
      ) {
        if (__DEV__) console.log('Redirecting to onboarding')
        isNavigatingRef.current = true
        router.replace('/(auth)/onboarding')
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 1000)
      } else if (
        authState.isAuthenticated &&
        authState.hasCompletedOnboarding &&
        inAuthGroup &&
        !currentPath.includes('onboarding')
      ) {
        // User is authenticated and trying to access auth screens
        if (__DEV__) console.log('Redirecting authenticated user to main app')
        isNavigatingRef.current = true
        router.replace('/(tabs)/index')
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 1000)
      } else if (
        !authState.isAuthenticated &&
        !inAuthGroup &&
        authState.hasCompletedOnboarding &&
        !inTabsGroup
      ) {
        // User is not authenticated and trying to access protected screens
        if (__DEV__) console.log('Redirecting unauthenticated user to sign-in')
        isNavigatingRef.current = true
        router.replace('/(auth)/sign-in')
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 1000)
      }
    }, 100) // Small delay to prevent rapid navigation

    return () => clearTimeout(timeoutId)
  }, [segments, authState, navigationState?.key, router])

  return <>{children}</>
}

// Stable selectors for useAuth hook
const selectUser = (state: any) => state.user

/**
 * Simple auth hook for accessing auth state
 */
export const useAuth = () => {
  const isOnboarded = useAuthStore(selectIsOnboarded)
  const accessToken = useAuthStore(selectAccessToken)
  const user = useAuthStore(selectUser)
  const isOnboardingCompleted = useOnboardingStore(selectOnboardingCompleted)

  return useMemo(
    () => ({
      isAuthenticated: Boolean(accessToken),
      isOnboarded: isOnboarded ?? isOnboardingCompleted,
      user,
    }),
    [accessToken, isOnboarded, isOnboardingCompleted, user],
  )
}

export default AuthProvider
