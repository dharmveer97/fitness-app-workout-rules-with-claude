import React from 'react'

import { TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated'

import { Text } from '@/components/ui/text'
import { cn } from '@/utils/cn'

import { useTheme } from './ThemeProvider'

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'select'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export function ThemeToggle({
  variant = 'icon',
  size = 'md',
  showLabel = false,
  className = '',
}: ThemeToggleProps) {
  const { theme, setTheme, isDark, resolvedTheme } = useTheme()

  const scale = useSharedValue(1)
  const rotation = useSharedValue(isDark ? 180 : 0)
  const switchPosition = useSharedValue(isDark ? 1 : 0)

  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24
  const buttonSize =
    size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12'

  const handleThemeToggle = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)

    // Trigger animations
    scale.value = withSpring(0.9, { damping: 10, stiffness: 200 }, () => {
      scale.value = withSpring(1, { damping: 10, stiffness: 200 })
    })

    rotation.value = withTiming(isDark ? 0 : 180, { duration: 300 })
    switchPosition.value = withTiming(isDark ? 0 : 1, { duration: 300 })
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }))

  const switchAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      switchPosition.value,
      [0, 1],
      [2, 26], // Switch thumb position
    )

    return {
      transform: [{ translateX }],
    }
  })

  const switchTrackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(switchPosition.value, [0, 1], [0, 1])

    return {
      backgroundColor: backgroundColor === 1 ? '#10B981' : '#E2E8F0',
    }
  })

  if (variant === 'switch') {
    return (
      <View className={cn('flex-row items-center space-x-3', className)}>
        {showLabel && (
          <Text className='text-secondary text-sm font-medium'>
            {resolvedTheme === 'dark' ? 'Dark' : 'Light'} Mode
          </Text>
        )}
        <TouchableOpacity
          onPress={handleThemeToggle}
          activeOpacity={0.7}
          className='relative'
        >
          <Animated.View
            style={switchTrackStyle}
            className='border-primary h-6 w-12 rounded-full border'
          />
          <Animated.View
            style={switchAnimatedStyle}
            className='surface-primary absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm'
          >
            <View className='flex-1 items-center justify-center'>
              <Ionicons
                name={isDark ? 'moon' : 'sunny'}
                size={12}
                color={isDark ? '#64748B' : '#F59E0B'}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }

  if (variant === 'select') {
    return (
      <View
        className={cn(
          'flex-row rounded-lg bg-surface-secondary p-1',
          className,
        )}
      >
        {(['light', 'system', 'dark'] as const).map((themeOption) => (
          <TouchableOpacity
            key={themeOption}
            onPress={() => setTheme(themeOption)}
            className={cn(
              'flex-1 rounded-md px-3 py-2',
              theme === themeOption && 'bg-surface-primary shadow-sm',
            )}
          >
            <View className='flex-row items-center justify-center space-x-2'>
              <Ionicons
                name={
                  themeOption === 'light'
                    ? 'sunny'
                    : themeOption === 'dark'
                      ? 'moon'
                      : 'phone-portrait'
                }
                size={16}
                color={theme === themeOption ? '#10B981' : '#64748B'}
              />
              {showLabel && (
                <Text
                  className={cn(
                    'text-xs font-medium capitalize',
                    theme === themeOption ? 'text-brand' : 'text-tertiary',
                  )}
                >
                  {themeOption}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  // Default icon variant
  return (
    <AnimatedTouchable
      style={animatedStyle}
      onPress={handleThemeToggle}
      className={cn(
        'border-primary items-center justify-center rounded-full border bg-surface-secondary',
        buttonSize,
        className,
      )}
      activeOpacity={0.8}
    >
      <Ionicons
        name={isDark ? 'moon' : 'sunny'}
        size={iconSize}
        color={isDark ? '#64748B' : '#F59E0B'}
      />
    </AnimatedTouchable>
  )
}

// Preset theme toggle buttons for common use cases
export function HeaderThemeToggle() {
  return <ThemeToggle variant='icon' size='md' className='mr-2' />
}

export function SettingsThemeToggle() {
  return <ThemeToggle variant='select' showLabel className='w-full' />
}

export function QuickThemeSwitch() {
  return <ThemeToggle variant='switch' showLabel size='sm' />
}
