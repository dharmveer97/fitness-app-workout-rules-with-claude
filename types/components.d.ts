// React types
type ReactNode = import('react').ReactNode;
type ComponentProps<T> = import('react').ComponentProps<T>;
type FC<P = {}> = import('react').FC<P>;

// Atomic component types
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  haptic?: boolean;
  fullWidth?: boolean;
  className?: string;
}

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  children: ReactNode;
  className?: string;
}

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  icon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'glass';
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

// Molecular component types
interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onPress?: () => void;
}

interface FormFieldProps {
  children: ReactNode;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface ListItemProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  children?: ReactNode;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string | number;
  changeLabel?: string;
  icon?: string;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
}

// Organism component types
interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  variant?: 'default' | 'transparent' | 'glass';
  className?: string;
}

interface TabBarProps {
  tabs: Array<{
    name: string;
    icon: string;
    label: string;
    badge?: number;
  }>;
  activeTab: string;
  onTabPress: (tab: string) => void;
  variant?: 'default' | 'floating' | 'glass';
}

interface JournalFormProps {
  initialData?: Partial<JournalEntryType>;
  onSubmit: (data: JournalEntryType) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface ChallengeCardProps {
  challenge: ChallengeType;
  userChallenge?: UserChallengeType;
  onJoin?: () => void;
  onView?: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

// Template component types
interface AuthTemplateProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

interface DashboardTemplateProps {
  children: ReactNode;
  header?: ReactNode;
  floatingAction?: ReactNode;
}

interface FormTemplateProps {
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  isValid?: boolean;
}

// Animation component types
interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

interface SlideUpProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

interface ScaleInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

// Modal component types
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: 'center' | 'bottom' | 'fullscreen';
  animationType?: 'slide' | 'fade' | 'none';
  transparent?: boolean;
}

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number | string;
  snapPoints?: (string | number)[];
}
