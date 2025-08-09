import React, { useEffect } from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated'
// ActivityItemProps is globally available from /types/components.d.ts

export default function ActivityItem({
  activity,
  onPress,
  delay = 0,
}: ActivityItemProps) {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)
  const slideX = useSharedValue(-50)

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 })
      opacity.value = withSpring(1)
      slideX.value = withSpring(0)
    }, delay)
  }, [delay])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: slideX.value }],
    opacity: opacity.value,
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.95)
  }

  const handlePressOut = () => {
    scale.value = withSequence(
      withSpring(1.02, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 12, stiffness: 100 }),
    )
  }

  const getActivityIcon = () => {
    switch (activity.type) {
      case 'workout':
        return 'heartbeat'
      case 'meal':
        return 'cutlery'
      case 'water':
        return 'tint'
      case 'sleep':
        return 'moon-o'
      case 'steps':
        return 'footprint-o' as any
      case 'weight':
        return 'balance-scale'
      case 'heart_rate':
        return 'heart'
      default:
        return 'circle'
    }
  }

  const getActivityColor = () => {
    switch (activity.type) {
      case 'workout':
        return '#EF4444' // Red
      case 'meal':
        return '#F97316' // Orange
      case 'water':
        return '#3B82F6' // Blue
      case 'sleep':
        return '#8B5CF6' // Purple
      case 'steps':
        return '#10B981' // Green
      case 'weight':
        return '#F59E0B' // Yellow
      case 'heart_rate':
        return '#EC4899' // Pink
      default:
        return '#6B7280' // Gray
    }
  }

  const formatTimestamp = () => {
    const now = new Date()
    const activityTime = new Date(activity.timestamp)
    const diffInMinutes = Math.floor(
      (now.getTime() - activityTime.getTime()) / (1000 * 60),
    )

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return activityTime.toLocaleDateString()
  }

  const formatValue = () => {
    if (activity.value !== undefined) {
      if (activity.type === 'water') {
        return `${activity.value} ${activity.unit ?? 'ml'}`
      }
      if (activity.type === 'steps') {
        return `${activity.value.toLocaleString()} steps`
      }
      if (activity.type === 'weight') {
        return `${activity.value} ${activity.unit ?? 'kg'}`
      }
      return `${activity.value} ${activity.unit ?? ''}`
    }
    return null
  }

  const formatDuration = () => {
    if (activity.duration) {
      const hours = Math.floor(activity.duration / 60)
      const minutes = activity.duration % 60
      if (hours > 0) {
        return `${hours}h ${minutes}m`
      }
      return `${minutes}m`
    }
    return null
  }

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        disabled={!onPress}
        className='mb-3 rounded-xl border border-gray-800/30 bg-[#18181B] p-4'
      >
        <View className='flex-row items-center space-x-3'>
          {/* Activity Icon */}
          <View
            className='h-12 w-12 items-center justify-center rounded-full'
            style={{ backgroundColor: `${getActivityColor()}20` }}
          >
            <FontAwesome
              name={getActivityIcon()}
              size={20}
              color={getActivityColor()}
            />
          </View>

          {/* Activity Details */}
          <View className='flex-1'>
            <View className='mb-1 flex-row items-center justify-between'>
              <Text className='text-base font-semibold text-white'>
                {activity.title}
              </Text>
              <Text className='text-xs text-gray-500'>{formatTimestamp()}</Text>
            </View>

            <View className='flex-row items-center space-x-4'>
              {formatValue() && (
                <Text className='text-sm text-gray-400'>{formatValue()}</Text>
              )}

              {formatDuration() && (
                <Text className='text-sm text-gray-400'>
                  {formatDuration()}
                </Text>
              )}

              {activity.calories && (
                <Text className='text-sm text-orange-400'>
                  {activity.calories} cal
                </Text>
              )}
            </View>

            {activity.description && (
              <Text className='mt-1 text-sm text-gray-500' numberOfLines={2}>
                {activity.description}
              </Text>
            )}
          </View>

          {/* Chevron */}
          {onPress && (
            <FontAwesome name='chevron-right' size={16} color='#6B7280' />
          )}
        </View>

        {/* Subtle accent line */}
        <View
          className='absolute bottom-0 left-0 top-0 w-1 rounded-l-xl'
          style={{ backgroundColor: `${getActivityColor()}40` }}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
