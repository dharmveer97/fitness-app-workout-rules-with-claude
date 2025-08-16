import React, { useState } from 'react'

import {
  View,
  Text,
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

import AuthButton from '@/components/auth/AuthButton'
import { StorageDebugger } from '@/components/dev/StorageDebugger'
import { useOnboardingStore } from '@/stores'

export default function PreferencesScreen() {
  console.log('🔵 PreferencesScreen: Component mounted')

  const {
    preferences,
    personalInfo,
    updatePreferences,
    previousSlide,
    completeOnboardingWithSignIn,
  } = useOnboardingStore((state) => ({
    preferences: state.preferences,
    personalInfo: state.personalInfo,
    updatePreferences: state.updatePreferences,
    previousSlide: state.previousSlide,
    completeOnboardingWithSignIn: state.completeOnboardingWithSignIn,
  }))

  console.log('🔵 PreferencesScreen: Current Zustand state:', {
    preferences,
    personalInfo,
  })

  const [workoutTime, setWorkoutTime] = useState<
    'morning' | 'afternoon' | 'evening'
  >(preferences.workoutTime ?? 'morning')
  const [notifications, setNotifications] = useState(
    preferences.notifications ?? true,
  )
  const [reminders, setReminders] = useState(preferences.reminders ?? true)

  console.log('🔵 PreferencesScreen: Local state initialized:', {
    workoutTime,
    notifications,
    reminders,
  })

  // Add useEffect to track component lifecycle
  React.useEffect(() => {
    console.log('🔵 PreferencesScreen: Component mounted/updated')

    return () => {
      console.log('🔵 PreferencesScreen: Component unmounting or updating')
    }
  })

  // Track Redux state changes
  React.useEffect(() => {
    console.log('🔵 PreferencesScreen: Redux state changed:', {
      preferences,
      personalInfo,
    })
  }, [preferences, personalInfo])

  const handleComplete = async () => {
    console.log('🟡 PreferencesScreen: handleComplete started')
    console.log('🟡 PreferencesScreen: Current form values:', {
      workoutTime,
      notifications,
      reminders,
    })

    try {
      console.log(
        '🟡 PreferencesScreen: Step 1 - Dispatching updatePreferences',
      )

      // Update preferences in state
      updatePreferences({
        workoutTime,
        notifications,
        reminders,
      })

      console.log(
        '🟡 PreferencesScreen: Step 2 - updatePreferences dispatched successfully',
      )
      console.log(
        '🟡 PreferencesScreen: Step 3 - About to dispatch completeOnboardingWithSignIn',
      )

      // Use the combined action that handles everything
      await completeOnboardingWithSignIn()

      console.log(
        '🟢 PreferencesScreen: Step 4 - completeOnboardingWithSignIn completed successfully',
      )

      console.log('🟢 PreferencesScreen: Step 5 - About to navigate to tabs')

      // Navigate to tabs after successful completion
      router.replace('/(tabs)')

      console.log('🟢 PreferencesScreen: Step 6 - Navigation to tabs initiated')
    } catch (error) {
      console.error('🔴 PreferencesScreen: ERROR in handleComplete:', error)
      const err = error as Error
      console.error('🔴 PreferencesScreen: Error details:', {
        message: err?.message,
        stack: err?.stack,
        name: err?.name,
        cause: (err as any)?.cause,
      })

      console.log('🔴 PreferencesScreen: Fallback - navigating to sign-in')

      // Fallback to sign-in on error
      router.replace('/(auth)/sign-in')

      console.log('🔴 PreferencesScreen: Fallback navigation initiated')
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
      className='flex-1 bg-dark-900'
    >
      <StatusBar style='light' />

      {/* Development Storage Debugger */}
      <StorageDebugger />

      {/* Header */}
      <View className='flex-row items-center justify-between px-6 pb-6 pt-14'>
        <TouchableOpacity
          onPress={handleBack}
          className='h-10 w-10 items-center justify-center rounded-full bg-dark-700'
        >
          <Ionicons name='arrow-back' size={20} color='#9CA3AF' />
        </TouchableOpacity>

        <View className='flex-1' />
      </View>

      {/* Progress Bar */}
      <View className='mb-8 px-6'>
        <View className='h-1 overflow-hidden rounded-full bg-dark-700'>
          <Animated.View
            entering={FadeIn}
            className='h-full w-full rounded-full bg-primary-500'
          />
        </View>
        <Text className='mt-2 text-xs text-dark-400'>Step 3 of 3</Text>
      </View>

      <ScrollView
        className='flex-1 px-6'
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Title Section */}
        <Animated.View entering={FadeIn.delay(200)} className='mb-10'>
          <Text className='mb-3 text-sm font-semibold uppercase text-primary-400'>
            STEP 3 OF 3
          </Text>
          <Text className='mb-3 text-3xl font-bold text-white'>
            Almost there, {personalInfo.name}!
          </Text>
          <Text className='text-base leading-relaxed text-dark-300'>
            Let's set up your workout preferences
          </Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeIn.delay(400)} className='space-y-8'>
          {/* Preferred Workout Time */}
          <View className='space-y-4'>
            <Text className='mb-4 text-sm font-semibold uppercase tracking-wide text-dark-200'>
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
                            ? 'text-white'
                            : 'text-dark-200'
                        }`}
                      >
                        {option.label}
                      </Text>
                      <Text className='text-sm text-dark-400'>
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
            <Text className='mb-2 text-sm font-semibold uppercase tracking-wide text-dark-200'>
              Notification Settings
            </Text>

            {/* Push Notifications */}
            <View className='rounded-xl border border-dark-700 bg-dark-800 p-4'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-1 flex-row items-center'>
                  <View className='mr-3 h-10 w-10 items-center justify-center rounded-lg bg-dark-700'>
                    <Ionicons name='notifications' size={20} color='#10B981' />
                  </View>
                  <View className='flex-1'>
                    <Text className='font-medium text-white'>
                      Push Notifications
                    </Text>
                    <Text className='text-sm text-dark-400'>
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
            <View className='rounded-xl border border-dark-700 bg-dark-800 p-4'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-1 flex-row items-center'>
                  <View className='mr-3 h-10 w-10 items-center justify-center rounded-lg bg-dark-700'>
                    <Ionicons name='alarm' size={20} color='#F97316' />
                  </View>
                  <View className='flex-1'>
                    <Text className='font-medium text-white'>
                      Workout Reminders
                    </Text>
                    <Text className='text-sm text-dark-400'>
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
            className='to-secondary-500/20 rounded-2xl border border-primary-500/30 bg-gradient-to-r from-primary-500/20 p-6'
          >
            <View className='items-center'>
              <View className='mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary-500'>
                <Ionicons name='trophy' size={32} color='white' />
              </View>
              <Text className='mb-2 text-lg font-bold text-white'>
                You're All Set!
              </Text>
              <Text className='text-center text-sm text-dark-200'>
                Your personalized fitness journey is ready. Let's make those
                gains together!
              </Text>
            </View>
          </Animated.View>
        </Animated.View>

        <View className='h-32' />
      </ScrollView>

      {/* Bottom Action Button */}
      <View className='absolute bottom-0 left-0 right-0 border-t border-dark-700 bg-dark-900 px-6 pb-10 pt-6'>
        <AuthButton
          title='Start Your Journey'
          onPress={handleComplete}
          rightIcon='rocket'
        />
      </View>
    </KeyboardAvoidingView>
  )
}
