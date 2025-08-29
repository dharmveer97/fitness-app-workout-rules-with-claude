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
      <View className='mb-3 flex-row items-center justify-between'>
        <Text className='text-primary text-xl font-bold'> vation</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Animated.View style={animatedIconStyle}>
            <Ionicons name='refresh' size={22} color='rgb(var(--text-brand))' />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={gradientColors[gradientIndex] as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          padding: 1,
        }}
      >
        <View className='rounded-[19px] bg-surface-secondary p-6'>
          <View className='mb-4'>
            <Ionicons
              name='sunny'
              size={28}
              color={gradientColors[gradientIndex][0]}
              style={{ marginBottom: 12 }}
            />
            <Text className='text-primary mb-3 text-lg font-medium leading-relaxed'>
              "{currentQuote.text}"
            </Text>
            <Text className='text-secondary text-sm'>
              — {currentQuote.author}
            </Text>
          </View>

          <View className='border-primary flex-row items-center justify-between border-t pt-4'>
            <View className='flex-row space-x-2'>
              <TouchableOpacity
                onPress={handleBookmark}
                className='rounded-full bg-surface-primary p-2'
              >
                <Animated.View style={animatedBookmarkStyle}>
                  <Ionicons
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={
                      isBookmarked
                        ? gradientColors[gradientIndex][0]
                        : 'rgb(var(--text-secondary))'
                    }
                  />
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleShareQuote}
                className='rounded-full bg-surface-primary p-2'
              >
                <Ionicons
                  name='share-social-outline'
                  size={20}
                  color='rgb(var(--text-secondary))'
                />
              </TouchableOpacity>
            </View>

            <View
              className='rounded-full px-3 py-1'
              style={{
                backgroundColor: `${gradientColors[gradientIndex][0]}20`,
              }}
            >
              <Text
                className='text-xs font-medium'
                style={{ color: gradientColors[gradientIndex][0] }}
              >
                #{currentQuote.category}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  )
}
