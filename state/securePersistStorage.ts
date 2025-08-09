import * as SecureStore from 'expo-secure-store'

import type { Storage } from 'redux-persist'

// Minimal SecureStore adapter compatible with redux-persist Storage
export const securePersistStorage: Storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      // Sanitize key the same way as setItem
      const sanitizedKey = key.replace(/[^a-zA-Z0-9._-]/g, '_')
      if (!sanitizedKey || sanitizedKey.length === 0) {
        console.error('Invalid key for SecureStore:', key)
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
  async setItem(key: string, value: string): Promise<void> {
    try {
      // Validate key format - SecureStore keys must be alphanumeric, ".", "-", "_"
      const sanitizedKey = key.replace(/[^a-zA-Z0-9._-]/g, '_')
      if (!sanitizedKey || sanitizedKey.length === 0) {
        console.error('Invalid key for SecureStore:', key)
        return
      }

      await SecureStore.setItemAsync(sanitizedKey, value, {
        keychainService: 'fitness-app-keychain',
      })
    } catch (error) {
      console.error('SecureStore setItem error for key:', key, error)
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      // Sanitize key the same way as setItem
      const sanitizedKey = key.replace(/[^a-zA-Z0-9._-]/g, '_')
      if (!sanitizedKey || sanitizedKey.length === 0) {
        console.error('Invalid key for SecureStore:', key)
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
