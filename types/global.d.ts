// Global type definitions - Cross-cutting types used everywhere

// Node.js globals available in React Native
declare const setTimeout: (
  callback: () => void,
  delay?: number,
) => NodeJS.Timeout
declare const clearTimeout: (timeout: NodeJS.Timeout) => void
declare const setInterval: (
  callback: () => void,
  delay?: number,
) => NodeJS.Timeout

declare const clearInterval: (interval: NodeJS.Timeout) => void
declare const console: Console
declare const process: NodeJS.Process

// React types - available globally in all .d.ts files with proper generics
type ReactNode = import('react').ReactNode
type ComponentProps<
  T extends
    | keyof JSX.IntrinsicElements
    | import('react').JSXElementConstructor<any>,
> = import('react').ComponentProps<T>
type FC<P = {}> = import('react').FC<P>
type Dispatch<T> = import('react').Dispatch<T>
type SetStateAction<T> = import('react').SetStateAction<T>
type RefObject<T> = import('react').RefObject<T>
type MutableRefObject<T> = import('react').MutableRefObject<T>
type Ref<T> = import('react').Ref<T>

// React hooks types
type UseStateReturn<T> = [T, Dispatch<SetStateAction<T>>]
type DependencyList = import('react').DependencyList
type EffectCallback = import('react').EffectCallback

// React Native types with proper generics
type ViewStyle = import('react-native').ViewStyle
type TextStyle = import('react-native').TextStyle
type ImageStyle = import('react-native').ImageStyle
type StyleProp<T> = import('react-native').StyleProp<T>
type GestureResponderEvent = import('react-native').GestureResponderEvent
type LayoutChangeEvent = import('react-native').LayoutChangeEvent
type NativeSyntheticEvent<T> = import('react-native').NativeSyntheticEvent<T>
type ViewProps = import('react-native').ViewProps
type TextProps = import('react-native').TextProps
type TouchableOpacityProps = import('react-native').TouchableOpacityProps

// Reanimated types with proper generics
type SharedValue<T> = import('react-native-reanimated').SharedValue<T>
type AnimatedStyle<T = any> = import('react-native-reanimated').AnimatedStyle<T>
type AnimatedStyleProp<T> =
  import('react-native-reanimated').AnimatedStyleProp<T>
type AnimatedProps<T extends object> =
  import('react-native-reanimated').AnimatedProps<T>
type WithTimingConfig = import('react-native-reanimated').WithTimingConfig
type WithSpringConfig = import('react-native-reanimated').WithSpringConfig

// Expo types
type ColorSchemeName = import('react-native').ColorSchemeName

// Journal types
type JournalEntryType = import('../schemas/journal').JournalEntryInfer
type MoodType = import('../schemas/journal').MoodInfer
type TodoItemType = import('../schemas/journal').TodoItemInfer

// Challenge types
type ChallengeType = import('../schemas/challenges').ChallengeInfer
type UserChallengeType = import('../schemas/challenges').UserChallengeInfer

// Food types
type FoodEntryType = import('../schemas/food').FoodEntryInfer
type FoodItemType = import('../schemas/food').FoodItemInfer

// Hook types
interface ThemeColorProps {
  light?: string
  dark?: string
}

interface UseOnboardingSlidesProps {
  slidesLength: number
  onLastSlide?: () => void
}

interface UseOnboardingSlidesReturn<T> {
  currentIndex: number
  scrollX: import('react-native').Animated.Value
  slidesRef: any
  width: number
  viewableItemsChanged: (info: {
    viewableItems: import('react-native').ViewToken[]
  }) => void
  viewConfig: { viewAreaCoveragePercentThreshold: number }
  scrollToNext: () => void
  scrollToPrev: () => void
}

interface UseImageUploaderResult {
  image: string | null
  uploading: boolean
  pickImage: () => Promise<void>
  takePhoto: () => Promise<void>
}
