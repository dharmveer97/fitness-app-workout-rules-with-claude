import React, { useEffect } from 'react'

import { Text, TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated'

// QuickActionButtonProps is globally available from /types/components.d.ts

export default function QuickActionButton({
  title,
  icon,
  color = '#10B981',
  onPress,
  delay = 0,
  variant = 'primary',
}: QuickActionButtonProps) {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)
  const rotate = useSharedValue(-5)

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 })
      opacity.value = withSpring(1)
      rotate.value = withSpring(0)
    }, delay)
  }, [delay])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.92)
    rotate.value = withSpring(-1)
  }

  const handlePressOut = () => {
    scale.value = withSequence(
      withSpring(1.08, { damping: 6, stiffness: 200 }),
      withSpring(1, { damping: 12, stiffness: 100 }),
    )
    rotate.value = withSpring(0)
  }

  const getBackgroundStyle = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: color,
      }
    }
    return {
      backgroundColor: '#18181B',
      borderWidth: 1,
      borderColor: `${color}40`,
    }
  }

  const getTextColor = () => (variant === 'primary' ? '#FFFFFF' : color)

  const getIconColor = () => (variant === 'primary' ? '#FFFFFF' : color)

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        className='min-h-[100px] flex-1 items-center justify-center rounded-2xl p-4'
        style={getBackgroundStyle()}
      >
        {/* Icon */}
        <Animated.View
          className='mb-3 h-12 w-12 items-center justify-center rounded-full'
          style={{
            backgroundColor:
              variant === 'primary' ? 'rgba(255,255,255,0.2)' : `${color}20`,
          }}
        >
          <FontAwesome name={icon as any} size={22} color={getIconColor()} />
        </Animated.View>

        {/* Title */}
        <Text
          className='text-center text-base font-semibold'
          style={{ color: getTextColor() }}
        >
          {title}
        </Text>

        {/* Subtle gradient overlay for primary variant */}
        {variant === 'primary' && (
          <Animated.View
            className='absolute inset-0 rounded-2xl opacity-20'
            style={{
              backgroundColor: 'transparent',
            }}
            pointerEvents='none'
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}
