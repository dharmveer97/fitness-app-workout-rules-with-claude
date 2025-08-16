import React from 'react'

import { Redirect } from 'expo-router'

import { useOnboardingStore } from '@/stores'

export const RouteGuard: React.FC<RouteGuardProps> = ({ children, guards }) => {
  const _hasHydrated = useOnboardingStore((state) => state._hasHydrated)

  // Wait for store to hydrate before applying guards
  if (!_hasHydrated) {
    return null
  }

  // Sort guards by priority (higher priority first)
  const sortedGuards = guards.sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
  )

  // Find the first guard that should redirect
  const redirectGuard = sortedGuards.find((guard) => guard.condition)

  if (redirectGuard) {
    return <Redirect href={redirectGuard.redirect} />
  }

  return <>{children}</>
}

export default RouteGuard
