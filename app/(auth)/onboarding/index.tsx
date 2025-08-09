import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  updatePersonalInfo,
  nextSlide,
  markSlideCompleted,
} from '@/state/slices/onboardingSlice';
import type { RootState } from '@/state/store';
import { Text, Button, Card } from '@/components/atoms';
import { FormField, RadioGroup, ProgressSteps } from '@/components/elements';
import type { RadioOption, Step } from '@/components/elements';


export default function PersonalInfoScreen() {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state: RootState) => state.onboarding);
  
  const [name, setName] = useState(personalInfo.name || '');
  const [age, setAge] = useState(personalInfo.age?.toString() || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(
    personalInfo.gender || 'male'
  );
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(
    personalInfo.fitnessLevel || 'beginner'
  );

  const handleNext = () => {
    if (name.trim() && age) {
      dispatch(
        updatePersonalInfo({
          name: name.trim(),
          age: parseInt(age),
          gender,
          fitnessLevel,
        })
      );
      dispatch(markSlideCompleted('personal-info'));
      dispatch(nextSlide());
      router.push('/(auth)/onboarding/goals');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/sign-in');
  };

  const isValid = name.trim().length > 0 && age && parseInt(age) > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-dark-900"
    >
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center pt-12 px-6 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-dark-700 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
        </TouchableOpacity>
        
        <Button
          variant="ghost"
          size="sm"
          onPress={handleSkip}
        >
          Skip
        </Button>
      </View>

      {/* Progress Steps */}
      <View className="px-6 mb-6">
        <ProgressSteps
          steps={[
            { id: 'personal', title: 'Personal Info', icon: 'person' },
            { id: 'goals', title: 'Goals', icon: 'fitness' },
            { id: 'preferences', title: 'Preferences', icon: 'settings' },
          ] as Step[]}
          currentStep={0}
          variant="compact"
        />
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <Animated.View entering={FadeIn.delay(200)}>
          <Text variant="label" color="primary" className="mb-2">
            Personal Information
          </Text>
          <Text variant="h2" color="white" className="mb-2">
            Let's get to know you
          </Text>
          <Text variant="body" color="gray" className="mb-8">
            This helps us personalize your fitness journey
          </Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeIn.delay(400)} className="space-y-6">
          {/* Name Input */}
          <FormField
            label="Your Name"
            required
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            leftIcon="person"
            hint="This is how we'll address you in the app"
          />

          {/* Age Input */}
          <FormField
            label="Your Age"
            required
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            type="number"
            leftIcon="calendar"
            hint="Helps us customize your workout intensity"
          />

          {/* Gender Selection */}
          <RadioGroup
            label="Gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ] as RadioOption[]}
            value={gender}
            onChange={(value) => setGender(value as 'male' | 'female' | 'other')}
            orientation="horizontal"
            variant="button"
          />

          {/* Fitness Level */}
          <RadioGroup
            label="Fitness Level"
            options={[
              { 
                value: 'beginner', 
                label: 'Beginner', 
                description: 'New to working out',
                icon: <Ionicons name="star-outline" size={20} color="#10B981" />
              },
              { 
                value: 'intermediate', 
                label: 'Intermediate', 
                description: 'Workout occasionally',
                icon: <Ionicons name="star-half" size={20} color="#F97316" />
              },
              { 
                value: 'advanced', 
                label: 'Advanced', 
                description: 'Regular workout routine',
                icon: <Ionicons name="star" size={20} color="#8B5CF6" />
              },
            ] as RadioOption[]}
            value={fitnessLevel}
            onChange={(value) => setFitnessLevel(value as 'beginner' | 'intermediate' | 'advanced')}
            variant="card"
          />
        </Animated.View>

        <View className="h-20" />
      </ScrollView>

      {/* Bottom Action Button */}
      <View className="px-6 pb-8 pt-4 bg-dark-900">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleNext}
          disabled={!isValid}
          rightIcon="arrow-forward"
        >
          Continue
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}