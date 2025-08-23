import React, { useState } from 'react'

import {
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated'

import { StorageDebugger } from '@/components/dev/StorageDebugger'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useOnboardingStore } from '@/stores'

// Stable selectors to prevent infinite re-renders
const selectPreferences = (state: any) => state.preferences
const selectPersonalInfo = (state: any) => state.personalInfo
const selectUpdatePreferences = (state: any) => state.updatePreferences
const selectPreviousSlide = (state: any) => state.previousSlide
const selectCompleteOnboardingWithSignIn = (state: any) =>
  state.completeOnboardingWithSignIn

export default function PreferencesScreen() {
  if (__DEV__) console.log('🔵 PreferencesScreen: Component mounted')

  const preferences = useOnboardingStore(selectPreferences)
  const personalInfo = useOnboardingStore(selectPersonalInfo)
  const updatePreferences = useOnboardingStore(selectUpdatePreferences)
  const previousSlide = useOnboardingStore(selectPreviousSlide)
  const completeOnboardingWithSignIn = useOnboardingStore(
    selectCompleteOnboardingWithSignIn,
  )

  if (__DEV__) {
    if (__DEV__) {
      console.log('🔵 PreferencesScreen: Current Zustand state:', {
        preferences,
        personalInfo,
      })
    }
  }

  const [workoutTime, setWorkoutTime] = useState<
    'morning' | 'afternoon' | 'evening'
  >(preferences.workoutTime ?? 'morning')
  const [notifications, setNotifications] = useState(
    preferences.notifications ?? true,
  )
  const [reminders, setReminders] = useState(preferences.reminders ?? true)

  if (__DEV__) {
    if (__DEV__) {
      console.log('🔵 PreferencesScreen: Local state initialized:', {
        workoutTime,
        notifications,
        reminders,
      })
    }
  }

  // Add useEffect to track component lifecycle
  React.useEffect(() => {
    if (__DEV__) console.log('🔵 PreferencesScreen: Component mounted/updated')

    return () => {
      if (__DEV__) {
        if (__DEV__) {
          console.log('🔵 PreferencesScreen: Component unmounting or updating')
        }
      }
    }
  })

  // Track Redux state changes
  React.useEffect(() => {
    if (__DEV__) {
      if (__DEV__) {
        console.log('🔵 PreferencesScreen: Redux state changed:', {
          preferences,
          personalInfo,
        })
      }
    }
  }, [preferences, personalInfo])

  const handleComplete = async () => {
    if (__DEV__) {
      if (__DEV__) console.log('🟡 PreferencesScreen: handleComplete started')
      if (__DEV__) {
        console.log('🟡 PreferencesScreen: Current form values:', {
          workoutTime,
          notifications,
          reminders,
        })
      }
    }

    try {
      if (__DEV__) {
        if (__DEV__) {
          console.log(
            '🟡 PreferencesScreen: Step 1 - Dispatching updatePreferences',
          )
        }
      }

      // Update preferences in state
      updatePreferences({
        workoutTime,
        notifications,
        reminders,
      })

      if (__DEV__) {
        if (__DEV__) {
          console.log(
            '🟡 PreferencesScreen: Step 2 - updatePreferences dispatched successfully',
          )
        }
        if (__DEV__) {
          console.log(
            '🟡 PreferencesScreen: Step 3 - About to dispatch completeOnboardingWithSignIn',
          )
        }
      }

      // Use the combined action that handles everything
      await completeOnboardingWithSignIn()

      if (__DEV__) {
        if (__DEV__) {
          console.log(
            '🟢 PreferencesScreen: Step 4 - completeOnboardingWithSignIn completed successfully',
          )
        }
        if (__DEV__) {
          console.log(
            '🟢 PreferencesScreen: Step 5 - About to navigate to tabs',
          )
        }
      }

      // Navigate to tabs after successful completion
      router.replace('/(tabs)')

      if (__DEV__) {
        if (__DEV__) {
          console.log(
            '🟢 PreferencesScreen: Step 6 - Navigation to tabs initiated',
          )
        }
      }
    } catch (error) {
      console.error('🔴 PreferencesScreen: ERROR in handleComplete:', error)
      const err = error as Error
      if (__DEV__) {
        console.error('🔴 PreferencesScreen: Error details:', {
          message: err?.message,
          stack: err?.stack,
          name: err?.name,
          cause: (err as any)?.cause,
        })
        if (__DEV__) {
          console.log('🔴 PreferencesScreen: Fallback - navigating to sign-in')
        }
      }

      // Fallback to sign-in on error
      router.replace('/(auth)/sign-in')

      if (__DEV__) {
        if (__DEV__) {
          console.log('🔴 PreferencesScreen: Fallback navigation initiated')
        }
      }
    }
  }

  const handleBack = () => {
    previousSlide()
    router.push('/(auth)/onboarding/goals')
  }

  const workoutTimeOptions = [
    {
      value: 'morning',
      label: 'Morning',
      icon: 'sunny',
      time: '6 AM - 12 PM',
    },
    {
      value: 'afternoon',
      label: 'Afternoon',
      icon: 'partly-sunny',
      time: '12 PM - 6 PM',
    },
    {
      value: 'evening',
      label: 'Evening',
      icon: 'moon',
      time: '6 PM - 12 AM',
    },
  ] as const

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='bg-dark-900 flex-1'
    >
      <StatusBar style='light' />

      {/* Development Storage Debugger */}
      <StorageDebugger />

      {/* Header */}
      <View className='flex-row items-center justify-between px-6 pb-6 pt-14'>
        <TouchableOpacity
          onPress={handleBack}
          className='bg-dark-700 h-10 w-10 items-center justify-center rounded-full'
        >
          <Ionicons name='arrow-back' size={20} color='#9CA3AF' />
        </TouchableOpacity>

        <View className='flex-1' />
      </View>

      {/* Progress Bar */}
      <View className='mb-8 px-6'>
        <View className='bg-dark-700 h-1 overflow-hidden rounded-full'>
          <Animated.View
            entering={FadeIn}
            className='h-full w-full rounded-full bg-primary-500'
          />
        </View>
        <Text className='mt-2 text-xs text-text-tertiary'>Step 3 of 3</Text>
      </View>

      <ScrollView
        className='flex-1 px-6'
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Title Section */}
        <Animated.View entering={FadeIn.delay(200)} className='mb-10'>
          <Text className='mb-3 text-sm font-semibold uppercase text-brand-primary'>
            STEP 3 OF 3
          </Text>
          <Text className='mb-3 text-3xl font-bold text-text-primary'>
            Almost there, {personalInfo?.name ?? 'there'}!
          </Text>
          <Text className='text-base leading-relaxed text-text-secondary'>
            Let's set up your workout preferences
          </Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeIn.delay(400)} className='space-y-8'>
          {/* Preferred Workout Time */}
          <View className='space-y-4'>
            <Text className='mb-4 text-sm font-semibold uppercase tracking-wide text-text-secondary'>
              Preferred Workout Time
            </Text>
            <View className='space-y-4'>
              {workoutTimeOptions.map((option, index) => (
                <Animated.View
                  key={option.value}
                  entering={FadeIn.delay(500 + index * 100)}
                >
                  <TouchableOpacity
                    onPress={() => setWorkoutTime(option.value)}
                    className={`flex-row items-center rounded-xl border p-4 ${
                      workoutTime === option.value
                        ? 'border-primary-500 bg-primary-500/20'
                        : 'border-dark-700 bg-dark-800'
                    }`}
                  >
                    <View
                      className={`mr-4 h-12 w-12 items-center justify-center rounded-xl ${
                        workoutTime === option.value
                          ? 'bg-primary-500'
                          : 'bg-dark-700'
                      }`}
                    >
                      <Ionicons
                        name={option.icon}
                        size={24}
                        color={
                          workoutTime === option.value ? 'white' : '#9CA3AF'
                        }
                      />
                    </View>
                    <View className='flex-1'>
                      <Text
                        className={`font-semibold ${
                          workoutTime === option.value
                            ? 'text-text-primary'
                            : 'text-text-secondary'
                        }`}
                      >
                        {option.label}
                      </Text>
                      <Text className='text-sm text-text-tertiary'>
                        {option.time}
                      </Text>
                    </View>
                    {workoutTime === option.value && (
                      <Ionicons
                        name='checkmark-circle'
                        size={24}
                        color='#10B981'
                      />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Notification Settings */}
          <View className='space-y-5'>
            <Text className='mb-2 text-sm font-semibold uppercase tracking-wide text-text-secondary'>
              Notification Settings
            </Text>

            {/* Push Notifications */}
            <View className='rounded-xl border border-border-primary bg-surface-secondary p-4'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-1 flex-row items-center'>
                  <View className='mr-3 h-10 w-10 items-center justify-center rounded-lg bg-surface-tertiary'>
                    <Ionicons name='notifications' size={20} color='#10B981' />
                  </View>
                  <View className='flex-1'>
                    <Text className='font-medium text-text-primary'>
                      Push Notifications
                    </Text>
                    <Text className='text-sm text-text-tertiary'>
                      Get updates about your workouts
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#374151', true: '#10B981' }}
                  thumbColor={notifications ? '#ffffff' : '#9CA3AF'}
                />
              </View>
            </View>

            {/* Workout Reminders */}
            <View className='rounded-xl border border-border-primary bg-surface-secondary p-4'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-1 flex-row items-center'>
                  <View className='mr-3 h-10 w-10 items-center justify-center rounded-lg bg-surface-tertiary'>
                    <Ionicons name='alarm' size={20} color='#F97316' />
                  </View>
                  <View className='flex-1'>
                    <Text className='font-medium text-text-primary'>
                      Workout Reminders
                    </Text>
                    <Text className='text-sm text-text-tertiary'>
                      Daily reminders to stay on track
                    </Text>
                  </View>
                </View>
                <Switch
                  value={reminders}
                  onValueChange={setReminders}
                  trackColor={{ false: '#374151', true: '#10B981' }}
                  thumbColor={reminders ? '#ffffff' : '#9CA3AF'}
                />
              </View>
            </View>
          </View>

          {/* Completion Message */}
          <Animated.View
            entering={ZoomIn.delay(800)}
            className='rounded-2xl border border-primary-500/30 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-6'
          >
            <View className='items-center'>
              <View className='mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary-500'>
                <Ionicons name='trophy' size={32} color='white' />
              </View>
              <Text className='mb-2 text-lg font-bold text-text-primary'>
                You're All Set!
              </Text>
              <Text className='text-center text-sm text-text-secondary'>
                Your personalized fitness journey is ready. Let's make those
                gains together!
              </Text>
            </View>
          </Animated.View>
        </Animated.View>

        <View className='h-32' />
      </ScrollView>

      {/* Bottom Action Button */}
      <View className='border-dark-700 bg-dark-900 absolute bottom-0 left-0 right-0 border-t px-6 pb-10 pt-6'>
        <Button
          variant='solid'
          action='primary'
          onPress={handleComplete}
          className='w-full'
        >
          <ButtonText>Start Your Journey</ButtonText>
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}
