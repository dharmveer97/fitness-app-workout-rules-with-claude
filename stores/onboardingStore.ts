import * as SecureStore from 'expo-secure-store'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { useAuthStore } from './authStore'

// Secure storage implementation for Zustand
const secureStorage = {
  getItem: async (name: string) => {
    try {
      const sanitizedKey = name.replace(/[^a-zA-Z0-9._-]/g, '_')
      if (!sanitizedKey || sanitizedKey.length === 0) {
        console.error('Invalid key for SecureStore:', name)
        return null
      }

      const value = await SecureStore.getItemAsync(sanitizedKey, {
        keychainService: 'fitness-app-keychain',
      })
      return value ?? null
    } catch (error) {
      console.error('SecureStore getItem error:', error)
      return null
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      const sanitizedKey = name.replace(/[^a-zA-Z0-9._-]/g, '_')
      if (!sanitizedKey || sanitizedKey.length === 0) {
        console.error('Invalid key for SecureStore:', name)
        return
      }

      await SecureStore.setItemAsync(sanitizedKey, value, {
        keychainService: 'fitness-app-keychain',
      })
    } catch (error) {
      console.error('SecureStore setItem error for key:', name, error)
    }
  },
  removeItem: async (name: string) => {
    try {
      const sanitizedKey = name.replace(/[^a-zA-Z0-9._-]/g, '_')
      if (!sanitizedKey || sanitizedKey.length === 0) {
        console.error('Invalid key for SecureStore:', name)
        return
      }

      await SecureStore.deleteItemAsync(sanitizedKey, {
        keychainService: 'fitness-app-keychain',
      })
    } catch (error) {
      console.error('SecureStore removeItem error:', error)
    }
  },
}

// Types are now globally available from /types/onboarding.d.ts

const initialState: OnboardingStoreState = {
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
    notificationsObject: {
      enabled: true,
      waterReminders: true,
      challengeReminders: true,
      journalReminders: true,
      motivationalQuotes: true,
      reminderTimes: {
        morning: '08:00',
        afternoon: '14:00',
        evening: '20:00',
      },
    },
    privacy: {
      shareStats: false,
      allowFriends: true,
      publicProfile: false,
    },
    units: 'metric',
    theme: 'dark',
    language: 'en',
  },
  analytics: {
    interactionCount: 0,
  },
  _hasHydrated: false,
  isLoading: false,
  error: null,
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),

      markSlideCompleted: (slideId) =>
        set((state) => ({
          slidesProgress: state.slidesProgress.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  completed: true,
                  timestamp: new Date().toISOString(),
                }
              : slide,
          ),
        })),

      markSlideSkipped: (slideId) =>
        set((state) => ({
          slidesProgress: state.slidesProgress.map((slide) =>
            slide.id === slideId
              ? { ...slide, skipped: true, timestamp: new Date().toISOString() }
              : slide,
          ),
          analytics: {
            ...state.analytics,
            skippedSteps: [...(state.analytics.skippedSteps ?? []), slideId],
          },
        })),

      updatePersonalInfo: (info) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),

      updateGoals: (goals) =>
        set((state) => ({
          goals: { ...state.goals, ...goals },
        })),

      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      completeOnboarding: () =>
        set((state) => ({
          isOnboardingCompleted: true,
          analytics: {
            ...state.analytics,
            completionTime: new Date().toISOString(),
          },
          slidesProgress: state.slidesProgress.map((slide) =>
            !slide.completed && !slide.skipped
              ? {
                  ...slide,
                  completed: true,
                  timestamp: new Date().toISOString(),
                }
              : slide,
          ),
        })),

      resetOnboarding: async () => {
        // Clear from secure storage
        await SecureStore.deleteItemAsync('onboarding_completed')
        await SecureStore.deleteItemAsync('onboarding_progress')
        await SecureStore.deleteItemAsync('onboarding_start_time')
        await SecureStore.deleteItemAsync('onboarding_completion_time')

        set((state) => ({
          ...initialState,
          _hasHydrated: state._hasHydrated,
        }))
      },

      nextSlide: () =>
        set((state) => ({
          currentSlideIndex:
            state.currentSlideIndex < state.slidesProgress.length - 1
              ? state.currentSlideIndex + 1
              : state.currentSlideIndex,
        })),

      previousSlide: () =>
        set((state) => ({
          currentSlideIndex:
            state.currentSlideIndex > 0
              ? state.currentSlideIndex - 1
              : state.currentSlideIndex,
        })),

      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      setLoading: (loading) => set({ isLoading: loading }),

      initializeOnboarding: () => {
        const startTime = new Date().toISOString()
        set((state) => ({
          analytics: { ...state.analytics, startTime },
          isLoading: false,
        }))
      },

      saveOnboardingProgress: async () => {
        try {
          const state = get()
          const progressData = JSON.stringify({
            personalInfo: state.personalInfo,
            goals: state.goals,
            preferences: state.preferences,
            slidesProgress: state.slidesProgress,
          })
          await SecureStore.setItemAsync('onboarding_progress', progressData)
        } catch (error) {
          console.error('Failed to save onboarding progress:', error)
          set({ error: 'Failed to save progress' })
        }
      },

      completeOnboardingAsync: async () => {
        try {
          set({ isLoading: true })
          const completionTime = new Date().toISOString()
          await SecureStore.setItemAsync('onboarding_completed', 'true')
          await SecureStore.setItemAsync(
            'onboarding_completion_time',
            completionTime,
          )

          // Save final progress
          const state = get()
          const progressData = JSON.stringify({
            personalInfo: state.personalInfo,
            goals: state.goals,
            preferences: state.preferences,
            slidesProgress: state.slidesProgress,
          })
          await SecureStore.setItemAsync('onboarding_progress', progressData)

          set({
            isOnboardingCompleted: true,
            analytics: { ...state.analytics, completionTime },
            isLoading: false,
          })
        } catch (error) {
          console.error('Failed to complete onboarding:', error)
          set({ error: 'Failed to complete onboarding', isLoading: false })
        }
      },

      completeOnboardingWithSignIn: async () => {
        try {
          console.log('🔵 Zustand: completeOnboardingWithSignIn started')
          set({ isLoading: true, error: null })

          const state = get()
          const { personalInfo, preferences } = state

          console.log('🔵 Zustand: Current state extracted:', {
            personalInfo,
            preferences,
          })

          // Mark preferences slide as completed
          console.log(
            '🔵 Zustand: Step 1 - Marking preferences slide as completed',
          )
          get().markSlideCompleted('preferences')

          // Complete onboarding
          console.log('🔵 Zustand: Step 2 - Completing onboarding')
          get().completeOnboarding()

          // Create demo user
          console.log('🔵 Zustand: Step 3 - Creating demo user')
          const currentDate = new Date().toISOString()
          const demoUser: UserProfile = {
            id: '1',
            name: personalInfo.name ?? 'Fitness User',
            email: 'demo@fitness.app',
            avatar: 'https://i.pravatar.cc/150',
            fitnessLevel: personalInfo.fitnessLevel ?? 'beginner',
            unitSystem: 'metric' as UnitSystem,
            joinDate: new Date(currentDate),
            createdAt: new Date(currentDate),
            updatedAt: new Date(currentDate),
            goals: {
              dailySteps: 10000,
              dailyWater: 2500,
              dailyCalories: 2000,
              weeklyWorkouts: 3,
              sleepHours: 8,
            },
            preferences: {
              notifications: {
                workoutReminders:
                  typeof preferences.notifications === 'boolean'
                    ? preferences.notifications
                    : true,
                waterReminders:
                  typeof preferences.reminders === 'boolean'
                    ? preferences.reminders
                    : true,
                sleepReminders: false,
              },
              privacy: {
                shareStats: false,
                shareWorkouts: true,
              },
            },
          }

          console.log('🔵 Zustand: Step 4 - Demo user created:', demoUser)

          // Complete auth onboarding and sign in
          console.log(
            '🔵 Zustand: Step 5 - Completing auth onboarding and signing in',
          )
          const authStore = useAuthStore.getState()
          authStore.completeOnboarding()
          authStore.signIn({
            accessToken: 'demo-token-onboarding',
            refreshToken: 'demo-refresh-token',
            user: demoUser,
          })

          // Save completion status to SecureStore
          console.log('🔵 Zustand: Step 6 - Saving to SecureStore')
          await SecureStore.setItemAsync('onboarding_completed', 'true')

          set({ isLoading: false })
          console.log('🟢 Zustand: SUCCESS - Onboarding completed with sign in')
        } catch (error) {
          console.error(
            '🔴 Zustand: ERROR in completeOnboardingWithSignIn:',
            error,
          )
          set({
            error:
              error instanceof Error ? error.message : 'Unknown error occurred',
            isLoading: false,
          })
        }
      },

      reset: () => set(initialState),
    }),
    {
      name: 'onboarding-store',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        isOnboardingCompleted: state.isOnboardingCompleted,
        personalInfo: state.personalInfo,
        goals: state.goals,
        preferences: state.preferences,
        slidesProgress: state.slidesProgress,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
