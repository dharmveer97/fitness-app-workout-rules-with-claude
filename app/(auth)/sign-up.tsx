import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { signIn } from '../../state/slices/authSlice';
import { registerSchema } from '../../schemas/auth';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { SocialLoginGroup } from '../../components/auth/SocialLoginButton';
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator';

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    apple: false,
  });

  const handleSignUp = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptedTerms: boolean;
  }) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Auto sign in after successful registration
      dispatch(
        signIn({
          accessToken: 'demo-register-token',
          user: { 
            id: Date.now().toString(), 
            name: values.name, 
            email: values.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(values.name)}&size=150&background=10B981&color=fff`,
            fitnessLevel: 'beginner',
            unitSystem: 'metric',
            joinDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            goals: {
              dailySteps: 10000,
              dailyWater: 2500,
              dailyCalories: 2000,
              weeklyWorkouts: 3,
              sleepHours: 8,
            },
            preferences: {
              notifications: {
                workoutReminders: true,
                waterReminders: true,
                sleepReminders: false,
              },
              privacy: {
                shareStats: false,
                shareWorkouts: true,
              },
            },
          },
        })
      );
      router.replace('/');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: string) => {
    setSocialLoading(prev => ({ ...prev, [provider]: true }));
    
    try {
      // Simulate social signup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch(
        signIn({
          accessToken: 'demo-social-signup-token',
          user: { 
            id: Date.now().toString(), 
            name: `${provider} User`, 
            email: `user@${provider}.com`,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b790?q=80&w=150',
            fitnessLevel: 'beginner',
            unitSystem: 'metric',
            joinDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            goals: {
              dailySteps: 10000,
              dailyWater: 2500,
              dailyCalories: 2000,
              weeklyWorkouts: 3,
              sleepHours: 8,
            },
            preferences: {
              notifications: {
                workoutReminders: true,
                waterReminders: true,
                sleepReminders: false,
              },
              privacy: {
                shareStats: false,
                shareWorkouts: true,
              },
            },
          },
        })
      );
      router.replace('/');
    } catch (error) {
      console.error(`${provider} signup error:`, error);
    } finally {
      setSocialLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <View className="flex-1 bg-dark-900">
      <StatusBar style="light" />
      
      <KeyboardAvoidingView 
        behavior={Platform.select({ ios: 'padding', android: 'height' })} 
        className="flex-1"
      >
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header */}
          <View className="pt-16 px-6 pb-8">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-xl bg-dark-700 items-center justify-center mb-8"
            >
              <Ionicons name="arrow-back" size={20} color="#A1A1AA" />
            </TouchableOpacity>
            
            <View className="mb-8">
              <Text className="text-3xl font-bold text-white mb-2">
                Create Account
              </Text>
              <Text className="text-dark-300 text-base">
                Join thousands of users on their fitness journey
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className="flex-1 px-6">
            <Formik
              initialValues={{ 
                name: '', 
                email: '', 
                password: '', 
                confirmPassword: '',
                acceptedTerms: false 
              }}
              validationSchema={toFormikValidationSchema(registerSchema)}
              onSubmit={handleSignUp}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
                <View className="gap-6">
                  <AuthInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    autoCapitalize="words"
                    leftIcon="person"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={errors.name}
                    touched={touched.name}
                  />

                  <AuthInput
                    label="Email Address"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    leftIcon="mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                  />

                  <View>
                    <AuthInput
                      label="Password"
                      placeholder="Create a strong password"
                      isPassword
                      leftIcon="lock-closed"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={errors.password}
                      touched={touched.password}
                    />
                    
                    {/* Password Strength Indicator */}
                    <PasswordStrengthIndicator 
                      password={values.password} 
                      showRequirements={values.password.length > 0}
                    />
                  </View>

                  <AuthInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    isPassword
                    leftIcon="lock-closed"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />

                  {/* Terms and Conditions */}
                  <View className="mt-2">
                    <TouchableOpacity
                      onPress={() => {
                        const newValue = !acceptedTerms;
                        setAcceptedTerms(newValue);
                        setFieldValue('acceptedTerms', newValue);
                      }}
                      className="flex-row items-start"
                    >
                      <View className={`w-5 h-5 rounded-md border-2 mr-3 items-center justify-center mt-0.5 ${
                        acceptedTerms ? 'bg-primary-500 border-primary-500' : 'border-dark-500'
                      }`}>
                        {acceptedTerms && (
                          <Ionicons name="checkmark" size={12} color="white" />
                        )}
                      </View>
                      <View className="flex-1">
                        <Text className="text-dark-300 text-sm leading-5">
                          I agree to the{' '}
                          <Text className="text-primary-400 font-medium">Terms of Service</Text>
                          {' '}and{' '}
                          <Text className="text-primary-400 font-medium">Privacy Policy</Text>
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
                    {touched.acceptedTerms && errors.acceptedTerms && (
                      <Text className="text-red-500 text-sm mt-2 ml-8">{errors.acceptedTerms}</Text>
                    )}
                  </View>

                  {/* Sign Up Button */}
                  <AuthButton
                    title="Create Account"
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || !acceptedTerms || loading}
                    leftIcon="person-add"
                  />

                  {/* Social Login */}
                  <View className="mt-6">
                    <SocialLoginGroup
                      onGooglePress={() => handleSocialSignUp('google')}
                      onApplePress={() => handleSocialSignUp('apple')}
                      googleLoading={socialLoading.google}
                      appleLoading={socialLoading.apple}
                      disabled={loading}
                    />
                  </View>

                  {/* Sign In Link */}
                  <View className="flex-row items-center justify-center mt-6 mb-8">
                    <Text className="text-dark-400 text-base mr-2">
                      Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
                      <Text className="text-primary-400 text-base font-semibold">
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
