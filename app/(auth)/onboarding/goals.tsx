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
    dispatch(
      updateGoals({
        primaryGoal,
        targetWeight: targetWeight ? parseInt(targetWeight) : undefined,
        workoutFrequency: parseInt(workoutFrequency),
      }),
    )
    dispatch(markSlideCompleted('goals'))
    dispatch(nextSlide())
    router.push('/(auth)/onboarding/preferences')
  }

  const handleBack = () => {
    dispatch(previousSlide())
    router.push('/(auth)/onboarding')
  }

  const handleSkip = () => {
    router.replace('/(auth)/sign-in')
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
      <View className='flex-row items-center justify-between px-6 pb-4 pt-12'>
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
      <View className='mb-6 px-6'>
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
      >
        {/* Title Section */}
        <Animated.View entering={FadeIn.delay(200)}>
          <Text className='mb-2 text-sm font-semibold text-primary-400'>
            Fitness Goals
          </Text>
          <Text className='mb-2 text-2xl font-bold text-white'>
            What's your main goal?
          </Text>
          <Text className='mb-8 text-base text-dark-300'>
            We'll create a personalized plan to help you achieve it
          </Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeIn.delay(400)} className='space-y-6'>
          {/* Primary Goal Selection */}
          <View>
            <Text className='mb-3 text-sm font-medium text-dark-200'>
              Primary Goal
            </Text>
            <View className='space-y-3'>
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
          <View>
            <Text className='mb-2 text-sm font-medium text-dark-200'>
              How many days per week can you workout?
            </Text>
            <View className='flex-row justify-between rounded-xl bg-dark-800 p-1'>
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
                    className={`text-center font-semibold ${
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
            <Text className='mt-2 text-center text-xs text-dark-400'>
              {parseInt(workoutFrequency)} days per week
            </Text>
          </View>

          {/* Motivational Text */}
          <View className='rounded-xl border border-primary-500/30 bg-primary-500/10 p-4'>
            <View className='flex-row items-center'>
              <Ionicons name='bulb' size={20} color='#10B981' />
              <Text className='ml-2 text-sm font-semibold text-primary-400'>
                Pro Tip
              </Text>
            </View>
            <Text className='mt-2 text-sm text-dark-200'>
              Starting with 3-4 days per week is perfect for building a
              sustainable routine. You can always increase frequency as you
              progress!
            </Text>
          </View>
        </Animated.View>

        <View className='h-20' />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className='bg-dark-900 px-6 pb-8 pt-4'>
        <AuthButton
          title='Continue'
          onPress={handleNext}
          rightIcon='arrow-forward'
        />
      </View>
    </KeyboardAvoidingView>
  )
}
