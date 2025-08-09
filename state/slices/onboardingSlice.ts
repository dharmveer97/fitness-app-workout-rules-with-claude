import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

interface OnboardingSlide {
  id: string;
  completed: boolean;
  skipped?: boolean;
  timestamp?: string;
}

export interface OnboardingState {
  isOnboardingCompleted: boolean;
  currentSlideIndex: number;
  slidesProgress: OnboardingSlide[];
  personalInfo: {
    name?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
    height?: number;
    weight?: number;
    activityLevel?: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active';
  };
  goals: {
    primaryGoal?: 'weight-loss' | 'muscle-gain' | 'endurance' | 'general-fitness';
    secondaryGoals?: string[];
    targetWeight?: number;
    targetDate?: string;
    workoutFrequency?: number;
    dailyCalories?: number;
    proteinTarget?: number;
  };
  preferences: {
    workoutTime?: 'morning' | 'afternoon' | 'evening';
    workoutDuration?: number;
    equipment?: string[];
    notifications?: boolean;
    reminders?: boolean;
    reminderTime?: string;
    units?: 'metric' | 'imperial';
    theme?: 'light' | 'dark' | 'system';
  };
  analytics: {
    startTime?: string;
    completionTime?: string;
    skippedSteps?: string[];
    interactionCount?: number;
  };
  _hasHydrated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Async thunks for complex operations
export const initializeOnboarding = createAsyncThunk(
  'onboarding/initialize',
  async () => {
    const startTime = new Date().toISOString();
    await SecureStore.setItemAsync('onboarding_start_time', startTime);
    return { startTime };
  }
);

export const saveOnboardingProgress = createAsyncThunk(
  'onboarding/saveProgress',
  async (_, { getState }) => {
    const state = getState() as { onboarding: OnboardingState };
    const progressData = JSON.stringify({
      personalInfo: state.onboarding.personalInfo,
      goals: state.onboarding.goals,
      preferences: state.onboarding.preferences,
      slidesProgress: state.onboarding.slidesProgress,
    });
    await SecureStore.setItemAsync('onboarding_progress', progressData);
  }
);

export const completeOnboardingAsync = createAsyncThunk(
  'onboarding/completeAsync',
  async (_, { getState, dispatch }) => {
    const completionTime = new Date().toISOString();
    await SecureStore.setItemAsync('onboarding_completed', 'true');
    await SecureStore.setItemAsync('onboarding_completion_time', completionTime);
    
    // Save final progress
    dispatch(saveOnboardingProgress());
    
    return { completionTime };
  }
);

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
  _hasHydrated: false,
  isLoading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentSlideIndex(state, action: PayloadAction<number>) {
      state.currentSlideIndex = action.payload;
      state.analytics.interactionCount = (state.analytics.interactionCount || 0) + 1;
    },
    markSlideCompleted(state, action: PayloadAction<string>) {
      const slide = state.slidesProgress.find(s => s.id === action.payload);
      if (slide) {
        slide.completed = true;
        slide.timestamp = new Date().toISOString();
      }
    },
    markSlideSkipped(state, action: PayloadAction<string>) {
      const slide = state.slidesProgress.find(s => s.id === action.payload);
      if (slide) {
        slide.skipped = true;
        slide.timestamp = new Date().toISOString();
      }
      if (!state.analytics.skippedSteps) {
        state.analytics.skippedSteps = [];
      }
      state.analytics.skippedSteps.push(action.payload);
    },
    updatePersonalInfo(state, action: PayloadAction<OnboardingState['personalInfo']>) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
      state.analytics.interactionCount = (state.analytics.interactionCount || 0) + 1;
    },
    updateGoals(state, action: PayloadAction<OnboardingState['goals']>) {
      state.goals = { ...state.goals, ...action.payload };
      state.analytics.interactionCount = (state.analytics.interactionCount || 0) + 1;
    },
    updatePreferences(state, action: PayloadAction<OnboardingState['preferences']>) {
      state.preferences = { ...state.preferences, ...action.payload };
      state.analytics.interactionCount = (state.analytics.interactionCount || 0) + 1;
    },
    completeOnboarding(state) {
      state.isOnboardingCompleted = true;
      state.analytics.completionTime = new Date().toISOString();
      state.slidesProgress.forEach(slide => {
        if (!slide.completed && !slide.skipped) {
          slide.completed = true;
          slide.timestamp = new Date().toISOString();
        }
      });
    },
    resetOnboarding(state) {
      Object.assign(state, {
        ...initialState,
        _hasHydrated: state._hasHydrated,
      });
      // Clear from secure storage
      SecureStore.deleteItemAsync('onboarding_completed');
      SecureStore.deleteItemAsync('onboarding_progress');
      SecureStore.deleteItemAsync('onboarding_start_time');
      SecureStore.deleteItemAsync('onboarding_completion_time');
    },
    nextSlide(state) {
      if (state.currentSlideIndex < state.slidesProgress.length - 1) {
        state.currentSlideIndex += 1;
        state.analytics.interactionCount = (state.analytics.interactionCount || 0) + 1;
      }
    },
    previousSlide(state) {
      if (state.currentSlideIndex > 0) {
        state.currentSlideIndex -= 1;
        state.analytics.interactionCount = (state.analytics.interactionCount || 0) + 1;
      }
    },
    setHasHydrated(state, action: PayloadAction<boolean>) {
      state._hasHydrated = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeOnboarding.fulfilled, (state, action) => {
        state.analytics.startTime = action.payload.startTime;
        state.isLoading = false;
      })
      .addCase(initializeOnboarding.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeOnboarding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to initialize onboarding';
      })
      .addCase(completeOnboardingAsync.fulfilled, (state, action) => {
        state.isOnboardingCompleted = true;
        state.analytics.completionTime = action.payload.completionTime;
        state.isLoading = false;
      })
      .addCase(completeOnboardingAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeOnboardingAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to complete onboarding';
      })
      .addCase(saveOnboardingProgress.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save progress';
      });
  },
});

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
} = onboardingSlice.actions;

export default onboardingSlice.reducer;