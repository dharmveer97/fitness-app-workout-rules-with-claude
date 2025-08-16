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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import AuthButton from '../../components/auth/AuthButton'
import AuthInput from '../../components/auth/AuthInput'
import { forgotPasswordSchema } from '../../schemas/auth'

export default function ForgotPasswordScreen() {
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [lastEmail, setLastEmail] = useState('')

  const successScale = useSharedValue(0)
  const successOpacity = useSharedValue(0)

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Navigate directly to OTP verification for demo
      // In production, you might want to show a success message first
      router.push({
        pathname: '/(auth)/verify-otp',
        params: { email: values.email },
      })
    } catch (error) {
      console.error('Forgot password error:', error)
      // On error, show the email sent state with error handling
      setLastEmail(values.email)
      setEmailSent(true)

      successOpacity.value = withSpring(1)
      successScale.value = withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 10 }),
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setLoading(true)
    // Simulate resend
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const successAnimatedStyle = useAnimatedStyle(() => ({
    opacity: successOpacity.value,
    transform: [{ scale: successScale.value }],
  }))

  if (emailSent) {
    return (
      <View className='bg-dark-900 flex-1'>
        <StatusBar style='light' />

        <ScrollView
          className='flex-1'
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View className='px-6 py-8'>
            {/* Success Icon */}
            <Animated.View
              style={successAnimatedStyle}
              className='mb-8 items-center'
            >
              <View className='mb-6 h-20 w-20 items-center justify-center rounded-full bg-primary-500'>
                <Ionicons name='mail' size={32} color='white' />
              </View>

              <Text className='mb-4 text-center text-2xl font-bold text-white'>
                Check Your Email
              </Text>

              <Text className='text-dark-300 text-center text-base leading-6'>
                We've sent a password reset link to
              </Text>
              <Text className='mt-1 text-center text-base font-semibold text-primary-400'>
                {lastEmail}
              </Text>
            </Animated.View>

            {/* Instructions */}
            <View className='bg-dark-700 mb-8 rounded-xl p-4'>
              <View className='mb-3 flex-row items-start'>
                <Ionicons
                  name='information-circle'
                  size={20}
                  color='#10B981'
                  style={{ marginRight: 12, marginTop: 2 }}
                />
                <View className='flex-1'>
                  <Text className='mb-1 font-semibold text-white'>
                    What's next?
                  </Text>
                  <Text className='text-dark-300 text-sm leading-5'>
                    Click the link in your email to reset your password. The
                    link will expire in 15 minutes.
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className='gap-4'>
              <AuthButton
                title='Resend Email'
                onPress={handleResendEmail}
                loading={loading}
                variant='outline'
                leftIcon='refresh'
              />

              <AuthButton
                title='Back to Sign In'
                onPress={() => router.push('/(auth)/sign-in')}
                variant='secondary'
                leftIcon='arrow-back'
              />
            </View>

            {/* Help Link */}
            <TouchableOpacity className='mt-6 py-3'>
              <Text className='text-dark-400 text-center text-sm'>
                Didn't receive the email? Check your spam folder or{' '}
                <Text className='font-medium text-primary-400'>
                  contact support
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <View className='bg-dark-900 flex-1'>
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
              className='bg-dark-700 mb-8 h-10 w-10 items-center justify-center rounded-xl'
            >
              <Ionicons name='arrow-back' size={20} color='#A1A1AA' />
            </TouchableOpacity>

            <View className='mb-8'>
              <Text className='mb-2 text-3xl font-bold text-white'>
                Forgot Password?
              </Text>
              <Text className='text-dark-300 text-base'>
                Don't worry! It happens to the best of us. Enter your email to
                get a reset link.
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className='flex-1 justify-center px-6'>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={toFormikValidationSchema(forgotPasswordSchema)}
              onSubmit={handleForgotPassword}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <View className='gap-6'>
                  {/* Illustration */}
                  <View className='mb-8 items-center'>
                    <View className='bg-dark-700 mb-4 h-24 w-24 items-center justify-center rounded-2xl'>
                      <Ionicons name='lock-closed' size={32} color='#10B981' />
                    </View>
                  </View>

                  <AuthInput
                    label='Email Address'
                    placeholder='Enter your registered email'
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

                  {/* Send Reset Link Button */}
                  <AuthButton
                    title='Send Reset Link'
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || loading}
                    leftIcon='paper-plane'
                  />

                  {/* Back to Sign In */}
                  <View className='mt-6 flex-row items-center justify-center'>
                    <Text className='text-dark-400 mr-2 text-base'>
                      Remember your password?
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
