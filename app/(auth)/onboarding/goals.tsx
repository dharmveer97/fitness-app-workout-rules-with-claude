import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'

import AuthButton from '@/components/auth/AuthButton'
import {
  updateGoals,
  nextSlide,
  previousSlide,
  markSlideCompleted,
} from '@/state/slices/onboardingSlice'
import type { RootState } from '@/state/store'

export default function GoalsScreen() {
  const dispatch = useDispatch()
  const { goals } = useSelector((state: RootState) => state.onboarding)

  const [primaryGoal, setPrimaryGoal] = useState<
    'weight-loss' | 'muscle-gain' | 'endurance' | 'general-fitness'
  >(goals.primaryGoal ?? 'general-fitness')
  const [targetWeight, setTargetWeight] = useState(
    goals.targetWeight?.toString() ?? '',
  )
  const [workoutFrequency, setWorkoutFrequency] = useState(
    goals.workoutFrequency?.toString() ?? '3',
  )

  const handleNext = () => {
    try {
      dispatch(
        updateGoals({
          primaryGoal,
          targetWeight: targetWeight ? parseInt(targetWeight, 10) : undefined,
          workoutFrequency: parseInt(workoutFrequency, 10) ?? 3,
        }),
      )
      dispatch(markSlideCompleted('goals'))
      dispatch(nextSlide())
      router.push('/(auth)/onboarding/preferences')
    } catch (error) {
      console.error('Error navigating to preferences:', error)
    }
  }

  const handleBack = () => {
    try {
      dispatch(previousSlide())
      router.push('/(auth)/onboarding')
    } catch (error) {
      console.error('Error navigating back:', error)
    }
  }

  const handleSkip = () => {
    try {
      router.replace('/(auth)/sign-in')
    } catch (error) {
      console.error('Error skipping onboarding:', error)
    }
  }

  const goalOptions = [
    {
      value: 'weight-loss',
      label: 'Lose Weight',
      icon: 'trending-down',
      description: 'Burn fat and get lean',
    },
    {
      value: 'muscle-gain',
      label: 'Build Muscle',
      icon: 'barbell',
      description: 'Gain strength and mass',
    },
    {
      value: 'endurance',
      label: 'Improve Endurance',
      icon: 'pulse',
      description: 'Boost stamina and cardio',
    },
    {
      value: 'general-fitness',
      label: 'Stay Fit',
      icon: 'fitness',
      description: 'Overall health and wellness',
    },
  ] as const

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-dark-900'
    >
      <StatusBar style='light' />

      {/* Header */}
      <View className='flex-row items-center justify-between px-6 pb-6 pt-14'>
        <TouchableOpacity
          onPress={handleBack}
          className='h-10 w-10 items-center justify-center rounded-full bg-dark-700'
        >
          <Ionicons name='arrow-back' size={20} color='#9CA3AF' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSkip}
          className='rounded-full bg-dark-700 px-4 py-2'
        >
          <Text className='text-sm font-medium text-dark-300'>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View className='mb-8 px-6'>
        <View className='h-1 overflow-hidden rounded-full bg-dark-700'>
          <Animated.View
            entering={FadeIn}
            className='h-full rounded-full bg-primary-500'
            style={{
              width: '66%',
            }}
          />
        </View>
        <Text className='mt-2 text-xs text-dark-400'>Step 2 of 3</Text>
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
            STEP 2 OF 3
          </Text>
          <Text className='mb-3 text-3xl font-bold text-white'>
            What's your main goal?
          </Text>
          <Text className='text-base leading-relaxed text-dark-300'>
            We'll create a personalized plan to help you achieve it
          </Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeIn.delay(400)} className='space-y-8'>
          {/* Primary Goal Selection */}
          <View className='space-y-4'>
            <Text className='mb-4 text-sm font-semibold uppercase tracking-wide text-dark-200'>
              Primary Goal
            </Text>
            <View className='space-y-4'>
              {goalOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setPrimaryGoal(option.value)}
                  className={`flex-row items-center rounded-xl border p-4 ${
                    primaryGoal === option.value
                      ? 'border-primary-500 bg-primary-500/20'
                      : 'border-dark-700 bg-dark-800'
                  }`}
                >
                  <View
                    className={`mr-4 h-12 w-12 items-center justify-center rounded-xl ${
                      primaryGoal === option.value
                        ? 'bg-primary-500'
                        : 'bg-dark-700'
                    }`}
                  >
                    <Ionicons
                      name={option.icon}
                      size={24}
                      color={primaryGoal === option.value ? 'white' : '#9CA3AF'}
                    />
                  </View>
                  <View className='flex-1'>
                    <Text
                      className={`font-semibold ${
                        primaryGoal === option.value
                          ? 'text-white'
                          : 'text-dark-200'
                      }`}
                    >
                      {option.label}
                    </Text>
                    <Text className='text-sm text-dark-400'>
                      {option.description}
                    </Text>
                  </View>
                  {primaryGoal === option.value && (
                    <Ionicons
                      name='checkmark-circle'
                      size={24}
                      color='#10B981'
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Target Weight (Optional) */}
          {(primaryGoal === 'weight-loss' || primaryGoal === 'muscle-gain') && (
            <Animated.View entering={FadeIn.delay(200)}>
              <Text className='mb-2 text-sm font-medium text-dark-200'>
                Target Weight (kg) - Optional
              </Text>
              <TextInput
                value={targetWeight}
                onChangeText={setTargetWeight}
                placeholder='Enter target weight'
                placeholderTextColor='#4B5563'
                keyboardType='numeric'
                className='rounded-xl border border-dark-700 bg-dark-800 px-4 py-3 text-white'
              />
            </Animated.View>
          )}

          {/* Workout Frequency */}
          <View className='space-y-4'>
            <Text className='mb-4 text-sm font-semibold uppercase tracking-wide text-dark-200'>
              Workout Frequency
            </Text>
            <View className='rounded-xl bg-dark-800 p-2'>
              <View className='flex-row justify-between gap-1'>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <TouchableOpacity
                    key={day}
                    onPress={() => setWorkoutFrequency(day.toString())}
                    className={`flex-1 rounded-lg py-3 ${
                      parseInt(workoutFrequency) === day
                        ? 'bg-primary-500'
                        : 'bg-transparent'
                    }`}
                  >
                    <Text
                      className={`text-center text-sm font-bold ${
                        parseInt(workoutFrequency) === day
                          ? 'text-white'
                          : 'text-dark-400'
                      }`}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Text className='mt-2 text-center text-xs text-dark-400'>
              {parseInt(workoutFrequency)} days per week
            </Text>
          </View>

          {/* Motivational Text */}
          <Animated.View
            entering={FadeIn.delay(600)}
            className='rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-primary-600/5 p-5'
          >
            <View className='flex-row items-center'>
              <View className='mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary-500/20'>
                <Ionicons name='bulb' size={20} color='#10B981' />
              </View>
              <Text className='text-sm font-semibold uppercase tracking-wide text-primary-400'>
                Pro Tip
              </Text>
            </View>
            <Text className='mt-3 text-sm leading-relaxed text-dark-200'>
              Starting with 3-4 days per week is perfect for building a
              sustainable routine. You can always increase frequency as you
              progress!
            </Text>
          </Animated.View>
        </Animated.View>

        <View className='h-32' />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className='absolute bottom-0 left-0 right-0 border-t border-dark-700 bg-dark-900 px-6 pb-10 pt-6'>
        <AuthButton
          title='Continue'
          onPress={handleNext}
          rightIcon='arrow-forward'
        />
      </View>
    </KeyboardAvoidingView>
  )
}
