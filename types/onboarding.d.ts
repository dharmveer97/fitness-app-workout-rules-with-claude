// React types
type ReactNode = import('react').ReactNode;
type Dispatch<T> = import('react').Dispatch<T>;
type SetStateAction<T> = import('react').SetStateAction<T>;

// Onboarding schema inferred types
type PersonalInfoStepType =
  import('../schemas/onboarding').PersonalInfoStepInfer;
type GoalsStepType = import('../schemas/onboarding').GoalsStepInfer;
type PreferencesStepType = import('../schemas/onboarding').PreferencesStepInfer;
type CompleteOnboardingType =
  import('../schemas/onboarding').CompleteOnboardingInfer;

// Onboarding step types
type OnboardingStep =
  | 'welcome'
  | 'personal-info'
  | 'goals'
  | 'preferences'
  | 'complete';

// Onboarding state types
interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  personalInfo: Partial<PersonalInfoStepType>;
  goals: Partial<GoalsStepType>;
  preferences: Partial<PreferencesStepType>;
  isLoading: boolean;
  error: string | null;
}

interface OnboardingActions {
  setCurrentStep: (step: OnboardingStep) => void;
  updatePersonalInfo: (data: Partial<PersonalInfoStepType>) => void;
  updateGoals: (data: Partial<GoalsStepType>) => void;
  updatePreferences: (data: Partial<PreferencesStepType>) => void;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Onboarding context type
interface OnboardingContextType extends OnboardingState, OnboardingActions {}

// Onboarding hook return type
interface UseOnboardingReturn extends OnboardingContextType {}

// Onboarding progress type
interface OnboardingProgress {
  totalSteps: number;
  currentStepIndex: number;
  completedStepsCount: number;
  progressPercentage: number;
}

// Step validation type
interface StepValidation {
  isValid: boolean;
  errors: Record<string, string>;
}
