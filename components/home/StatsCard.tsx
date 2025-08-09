import React, { useEffect } from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  withSequence,
} from 'react-native-reanimated'
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

  const pressInStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * 0.95 }],
  }))

  const animatedNumberStyle = useAnimatedStyle(() => {
    const displayValue =
      typeof value === 'number'
        ? interpolate(countValue.value, [0, value], [0, value])
        : 0

    return {
      opacity: opacity.value,
    }
  })

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
    if (trend === 'up') return '#10B981'
    if (trend === 'down') return '#EF4444'
    return '#6B7280'
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
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        disabled={!onPress}
        className='rounded-2xl border border-gray-800/50 bg-[#18181B] p-4'
      >
        <View className='mb-3 flex-row items-center justify-between'>
          <View
            className='h-10 w-10 items-center justify-center rounded-xl'
            style={{ backgroundColor: `${color}20` }}
          >
            <FontAwesome name={icon as any} size={20} color={color} />
          </View>

          {change !== undefined && (
            <View className='flex-row items-center space-x-1'>
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

        <View className='space-y-1'>
          <Text className='text-sm font-medium text-gray-400'>{title}</Text>

          <Animated.View className='flex-row items-baseline space-x-1'>
            <Animated.Text
              className='text-2xl font-bold text-white'
              style={animatedNumberStyle}
            >
              {formatValue()}
            </Animated.Text>
            {unit && (
              <Text className='text-sm font-medium text-gray-400'>{unit}</Text>
            )}
          </Animated.View>

          {changeLabel && (
            <Text className='text-xs text-gray-500'>{changeLabel}</Text>
          )}
        </View>

        {/* Subtle gradient overlay */}
        <View
          className='absolute inset-0 rounded-2xl opacity-5'
          style={{
            backgroundColor: color,
          }}
          pointerEvents='none'
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
