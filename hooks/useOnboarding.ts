import { useOnboardingStore, useAuthStore } from '@/stores'

export function useOnboarding() {
  const onboardingState = useOnboardingStore()
  const authState = useAuthStore()

  const isOnboardingCompleted =
    onboardingState.isOnboardingCompleted ?? authState.isOnboarded

  const progress = {
    current: onboardingState.currentSlideIndex,
    total: onboardingState.slidesProgress.length,
    percentage:
      (onboardingState.slidesProgress.filter((s) => s.completed).length /
        onboardingState.slidesProgress.length) *
      100,
  }

  return {
    ...onboardingState,
    isOnboardingCompleted,
    progress,
  }
}
