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
import AuthInput from '../../components/auth/AuthInput'
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator'
import { resetPasswordWithOTPSchema } from '../../schemas/auth'

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams()
  const email = (params.email as string) ?? ''
  const otp = (params.otp as string) ?? ''
  const [loading, setLoading] = useState(false)
  const [resetComplete, setResetComplete] = useState(false)

  const successScale = useSharedValue(0)
  const successOpacity = useSharedValue(0)

  const handleResetPassword = async (values: {
    otp: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(values, 'values')
      setResetComplete(true)

      // Success animation
      successOpacity.value = withSpring(1)
      successScale.value = withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 10 }),
      )
    } catch (error) {
      console.error('Reset password error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContinueToLogin = () => {
    router.replace('/(auth)/sign-in')
  }

  const successAnimatedStyle = useAnimatedStyle(() => ({
    opacity: successOpacity.value,
    transform: [{ scale: successScale.value }],
  }))

  if (resetComplete) {
    return (
      <View className='flex-1 bg-dark-900'>
        <StatusBar style='light' />

        <ScrollView
          className='flex-1'
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View className='px-6 py-8'>
            {/* Success Animation */}
            <Animated.View
              style={successAnimatedStyle}
              className='mb-8 items-center'
            >
              <View className='mb-6 h-24 w-24 items-center justify-center rounded-full bg-primary-500'>
                <Ionicons name='checkmark' size={40} color='white' />
              </View>

              <Text className='mb-4 text-center text-2xl font-bold text-white'>
                Password Reset Successfully!
              </Text>

              <Text className='text-center text-base leading-6 text-dark-300'>
                Your password has been updated successfully. You can now sign in
                with your new password.
              </Text>
            </Animated.View>

            {/* Success Message */}
            <View className='mb-8 rounded-xl border border-primary-500 bg-primary-900 p-4'>
              <View className='flex-row items-start'>
                <Ionicons
                  name='shield-checkmark'
                  size={20}
                  color='#10B981'
                  style={{ marginRight: 12, marginTop: 2 }}
                />
                <View className='flex-1'>
                  <Text className='mb-1 font-semibold text-primary-400'>
                    Security Update Complete
                  </Text>
                  <Text className='text-sm leading-5 text-primary-200'>
                    Your account is now protected with your new secure password.
                  </Text>
                </View>
              </View>
            </View>

            {/* Continue Button */}
            <AuthButton
              title='Continue to Sign In'
              onPress={handleContinueToLogin}
              leftIcon='log-in'
            />

            {/* Security Tips */}
            <View className='mt-8 rounded-xl bg-dark-700 p-4'>
              <Text className='mb-3 font-semibold text-white'>
                Security Tips:
              </Text>
              <View className='space-y-2'>
                <View className='flex-row items-start'>
                  <Text className='mr-2 text-primary-400'>•</Text>
                  <Text className='flex-1 text-sm text-dark-300'>
                    Don't share your password with anyone
                  </Text>
                </View>
                <View className='flex-row items-start'>
                  <Text className='mr-2 text-primary-400'>•</Text>
                  <Text className='flex-1 text-sm text-dark-300'>
                    Use a unique password for this account
                  </Text>
                </View>
                <View className='flex-row items-start'>
                  <Text className='mr-2 text-primary-400'>•</Text>
                  <Text className='flex-1 text-sm text-dark-300'>
                    Consider enabling two-factor authentication
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
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
              onPress={() => router.push('/(auth)/verify-otp')}
              className='mb-8 h-10 w-10 items-center justify-center rounded-xl bg-dark-700'
            >
              <Ionicons name='arrow-back' size={20} color='#A1A1AA' />
            </TouchableOpacity>

            <View className='mb-8'>
              <Text className='mb-2 text-3xl font-bold text-white'>
                Create New Password
              </Text>
              <Text className='text-base text-dark-300'>
                Choose a strong password to secure your account
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className='flex-1 px-6'>
            <Formik
              initialValues={{
                otp,
                email,
                password: '',
                confirmPassword: '',
              }}
              validationSchema={toFormikValidationSchema(
                resetPasswordWithOTPSchema,
              )}
              onSubmit={handleResetPassword}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values: _values,
                errors,
                touched,
                isValid,
              }) => (
                <View className='gap-6'>
                  {/* Security Illustration */}
                  <View className='mb-4 items-center'>
                    <View className='mb-4 h-24 w-24 items-center justify-center rounded-2xl bg-dark-700'>
                      <Ionicons
                        name='shield-checkmark'
                        size={32}
                        color='#10B981'
                      />
                    </View>
                  </View>

                  {/* Password Input */}
                  <View>
                    <AuthInput
                      label='New Password'
                      placeholder='Create a strong password'
                      isPassword
                      leftIcon='lock-closed'
                      value={_values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={errors.password}
                      touched={touched.password}
                    />

                    {/* Password Strength Indicator */}
                    <PasswordStrengthIndicator
                      password={_values.password}
                      showRequirements={_values.password.length > 0}
                    />
                  </View>

                  {/* Confirm Password Input */}
                  <AuthInput
                    label='Confirm New Password'
                    placeholder='Re-enter your password'
                    isPassword
                    leftIcon='lock-closed'
                    value={_values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />

                  {/* Security Requirements */}
                  <View className='rounded-xl bg-dark-700 p-4'>
                    <View className='flex-row items-start'>
                      <Ionicons
                        name='shield'
                        size={20}
                        color='#10B981'
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <View className='flex-1'>
                        <Text className='mb-1 font-semibold text-white'>
                          Password Security
                        </Text>
                        <Text className='text-sm leading-5 text-dark-300'>
                          Your new password will be encrypted and stored
                          securely. Make sure it's different from your previous
                          password.
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Reset Password Button */}
                  <AuthButton
                    title='Update Password'
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || loading}
                    leftIcon='key'
                  />

                  {/* Back to Sign In */}
                  <View className='mb-8 mt-6 flex-row items-center justify-center'>
                    <Text className='mr-2 text-base text-dark-400'>
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
