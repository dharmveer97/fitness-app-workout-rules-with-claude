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
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import AuthButton from '@/components/auth/AuthButton'
import AuthInput from '@/components/auth/AuthInput'
import { SocialLoginGroup } from '@/components/auth/SocialLoginButton'
import { loginSchema } from '@/schemas/auth'
import { useAuthStore } from '@/stores'

export default function SignInScreen() {
  const signIn = useAuthStore((state) => state.signIn)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    apple: false,
  })

  const formik = useFormik<LoginFormType>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values) => {
      try {
        setLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const currentDate = new Date().toISOString()
        signIn({
          accessToken: 'demo-token',
          user: {
            id: '1',
            name: 'Fitness Enthusiast',
            email: values.email,
            avatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150',
            fitnessLevel: 'beginner',
            unitSystem: 'metric',
            joinDate: currentDate,
            createdAt: currentDate,
            updatedAt: currentDate,
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
        })
        router.replace('/(tabs)')
      } catch (error) {
        console.error('Sign in error:', error)
        formik.setFieldError('password', 'Invalid email or password')
      } finally {
        setLoading(false)
      }
    },
  })

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading((prev) => ({ ...prev, [provider]: true }))

    try {
      // Simulate social login
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const currentDate = new Date().toISOString()
      signIn({
        accessToken: 'demo-social-token',
        user: {
          id: '2',
          name: `${provider} User`,
          email: `user@${provider}.com`,
          avatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b790?q=80&w=150',
          fitnessLevel: 'beginner',
          unitSystem: 'metric',
          joinDate: currentDate,
          createdAt: currentDate,
          updatedAt: currentDate,
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
      })
      router.replace('/(tabs)')
    } catch (error) {
      console.error(`${provider} login error:`, error)
    } finally {
      setSocialLoading((prev) => ({ ...prev, [provider]: false }))
    }
  }

  return (
    <View className='flex-1 bg-surface-primary'>
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
              onPress={() => router.push('/(auth)/onboarding')}
              className='mb-8 h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-surface-secondary'
            >
              <Ionicons name='arrow-back' size={20} color='#A1A1AA' />
            </TouchableOpacity>

            <View className='mb-8'>
              <Text className='mb-2 text-3xl font-bold text-text-primary'>
                Welcome back
              </Text>
              <Text className='text-base text-text-secondary'>
                Sign in to your account to continue your fitness journey
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className='flex-1 px-6'>
            <View className='gap-6'>
              <AuthInput
                label='Email Address'
                placeholder='Enter your email'
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                leftIcon='mail'
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                error={formik.errors.email}
                touched={formik.touched.email}
              />

              <AuthInput
                label='Password'
                placeholder='Enter your password'
                isPassword
                leftIcon='lock-closed'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                error={formik.errors.password}
                touched={formik.touched.password}
              />

              {/* Remember Me & Forgot Password */}
              <View className='flex-row items-center justify-between'>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  className='flex-row items-center'
                >
                  <View
                    className={`mr-3 h-5 w-5 items-center justify-center rounded-md border-2 ${
                      rememberMe
                        ? 'border-brand-primary bg-brand-primary'
                        : 'border-border-primary'
                    }`}
                  >
                    {rememberMe && (
                      <Ionicons name='checkmark' size={12} color='white' />
                    )}
                  </View>
                  <Text className='text-sm text-text-secondary'>
                    Remember me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push('/(auth)/forgot-password')}
                >
                  <Text className='text-sm font-medium text-brand-primary'>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <AuthButton
                title='Sign In'
                onPress={() => formik.handleSubmit()}
                loading={loading}
                disabled={!formik.isValid || loading}
                leftIcon='log-in'
              />

              {/* Social Login */}
              <View className='mt-6'>
                <SocialLoginGroup
                  onGooglePress={() => handleSocialLogin('google')}
                  onApplePress={() => handleSocialLogin('apple')}
                  googleLoading={socialLoading.google}
                  appleLoading={socialLoading.apple}
                  disabled={loading}
                />
              </View>

              {/* Sign Up Link */}
              <View className='mb-8 mt-6 flex-row items-center justify-center'>
                <Text className='mr-2 text-base text-text-tertiary'>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(auth)/sign-up')}
                >
                  <Text className='text-base font-semibold text-brand-primary'>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
