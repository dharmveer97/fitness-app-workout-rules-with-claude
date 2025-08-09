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
interface ButtonProps extends InteractiveComponentProps, StyledComponentProps {
  variant?: ButtonVariant
  size?: ButtonSize
  onPress: () => void
  icon?: ReactNode
  haptic?: boolean
}

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  color?: string
  children: ReactNode
  className?: string
}

interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  error?: string
  type?: InputType
  icon?: ReactNode
  rightIcon?: ReactNode
  variant?: InputVariant
  className?: string
  autoFocus?: boolean
  disabled?: boolean
}

interface IconProps {
  name: string
  size?: number
  color?: string
  className?: string
}

// Molecular UI component interfaces - composed elements
interface CardProps {
  children: ReactNode
  variant?: 'default' | 'glass' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  onPress?: () => void
}

interface FormFieldProps {
  children: ReactNode
  label?: string
  error?: string
  required?: boolean
  className?: string
}

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
