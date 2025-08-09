import React, { useEffect } from 'react'

import { View, Text, TouchableOpacity, Switch } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated'

// SettingsItemProps is globally available from /types/components.d.ts

export default function SettingsItem({
  icon,
  title,
  subtitle,
  value,
  type = 'navigation',
  color = '#10B981',
  onPress,
  onToggle,
  delay = 0,
  destructive = false,
}: SettingsItemProps) {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)
  const slideX = useSharedValue(-20)

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 })
      opacity.value = withSpring(1)
      slideX.value = withSpring(0)
    }, delay)
  }, [delay, scale, opacity, slideX])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: slideX.value }],
    opacity: opacity.value,
  }))

  const handlePressIn = () => {
    if (type !== 'switch') {
      scale.value = withSpring(0.95)
    }
  }

  const handlePressOut = () => {
    if (type !== 'switch') {
      scale.value = withSequence(
        withSpring(1.02, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 100 }),
      )
    }
  }

  const getIconColor = () => {
    if (destructive) return '#EF4444'
    return color
  }

  const getTitleColor = () => {
    if (destructive) return '#EF4444'
    return '#FFFFFF'
  }

  const renderRightContent = () => {
    switch (type) {
      case 'switch':
        return (
          <Switch
            value={value as boolean}
            onValueChange={onToggle}
            trackColor={{ false: '#374151', true: `${color}40` }}
            thumbColor={value ? color : '#9CA3AF'}
            ios_backgroundColor='#374151'
          />
        )

      case 'value':
        return (
          <View className='flex-row items-center space-x-2'>
            <Text className='text-base text-gray-400'>{value}</Text>
            <FontAwesome name='chevron-right' size={16} color='#6B7280' />
          </View>
        )

      case 'action':
        return null

      default:
        return <FontAwesome name='chevron-right' size={16} color='#6B7280' />
    }
  }

  const isInteractive = type !== 'switch' && (onPress ?? onToggle)

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={type === 'switch' ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={isInteractive ? 0.9 : 1}
        disabled={!isInteractive}
        className='mb-3 rounded-xl border border-gray-800/30 bg-[#18181B] p-4'
      >
        <View className='flex-row items-center space-x-4'>
          {/* Icon */}
          <View
            className='h-10 w-10 items-center justify-center rounded-xl'
            style={{ backgroundColor: `${getIconColor()}20` }}
          >
            <FontAwesome name={icon as any} size={18} color={getIconColor()} />
          </View>

          {/* Content */}
          <View className='flex-1'>
            <Text
              className='mb-1 text-base font-semibold'
              style={{ color: getTitleColor() }}
            >
              {title}
            </Text>
            {subtitle && (
              <Text className='text-sm text-gray-400' numberOfLines={2}>
                {subtitle}
              </Text>
            )}
          </View>

          {/* Right content */}
          {renderRightContent()}
        </View>

        {/* Switch overlay for toggle items */}
        {type === 'switch' && (
          <TouchableOpacity
            onPress={() => onToggle?.(!value)}
            className='absolute inset-0 rounded-xl'
            activeOpacity={0.9}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}
