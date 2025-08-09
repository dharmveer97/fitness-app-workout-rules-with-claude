import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { resetPasswordWithOTPSchema } from '../../schemas/auth';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence
} from 'react-native-reanimated';

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams();
  const email = params.email as string || '';
  const otp = params.otp as string || '';
  const [loading, setLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const successScale = useSharedValue(0);
  const successOpacity = useSharedValue(0);

  const handleResetPassword = async (values: {
    otp: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setResetComplete(true);

      // Success animation
      successOpacity.value = withSpring(1);
      successScale.value = withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 10 })
      );

    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToLogin = () => {
    router.replace('/(auth)/sign-in');
  };

  const successAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: successOpacity.value,
      transform: [{ scale: successScale.value }],
    };
  });

  if (resetComplete) {
    return (
      <View className="flex-1 bg-dark-900">
        <StatusBar style="light" />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View className="px-6 py-8">
            {/* Success Animation */}
            <Animated.View
              style={successAnimatedStyle}
              className="items-center mb-8"
            >
              <View className="w-24 h-24 bg-primary-500 rounded-full items-center justify-center mb-6">
                <Ionicons name="checkmark" size={40} color="white" />
              </View>

              <Text className="text-2xl font-bold text-white text-center mb-4">
                Password Reset Successfully!
              </Text>

              <Text className="text-dark-300 text-base text-center leading-6">
                Your password has been updated successfully. You can now sign in with your new password.
              </Text>
            </Animated.View>

            {/* Success Message */}
            <View className="bg-primary-900 border border-primary-500 rounded-xl p-4 mb-8">
              <View className="flex-row items-start">
                <Ionicons name="shield-checkmark" size={20} color="#10B981" style={{ marginRight: 12, marginTop: 2 }} />
                <View className="flex-1">
                  <Text className="text-primary-400 font-semibold mb-1">Security Update Complete</Text>
                  <Text className="text-primary-200 text-sm leading-5">
                    Your account is now protected with your new secure password.
                  </Text>
                </View>
              </View>
            </View>

            {/* Continue Button */}
            <AuthButton
              title="Continue to Sign In"
              onPress={handleContinueToLogin}
              leftIcon="log-in"
            />

            {/* Security Tips */}
            <View className="mt-8 bg-dark-700 rounded-xl p-4">
              <Text className="text-white font-semibold mb-3">Security Tips:</Text>
              <View className="space-y-2">
                <View className="flex-row items-start">
                  <Text className="text-primary-400 mr-2">•</Text>
                  <Text className="text-dark-300 text-sm flex-1">
                    Don't share your password with anyone
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-primary-400 mr-2">•</Text>
                  <Text className="text-dark-300 text-sm flex-1">
                    Use a unique password for this account
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-primary-400 mr-2">•</Text>
                  <Text className="text-dark-300 text-sm flex-1">
                    Consider enabling two-factor authentication
                  </Text>
                </View>
              </View>
            </View>
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
                Create New Password
              </Text>
              <Text className="text-dark-300 text-base">
                Choose a strong password to secure your account
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className="flex-1 px-6">
            <Formik
              initialValues={{
                otp,
                email,
                password: '',
                confirmPassword: ''
              }}
              validationSchema={toFormikValidationSchema(resetPasswordWithOTPSchema)}
              onSubmit={handleResetPassword}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <View className="gap-6">
                  {/* Security Illustration */}
                  <View className="items-center mb-4">
                    <View className="w-24 h-24 bg-dark-700 rounded-2xl items-center justify-center mb-4">
                      <Ionicons name="shield-checkmark" size={32} color="#10B981" />
                    </View>
                  </View>

                  {/* Password Input */}
                  <View>
                    <AuthInput
                      label="New Password"
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

                  {/* Confirm Password Input */}
                  <AuthInput
                    label="Confirm New Password"
                    placeholder="Re-enter your password"
                    isPassword
                    leftIcon="lock-closed"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />

                  {/* Security Requirements */}
                  <View className="bg-dark-700 rounded-xl p-4">
                    <View className="flex-row items-start">
                      <Ionicons name="shield" size={20} color="#10B981" style={{ marginRight: 12, marginTop: 2 }} />
                      <View className="flex-1">
                        <Text className="text-white font-semibold mb-1">Password Security</Text>
                        <Text className="text-dark-300 text-sm leading-5">
                          Your new password will be encrypted and stored securely. Make sure it's different from your previous password.
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Reset Password Button */}
                  <AuthButton
                    title="Update Password"
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || loading}
                    leftIcon="key"
                  />

                  {/* Back to Sign In */}
                  <View className="flex-row items-center justify-center mt-6 mb-8">
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