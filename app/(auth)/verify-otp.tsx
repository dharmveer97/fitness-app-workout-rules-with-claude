import React, { useState } from 'react'

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import { router, useLocalSearchParams } from 'expo-router'
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
import { OTPWithTimer } from '../../components/auth/OTPInput'
import { otpVerificationSchema } from '../../schemas/auth'

export default function VerifyOTPScreen() {
  const params = useLocalSearchParams()
  const email = (params.email as string) ?? ''
  const [loading, setLoading] = useState(false)
  const [otpError, setOtpError] = useState('')

  const shakeAnimation = useSharedValue(0)

  const handleVerifyOTP = async (values: { otp: string; email?: string }) => {
    try {
      setLoading(true)
      setOtpError('')

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, accept any 6-digit code except "111111"
      if (values.otp === '111111') {
        setOtpError('Invalid OTP code. Please try again.')

        // Shake animation on error
        shakeAnimation.value = withSequence(
          withSpring(-10, { duration: 50 }),
          withSpring(10, { duration: 50 }),
          withSpring(-10, { duration: 50 }),
          withSpring(0, { duration: 50 }),
        )
        return
      }

      // Success - navigate to reset password screen
      router.push({
        pathname: '/(auth)/reset-password',
        params: { email, otp: values.otp },
      })
    } catch (error) {
      console.error('OTP verification error:', error)
      setOtpError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      setOtpError('')
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message or handle resend logic
      console.log('OTP resent to:', email)
    } catch (error) {
      console.error('Resend OTP error:', error)
    }
  }

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnimation.value }],
  }))

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
              onPress={() => router.push('/(auth)/forgot-password')}
              className='mb-8 h-10 w-10 items-center justify-center rounded-xl bg-dark-700'
            >
              <Ionicons name='arrow-back' size={20} color='#A1A1AA' />
            </TouchableOpacity>

            <View className='mb-8'>
              <Text className='mb-2 text-3xl font-bold text-white'>
                Enter Verification Code
              </Text>
              <Text className='text-base text-dark-300'>
                We sent a 6-digit code to{' '}
                <Text className='font-semibold text-primary-400'>{email}</Text>
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className='flex-1 justify-center px-6'>
            <Formik
              initialValues={{ otp: '', email }}
              validationSchema={toFormikValidationSchema(otpVerificationSchema)}
              onSubmit={handleVerifyOTP}
            >
              {({ handleSubmit, values, setFieldValue, isValid }) => (
                <View className='gap-8'>
                  {/* Illustration */}
                  <View className='mb-4 items-center'>
                    <View className='mb-4 h-24 w-24 items-center justify-center rounded-2xl bg-dark-700'>
                      <Ionicons name='mail-open' size={32} color='#10B981' />
                    </View>
                  </View>

                  {/* OTP Input */}
                  <Animated.View style={containerAnimatedStyle}>
                    <OTPWithTimer
                      length={6}
                      value={values.otp}
                      onChangeText={(otp) => {
                        setFieldValue('otp', otp)
                        setOtpError('')
                      }}
                      onComplete={(otp) => {
                        setFieldValue('otp', otp)
                        // Auto-submit when OTP is complete
                        setTimeout(() => {
                          if (otp.length === 6) {
                            handleSubmit()
                          }
                        }, 500)
                      }}
                      error={otpError}
                      autoFocus
                      resendTimer={60}
                      onResend={handleResendOTP}
                      resendText="Didn't receive the code?"
                    />
                  </Animated.View>

                  {/* Instructions */}
                  <View className='rounded-xl bg-dark-700 p-4'>
                    <View className='flex-row items-start'>
                      <Ionicons
                        name='information-circle'
                        size={20}
                        color='#10B981'
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <View className='flex-1'>
                        <Text className='mb-1 font-semibold text-white'>
                          Having trouble?
                        </Text>
                        <Text className='text-sm leading-5 text-dark-300'>
                          • Check your spam or junk folder{'\n'}• Make sure you
                          entered the correct email{'\n'}• The code expires in
                          15 minutes
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Verify Button */}
                  <AuthButton
                    title='Verify Code'
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || values.otp.length !== 6 || loading}
                    leftIcon='checkmark-circle'
                  />

                  {/* Back to forgot password */}
                  <View className='mt-4 flex-row items-center justify-center'>
                    <Text className='mr-2 text-sm text-dark-400'>
                      Wrong email?
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push('/(auth)/forgot-password')}
                    >
                      <Text className='text-sm font-semibold text-primary-400'>
                        Go Back
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
