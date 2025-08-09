import React, { useEffect, useState } from 'react'

import { View, ActivityIndicator } from 'react-native'

import { Redirect } from 'expo-router'

import { useSelector } from 'react-redux'

import { Text } from '@/components/atoms'
import type { RootState } from '@/state/store'

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
  unauthorizedComponent,
}) => {
  const { isOnboarded, accessToken, user } = useSelector(
    (state: RootState) => state.auth,
  )
  const { isOnboardingCompleted } = useSelector(
    (state: RootState) => state.onboarding,
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
      loadingComponent || (
        <View className='flex-1 items-center justify-center bg-dark-900'>
          <ActivityIndicator size='large' color='#3B82F6' />
          <Text className='mt-4 text-dark-300'>Loading...</Text>
        </View>
      )
    )
  }

  // Combined onboarding check - either from auth slice or onboarding slice
  const hasCompletedOnboarding = isOnboarded || isOnboardingCompleted

  // Check onboarding requirement first
  if (requireOnboarding && !hasCompletedOnboarding) {
    console.log('Protected route redirecting to onboarding')
    return <Redirect href={fallback || '/(auth)/onboarding'} />
  }

  // Check authentication requirement
  if (requireAuth && !accessToken) {
    console.log('Protected route redirecting to sign-in')
    return <Redirect href={fallback || '/(auth)/sign-in'} />
  }

  // Check email verification requirement
  if (requireVerification && user && !user.emailVerified) {
    console.log('Protected route redirecting to verify-email')
    return <Redirect href={fallback || '/(auth)/verify-otp'} />
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
  const { isOnboarded, accessToken, user } = useSelector(
    (state: RootState) => state.auth,
  )
  const { isOnboardingCompleted } = useSelector(
    (state: RootState) => state.onboarding,
  )

  const hasCompletedOnboarding = isOnboarded || isOnboardingCompleted
  const isAuthenticated = Boolean(accessToken)
  const isEmailVerified = user?.emailVerified ?? false

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
  } else if (requireVerification && user && !isEmailVerified) {
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
