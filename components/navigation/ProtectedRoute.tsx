import React, { useEffect, useState } from 'react'

import { View, ActivityIndicator } from 'react-native'

import { Redirect } from 'expo-router'

import { Text } from '@/components/atoms'
import { useAuthStore, useOnboardingStore } from '@/stores'

export interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requireOnboarding?: boolean
  requireVerification?: boolean
  fallback?: string
  loadingComponent?: ReactNode
  unauthorizedComponent?: ReactNode
}

/**
 * ProtectedRoute component following Expo blog patterns for auth flows
 * Handles authentication, onboarding, and verification requirements
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireOnboarding = true,
  requireVerification = false,
  fallback,
  loadingComponent,
}) => {
  const { isOnboarded, accessToken, user } = useAuthStore((state) => ({
    isOnboarded: state.isOnboarded,
    accessToken: state.accessToken,
    user: state.user,
  }))
  const isOnboardingCompleted = useOnboardingStore(
    (state) => state.isOnboardingCompleted,
  )
  const [isInitialized, setIsInitialized] = useState(false)

  // Handle initialization after hydration without blocking render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Show loading during initialization
  if (!isInitialized) {
    return (
      loadingComponent ?? (
        <View className='bg-dark-900 flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#3B82F6' />
          <Text className='text-dark-300 mt-4'>Loading...</Text>
        </View>
      )
    )
  }

  // Combined onboarding check - either from auth slice or onboarding slice
  const hasCompletedOnboarding = isOnboarded ?? isOnboardingCompleted

  // Check onboarding requirement first
  if (requireOnboarding && !hasCompletedOnboarding) {
    console.log('Protected route redirecting to onboarding')
    return <Redirect href={fallback ?? '/(auth)/onboarding'} />
  }

  // Check authentication requirement
  if (requireAuth && !accessToken) {
    console.log('Protected route redirecting to sign-in')
    return <Redirect href={fallback ?? '/(auth)/sign-in'} />
  }

  // Check email verification requirement
  if (requireVerification && user && !user.email) {
    console.log('Protected route redirecting to verify-email')
    return <Redirect href={fallback ?? '/(auth)/verify-otp'} />
  }

  // All requirements met, render children
  return <>{children}</>
}

export default ProtectedRoute

/**
 * Hook for checking route protection status
 * Returns protection status and redirect information
 */
export const useRouteProtection = ({
  requireAuth = true,
  requireOnboarding = true,
  requireVerification = false,
}: Partial<
  Pick<
    ProtectedRouteProps,
    'requireAuth' | 'requireOnboarding' | 'requireVerification'
  >
> = {}) => {
  const { isOnboarded, accessToken, user } = useAuthStore((state) => ({
    isOnboarded: state.isOnboarded,
    accessToken: state.accessToken,
    user: state.user,
  }))
  const isOnboardingCompleted = useOnboardingStore(
    (state) => state.isOnboardingCompleted,
  )

  const hasCompletedOnboarding = isOnboarded ?? isOnboardingCompleted
  const isAuthenticated = Boolean(accessToken)
  const isEmailVerified = user?.email ? true : false

  // Determine protection status and redirect
  let isProtected = true
  let redirectTo: string | null = null
  let reason: string | null = null

  if (requireOnboarding && !hasCompletedOnboarding) {
    isProtected = false
    redirectTo = '/(auth)/onboarding'
    reason = 'onboarding_required'
  } else if (requireAuth && !isAuthenticated) {
    isProtected = false
    redirectTo = '/(auth)/sign-in'
    reason = 'authentication_required'
  } else if (requireVerification && user && !user.email) {
    isProtected = false
    redirectTo = '/(auth)/verify-otp'
    reason = 'verification_required'
  }

  return {
    isProtected,
    redirectTo,
    reason,
    hasCompletedOnboarding,
    isAuthenticated,
    isEmailVerified,
    user,
  }
}
