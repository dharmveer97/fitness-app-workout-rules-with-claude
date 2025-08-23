import React, { useState } from 'react'

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn } from 'react-native-reanimated'

import { FormField, RadioGroup, ProgressSteps } from '@/components/elements'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useOnboardingStore } from '@/stores'

// Stable selectors to prevent infinite re-renders
const selectPersonalInfo = (state: any) => state.personalInfo
const selectUpdatePersonalInfo = (state: any) => state.updatePersonalInfo
const selectMarkSlideCompleted = (state: any) => state.markSlideCompleted
const selectNextSlide = (state: any) => state.nextSlide

export default function PersonalInfoScreen() {
  const personalInfo = useOnboardingStore(selectPersonalInfo)
  const updatePersonalInfo = useOnboardingStore(selectUpdatePersonalInfo)
  const markSlideCompleted = useOnboardingStore(selectMarkSlideCompleted)
  const nextSlide = useOnboardingStore(selectNextSlide)

  const [name, setName] = useState(personalInfo.name ?? '')
  const [age, setAge] = useState(personalInfo.age?.toString() ?? '')
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(
    personalInfo.gender ?? 'male',
  )
  const [fitnessLevel, setFitnessLevel] = useState<
    'beginner' | 'intermediate' | 'advanced'
  >(personalInfo.fitnessLevel ?? 'beginner')

  const handleNext = () => {
    if (name.trim() && age) {
      updatePersonalInfo({
        name: name.trim(),
        age: parseInt(age),
        gender,
        fitnessLevel,
      })
      markSlideCompleted('personal-info')
      nextSlide()
      router.push('/(auth)/onboarding/goals')
    }
  }

  const handleSkip = () => {
    router.replace('/(auth)/sign-in')
  }

  const isValid = name.trim().length > 0 && age && parseInt(age) > 0

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='bg-dark-900 flex-1'
    >
      <StatusBar style='light' />

      {/* Header */}
      <View className='flex-row items-center justify-end px-6 pb-6 pt-14'>
        <TouchableOpacity
          onPress={handleSkip}
          className='bg-dark-700 rounded-full px-4 py-2'
        >
          <Text className='text-sm font-medium text-text-tertiary'>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Steps */}
      <View className='mb-8 px-6'>
        <ProgressSteps
          steps={
            [
              { id: 'personal', title: 'Personal Info', icon: 'person' },
              { id: 'goals', title: 'Goals', icon: 'fitness' },
              { id: 'preferences', title: 'Preferences', icon: 'settings' },
            ] as Step[]
          }
          currentStep={0}
          variant='compact'
        />
      </View>

      <ScrollView
        className='flex-1 px-6'
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Title Section */}
        <Animated.View entering={FadeIn.delay(200)} className='mb-10'>
          <Text className='mb-3 text-sm font-semibold text-brand-primary'>
            STEP 1 OF 3
          </Text>
          <Text className='mb-3 text-3xl font-bold text-text-primary'>
            Let's get to know you
          </Text>
          <Text className='text-base leading-relaxed text-text-secondary'>
            This helps us personalize your fitness journey
          </Text>
        </Animated.View>

        {/* Form Fields */}
        {/* Form Fields */}
        <Animated.View entering={FadeIn.delay(400)} className='space-y-8'>
          {/* Name Input */}
          <View className='space-y-2'>
            <FormField
              label='Your Name'
              required
              value={name}
              onChangeText={setName}
              placeholder='Enter your name'
              leftIcon='person'
              hint="This is how we'll address you in the app"
            />
          </View>

          {/* Age Input */}
          <View className='space-y-2'>
            <FormField
              label='Your Age'
              required
              value={age}
              onChangeText={setAge}
              placeholder='Enter your age'
              type='number'
              leftIcon='calendar'
              hint='Helps us customize your workout intensity'
            />
          </View>

          {/* Gender Selection */}
          <View className='space-y-3'>
            <RadioGroup
              label='Gender'
              options={
                [
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ] as RadioOption[]
              }
              value={gender}
              onChange={(value) =>
                setGender(value as 'male' | 'female' | 'other')
              }
              orientation='horizontal'
              variant='button'
            />
          </View>

          {/* Fitness Level */}
          <View className='space-y-3'>
            <RadioGroup
              label='Fitness Level'
              options={
                [
                  {
                    value: 'beginner',
                    label: 'Beginner',
                    description: 'New to working out',
                    icon: (
                      <Ionicons name='star-outline' size={20} color='#10B981' />
                    ),
                  },
                  {
                    value: 'intermediate',
                    label: 'Intermediate',
                    description: 'Workout occasionally',
                    icon: (
                      <Ionicons name='star-half' size={20} color='#F97316' />
                    ),
                  },
                  {
                    value: 'advanced',
                    label: 'Advanced',
                    description: 'Regular workout routine',
                    icon: <Ionicons name='star' size={20} color='#8B5CF6' />,
                  },
                ] as RadioOption[]
              }
              value={fitnessLevel}
              onChange={(value) =>
                setFitnessLevel(
                  value as 'beginner' | 'intermediate' | 'advanced',
                )
              }
              variant='card'
            />
          </View>
        </Animated.View>

        <View className='h-32' />
      </ScrollView>

      {/* Bottom Action Button */}
      <View className='border-dark-700 bg-dark-900 absolute bottom-0 left-0 right-0 border-t px-6 pb-10 pt-6'>
        <Button
          variant='solid'
          action='primary'
          size='lg'
          onPress={handleNext}
          isDisabled={!isValid}
          className='w-full'
        >
          <ButtonText>Continue</ButtonText>
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}
