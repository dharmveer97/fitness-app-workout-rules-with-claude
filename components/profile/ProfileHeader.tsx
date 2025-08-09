import React, { useEffect } from 'react'

import { View, Text, Image, TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
// ProfileHeaderProps is globally available from /types/components.d.ts

export default function ProfileHeader({
  profile,
  onEditPress,
  onAvatarPress,
}: ProfileHeaderProps) {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 100 })
    opacity.value = withSpring(1)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const formatJoinDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    }
    return profile.joinDate.toLocaleDateString('en-US', options)
  }

  const getFitnessLevelColor = () => {
    switch (profile.fitnessLevel) {
      case 'beginner':
        return '#10B981' // Green
      case 'intermediate':
        return '#F59E0B' // Yellow
      case 'advanced':
        return '#EF4444' // Red
      default:
        return '#6B7280' // Gray
    }
  }

  const getFitnessLevelIcon = () => {
    switch (profile.fitnessLevel) {
      case 'beginner':
        return 'leaf'
      case 'intermediate':
        return 'fire'
      case 'advanced':
        return 'trophy'
      default:
        return 'circle'
    }
  }

  return (
    <Animated.View
      className='rounded-2xl border border-gray-800/50 bg-[#18181B] p-6'
      style={animatedStyle}
    >
      {/* Header with edit button */}
      <View className='mb-6 flex-row items-center justify-between'>
        <Text className='text-xl font-bold text-white'>Profile</Text>
        {onEditPress && (
          <TouchableOpacity
            onPress={onEditPress}
            className='rounded-full bg-gray-800 p-2'
          >
            <FontAwesome name='edit' size={16} color='#10B981' />
          </TouchableOpacity>
        )}
      </View>

      {/* Avatar and basic info */}
      <View className='mb-6 flex-row items-center'>
        <TouchableOpacity onPress={onAvatarPress} disabled={!onAvatarPress}>
          <View className='relative'>
            {profile.avatar ? (
              <Image
                source={{ uri: profile.avatar }}
                className='h-20 w-20 rounded-full'
              />
            ) : (
              <View className='h-20 w-20 items-center justify-center rounded-full bg-gray-700'>
                <FontAwesome name='user' size={32} color='#9CA3AF' />
              </View>
            )}

            {/* Online indicator */}
            <View className='absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#18181B] bg-[#10B981]' />

            {/* Camera icon overlay if avatar can be changed */}
            {onAvatarPress && (
              <View className='absolute inset-0 items-center justify-center rounded-full bg-black/30'>
                <FontAwesome name='camera' size={20} color='white' />
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View className='ml-4 flex-1'>
          <Text className='mb-1 text-2xl font-bold text-white'>
            {profile.name}
          </Text>
          <Text className='mb-2 text-base text-gray-400'>{profile.email}</Text>
          <View className='flex-row items-center space-x-2'>
            <View
              className='flex-row items-center space-x-1 rounded-full px-3 py-1'
              style={{ backgroundColor: `${getFitnessLevelColor()}20` }}
            >
              <FontAwesome
                name={getFitnessLevelIcon()}
                size={12}
                color={getFitnessLevelColor()}
              />
              <Text
                className='text-xs font-semibold capitalize'
                style={{ color: getFitnessLevelColor() }}
              >
                {profile.fitnessLevel}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats row */}
      <View className='mb-6 flex-row justify-between'>
        <View className='flex-1 items-center'>
          <Text className='text-lg font-bold text-white'>
            {profile.goals.weeklyWorkouts}
          </Text>
          <Text className='text-sm text-gray-400'>Weekly Goal</Text>
        </View>

        <View className='mx-4 w-px bg-gray-800' />

        <View className='flex-1 items-center'>
          <Text className='text-lg font-bold text-white'>
            {profile.goals.dailySteps.toLocaleString()}
          </Text>
          <Text className='text-sm text-gray-400'>Daily Steps</Text>
        </View>

        <View className='mx-4 w-px bg-gray-800' />

        <View className='flex-1 items-center'>
          <Text className='text-lg font-bold text-white'>
            {formatJoinDate()}
          </Text>
          <Text className='text-sm text-gray-400'>Member Since</Text>
        </View>
      </View>

      {/* Additional info */}
      <View className='border-t border-gray-800/50 pt-4'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center space-x-2'>
            <FontAwesome name='globe' size={16} color='#6B7280' />
            <Text className='text-sm text-gray-400'>
              {profile.unitSystem === 'metric'
                ? 'Metric System'
                : 'Imperial System'}
            </Text>
          </View>

          {profile.age && (
            <View className='flex-row items-center space-x-2'>
              <FontAwesome name='calendar' size={16} color='#6B7280' />
              <Text className='text-sm text-gray-400'>
                {profile.age} years old
              </Text>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  )
}
