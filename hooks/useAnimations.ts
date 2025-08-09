import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  runOnJS,
  type SharedValue,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface AnimationConfig {
  duration?: number;
  delay?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
}

interface UseAnimationsReturn {
  // Shared values
  opacity: SharedValue<number>;
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  rotate: SharedValue<number>;

  // Animation functions
  fadeIn: (config?: AnimationConfig) => void;
  fadeOut: (config?: AnimationConfig) => void;
  scaleIn: (config?: AnimationConfig) => void;
  scaleOut: (config?: AnimationConfig) => void;
  slideInFromLeft: (config?: AnimationConfig) => void;
  slideInFromRight: (config?: AnimationConfig) => void;
  slideInFromTop: (config?: AnimationConfig) => void;
  slideInFromBottom: (config?: AnimationConfig) => void;
  slideOut: (
    direction: 'left' | 'right' | 'top' | 'bottom',
    config?: AnimationConfig
  ) => void;
  bounce: (config?: AnimationConfig) => void;
  shake: (config?: AnimationConfig) => void;
  pulse: (config?: AnimationConfig) => void;
  rotate360: (config?: AnimationConfig) => void;

  // Combined animations
  enterAnimation: (config?: AnimationConfig) => void;
  exitAnimation: (config?: AnimationConfig) => void;
  pressAnimation: (onComplete?: () => void) => void;

  // Animated styles
  fadeStyle: ReturnType<typeof useAnimatedStyle>;
  scaleStyle: ReturnType<typeof useAnimatedStyle>;
  slideStyle: ReturnType<typeof useAnimatedStyle>;
  rotateStyle: ReturnType<typeof useAnimatedStyle>;
  combinedStyle: ReturnType<typeof useAnimatedStyle>;
}

export const useAnimations = (initialValues?: {
  opacity?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  rotate?: number;
}): UseAnimationsReturn => {
  // Shared values
  const opacity = useSharedValue<number>(initialValues?.opacity ?? 1);
  const scale = useSharedValue<number>(initialValues?.scale ?? 1);
  const translateX = useSharedValue<number>(initialValues?.translateX ?? 0);
  const translateY = useSharedValue<number>(initialValues?.translateY ?? 0);
  const rotate = useSharedValue<number>(initialValues?.rotate ?? 0);

  // Animation functions
  const fadeIn = useCallback(
    (config: AnimationConfig = {}) => {
      opacity.value = withDelay(
        config.delay ?? 0,
        withTiming(1, { duration: config.duration ?? 300 })
      );
    },
    [opacity]
  );

  const fadeOut = useCallback(
    (config: AnimationConfig = {}) => {
      opacity.value = withDelay(
        config.delay ?? 0,
        withTiming(0, { duration: config.duration ?? 300 })
      );
    },
    [opacity]
  );

  const scaleIn = useCallback(
    (config: AnimationConfig = {}) => {
      scale.value = withDelay(
        config.delay ?? 0,
        withSpring(1, {
          damping: config.damping ?? 20,
          stiffness: config.stiffness ?? 300,
          mass: config.mass ?? 1,
        })
      );
    },
    [scale]
  );

  const scaleOut = useCallback(
    (config: AnimationConfig = {}) => {
      scale.value = withDelay(
        config.delay ?? 0,
        withSpring(0, {
          damping: config.damping ?? 20,
          stiffness: config.stiffness ?? 300,
          mass: config.mass ?? 1,
        })
      );
    },
    [scale]
  );

  const slideInFromLeft = useCallback(
    (config: AnimationConfig = {}) => {
      translateX.value = withDelay(
        config.delay ?? 0,
        withSpring(0, {
          damping: config.damping ?? 20,
          stiffness: config.stiffness ?? 200,
        })
      );
    },
    [translateX]
  );

  const slideInFromRight = useCallback(
    (config: AnimationConfig = {}) => {
      translateX.value = withDelay(
        config.delay ?? 0,
        withSpring(0, {
          damping: config.damping ?? 20,
          stiffness: config.stiffness ?? 200,
        })
      );
    },
    [translateX]
  );

  const slideInFromTop = useCallback(
    (config: AnimationConfig = {}) => {
      translateY.value = withDelay(
        config.delay ?? 0,
        withSpring(0, {
          damping: config.damping ?? 20,
          stiffness: config.stiffness ?? 200,
        })
      );
    },
    [translateY]
  );

  const slideInFromBottom = useCallback(
    (config: AnimationConfig = {}) => {
      translateY.value = withDelay(
        config.delay ?? 0,
        withSpring(0, {
          damping: config.damping ?? 20,
          stiffness: config.stiffness ?? 200,
        })
      );
    },
    [translateY]
  );

  const slideOut = useCallback(
    (
      direction: 'left' | 'right' | 'top' | 'bottom',
      config: AnimationConfig = {}
    ) => {
      const distance = 300;
      const targetX =
        direction === 'left' ? -distance : direction === 'right' ? distance : 0;
      const targetY =
        direction === 'top' ? -distance : direction === 'bottom' ? distance : 0;

      if (targetX !== 0) {
        translateX.value = withTiming(targetX, {
          duration: config.duration ?? 300,
        });
      }
      if (targetY !== 0) {
        translateY.value = withTiming(targetY, {
          duration: config.duration ?? 300,
        });
      }
    },
    [translateX, translateY]
  );

  const bounce = useCallback(
    (config: AnimationConfig = {}) => {
      scale.value = withSequence(
        withTiming(1.2, { duration: 150 }),
        withSpring(1, {
          damping: config.damping ?? 10,
          stiffness: config.stiffness ?? 400,
        })
      );
    },
    [scale]
  );

  const shake = useCallback(
    (config: AnimationConfig = {}) => {
      const shakeDistance = 10;
      translateX.value = withSequence(
        withTiming(-shakeDistance, { duration: 50 }),
        withRepeat(
          withSequence(
            withTiming(shakeDistance, { duration: 50 }),
            withTiming(-shakeDistance, { duration: 50 })
          ),
          3,
          true
        ),
        withTiming(0, { duration: 50 })
      );
    },
    [translateX]
  );

  const pulse = useCallback(
    (config: AnimationConfig = {}) => {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: config.duration ?? 500 }),
          withTiming(1, { duration: config.duration ?? 500 })
        ),
        -1,
        true
      );
    },
    [scale]
  );

  const rotate360 = useCallback(
    (config: AnimationConfig = {}) => {
      rotate.value = withTiming(rotate.value + 360, {
        duration: config.duration ?? 1000,
      });
    },
    [rotate]
  );

  // Combined animations
  const enterAnimation = useCallback(
    (config: AnimationConfig = {}) => {
      opacity.value = 0;
      scale.value = 0.8;
      translateY.value = 50;

      opacity.value = withDelay(
        config.delay ?? 0,
        withTiming(1, { duration: config.duration ?? 400 })
      );
      scale.value = withDelay(
        config.delay ?? 0,
        withSpring(1, {
          damping: config.damping ?? 20,
          stiffness: config.stiffness ?? 300,
        })
      );
      translateY.value = withDelay(
        config.delay ?? 0,
        withSpring(0, {
          damping: config.damping ?? 20,
          stiffness: config.stiffness ?? 200,
        })
      );
    },
    [opacity, scale, translateY]
  );

  const exitAnimation = useCallback(
    (config: AnimationConfig = {}) => {
      opacity.value = withTiming(0, { duration: config.duration ?? 300 });
      scale.value = withTiming(0.8, { duration: config.duration ?? 300 });
      translateY.value = withTiming(-30, { duration: config.duration ?? 300 });
    },
    [opacity, scale, translateY]
  );

  const pressAnimation = useCallback(
    (onComplete?: () => void) => {
      scale.value = withSequence(
        withTiming(0.95, { duration: 100 }),
        withSpring(1, { damping: 20, stiffness: 300 }, finished => {
          if (finished && onComplete) {
            runOnJS(onComplete)();
          }
        })
      );

      // Add haptic feedback
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
    },
    [scale]
  );

  // Animated styles
  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const slideStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const combinedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return {
    // Shared values
    opacity,
    scale,
    translateX,
    translateY,
    rotate,

    // Animation functions
    fadeIn,
    fadeOut,
    scaleIn,
    scaleOut,
    slideInFromLeft,
    slideInFromRight,
    slideInFromTop,
    slideInFromBottom,
    slideOut,
    bounce,
    shake,
    pulse,
    rotate360,

    // Combined animations
    enterAnimation,
    exitAnimation,
    pressAnimation,

    // Animated styles
    fadeStyle,
    scaleStyle,
    slideStyle,
    rotateStyle,
    combinedStyle,
  };
};
