// Authentication types - React types are available globally from global.d.ts

// Auth schema inferred types
type LoginFormType = import('../schemas/auth').LoginFormInfer;
type RegisterFormType = import('../schemas/auth').RegisterFormInfer;
type ForgotPasswordFormType = import('../schemas/auth').ForgotPasswordFormInfer;
type OTPVerificationFormType = import('../schemas/auth').OTPVerificationFormInfer;
type ResetPasswordFormType = import('../schemas/auth').ResetPasswordFormInfer;
type ResetPasswordWithOTPFormType = import('../schemas/auth').ResetPasswordWithOTPFormInfer;

// Auth state types
interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginFormType) => Promise<void>;
  register: (userData: RegisterFormType) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  verifyOTP: (data: OTPVerificationFormType) => Promise<void>;
  resetPassword: (data: ResetPasswordFormType) => Promise<void>;
  resetPasswordWithOTP: (data: ResetPasswordWithOTPFormType) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
  setUser: (user: UserProfile) => void;
}

// Auth context type
interface AuthContextType extends AuthState, AuthActions {}

// Auth hook return type
interface UseAuthReturn extends AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: UserProfile | null;
  login: (credentials: LoginFormType) => Promise<void>;
  register: (userData: RegisterFormType) => Promise<void>;
  logout: () => Promise<void>;
}

// Token types
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// User session type
interface UserSession {
  user: UserProfile;
  tokens: AuthTokens;
  lastActivity: Date;
}

// Password strength types
type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

// Social login types
type SocialProvider = 'google' | 'apple' | 'facebook';
