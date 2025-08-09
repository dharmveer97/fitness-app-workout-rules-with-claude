import * as SecureStore from 'expo-secure-store'

import { MMKV } from 'react-native-mmkv'

// Initialize MMKV instance for non-sensitive data
const storage = new MMKV()

// Storage keys
const STORAGE_KEYS = {
  // Secure Store keys (sensitive data)
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_CREDENTIALS: 'user_credentials',

  // MMKV keys (non-sensitive data)
  USER_PROFILE: 'user_profile',
  USER_PREFERENCES: 'user_preferences',
  JOURNAL_ENTRIES: 'journal_entries',
  CHALLENGES: 'challenges',
  FOOD_ENTRIES: 'food_entries',
  APP_SETTINGS: 'app_settings',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const

export class StorageUtils {
  // ===== SECURE STORAGE (Sensitive Data) =====

  /**
   * Store authentication tokens securely
   */
  static async storeAuthTokens(
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    try {
      await Promise.all([
        SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
        SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
      ])
    } catch (error) {
      console.error('Failed to store auth tokens:', error)
      throw new Error('Failed to store authentication tokens')
    }
  }

  /**
   * Get access token
   */
  static async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN)
    } catch (error) {
      console.error('Failed to get access token:', error)
      return null
    }
  }

  /**
   * Get refresh token
   */
  static async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN)
    } catch (error) {
      console.error('Failed to get refresh token:', error)
      return null
    }
  }

  /**
   * Check if user is authenticated (has valid tokens)
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const accessToken = await SecureStore.getItemAsync(
        STORAGE_KEYS.ACCESS_TOKEN,
      )
      return !!accessToken
    } catch (error) {
      console.error('Failed to check auth status:', error)
      return false
    }
  }

  /**
   * Store user credentials securely (for biometric login)
   */
  static async storeUserCredentials(
    email: string,
    encryptedPassword: string,
  ): Promise<void> {
    try {
      const credentials = JSON.stringify({ email, encryptedPassword })
      await SecureStore.setItemAsync(STORAGE_KEYS.USER_CREDENTIALS, credentials)
    } catch (error) {
      console.error('Failed to store user credentials:', error)
      throw new Error('Failed to store user credentials')
    }
  }

  /**
   * Get stored user credentials
   */
  static async getUserCredentials(): Promise<{
    email: string
    encryptedPassword: string
  } | null> {
    try {
      const credentials = await SecureStore.getItemAsync(
        STORAGE_KEYS.USER_CREDENTIALS,
      )
      return credentials ? JSON.parse(credentials) : null
    } catch (error) {
      console.error('Failed to get user credentials:', error)
      return null
    }
  }

  /**
   * Clear all secure data
   */
  static async clearSecureData(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER_CREDENTIALS),
      ])
    } catch (error) {
      console.error('Failed to clear secure data:', error)
    }
  }

  // ===== MMKV STORAGE (Non-sensitive Data) =====

  /**
   * Store user profile
   */
  static async storeUserProfile(profile: UserProfile): Promise<void> {
    try {
      storage.set(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
    } catch (error) {
      console.error('Failed to store user profile:', error)
      throw new Error('Failed to store user profile')
    }
  }

  /**
   * Get user profile
   */
  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      const profile = storage.getString(STORAGE_KEYS.USER_PROFILE)
      return profile ? JSON.parse(profile) : null
    } catch (error) {
      console.error('Failed to get user profile:', error)
      return null
    }
  }

  /**
   * Store user preferences
   */
  static async storeUserPreferences(
    preferences: UserProfile['preferences'],
  ): Promise<void> {
    try {
      storage.set(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences))
    } catch (error) {
      console.error('Failed to store user preferences:', error)
      throw new Error('Failed to store user preferences')
    }
  }

  /**
   * Get user preferences
   */
  static async getUserPreferences(): Promise<
    UserProfile['preferences'] | null
  > {
    try {
      const preferences = storage.getString(STORAGE_KEYS.USER_PREFERENCES)
      return preferences ? JSON.parse(preferences) : null
    } catch (error) {
      console.error('Failed to get user preferences:', error)
      return null
    }
  }

  /**
   * Store journal entries
   */
  static async storeJournalEntries(entries: JournalEntryType[]): Promise<void> {
    try {
      storage.set(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries))
    } catch (error) {
      console.error('Failed to store journal entries:', error)
      throw new Error('Failed to store journal entries')
    }
  }

  /**
   * Get journal entries
   */
  static async getJournalEntries(): Promise<JournalEntryType[]> {
    try {
      const entries = storage.getString(STORAGE_KEYS.JOURNAL_ENTRIES)
      return entries ? JSON.parse(entries) : []
    } catch (error) {
      console.error('Failed to get journal entries:', error)
      return []
    }
  }

  /**
   * Store challenges
   */
  static async storeChallenges(challenges: UserChallengeType[]): Promise<void> {
    try {
      storage.set(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges))
    } catch (error) {
      console.error('Failed to store challenges:', error)
      throw new Error('Failed to store challenges')
    }
  }

  /**
   * Get challenges
   */
  static async getChallenges(): Promise<UserChallengeType[]> {
    try {
      const challenges = storage.getString(STORAGE_KEYS.CHALLENGES)
      return challenges ? JSON.parse(challenges) : []
    } catch (error) {
      console.error('Failed to get challenges:', error)
      return []
    }
  }

  /**
   * Store food entries
   */
  static async storeFoodEntries(entries: FoodEntryType[]): Promise<void> {
    try {
      storage.set(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(entries))
    } catch (error) {
      console.error('Failed to store food entries:', error)
      throw new Error('Failed to store food entries')
    }
  }

  /**
   * Get food entries
   */
  static async getFoodEntries(): Promise<FoodEntryType[]> {
    try {
      const entries = storage.getString(STORAGE_KEYS.FOOD_ENTRIES)
      return entries ? JSON.parse(entries) : []
    } catch (error) {
      console.error('Failed to get food entries:', error)
      return []
    }
  }

  /**
   * Store app settings
   */
  static async storeAppSettings(settings: Record<string, any>): Promise<void> {
    try {
      storage.set(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(settings))
    } catch (error) {
      console.error('Failed to store app settings:', error)
      throw new Error('Failed to store app settings')
    }
  }

  /**
   * Get app settings
   */
  static async getAppSettings(): Promise<Record<string, any>> {
    try {
      const settings = storage.getString(STORAGE_KEYS.APP_SETTINGS)
      return settings ? JSON.parse(settings) : {}
    } catch (error) {
      console.error('Failed to get app settings:', error)
      return {}
    }
  }

  /**
   * Mark onboarding as completed
   */
  static async setOnboardingCompleted(
    completed: boolean = true,
  ): Promise<void> {
    try {
      storage.set(STORAGE_KEYS.ONBOARDING_COMPLETED, completed)
    } catch (error) {
      console.error('Failed to set onboarding status:', error)
    }
  }

  /**
   * Check if onboarding is completed
   */
  static async isOnboardingCompleted(): Promise<boolean> {
    try {
      return storage.getBoolean(STORAGE_KEYS.ONBOARDING_COMPLETED) ?? false
    } catch (error) {
      console.error('Failed to get onboarding status:', error)
      return false
    }
  }

  // ===== UTILITY METHODS =====

  /**
   * Clear all user data (both secure and non-secure)
   */
  static async clearUserData(): Promise<void> {
    try {
      // Clear secure data
      await this.clearSecureData()

      // Clear MMKV data
      storage.delete(STORAGE_KEYS.USER_PROFILE)
      storage.delete(STORAGE_KEYS.USER_PREFERENCES)
      storage.delete(STORAGE_KEYS.JOURNAL_ENTRIES)
      storage.delete(STORAGE_KEYS.CHALLENGES)
      storage.delete(STORAGE_KEYS.FOOD_ENTRIES)
      storage.delete(STORAGE_KEYS.ONBOARDING_COMPLETED)
      // Keep app settings as they're not user-specific
    } catch (error) {
      console.error('Failed to clear user data:', error)
    }
  }

  /**
   * Clear all app data (complete reset)
   */
  static async clearAllData(): Promise<void> {
    try {
      // Clear secure data
      await this.clearSecureData()

      // Clear all MMKV data
      storage.clearAll()
    } catch (error) {
      console.error('Failed to clear all data:', error)
    }
  }

  /**
   * Get storage size information
   */
  static getStorageInfo(): { mmkvSize: number } {
    try {
      return {
        mmkvSize: storage.size,
      }
    } catch (error) {
      console.error('Failed to get storage info:', error)
      return { mmkvSize: 0 }
    }
  }

  /**
   * Generic method to store any data in MMKV
   */
  static setItem(key: string, value: any): void {
    try {
      if (typeof value === 'string') {
        storage.set(key, value)
      } else if (typeof value === 'number') {
        storage.set(key, value)
      } else if (typeof value === 'boolean') {
        storage.set(key, value)
      } else {
        storage.set(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Failed to set item ${key}:`, error)
    }
  }

  /**
   * Generic method to get any data from MMKV
   */
  static getItem(key: string): any {
    try {
      return storage.getString(key)
    } catch (error) {
      console.error(`Failed to get item ${key}:`, error)
      return null
    }
  }

  /**
   * Generic method to remove item from MMKV
   */
  static removeItem(key: string): void {
    try {
      storage.delete(key)
    } catch (error) {
      console.error(`Failed to remove item ${key}:`, error)
    }
  }
}
