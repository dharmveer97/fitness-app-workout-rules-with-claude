import React, { useState, useEffect } from 'react'

import { TouchableOpacity } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons } from '@expo/vector-icons'
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { View, Text } from '@/components/Themed'

const motivationalQuotes = [
  {
    text: 'Success is the sum of small efforts repeated day in and day out.',
    author: 'Robert Collier',
    category: 'persistence',
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    author: 'John',
    category: 'fitness',
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: 'Jim Rohn',
    category: 'health',
  },
  {
    text: "A year from now, you'll wish you had started today.",
    author: 'Karen Lamb',
    category: 'motivation',
  },
  {
    text: 'The body achieves what the mind believes.',
    author: 'Napoleon Hill',
    category: 'mindset',
  },
  {
    text: "Don't limit your challenges. Challenge your limits.",
    author: 'Jerry Dunn',
    category: 'growth',
  },
  {
    text: "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
    author: 'Rikki Rogers',
    category: 'strength',
  },
  {
    text: 'The pain you feel today will be the strength you feel tomorrow.',
    author: 'Arnold Schwarzenegger',
    category: 'fitness',
  },
  {
    text: 'Every workout is progress.',
    author: 'Unknown',
    category: 'progress',
  },
  {
    text: 'Your health is an investment, not an expense.',
    author: 'Unknown',
    category: 'health',
  },
]

const gradientColors = [
  ['#667eea', '#764ba2'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140'],
  ['#30cfd0', '#330867'],
  ['#a8edea', '#fed6e3'],
  ['#ff9a9e', '#fecfef'],
]

interface DailyQuoteProps {
  onShare?: (quote: any) => void
}

export default function DailyQuote({ onShare }: DailyQuoteProps) {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0])
  const [gradientIndex, setGradientIndex] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)

  useEffect(() => {
    // Get today's quote based on date
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24,
    )
    const quoteIndex = dayOfYear % motivationalQuotes.length
    const gradIndex = dayOfYear % gradientColors.length

    setCurrentQuote(motivationalQuotes[quoteIndex])
    setGradientIndex(gradIndex)
  }, [])

  const handleRefresh = () => {
    rotation.value = withSpring(rotation.value + 360)

    // Get random quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    const randomGradient = Math.floor(Math.random() * gradientColors.length)

    setCurrentQuote(motivationalQuotes[randomIndex])
    setGradientIndex(randomGradient)
  }

  const handleBookmark = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1)
    })
    setIsBookmarked(!isBookmarked)
  }

  const handleShareQuote = () => {
    if (onShare) {
      onShare(currentQuote)
    }
  }

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const animatedBookmarkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(800)}
      className='mb-6'
    >
      <View className='mb-4 flex-row items-center justify-between'>
        <View>
          <Text className='text-primary text-2xl font-bold'>
            🌅 Daily Motivation
          </Text>
          <Text className='text-secondary mt-1 text-sm'>
            Fuel your fitness journey
          </Text>
        </View>
        <View className='flex-row gap-2'>
          <TouchableOpacity
            onPress={handleRefresh}
            className='rounded-2xl bg-surface-primary p-3'
            style={{
              shadowColor: '#10B981',
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Animated.View style={animatedIconStyle}>
              <Ionicons
                name='refresh'
                size={20}
                color='rgb(var(--text-brand))'
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            className='rounded-2xl bg-purple-500/10 p-3'
            onPress={() => {
              //
            }}
          >
            <Ionicons name='heart-outline' size={20} color='#8B5CF6' />
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient
        colors={gradientColors[gradientIndex] as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 24,
          padding: 3,
          shadowColor: gradientColors[gradientIndex][0],
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <View className='overflow-hidden rounded-[21px] bg-surface-secondary'>
          <LinearGradient
            colors={['rgba(255,255,255,0.05)', 'transparent']}
            style={{ padding: 24 }}
          >
            {/* Quote Header */}
            <View className='mb-6 flex-row items-center justify-between'>
              <View className='flex-row items-center'>
                <View
                  className='mr-3 h-12 w-12 items-center justify-center rounded-2xl shadow-lg'
                  style={{
                    backgroundColor: gradientColors[gradientIndex][0],
                    shadowColor: gradientColors[gradientIndex][0],
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                  }}
                >
                  <Ionicons name='sunny' size={24} color='white' />
                </View>
                <View>
                  <Text className='text-lg font-bold text-white'>
                    Today's Inspiration
                  </Text>
                  <Text className='text-sm text-white/70'>
                    Keep pushing forward
                  </Text>
                </View>
              </View>

              <View className='rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm'>
                <Text className='text-xs font-bold text-white'>
                  #{currentQuote.category}
                </Text>
              </View>
            </View>

            {/* Enhanced Quote Display */}
            <View className='mb-8'>
              <View className='rounded-2xl bg-black/20 p-6 backdrop-blur-lg'>
                <Ionicons
                  name='chatbubble-ellipses-outline'
                  size={32}
                  color='rgba(255,255,255,0.4)'
                  style={{ marginBottom: 16, alignSelf: 'flex-start' }}
                />
                <Text className='mb-4 text-2xl font-bold leading-relaxed text-white'>
                  {currentQuote.text}
                </Text>
                <View className='flex-row items-center'>
                  <View className='mr-3 h-1 w-12 rounded-full bg-white/30' />
                  <Text className='text-lg font-semibold text-white/80'>
                    {currentQuote.author}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className='flex-row items-center justify-center'>
              <View
                className='flex-row rounded-2xl bg-white/10 p-2 backdrop-blur-sm'
                style={{ gap: 8 }}
              >
                <TouchableOpacity
                  onPress={handleBookmark}
                  className='rounded-xl bg-white/10 p-3'
                  style={{
                    shadowColor: isBookmarked
                      ? gradientColors[gradientIndex][0]
                      : 'transparent',
                    shadowOpacity: 0.4,
                    shadowRadius: 6,
                  }}
                >
                  <Animated.View style={animatedBookmarkStyle}>
                    <Ionicons
                      name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                      size={20}
                      color={
                        isBookmarked
                          ? gradientColors[gradientIndex][0]
                          : 'white'
                      }
                    />
                  </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleShareQuote}
                  className='rounded-xl bg-white/10 p-3'
                >
                  <Ionicons
                    name='share-social-outline'
                    size={20}
                    color='white'
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  className='rounded-xl bg-white/10 p-3'
                  onPress={() => {}}
                >
                  <Ionicons name='copy-outline' size={20} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                  className='rounded-xl bg-white/20 px-4 py-3'
                  onPress={() => {
                    // Save to collection functionality
                    console.log('Saving to collection:', currentQuote)
                    // In a real app, you would save this to local storage or backend
                  }}
                >
                  <View className='flex-row items-center' style={{ gap: 6 }}>
                    <Ionicons name='library-outline' size={18} color='white' />
                    <Text className='text-xs font-bold text-white'>SAVE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Mood Tracker */}
            <View className='mt-6 rounded-2xl bg-black/20 p-4 backdrop-blur-sm'>
              <Text className='mb-3 text-center font-semibold text-white'>
                How does this make you feel?
              </Text>
              <View className='flex-row justify-center gap-4'>
                {['😊', '😄', '🤩', '💪', '❤️'].map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    className='h-12 w-12 items-center justify-center rounded-2xl bg-white/10'
                    onPress={() => {}}
                  >
                    <Text className='text-2xl'>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </Animated.View>
  )
}
