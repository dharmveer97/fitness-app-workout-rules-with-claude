import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import {
  updatePreferences,
  completeOnboarding,
  previousSlide,
  markSlideCompleted,
} from '@/state/slices/onboardingSlice';
import { completeOnboarding as authCompleteOnboarding } from '@/state/slices/authSlice';
import type { RootState } from '@/state/store';
import AuthButton from '@/components/auth/AuthButton';

export default function PreferencesScreen() {
  const dispatch = useDispatch();
  const { preferences, personalInfo } = useSelector((state: RootState) => state.onboarding);
  
  const [workoutTime, setWorkoutTime] = useState<'morning' | 'afternoon' | 'evening'>(
    preferences.workoutTime || 'morning'
  );
  const [notifications, setNotifications] = useState(preferences.notifications ?? true);
  const [reminders, setReminders] = useState(preferences.reminders ?? true);

  const handleComplete = () => {
    dispatch(
      updatePreferences({
        workoutTime,
        notifications,
        reminders,
      })
    );
    dispatch(markSlideCompleted('preferences'));
    dispatch(completeOnboarding());
    dispatch(authCompleteOnboarding());
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    dispatch(previousSlide());
    router.back();
  };

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
        
        <View className="flex-1" />
      </View>

      {/* Progress Bar */}
      <View className="px-6 mb-6">
        <View className="h-1 bg-dark-700 rounded-full overflow-hidden">
          <Animated.View
            entering={FadeIn}
            className="h-full bg-primary-500 rounded-full"
            style={{ width: '100%' }}
          />
        </View>
        <Text className="text-dark-400 text-xs mt-2">Step 3 of 3</Text>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <Animated.View entering={FadeIn.delay(200)}>
          <Text className="text-primary-400 text-sm font-semibold mb-2">
            Preferences
          </Text>
          <Text className="text-white text-2xl font-bold mb-2">
            Almost there, {personalInfo.name}!
          </Text>
          <Text className="text-dark-300 text-base mb-8">
            Let's set up your workout preferences
          </Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeIn.delay(400)} className="space-y-6">
          {/* Preferred Workout Time */}
          <View>
            <Text className="text-dark-200 text-sm font-medium mb-3">
              Preferred Workout Time
            </Text>
            <View className="space-y-3">
              {workoutTimeOptions.map((option, index) => (
                <Animated.View
                  key={option.value}
                  entering={FadeIn.delay(500 + index * 100)}
                >
                  <TouchableOpacity
                    onPress={() => setWorkoutTime(option.value)}
                    className={`p-4 rounded-xl border flex-row items-center ${
                      workoutTime === option.value
                        ? 'bg-primary-500/20 border-primary-500'
                        : 'bg-dark-800 border-dark-700'
                    }`}
                  >
                    <View
                      className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                        workoutTime === option.value ? 'bg-primary-500' : 'bg-dark-700'
                      }`}
                    >
                      <Ionicons
                        name={option.icon}
                        size={24}
                        color={workoutTime === option.value ? 'white' : '#9CA3AF'}
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className={`font-semibold ${
                          workoutTime === option.value ? 'text-white' : 'text-dark-200'
                        }`}
                      >
                        {option.label}
                      </Text>
                      <Text className="text-dark-400 text-sm">{option.time}</Text>
                    </View>
                    {workoutTime === option.value && (
                      <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Notification Settings */}
          <View className="space-y-4">
            <Text className="text-dark-200 text-sm font-medium">Notification Settings</Text>
            
            {/* Push Notifications */}
            <View className="bg-dark-800 p-4 rounded-xl border border-dark-700">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center">
                  <View className="w-10 h-10 bg-dark-700 rounded-lg items-center justify-center mr-3">
                    <Ionicons name="notifications" size={20} color="#10B981" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-medium">Push Notifications</Text>
                    <Text className="text-dark-400 text-sm">
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
            <View className="bg-dark-800 p-4 rounded-xl border border-dark-700">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center">
                  <View className="w-10 h-10 bg-dark-700 rounded-lg items-center justify-center mr-3">
                    <Ionicons name="alarm" size={20} color="#F97316" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-medium">Workout Reminders</Text>
                    <Text className="text-dark-400 text-sm">
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
            className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-6 rounded-2xl border border-primary-500/30"
          >
            <View className="items-center">
              <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="trophy" size={32} color="white" />
              </View>
              <Text className="text-white text-lg font-bold mb-2">You're All Set!</Text>
              <Text className="text-dark-200 text-sm text-center">
                Your personalized fitness journey is ready. Let's make those gains together!
              </Text>
            </View>
          </Animated.View>
        </Animated.View>

        <View className="h-20" />
      </ScrollView>

      {/* Bottom Action Button */}
      <View className="px-6 pb-8 pt-4 bg-dark-900">
        <AuthButton
          title="Start Your Journey"
          onPress={handleComplete}
          rightIcon="rocket"
        />
      </View>
    </KeyboardAvoidingView>
  );
}