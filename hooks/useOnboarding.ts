import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import type { RootState } from '@/state/store';
import {
  updatePersonalInfo,
  updateGoals,
  updatePreferences,
  completeOnboarding,
  resetOnboarding,
  nextSlide,
  previousSlide,
  markSlideCompleted,
  setCurrentSlideIndex,
} from '@/state/slices/onboardingSlice';

export function useOnboarding() {
  const dispatch = useDispatch();
  const onboardingState = useSelector((state: RootState) => state.onboarding);
  const authState = useSelector((state: RootState) => state.auth);

  const handleUpdatePersonalInfo = useCallback(
    (data: Parameters<typeof updatePersonalInfo>[0]) => {
      dispatch(updatePersonalInfo(data));
    },
    [dispatch]
  );

  const handleUpdateGoals = useCallback(
    (data: Parameters<typeof updateGoals>[0]) => {
      dispatch(updateGoals(data));
    },
    [dispatch]
  );

  const handleUpdatePreferences = useCallback(
    (data: Parameters<typeof updatePreferences>[0]) => {
      dispatch(updatePreferences(data));
    },
    [dispatch]
  );

  const handleCompleteOnboarding = useCallback(() => {
    dispatch(completeOnboarding());
  }, [dispatch]);

  const handleResetOnboarding = useCallback(() => {
    dispatch(resetOnboarding());
  }, [dispatch]);

  const handleNextSlide = useCallback(() => {
    dispatch(nextSlide());
  }, [dispatch]);

  const handlePreviousSlide = useCallback(() => {
    dispatch(previousSlide());
  }, [dispatch]);

  const handleMarkSlideCompleted = useCallback(
    (slideId: string) => {
      dispatch(markSlideCompleted(slideId));
    },
    [dispatch]
  );

  const handleSetCurrentSlideIndex = useCallback(
    (index: number) => {
      dispatch(setCurrentSlideIndex(index));
    },
    [dispatch]
  );

  const isOnboardingCompleted =
    onboardingState.isOnboardingCompleted || authState.isOnboarded;

  const progress = {
    current: onboardingState.currentSlideIndex,
    total: onboardingState.slidesProgress.length,
    percentage:
      (onboardingState.slidesProgress.filter((s) => s.completed).length /
        onboardingState.slidesProgress.length) *
      100,
  };

  return {
    ...onboardingState,
    isOnboardingCompleted,
    progress,
    updatePersonalInfo: handleUpdatePersonalInfo,
    updateGoals: handleUpdateGoals,
    updatePreferences: handleUpdatePreferences,
    completeOnboarding: handleCompleteOnboarding,
    resetOnboarding: handleResetOnboarding,
    nextSlide: handleNextSlide,
    previousSlide: handlePreviousSlide,
    markSlideCompleted: handleMarkSlideCompleted,
    setCurrentSlideIndex: handleSetCurrentSlideIndex,
  };
}