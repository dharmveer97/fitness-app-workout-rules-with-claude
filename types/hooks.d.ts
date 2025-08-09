interface AnimationConfig {
  duration?: number
  delay?: number
  damping?: number
  stiffness?: number
  mass?: number
}

interface UseAnimationsReturn {
  // Shared values
  opacity: SharedValue<number>
  scale: SharedValue<number>
  translateX: SharedValue<number>
  translateY: SharedValue<number>
  rotate: SharedValue<number>

  // Animation functions
  fadeIn: (config?: AnimationConfig) => void
  fadeOut: (config?: AnimationConfig) => void
  scaleIn: (config?: AnimationConfig) => void
  scaleOut: (config?: AnimationConfig) => void
  slideInFromLeft: (config?: AnimationConfig) => void
  slideInFromRight: (config?: AnimationConfig) => void
  slideInFromTop: (config?: AnimationConfig) => void
  slideInFromBottom: (config?: AnimationConfig) => void
  slideOut: (direction: SlideDirection, config?: AnimationConfig) => void
  bounce: (config?: AnimationConfig) => void
  shake: (config?: AnimationConfig) => void
  pulse: (config?: AnimationConfig) => void
  rotate360: (config?: AnimationConfig) => void

  // Combined animations
  enterAnimation: (config?: AnimationConfig) => void
  exitAnimation: (config?: AnimationConfig) => void
  pressAnimation: (onComplete?: () => void) => void

  // Animated styles
  fadeStyle: AnimatedStyle<ViewStyle>
  scaleStyle: AnimatedStyle<ViewStyle>
  slideStyle: AnimatedStyle<ViewStyle>
  rotateStyle: AnimatedStyle<ViewStyle>
  combinedStyle: AnimatedStyle<ViewStyle>
}

// Haptics hook types
interface UseHapticsReturn {
  light: () => void
  medium: () => void
  heavy: () => void
  success: () => void
  warning: () => void
  error: () => void
  selection: () => void
  impactLight: () => void
  impactMedium: () => void
  impactHeavy: () => void
  notificationSuccess: () => void
  notificationWarning: () => void
  notificationError: () => void
  selectionChanged: () => void
}
