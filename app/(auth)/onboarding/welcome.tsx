import React from 'react'

import {
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'

import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/(auth)/onboarding/')
  }

  const handleSignIn = () => {
    router.replace('/(auth)/sign-in')
  }

  return (
    <View className='bg-dark-900 flex-1'>
      <StatusBar style='light' />

      {/* Background Image with Gradient Overlay */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        }}
        style={{ flex: 1 }}
        resizeMode='cover'
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className='flex-1 justify-between px-6 pb-10 pt-20'>
              {/* Top Section - App Logo/Brand */}
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000)}
                className='items-center'
              >
                <View className='mb-4 h-20 w-20 items-center justify-center rounded-3xl bg-brand-primary/20'>
                  <Ionicons name='fitness' size={40} color='#10B981' />
                </View>
                <Text className='text-2xl font-bold text-brand-primary'>
                  Daily Deposits
                </Text>
                <Text className='mt-2 text-base text-text-secondary'>
                  Your Personal Fitness Journey
                </Text>
              </Animated.View>

              {/* Middle Section - Feature Highlights */}
              <View className='my-12'>
                <Animated.View
                  entering={FadeIn.delay(400).duration(1000)}
                  className='mb-8'
                >
                  <Text className='mb-4 text-center text-4xl font-bold text-text-primary'>
                    Transform Your Life,{'\n'}One Day at a Time
                  </Text>
                  <Text className='text-center text-lg text-text-secondary'>
                    Build healthy habits with daily motivation and AI-powered
                    tracking
                  </Text>
                </Animated.View>

                {/* Feature Cards */}
                <View className='space-y-4'>
                  <Animated.View
                    entering={FadeInUp.delay(600).duration(800)}
                    className='bg-dark-800/80 flex-row items-center rounded-2xl p-4'
                  >
                    <View className='mr-4 h-12 w-12 items-center justify-center rounded-full bg-blue-500/20'>
                      <Ionicons name='sunny' size={24} color='#3B82F6' />
                    </View>
                    <View className='flex-1'>
                      <Text className='font-semibold text-text-primary'>
                        Daily Motivation
                      </Text>
                      <Text className='text-sm text-text-tertiary'>
                        Start each day with inspiring quotes
                      </Text>
                    </View>
                  </Animated.View>

                  <Animated.View
                    entering={FadeInUp.delay(700).duration(800)}
                    className='bg-dark-800/80 flex-row items-center rounded-2xl p-4'
                  >
                    <View className='mr-4 h-12 w-12 items-center justify-center rounded-full bg-orange-500/20'>
                      <Ionicons name='nutrition' size={24} color='#F97316' />
                    </View>
                    <View className='flex-1'>
                      <Text className='font-semibold text-text-primary'>
                        AI Calorie Tracker
                      </Text>
                      <Text className='text-sm text-text-tertiary'>
                        Smart nutrition tracking made easy
                      </Text>
                    </View>
                  </Animated.View>

                  <Animated.View
                    entering={FadeInUp.delay(800).duration(800)}
                    className='bg-dark-800/80 flex-row items-center rounded-2xl p-4'
                  >
                    <View className='mr-4 h-12 w-12 items-center justify-center rounded-full bg-purple-500/20'>
                      <Ionicons name='trophy' size={24} color='#8B5CF6' />
                    </View>
                    <View className='flex-1'>
                      <Text className='font-semibold text-text-primary'>
                        Daily Challenges
                      </Text>
                      <Text className='text-sm text-text-tertiary'>
                        Complete tasks and track progress
                      </Text>
                    </View>
                  </Animated.View>
                </View>
              </View>

              {/* Bottom Section - CTAs */}
              <Animated.View
                entering={FadeInUp.delay(1000).duration(800)}
                className='space-y-4'
              >
                <Button
                  variant='solid'
                  action='primary'
                  size='lg'
                  onPress={handleGetStarted}
                  className='w-full'
                >
                  <ButtonText className='font-semibold'>Get Started</ButtonText>
                  <Ionicons
                    name='arrow-forward'
                    size={20}
                    color='white'
                    style={{ marginLeft: 8 }}
                  />
                </Button>

                <TouchableOpacity onPress={handleSignIn} className='py-4'>
                  <Text className='text-center text-text-secondary'>
                    Already have an account?{' '}
                    <Text className='font-semibold text-brand-primary'>
                      Sign In
                    </Text>
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}
