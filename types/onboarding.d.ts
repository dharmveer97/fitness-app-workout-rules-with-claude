// Onboarding schema inferred types
type PersonalInfoStepType =
  import('../schemas/onboarding').PersonalInfoStepInfer
type GoalsStepType = import('../schemas/onboarding').GoalsStepInfer
type PreferencesStepType = import('../schemas/onboarding').PreferencesStepInfer
type CompleteOnboardingType =
  import('../schemas/onboarding').CompleteOnboardingInfer

// Onboarding step types
type OnboardingStep =
  | 'welcome'
  | 'personal-info'
  | 'goals'
  | 'preferences'
  | 'complete'

// Onboarding state types
interface OnboardingState {
  currentStep: OnboardingStep
  completedSteps: OnboardingStep[]
  personalInfo: Partial<PersonalInfoStepType>
  goals: Partial<GoalsStepType>
  preferences: Partial<PreferencesStepType>
  isLoading: boolean
  error: string | null
}

interface OnboardingActions {
  setCurrentStep: (step: OnboardingStep) => void
  updatePersonalInfo: (data: Partial<PersonalInfoStepType>) => void
  updateGoals: (data: Partial<GoalsStepType>) => void
  updatePreferences: (data: Partial<PreferencesStepType>) => void
  completeOnboarding: () => Promise<void>
  resetOnboarding: () => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

// Onboarding context type
interface OnboardingContextType extends OnboardingState, OnboardingActions {}

// Onboarding hook return type
type UseOnboardingReturn = OnboardingContextType

// Onboarding progress type
interface OnboardingProgress {
  totalSteps: number
  currentStepIndex: number
  completedStepsCount: number
  progressPercentage: number
}

// Step validation type
interface StepValidation {
  isValid: boolean
  errors: Record<string, string>
}

// Zustand Onboarding Store Types
interface OnboardingSlideProgress {
  id: string
  completed: boolean
  skipped?: boolean
  timestamp?: string
}

interface OnboardingStoreState {
  isOnboardingCompleted: boolean
  currentSlideIndex: number
  slidesProgress: OnboardingSlideProgress[]
  personalInfo: Partial<PersonalInfoStepType>
  goals: Partial<GoalsStepType>
  preferences: Partial<PreferencesStepType>
  analytics: {
    startTime?: string
    completionTime?: string
    skippedSteps?: string[]
    interactionCount?: number
  }
  _hasHydrated: boolean
  isLoading: boolean
  error: string | null
}

interface OnboardingStoreActions {
  setCurrentSlideIndex: (index: number) => void
  markSlideCompleted: (slideId: string) => void
  markSlideSkipped: (slideId: string) => void
  updatePersonalInfo: (
    info: Partial<OnboardingStoreState['personalInfo']>,
  ) => void
  updateGoals: (goals: Partial<OnboardingStoreState['goals']>) => void
  updatePreferences: (
    preferences: Partial<OnboardingStoreState['preferences']>,
  ) => void
  completeOnboarding: () => void
  resetOnboarding: () => void
  nextSlide: () => void
  previousSlide: () => void
  setHasHydrated: (hydrated: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  setLoading: (loading: boolean) => void
  initializeOnboarding: () => void
  saveOnboardingProgress: () => Promise<void>
  completeOnboardingAsync: () => Promise<void>
  completeOnboardingWithSignIn: () => Promise<void>
  reset: () => void
}

interface OnboardingStore
  extends OnboardingStoreState,
    OnboardingStoreActions {}
