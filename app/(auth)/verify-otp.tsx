import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { otpVerificationSchema } from '../../schemas/auth';
import AuthButton from '../../components/auth/AuthButton';
import { OTPWithTimer } from '../../components/auth/OTPInput';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence
} from 'react-native-reanimated';

export default function VerifyOTPScreen() {
  const params = useLocalSearchParams();
  const email = params.email as string || '';
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  const shakeAnimation = useSharedValue(0);

  const handleVerifyOTP = async (values: { otp: string; email?: string }) => {
    try {
      setLoading(true);
      setOtpError('');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, accept any 6-digit code except "111111"
      if (values.otp === '111111') {
        setOtpError('Invalid OTP code. Please try again.');

        // Shake animation on error
        shakeAnimation.value = withSequence(
          withSpring(-10, { duration: 50 }),
          withSpring(10, { duration: 50 }),
          withSpring(-10, { duration: 50 }),
          withSpring(0, { duration: 50 })
        );
        return;
      }

      // Success - navigate to reset password screen
      router.push({
        pathname: '/(auth)/reset-password',
        params: { email, otp: values.otp }
      });

    } catch (error) {
      console.error('OTP verification error:', error);
      setOtpError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setOtpError('');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message or handle resend logic
      console.log('OTP resent to:', email);
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeAnimation.value }],
    };
  });

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
                Enter Verification Code
              </Text>
              <Text className="text-dark-300 text-base">
                We sent a 6-digit code to{' '}
                <Text className="text-primary-400 font-semibold">{email}</Text>
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className="flex-1 px-6 justify-center">
            <Formik
              initialValues={{ otp: '', email }}
              validationSchema={toFormikValidationSchema(otpVerificationSchema)}
              onSubmit={handleVerifyOTP}
            >
              {({ handleSubmit, values, setFieldValue, isValid }) => (
                <View className="gap-8">
                  {/* Illustration */}
                  <View className="items-center mb-4">
                    <View className="w-24 h-24 bg-dark-700 rounded-2xl items-center justify-center mb-4">
                      <Ionicons name="mail-open" size={32} color="#10B981" />
                    </View>
                  </View>

                  {/* OTP Input */}
                  <Animated.View style={containerAnimatedStyle}>
                    <OTPWithTimer
                      length={6}
                      value={values.otp}
                      onChangeText={(otp) => {
                        setFieldValue('otp', otp);
                        setOtpError('');
                      }}
                      onComplete={(otp) => {
                        setFieldValue('otp', otp);
                        // Auto-submit when OTP is complete
                        setTimeout(() => {
                          if (otp.length === 6) {
                            handleSubmit();
                          }
                        }, 500);
                      }}
                      error={otpError}
                      autoFocus
                      resendTimer={60}
                      onResend={handleResendOTP}
                      resendText="Didn't receive the code?"
                    />
                  </Animated.View>

                  {/* Instructions */}
                  <View className="bg-dark-700 rounded-xl p-4">
                    <View className="flex-row items-start">
                      <Ionicons name="information-circle" size={20} color="#10B981" style={{ marginRight: 12, marginTop: 2 }} />
                      <View className="flex-1">
                        <Text className="text-white font-semibold mb-1">Having trouble?</Text>
                        <Text className="text-dark-300 text-sm leading-5">
                          • Check your spam or junk folder{'\n'}
                          • Make sure you entered the correct email{'\n'}
                          • The code expires in 15 minutes
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Verify Button */}
                  <AuthButton
                    title="Verify Code"
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || values.otp.length !== 6 || loading}
                    leftIcon="checkmark-circle"
                  />

                  {/* Back to forgot password */}
                  <View className="flex-row items-center justify-center mt-4">
                    <Text className="text-dark-400 text-sm mr-2">
                      Wrong email?
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                      <Text className="text-primary-400 text-sm font-semibold">
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
  );
}