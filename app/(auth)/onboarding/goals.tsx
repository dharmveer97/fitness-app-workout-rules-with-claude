import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  updateGoals,
  nextSlide,
  previousSlide,
  markSlideCompleted,
} from '@/state/slices/onboardingSlice';
import type { RootState } from '@/state/store';
import AuthButton from '@/components/auth/AuthButton';

export default function GoalsScreen() {
  const dispatch = useDispatch();
  const { goals } = useSelector((state: RootState) => state.onboarding);
  
  const [primaryGoal, setPrimaryGoal] = useState<
    'weight-loss' | 'muscle-gain' | 'endurance' | 'general-fitness'
  >(goals.primaryGoal || 'general-fitness');
  const [targetWeight, setTargetWeight] = useState(goals.targetWeight?.toString() || '');
  const [workoutFrequency, setWorkoutFrequency] = useState(
    goals.workoutFrequency?.toString() || '3'
  );

  const handleNext = () => {
    dispatch(
      updateGoals({
        primaryGoal,
        targetWeight: targetWeight ? parseInt(targetWeight) : undefined,
        workoutFrequency: parseInt(workoutFrequency),
      })
    );
    dispatch(markSlideCompleted('goals'));
    dispatch(nextSlide());
    router.push('/(auth)/onboarding/preferences');
  };

  const handleBack = () => {
    dispatch(previousSlide());
    router.back();
  };

  const handleSkip = () => {
    router.replace('/(auth)/sign-in');
  };

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
  ] as const;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-dark-900"
    >
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center pt-12 px-6 pb-4">
        <TouchableOpacity
          onPress={handleBack}
          className="w-10 h-10 rounded-full bg-dark-700 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleSkip}
          className="py-2 px-4 rounded-full bg-dark-700"
        >
          <Text className="text-dark-300 text-sm font-medium">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View className="px-6 mb-6">
        <View className="h-1 bg-dark-700 rounded-full overflow-hidden">
          <Animated.View
            entering={FadeIn}
            className="h-full bg-primary-500 rounded-full"
            style={{ width: '66%' }}
          />
        </View>
        <Text className="text-dark-400 text-xs mt-2">Step 2 of 3</Text>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <Animated.View entering={FadeIn.delay(200)}>
          <Text className="text-primary-400 text-sm font-semibold mb-2">
            Fitness Goals
          </Text>
          <Text className="text-white text-2xl font-bold mb-2">
            What's your main goal?
          </Text>
          <Text className="text-dark-300 text-base mb-8">
            We'll create a personalized plan to help you achieve it
          </Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeIn.delay(400)} className="space-y-6">
          {/* Primary Goal Selection */}
          <View>
            <Text className="text-dark-200 text-sm font-medium mb-3">Primary Goal</Text>
            <View className="space-y-3">
              {goalOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setPrimaryGoal(option.value)}
                  className={`p-4 rounded-xl border flex-row items-center ${
                    primaryGoal === option.value
                      ? 'bg-primary-500/20 border-primary-500'
                      : 'bg-dark-800 border-dark-700'
                  }`}
                >
                  <View
                    className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                      primaryGoal === option.value ? 'bg-primary-500' : 'bg-dark-700'
                    }`}
                  >
                    <Ionicons
                      name={option.icon}
                      size={24}
                      color={primaryGoal === option.value ? 'white' : '#9CA3AF'}
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-semibold ${
                        primaryGoal === option.value ? 'text-white' : 'text-dark-200'
                      }`}
                    >
                      {option.label}
                    </Text>
                    <Text className="text-dark-400 text-sm">{option.description}</Text>
                  </View>
                  {primaryGoal === option.value && (
                    <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Target Weight (Optional) */}
          {(primaryGoal === 'weight-loss' || primaryGoal === 'muscle-gain') && (
            <Animated.View entering={FadeIn.delay(200)}>
              <Text className="text-dark-200 text-sm font-medium mb-2">
                Target Weight (kg) - Optional
              </Text>
              <TextInput
                value={targetWeight}
                onChangeText={setTargetWeight}
                placeholder="Enter target weight"
                placeholderTextColor="#4B5563"
                keyboardType="numeric"
                className="bg-dark-800 text-white px-4 py-3 rounded-xl border border-dark-700"
              />
            </Animated.View>
          )}

          {/* Workout Frequency */}
          <View>
            <Text className="text-dark-200 text-sm font-medium mb-2">
              How many days per week can you workout?
            </Text>
            <View className="flex-row justify-between bg-dark-800 rounded-xl p-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => setWorkoutFrequency(day.toString())}
                  className={`flex-1 py-3 rounded-lg ${
                    parseInt(workoutFrequency) === day
                      ? 'bg-primary-500'
                      : 'bg-transparent'
                  }`}
                >
                  <Text
                    className={`text-center font-semibold ${
                      parseInt(workoutFrequency) === day ? 'text-white' : 'text-dark-400'
                    }`}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-dark-400 text-xs mt-2 text-center">
              {parseInt(workoutFrequency)} days per week
            </Text>
          </View>

          {/* Motivational Text */}
          <View className="bg-primary-500/10 p-4 rounded-xl border border-primary-500/30">
            <View className="flex-row items-center">
              <Ionicons name="bulb" size={20} color="#10B981" />
              <Text className="text-primary-400 text-sm font-semibold ml-2">Pro Tip</Text>
            </View>
            <Text className="text-dark-200 text-sm mt-2">
              Starting with 3-4 days per week is perfect for building a sustainable routine.
              You can always increase frequency as you progress!
            </Text>
          </View>
        </Animated.View>

        <View className="h-20" />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="px-6 pb-8 pt-4 bg-dark-900">
        <AuthButton
          title="Continue"
          onPress={handleNext}
          rightIcon="arrow-forward"
        />
      </View>
    </KeyboardAvoidingView>
  );
}