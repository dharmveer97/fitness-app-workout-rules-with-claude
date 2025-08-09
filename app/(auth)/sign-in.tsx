import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { signIn } from '@/state/slices/authSlice';
import { loginSchema } from '@/schemas/auth';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import { SocialLoginGroup } from '@/components/auth/SocialLoginButton';

export default function SignInScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    apple: false,
  });

  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      dispatch(
        signIn({
          accessToken: 'demo-token',
          user: { 
            id: '1', 
            name: 'Fitness Enthusiast', 
            email: values.email,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150'
          },
        })
      );
      router.replace('/');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(prev => ({ ...prev, [provider]: true }));
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch(
        signIn({
          accessToken: 'demo-social-token',
          user: { 
            id: '2', 
            name: `${provider} User`, 
            email: `user@${provider}.com`,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b790?q=80&w=150'
          },
        })
      );
      router.replace('/');
    } catch (error) {
      console.error(`${provider} login error:`, error);
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
                Welcome back
              </Text>
              <Text className="text-dark-300 text-base">
                Sign in to your account to continue your fitness journey
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className="flex-1 px-6">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={toFormikValidationSchema(loginSchema)}
              onSubmit={handleSignIn}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <View className="gap-6">
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

                  <AuthInput
                    label="Password"
                    placeholder="Enter your password"
                    isPassword
                    leftIcon="lock-closed"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors.password}
                    touched={touched.password}
                  />

                  {/* Remember Me & Forgot Password */}
                  <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                      onPress={() => setRememberMe(!rememberMe)}
                      className="flex-row items-center"
                    >
                      <View className={`w-5 h-5 rounded-md border-2 mr-3 items-center justify-center ${
                        rememberMe ? 'bg-primary-500 border-primary-500' : 'border-dark-500'
                      }`}>
                        {rememberMe && (
                          <Ionicons name="checkmark" size={12} color="white" />
                        )}
                      </View>
                      <Text className="text-dark-300 text-sm">Remember me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                      <Text className="text-primary-400 text-sm font-medium">
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Sign In Button */}
                  <AuthButton
                    title="Sign In"
                    onPress={() => handleSubmit()}
                    loading={loading}
                    disabled={!isValid || loading}
                    leftIcon="log-in"
                  />

                  {/* Social Login */}
                  <View className="mt-6">
                    <SocialLoginGroup
                      onGooglePress={() => handleSocialLogin('google')}
                      onApplePress={() => handleSocialLogin('apple')}
                      googleLoading={socialLoading.google}
                      appleLoading={socialLoading.apple}
                      disabled={loading}
                    />
                  </View>

                  {/* Sign Up Link */}
                  <View className="flex-row items-center justify-center mt-6 mb-8">
                    <Text className="text-dark-400 text-base mr-2">
                      Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
                      <Text className="text-primary-400 text-base font-semibold">
                        Sign Up
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
