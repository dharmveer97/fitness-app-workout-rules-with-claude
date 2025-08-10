import React, { useState } from 'react'

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import AuthButton from '../../components/auth/AuthButton'
import AuthInput from '../../components/auth/AuthInput'
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator'
import { SocialLoginGroup } from '../../components/auth/SocialLoginButton'
import { registerSchema } from '../../schemas/auth'
import { signIn } from '../../state/slices/authSlice'

export default function SignUpScreen() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    apple: false,
  })

  const handleSignUp = async (values: {
    name: string
    email: string
    password: string
    confirmPassword: string
    acceptedTerms: boolean
  }) => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

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
            joinDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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
          } as any,
        }),
      )
      router.replace('/(tabs)')
    } catch (error) {
      console.error('Sign up error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignUp = async (provider: string) => {
    setSocialLoading((prev) => ({ ...prev, [provider]: true }))

    try {
      // Simulate social signup
      await new Promise((resolve) => setTimeout(resolve, 2000))

      dispatch(
        signIn({
          accessToken: 'demo-social-signup-token',
          user: {
            id: Date.now().toString(),
            name: `${provider} User`,
            email: `user@${provider}.com`,
            avatar:
              'https://images.unsplash.com/photo-1494790108755-2616b612b790?q=80&w=150',
            fitnessLevel: 'beginner',
            unitSystem: 'metric',
            joinDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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
          } as any,
        }),
      )
      router.replace('/(tabs)')
    } catch (error) {
      console.error(`${provider} signup error:`, error)
    } finally {
      setSocialLoading((prev) => ({ ...prev, [provider]: false }))
    }
  }

  return (
    <View className='flex-1 bg-dark-900'>
      <StatusBar style='light' />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
        className='flex-1'
      >
        <ScrollView
          className='flex-1'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header */}
          <View className='px-6 pb-8 pt-16'>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/sign-in')}
              className='mb-8 h-10 w-10 items-center justify-center rounded-xl bg-dark-700'
            >
              <Ionicons name='arrow-back' size={20} color='#A1A1AA' />
            </TouchableOpacity>

            <View className='mb-8'>
              <Text className='mb-2 text-3xl font-bold text-white'>
                Create Account
              </Text>
              <Text className='text-base text-dark-300'>
                Join thousands of users on their fitness journey
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className='flex-1 px-6'>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptedTerms: false,
              }}
              validationSchema={toFormikValidationSchema(registerSchema)}
              onSubmit={handleSignUp}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                setFieldValue,
              }) => (
                <View className='gap-6'>
                  <AuthInput
                    label='Full Name'
                    placeholder='Enter your full name'
                    autoCapitalize='words'
                    leftIcon='person'
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={errors.name}
                    touched={touched.name}
                  />

                  <AuthInput
                    label='Email Address'
                    placeholder='Enter your email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoComplete='email'
                    leftIcon='mail'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                  />

                  <View>
                    <AuthInput
                      label='Password'
                      placeholder='Create a strong password'
                      isPassword
                      leftIcon='lock-closed'
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
                    label='Confirm Password'
                    placeholder='Confirm your password'
                    isPassword
                    leftIcon='lock-closed'
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />

                  {/* Terms and Conditions */}
                  <View className='mt-2'>
                    <TouchableOpacity
                      onPress={() => {
                        const newValue = !acceptedTerms
                        setAcceptedTerms(newValue)
                        setFieldValue('acceptedTerms', newValue)
                      }}
                      className='flex-row items-start'
                    >
                      <View
                        className={`mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded-md border-2 ${
                          acceptedTerms
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-dark-500'
                        }`}
                      >
                        {acceptedTerms && (
                          <Ionicons name='checkmark' size={12} color='white' />
                        )}
                      </View>
                      <View className='flex-1'>
                        <Text className='text-sm leading-5 text-dark-300'>
                          I agree to the{' '}
                          <Text className='font-medium text-primary-400'>
                            Terms of Service
                          </Text>{' '}
                          and{' '}
                          <Text className='font-medium text-primary-400'>
                            Privacy Policy
                          </Text>
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {touched.acceptedTerms && errors.acceptedTerms && (
                      <Text className='ml-8 mt-2 text-sm text-red-500'>
                        {errors.acceptedTerms}
                      </Text>
                    )}
                  </View>

                  {/* Sign Up Button */}
                  <AuthButton
                    title='Create Account'
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || !acceptedTerms || loading}
                    leftIcon='person-add'
                  />

                  {/* Social Login */}
                  <View className='mt-6'>
                    <SocialLoginGroup
                      onGooglePress={() => handleSocialSignUp('google')}
                      onApplePress={() => handleSocialSignUp('apple')}
                      googleLoading={socialLoading.google}
                      appleLoading={socialLoading.apple}
                      disabled={loading}
                    />
                  </View>

                  {/* Sign In Link */}
                  <View className='mb-8 mt-6 flex-row items-center justify-center'>
                    <Text className='mr-2 text-base text-dark-400'>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push('/(auth)/sign-in')}
                    >
                      <Text className='text-base font-semibold text-primary-400'>
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
  )
}
