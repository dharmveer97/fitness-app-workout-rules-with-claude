import React, { useEffect } from 'react';
import { router } from 'expo-router';

// This file redirects to the new onboarding flow
export default function OnboardingScreen() {
  useEffect(() => {
    // Redirect to the new structured onboarding flow
    router.replace('/(auth)/onboarding/');
  }, []);

  return null;
}
