// Specific Component Props - Basic UI types are in basic.d.ts

// Home component types
interface ProgressRingProps extends ProgressRingData {
  size?: number
  strokeWidth?: number
  delay?: number
  showValue?: boolean
  icon?: string
}

interface StatsCardProps {
  title: string
  value: string | number
  unit?: string
  change?: string | number
  changeLabel?: string
  icon?: string
  color?: string
  trend?: TrendDirection
}

interface StatsCardPropsExtended extends StatsCardProps {
  onPress?: () => void
  delay?: number
}

interface WeeklyChartProps {
  data: ChartDataPoint[]
  title: string
  color?: string
  height?: number
  delay?: number
}

interface ActivityItemProps {
  activity: Activity
  onPress?: () => void
  delay?: number
}

// Profile component types
interface ProfileHeaderProps {
  profile: UserProfile
  onEditPress?: () => void
  onAvatarPress?: () => void
}

interface GoalInputProps {
  icon: string
  label: string
  value: number
  unit: string
  min?: number
  max?: number
  step?: number
  color?: string
  onValueChange: (value: number) => void
  delay?: number
  suggestions?: number[]
}

// Organism component types
interface HeaderProps {
  title?: string
  subtitle?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onLeftPress?: () => void
  onRightPress?: () => void
  variant?: 'default' | 'transparent' | 'glass'
  className?: string
}

interface TabBarProps {
  tabs: Array<{
    name: string
    icon: string
    label: string
    badge?: number
  }>
  activeTab: string
  onTabPress: (tab: string) => void
  variant?: 'default' | 'floating' | 'glass'
}

// Template component types
interface AuthTemplateProps {
  children: ReactNode
  title: string
  subtitle?: string
  showBackButton?: boolean
  onBackPress?: () => void
}

interface DashboardTemplateProps {
  children: ReactNode
  header?: ReactNode
  floatingAction?: ReactNode
}

interface FormTemplateProps {
  children: ReactNode
  title: string
  onSubmit: () => void
  onCancel?: () => void
  submitLabel?: string
  isLoading?: boolean
  isValid?: boolean
}

// Animation component types
interface FadeInProps {
  children: ReactNode
  duration?: number
  delay?: number
}

interface SlideUpProps {
  children: ReactNode
  duration?: number
  delay?: number
}

interface ScaleInProps {
  children: ReactNode
  duration?: number
  delay?: number
}

// Auth component types
interface AuthButtonProps extends TouchableOpacityProps {
  title: string
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  leftIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  rightIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  fullWidth?: boolean
}

interface AuthInputProps {
  label: string
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  onBlur?: (e: any) => void
  onFocus?: (e: any) => void
  error?: string
  touched?: boolean
  isPassword?: boolean
  leftIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  rightIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  onRightIconPress?: () => void
  keyboardType?: import('react-native').KeyboardTypeOptions
  autoCapitalize?: import('react-native').AutoCapitalize
  autoComplete?: import('react-native').TextInputProps['autoComplete']
}

interface OTPInputProps {
  length?: number
  value: string
  onChangeText: (otp: string) => void
  onComplete?: (otp: string) => void
  error?: string
  autoFocus?: boolean
}

interface OTPWithTimerProps extends OTPInputProps {
  resendTimer?: number
  onResend?: () => void
  resendText?: string
}

interface PasswordStrengthIndicatorProps {
  password: string
  showRequirements?: boolean
  className?: string
}

interface PasswordRequirement {
  id: string
  label: string
  test: (password: string) => boolean
}

interface RequirementItemProps {
  label: string
  isMet: boolean
  isVisible: boolean
}

interface SocialLoginButtonProps {
  provider: SocialProvider
  onPress: () => void
  loading?: boolean
  disabled?: boolean
}

interface SocialLoginGroupProps {
  onGooglePress?: () => void
  onApplePress?: () => void
  onFacebookPress?: () => void
  googleLoading?: boolean
  appleLoading?: boolean
  facebookLoading?: boolean
  disabled?: boolean
}

// Onboarding component types
interface OnboardingSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
  gradient: string[]
}

interface OnboardingSlideProps {
  slide: OnboardingSlide
  index: number
  scrollX: SharedValue<number>
}

interface PaginationDotProps {
  index: number
  currentIndex: number
  onPress: () => void
}

// Home component types
interface QuickActionButtonProps {
  title: string
  icon: string
  color?: string
  onPress: () => void
  delay?: number
  variant?: 'primary' | 'secondary'
}

// Profile component types
interface SettingsItemProps {
  icon: string
  title: string
  subtitle?: string
  value?: string | number | boolean
  type?: 'navigation' | 'switch' | 'value' | 'action'
  color?: string
  onPress?: () => void
  onToggle?: (value: boolean) => void
  delay?: number
  destructive?: boolean
}

// Navigation component types
interface RouteGuardProps {
  children: ReactNode
  guards: Array<{
    condition: boolean
    redirect: string
    priority?: number
  }>
}

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requireOnboarding?: boolean
  requireVerification?: boolean
  fallback?: string
  loadingComponent?: ReactNode
  unauthorizedComponent?: ReactNode
}

interface NavigationProviderProps {
  children: ReactNode
}
