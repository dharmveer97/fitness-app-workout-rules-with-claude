import React, { useEffect } from 'react'

import { TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated'

// Import themed components for proper dark/light mode
import { View, Text, useThemeColor } from '@/components/Themed'
// Types are now globally available from /types/components.d.ts

export default function StatsCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon,
  color,
  trend,
  onPress,
  delay = 0,
}: StatsCardPropsExtended) {
  // Get theme-aware colors
  const borderColor = useThemeColor(
    { light: '#E8ECF0', dark: '#30363D' },
    'text',
  )
  const successColor = useThemeColor(
    { light: '#06D6A0', dark: '#7CE38B' },
    'text',
  )
  const errorColor = useThemeColor(
    { light: '#FF3B30', dark: '#FF7B72' },
    'text',
  )
  const tertiaryColor = useThemeColor(
    { light: '#9AA5B1', dark: '#6E7681' },
    'text',
  )
  const primaryTextColor = useThemeColor({}, 'text')
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)
  const slideY = useSharedValue(50)
  const countValue = useSharedValue(0)

  useEffect(() => {
    // Entrance animation
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 })
      opacity.value = withSpring(1)
      slideY.value = withSpring(0)

      // Animate the number counting if it's a number
      if (typeof value === 'number') {
        countValue.value = withSpring(value, { damping: 15, stiffness: 80 })
      }
    }, delay)
  }, [value, delay])

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: slideY.value }],
    opacity: opacity.value,
  }))

  const animatedNumberStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.95)
  }

  const handlePressOut = () => {
    scale.value = withSequence(
      withSpring(1.05, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 12, stiffness: 100 }),
    )
  }

  const getTrendIcon = () => {
    if (trend === 'up') return 'arrow-up'
    if (trend === 'down') return 'arrow-down'
    return 'minus'
  }

  const getTrendColor = () => {
    if (trend === 'up') return successColor
    if (trend === 'down') return errorColor
    return tertiaryColor
  }

  const formatValue = () => {
    if (typeof value === 'number' && countValue.value) {
      const animatedValue = Math.round(countValue.value)
      return animatedValue.toLocaleString()
    }
    return value.toString()
  }

  return (
    <Animated.View style={cardAnimatedStyle}>
      <View
        lightColor='#FAFBFC'
        darkColor='#161B22'
        className='rounded-2xl border p-4'
        style={{ borderColor }}
      >
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          disabled={!onPress}
          className='w-full'
        >
          <View
            lightColor='transparent'
            darkColor='transparent'
            className='mb-3 flex-row items-center justify-between'
          >
            <View
              lightColor='transparent'
              darkColor='transparent'
              className='h-10 w-10 items-center justify-center rounded-xl'
              style={{ backgroundColor: `${color}20` }}
            >
              <FontAwesome name={icon as any} size={20} color={color} />
            </View>

            {change !== undefined && (
              <View
                lightColor='transparent'
                darkColor='transparent'
                className='flex-row items-center space-x-1'
              >
                <FontAwesome
                  name={getTrendIcon()}
                  size={12}
                  color={getTrendColor()}
                />
                <Text
                  className='text-xs font-semibold'
                  style={{ color: getTrendColor() }}
                >
                  {Math.abs(Number(change))}%
                </Text>
              </View>
            )}
          </View>

          <View
            lightColor='transparent'
            darkColor='transparent'
            className='space-y-1'
          >
            <Text
              className='text-sm font-medium'
              lightColor='#677788'
              darkColor='#8B949E'
            >
              {title}
            </Text>

            <View
              lightColor='transparent'
              darkColor='transparent'
              className='flex-row items-baseline space-x-1'
            >
              <Animated.Text
                className='text-2xl font-bold'
                style={[animatedNumberStyle, { color: primaryTextColor }]}
              >
                {formatValue()}
              </Animated.Text>
              {unit && (
                <Text
                  className='text-sm font-medium'
                  lightColor='#677788'
                  darkColor='#8B949E'
                >
                  {unit}
                </Text>
              )}
            </View>

            {changeLabel && (
              <Text
                className='text-xs'
                lightColor='#9AA5B1'
                darkColor='#6E7681'
              >
                {changeLabel}
              </Text>
            )}
          </View>

          {/* Subtle gradient overlay */}
          <View
            lightColor='transparent'
            darkColor='transparent'
            className='absolute inset-0 rounded-2xl opacity-5'
            style={{
              backgroundColor: color,
            }}
            pointerEvents='none'
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}
