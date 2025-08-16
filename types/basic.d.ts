// Basic UI element types (atoms and molecules)

// Basic button types
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass'
type ButtonSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'

// Basic input types
type InputVariant = 'default' | 'glass'
type InputType = 'text' | 'email' | 'password' | 'number'

// Common color types
type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

// Animation direction types
type SlideDirection = 'left' | 'right' | 'top' | 'bottom'
type AnimationDirection = 'in' | 'out'

// Theme types
type ThemeMode = 'light' | 'dark' | 'auto'

// Status types
type LoadingState = 'idle' | 'loading' | 'success' | 'error'
type TrendDirection = 'up' | 'down' | 'neutral'

// Size types
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Common prop types
interface WithClassName {
  className?: string
}

interface WithLoading {
  loading?: boolean
}

interface WithDisabled {
  disabled?: boolean
}

interface WithVariant<T = string> {
  variant?: T
}

interface WithSize<T = ComponentSize> {
  size?: T
}

interface WithColor {
  color?: string
}

interface WithDelay {
  delay?: number
}

// Reusable base interfaces
interface BaseComponentProps extends WithClassName, WithDisabled {
  children?: import('react').ReactNode
}

interface InteractiveComponentProps extends BaseComponentProps, WithLoading {
  onPress?: () => void
}

interface AnimatedComponentProps extends BaseComponentProps, WithDelay {
  duration?: number
}

interface StyledComponentProps
  extends BaseComponentProps,
    WithVariant,
    WithSize,
    WithColor {
  fullWidth?: boolean
}

// Atomic UI component interfaces - basic building blocks
interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  rightIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  children?: ReactNode
  className?: string
  textClassName?: string
  animate?: boolean
}

type ButtonProps = CustomButtonProps & TouchableOpacityProps

interface CustomTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label' | 'tiny'
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'white'
    | 'dark'
    | 'gray'
  align?: 'left' | 'center' | 'right' | 'justify'
  className?: string
  children?: ReactNode
}

type CustomTextComponentProps = CustomTextProps & RNTextProps

interface CustomInputProps {
  label?: string
  error?: string
  hint?: string
  leftIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  rightIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  onRightIconPress?: () => void
  variant?: 'default' | 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  containerClassName?: string
  inputClassName?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'phone'
}

type InputProps = CustomInputProps & TextInputProps

interface IconProps {
  name: string
  size?: number
  color?: string
  className?: string
}

interface CustomBadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  children?: ReactNode
  className?: string
  textClassName?: string
}

type BadgeProps = CustomBadgeProps & ViewProps

// Molecular UI component interfaces - composed elements
interface CustomCardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  animated?: boolean
  className?: string
  children?: ReactNode
}

type CardProps = CustomCardProps & ViewProps

interface ListItemProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  rightIcon?: ReactNode
  onPress?: () => void
  disabled?: boolean
  className?: string
}

interface ModalProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
  variant?: 'center' | 'bottom' | 'fullscreen'
  animationType?: 'slide' | 'fade' | 'none'
  transparent?: boolean
}

interface BottomSheetProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
  height?: number | string
  snapPoints?: (string | number)[]
}

// Error Boundary types
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

// Theme types for Themed components
interface ThemeProps {
  lightColor?: string
  darkColor?: string
}

type ThemedTextProps = ThemeProps & CustomTextComponentProps
type ThemedViewProps = ThemeProps & ViewProps

// Advanced UI component interfaces
interface CustomSelectOption<T = string> {
  value: T
  label: string
  description?: string
  icon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  badge?: string
  disabled?: boolean
}

interface CustomSelectGroupProps<T = string> {
  label?: string
  options: CustomSelectOption<T>[]
  value?: T[]
  onChange?: (values: T[]) => void
  multiple?: boolean
  max?: number
  min?: number
  variant?: 'default' | 'chips' | 'cards'
  error?: string
  hint?: string
  containerClassName?: string
}

type SelectGroupProps<T = string> = CustomSelectGroupProps<T> & ViewProps

interface CustomRadioOption<T = string> {
  value: T
  label: string
  description?: string
  disabled?: boolean
  icon?: ReactNode
}

interface CustomRadioGroupProps<T = string> {
  label?: string
  options: CustomRadioOption<T>[]
  value?: T
  onChange?: (value: T) => void
  orientation?: 'vertical' | 'horizontal'
  variant?: 'default' | 'card' | 'button'
  error?: string
  containerClassName?: string
}

type RadioGroupProps<T = string> = CustomRadioGroupProps<T> & ViewProps

interface CustomStep {
  id: string
  title: string
  description?: string
  icon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  completed?: boolean
  active?: boolean
  disabled?: boolean
}

interface CustomProgressStepsProps {
  steps: CustomStep[]
  currentStep: number
  onStepPress?: (index: number, step: CustomStep) => void
  variant?: 'default' | 'compact' | 'detailed'
  orientation?: 'horizontal' | 'vertical'
  showConnector?: boolean
  containerClassName?: string
}

type ProgressStepsProps = CustomProgressStepsProps & ViewProps

interface CustomInputGroupProps {
  label?: string
  required?: boolean
  error?: string
  hint?: string
  badge?: string
  inputs?: CustomInputProps[]
  orientation?: 'vertical' | 'horizontal'
  gap?: 'sm' | 'md' | 'lg'
  containerClassName?: string
  children?: ReactNode
}

type InputGroupProps = CustomInputGroupProps & ViewProps

type FormFieldProps = InputProps & {
  label?: string
  required?: boolean
  error?: string
  success?: string
  hint?: string
  badge?: string
  tooltip?: string
  showTooltip?: boolean
  onTooltipPress?: () => void
  containerClassName?: string
  animated?: boolean
}


// Temporary aliases for backward compatibility
type RadioOption<T = string> = CustomRadioOption<T>
type Step = CustomStep
type SelectOption<T = string> = CustomSelectOption<T>
