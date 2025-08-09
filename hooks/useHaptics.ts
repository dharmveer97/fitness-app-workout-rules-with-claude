import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// UseHapticsReturn is globally available from /types/hooks.d.ts

export const useHaptics = (): UseHapticsReturn => {
  // Check if haptics are supported
  const isHapticsSupported = Platform.OS === 'ios' || Platform.OS === 'android';

  const executeHaptic = useCallback(
    async (hapticFunction: () => Promise<void>) => {
      if (!isHapticsSupported) return;

      try {
        await hapticFunction();
      } catch (error) {
        console.warn('Haptic feedback failed:', error);
      }
    },
    [isHapticsSupported]
  );

  // Impact feedback
  const light = useCallback(() => {
    executeHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
  }, [executeHaptic]);

  const medium = useCallback(() => {
    executeHaptic(() =>
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    );
  }, [executeHaptic]);

  const heavy = useCallback(() => {
    executeHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy));
  }, [executeHaptic]);

  // Notification feedback
  const success = useCallback(() => {
    executeHaptic(() =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    );
  }, [executeHaptic]);

  const warning = useCallback(() => {
    executeHaptic(() =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    );
  }, [executeHaptic]);

  const error = useCallback(() => {
    executeHaptic(() =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    );
  }, [executeHaptic]);

  // Selection feedback
  const selection = useCallback(() => {
    executeHaptic(() => Haptics.selectionAsync());
  }, [executeHaptic]);

  // Aliases for consistency
  const impactLight = light;
  const impactMedium = medium;
  const impactHeavy = heavy;
  const notificationSuccess = success;
  const notificationWarning = warning;
  const notificationError = error;
  const selectionChanged = selection;

  return {
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
    impactLight,
    impactMedium,
    impactHeavy,
    notificationSuccess,
    notificationWarning,
    notificationError,
    selectionChanged,
  };
};
