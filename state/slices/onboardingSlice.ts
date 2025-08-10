import * as SecureStore from 'expo-secure-store'

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'

interface OnboardingSlide {
  id: string
  completed: boolean
  skipped?: boolean
  timestamp?: string
}

export interface OnboardingState {
  isOnboardingCompleted: boolean
  currentSlideIndex: number
  slidesProgress: OnboardingSlide[]
  personalInfo: {
    name?: string
    age?: number
    gender?: 'male' | 'female' | 'other'
    fitnessLevel?: 'beginner' | 'intermediate' | 'advanced'
    height?: number
    weight?: number
    activityLevel?:
      | 'sedentary'
      | 'lightly-active'
      | 'moderately-active'
      | 'very-active'
  }
  goals: {
    primaryGoal?:
      | 'weight-loss'
      | 'muscle-gain'
      | 'endurance'
      | 'general-fitness'
    secondaryGoals?: string[]
    targetWeight?: number
    targetDate?: string
    workoutFrequency?: number
    dailyCalories?: number
    proteinTarget?: number
  }
  preferences: {
    workoutTime?: 'morning' | 'afternoon' | 'evening'
    workoutDuration?: number
    equipment?: string[]
    notifications?: boolean
    reminders?: boolean
    reminderTime?: string
    units?: 'metric' | 'imperial'
    theme?: 'light' | 'dark' | 'system'
  }
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

// Simple async thunk without complex state updates
export const initializeOnboarding = createAsyncThunk(
  'onboarding/initialize',
  async () => {
    // Simple initialization without SecureStore writes that cause loops
    const startTime = new Date().toISOString()
    return { startTime }
  },
)

export const saveOnboardingProgress = createAsyncThunk(
  'onboarding/saveProgress',
  async (_, { getState }) => {
    const state = getState() as { onboarding: OnboardingState }
    const progressData = JSON.stringify({
      personalInfo: state.onboarding.personalInfo,
      goals: state.onboarding.goals,
      preferences: state.onboarding.preferences,
      slidesProgress: state.onboarding.slidesProgress,
    })
    await SecureStore.setItemAsync('onboarding_progress', progressData)
  },
)

export const completeOnboardingAsync = createAsyncThunk(
  'onboarding/completeAsync',
  async (_, { getState }) => {
    const completionTime = new Date().toISOString()
    await SecureStore.setItemAsync('onboarding_completed', 'true')
    await SecureStore.setItemAsync('onboarding_completion_time', completionTime)

    // Save final progress without dispatching to avoid loops
    const state = getState() as { onboarding: OnboardingState }
    const progressData = JSON.stringify({
      personalInfo: state.onboarding.personalInfo,
      goals: state.onboarding.goals,
      preferences: state.onboarding.preferences,
      slidesProgress: state.onboarding.slidesProgress,
    })
    await SecureStore.setItemAsync('onboarding_progress', progressData)

    return { completionTime }
  },
)

// Combined action that completes onboarding and signs in the user
export const completeOnboardingWithSignIn = createAsyncThunk(
  'onboarding/completeWithSignIn',
  async (_, { dispatch, getState, rejectWithValue }) => {
    console.log('🔵 Redux Thunk: completeOnboardingWithSignIn started')
    
    try {
      const state = getState() as { onboarding: OnboardingState }
      const { personalInfo, preferences } = state.onboarding
      
      console.log('🔵 Redux Thunk: Current state extracted:', {
        personalInfo,
        preferences,
        fullOnboardingState: state.onboarding,
      })

      // Mark preferences slide as completed
      console.log('🔵 Redux Thunk: Step 1 - Marking preferences slide as completed')
      dispatch(markSlideCompleted('preferences'))

      // Complete onboarding
      console.log('🔵 Redux Thunk: Step 2 - Completing onboarding')
      dispatch(completeOnboarding())

      // Create demo user with ISO date strings (safe serializable data)
      console.log('🔵 Redux Thunk: Step 3 - Creating demo user')
      const currentDate = new Date().toISOString()
      const demoUser = {
        id: '1',
        name: personalInfo.name ?? 'Fitness User',
        email: 'demo@fitness.app',
        avatar: 'https://i.pravatar.cc/150',
        fitnessLevel: (personalInfo.fitnessLevel ??
          'beginner') as WorkoutDifficulty,
        unitSystem: 'metric' as UnitSystem,
        joinDate: currentDate,
        createdAt: currentDate,
        updatedAt: currentDate,
        goals: {
          dailySteps: 10000,
          dailyWater: 2500,
          dailyCalories: 2000,
          weeklyWorkouts: 3,
          sleepHours: 8,
        },
        preferences: {
          notifications: {
            workoutReminders: preferences.notifications ?? true,
            waterReminders: preferences.reminders ?? true,
            sleepReminders: false,
          },
          privacy: {
            shareStats: false,
            shareWorkouts: true,
          },
        },
      }

      console.log('🔵 Redux Thunk: Step 4 - Demo user created:', demoUser)

      // Import and dispatch signIn from authSlice (dynamic import to avoid circular deps)
      console.log('🔵 Redux Thunk: Step 5 - Importing authSlice')
      const authModule = await import('./authSlice')

      // Complete auth onboarding first
      console.log('🔵 Redux Thunk: Step 6 - Completing auth onboarding')
      dispatch(authModule.completeOnboarding())

      // Then sign in the user with the demo data
      console.log('🔵 Redux Thunk: Step 7 - Signing in user with demo data')
      dispatch(
        authModule.signIn({
          accessToken: 'demo-token-onboarding',
          refreshToken: 'demo-refresh-token',
          user: demoUser,
        }),
      )

      // Save completion status to SecureStore
      console.log('🔵 Redux Thunk: Step 8 - Saving to SecureStore')
      await SecureStore.setItemAsync('onboarding_completed', 'true')
      console.log('🔵 Redux Thunk: Step 9 - SecureStore save completed')

      const result = { success: true, user: demoUser }
      console.log('🟢 Redux Thunk: SUCCESS - Returning result:', result)
      return result
    } catch (error) {
      console.error('🔴 Redux Thunk: ERROR in completeOnboardingWithSignIn:', error)
      console.error('🔴 Redux Thunk: Error type:', typeof error)
      console.error('🔴 Redux Thunk: Error details:', {
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
        cause: error?.cause,
      })
      
      return rejectWithValue({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
        originalError: error,
      })
    }
  },
)

const initialState: OnboardingState = {
  isOnboardingCompleted: false,
  currentSlideIndex: 0,
  slidesProgress: [
    { id: 'personal-info', completed: false },
    { id: 'goals', completed: false },
    { id: 'preferences', completed: false },
  ],
  personalInfo: {},
  goals: {},
  preferences: {
    notifications: true,
    reminders: true,
    units: 'metric',
    theme: 'dark',
  },
  analytics: {
    interactionCount: 0,
  },
  _hasHydrated: true,
  isLoading: false,
  error: null,
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentSlideIndex(state, action: PayloadAction<number>) {
      state.currentSlideIndex = action.payload
    },
    markSlideCompleted(state, action: PayloadAction<string>) {
      const slide = state.slidesProgress.find((s) => s.id === action.payload)
      if (slide) {
        slide.completed = true
        slide.timestamp = new Date().toISOString()
      }
    },
    markSlideSkipped(state, action: PayloadAction<string>) {
      const slide = state.slidesProgress.find((s) => s.id === action.payload)
      if (slide) {
        slide.skipped = true
        slide.timestamp = new Date().toISOString()
      }
      state.analytics.skippedSteps ??= []
      state.analytics.skippedSteps.push(action.payload)
    },
    updatePersonalInfo(
      state,
      action: PayloadAction<OnboardingState['personalInfo']>,
    ) {
      state.personalInfo = { ...state.personalInfo, ...action.payload }
    },
    updateGoals(state, action: PayloadAction<OnboardingState['goals']>) {
      state.goals = { ...state.goals, ...action.payload }
    },
    updatePreferences(
      state,
      action: PayloadAction<OnboardingState['preferences']>,
    ) {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    completeOnboarding(state) {
      state.isOnboardingCompleted = true
      state.analytics.completionTime = new Date().toISOString()
      state.slidesProgress.forEach((slide) => {
        if (!slide.completed && !slide.skipped) {
          slide.completed = true
          slide.timestamp = new Date().toISOString()
        }
      })
    },
    resetOnboarding(state) {
      Object.assign(state, {
        ...initialState,
        _hasHydrated: state._hasHydrated,
      })
      // Clear from secure storage
      SecureStore.deleteItemAsync('onboarding_completed')
      SecureStore.deleteItemAsync('onboarding_progress')
      SecureStore.deleteItemAsync('onboarding_start_time')
      SecureStore.deleteItemAsync('onboarding_completion_time')
    },
    nextSlide(state) {
      if (state.currentSlideIndex < state.slidesProgress.length - 1) {
        state.currentSlideIndex += 1
      }
    },
    previousSlide(state) {
      if (state.currentSlideIndex > 0) {
        state.currentSlideIndex -= 1
      }
    },
    setHasHydrated(state, action: PayloadAction<boolean>) {
      state._hasHydrated = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeOnboarding.fulfilled, (state, action) => {
        state.analytics.startTime = action.payload.startTime
        state.isLoading = false
      })
      .addCase(initializeOnboarding.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(initializeOnboarding.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Failed to initialize onboarding'
      })
      .addCase(completeOnboardingAsync.fulfilled, (state, action) => {
        state.isOnboardingCompleted = true
        state.analytics.completionTime = action.payload.completionTime
        state.isLoading = false
      })
      .addCase(completeOnboardingAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(completeOnboardingAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Failed to complete onboarding'
      })
      .addCase(saveOnboardingProgress.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to save progress'
      })
      .addCase(completeOnboardingWithSignIn.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(completeOnboardingWithSignIn.fulfilled, (state) => {
        state.isOnboardingCompleted = true
        state.isLoading = false
        state.error = null
      })
      .addCase(completeOnboardingWithSignIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Failed to complete onboarding'
      })
  },
})

export const {
  setCurrentSlideIndex,
  markSlideCompleted,
  markSlideSkipped,
  updatePersonalInfo,
  updateGoals,
  updatePreferences,
  completeOnboarding,
  resetOnboarding,
  nextSlide,
  previousSlide,
  setHasHydrated,
  setError,
  clearError,
} = onboardingSlice.actions

export default onboardingSlice.reducer
