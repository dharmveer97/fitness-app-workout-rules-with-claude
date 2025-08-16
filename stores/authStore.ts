import * as SecureStore from 'expo-secure-store'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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

// Types are now globally available from /types/auth.d.ts

const initialState: AuthStoreState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isOnboarded: false,
  _hasHydrated: false,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _get) => ({
      ...initialState,
      completeOnboarding: () => set({ isOnboarded: true }),
      signIn: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken ?? null,
          user: data.user,
        }),
      signOut: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        })),
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      reset: () => set(initialState),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isOnboarded: state.isOnboarded,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
