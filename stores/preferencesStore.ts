import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Use regular AsyncStorage for non-sensitive preference data
const regularStorage = {
  getItem: async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name)
      return value ?? null
    } catch (error) {
      console.error('AsyncStorage getItem error:', error)
      return null
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value)
    } catch (error) {
      console.error('AsyncStorage setItem error for key:', name, error)
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name)
    } catch (error) {
      console.error('AsyncStorage removeItem error:', error)
    }
  },
}

// Types are now globally available from /types/settings.d.ts

const initialState: PreferencesState = {
  theme: 'system',
  metricUnits: true,
  _hasHydrated: false,
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
      setMetricUnits: (metricUnits) => set({ metricUnits }),
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      reset: () => set(initialState),
    }),
    {
      name: 'preferences-store',
      storage: createJSONStorage(() => regularStorage),
      partialize: (state) => ({
        theme: state.theme,
        metricUnits: state.metricUnits,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
