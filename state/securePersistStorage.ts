import * as SecureStore from 'expo-secure-store'

import type { Storage } from 'redux-persist'

// Minimal SecureStore adapter compatible with redux-persist Storage
export const securePersistStorage: Storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      const value = await SecureStore.getItemAsync(key, {
        keychainService: 'fitness-app-keychain',
      })
      return value ?? null
    } catch (error) {
      console.error('SecureStore getItem error:', error)
      return null
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value, {
        keychainService: 'fitness-app-keychain',
      })
    } catch (error) {
      console.error('SecureStore setItem error:', error)
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key, {
        keychainService: 'fitness-app-keychain',
      })
    } catch (error) {
      console.error('SecureStore removeItem error:', error)
    }
  },
}
