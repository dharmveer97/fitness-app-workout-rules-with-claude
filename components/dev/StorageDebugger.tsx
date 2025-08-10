import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { useAppDispatch } from '@/state/hooks'
import { persistor } from '@/state/store'
import { resetOnboarding } from '@/state/slices/onboardingSlice'

/**
 * Development utility component to clear all storage
 * Only use this during development for debugging
 * Remove from production builds
 */
export const StorageDebugger: React.FC = () => {
  const dispatch = useAppDispatch()

  const clearAllStorage = async () => {
    try {
      console.log('🧹 StorageDebugger: Starting complete storage clear...')
      
      // 1. Clear Redux Persist
      console.log('🧹 Clearing Redux Persist...')
      await persistor.purge()
      
      // 2. Clear AsyncStorage
      console.log('🧹 Clearing AsyncStorage...')
      await AsyncStorage.clear()
      
      // 3. Clear SecureStore items
      console.log('🧹 Clearing SecureStore...')
      const secureStoreKeys = [
        'auth',
        'onboarding', 
        'onboarding_completed',
        'onboarding_progress',
        'onboarding_start_time',
        'onboarding_completion_time'
      ]
      
      for (const key of secureStoreKeys) {
        try {
          await SecureStore.deleteItemAsync(key)
          console.log(`🧹 Cleared SecureStore key: ${key}`)
        } catch (error) {
          console.log(`🧹 Key ${key} not found or already cleared`)
        }
      }
      
      // 4. Reset Redux state
      console.log('🧹 Resetting Redux state...')
      dispatch(resetOnboarding())
      
      console.log('✅ All storage cleared successfully!')
      Alert.alert(
        'Storage Cleared', 
        'All app data has been cleared. Please reload the app.',
        [{ text: 'OK' }]
      )
      
    } catch (error) {
      console.error('🔴 Error clearing storage:', error)
      Alert.alert('Error', 'Failed to clear some storage items')
    }
  }

  const showStorageInfo = async () => {
    try {
      console.log('📊 Current Storage Info:')
      
      // AsyncStorage
      const asyncKeys = await AsyncStorage.getAllKeys()
      console.log('AsyncStorage keys:', asyncKeys)
      
      for (const key of asyncKeys) {
        const value = await AsyncStorage.getItem(key)
        console.log(`AsyncStorage[${key}]:`, value?.substring(0, 100) + '...')
      }
      
      // SecureStore (can't list all keys, so check known ones)
      const secureStoreKeys = [
        'auth', 'onboarding', 'onboarding_completed'
      ]
      
      for (const key of secureStoreKeys) {
        try {
          const value = await SecureStore.getItemAsync(key)
          console.log(`SecureStore[${key}]:`, value ? 'EXISTS' : 'NOT_FOUND')
        } catch {
          console.log(`SecureStore[${key}]:`, 'NOT_FOUND')
        }
      }
      
    } catch (error) {
      console.error('Error reading storage:', error)
    }
  }

  // Only show in development
  if (__DEV__) {
    return (
      <View className='absolute top-12 right-4 z-50'>
        <View className='rounded-lg bg-red-500 p-2'>
          <Text className='mb-2 text-xs font-bold text-white'>DEV TOOLS</Text>
          
          <TouchableOpacity
            onPress={showStorageInfo}
            className='mb-2 rounded bg-blue-600 px-3 py-1'
          >
            <Text className='text-xs text-white'>Log Storage</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Clear All Storage?',
                'This will delete all app data including onboarding progress and authentication. Continue?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear', style: 'destructive', onPress: clearAllStorage }
                ]
              )
            }}
            className='rounded bg-red-600 px-3 py-1'
          >
            <Text className='text-xs text-white'>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return null
}