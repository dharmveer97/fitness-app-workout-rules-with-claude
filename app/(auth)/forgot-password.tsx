import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { forgotPasswordSchema } from '../../schemas/auth';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay
} from 'react-native-reanimated';

export default function ForgotPasswordScreen() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [lastEmail, setLastEmail] = useState('');

  const successScale = useSharedValue(0);
  const successOpacity = useSharedValue(0);

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate directly to OTP verification for demo
      // In production, you might want to show a success message first
      router.push({
        pathname: '/(auth)/verify-otp',
        params: { email: values.email }
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      // On error, show the email sent state with error handling
      setLastEmail(values.email);
      setEmailSent(true);

      successOpacity.value = withSpring(1);
      successScale.value = withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 10 })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    // Simulate resend
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const successAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: successOpacity.value,
      transform: [{ scale: successScale.value }],
    };
  });

  if (emailSent) {
    return (
      <View className="flex-1 bg-dark-900">
        <StatusBar style="light" />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View className="px-6 py-8">
            {/* Success Icon */}
            <Animated.View
              style={successAnimatedStyle}
              className="items-center mb-8"
            >
              <View className="w-20 h-20 bg-primary-500 rounded-full items-center justify-center mb-6">
                <Ionicons name="mail" size={32} color="white" />
              </View>

              <Text className="text-2xl font-bold text-white text-center mb-4">
                Check Your Email
              </Text>

              <Text className="text-dark-300 text-base text-center leading-6">
                We've sent a password reset link to
              </Text>
              <Text className="text-primary-400 text-base font-semibold text-center mt-1">
                {lastEmail}
              </Text>
            </Animated.View>

            {/* Instructions */}
            <View className="bg-dark-700 rounded-xl p-4 mb-8">
              <View className="flex-row items-start mb-3">
                <Ionicons name="information-circle" size={20} color="#10B981" style={{ marginRight: 12, marginTop: 2 }} />
                <View className="flex-1">
                  <Text className="text-white font-semibold mb-1">What's next?</Text>
                  <Text className="text-dark-300 text-sm leading-5">
                    Click the link in your email to reset your password. The link will expire in 15 minutes.
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="gap-4">
              <AuthButton
                title="Resend Email"
                onPress={handleResendEmail}
                loading={loading}
                variant="outline"
                leftIcon="refresh"
              />

              <AuthButton
                title="Back to Sign In"
                onPress={() => router.push('/(auth)/sign-in')}
                variant="secondary"
                leftIcon="arrow-back"
              />
            </View>

            {/* Help Link */}
            <TouchableOpacity className="mt-6 py-3">
              <Text className="text-center text-dark-400 text-sm">
                Didn't receive the email? Check your spam folder or{' '}
                <Text className="text-primary-400 font-medium">contact support</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

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
                Forgot Password?
              </Text>
              <Text className="text-dark-300 text-base">
                Don't worry! It happens to the best of us. Enter your email to get a reset link.
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className="flex-1 px-6 justify-center">
            <Formik
              initialValues={{ email: '' }}
              validationSchema={toFormikValidationSchema(forgotPasswordSchema)}
              onSubmit={handleForgotPassword}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <View className="gap-6">
                  {/* Illustration */}
                  <View className="items-center mb-8">
                    <View className="w-24 h-24 bg-dark-700 rounded-2xl items-center justify-center mb-4">
                      <Ionicons name="lock-closed" size={32} color="#10B981" />
                    </View>
                  </View>

                  <AuthInput
                    label="Email Address"
                    placeholder="Enter your registered email"
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

                  {/* Send Reset Link Button */}
                  <AuthButton
                    title="Send Reset Link"
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || loading}
                    leftIcon="paper-plane"
                  />

                  {/* Back to Sign In */}
                  <View className="flex-row items-center justify-center mt-6">
                    <Text className="text-dark-400 text-base mr-2">
                      Remember your password?
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
