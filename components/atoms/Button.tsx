import React from 'react'

import {
  TouchableOpacity,
  ActivityIndicator,
  type TouchableOpacityProps,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated'

import { cn } from '@/utils/cn'

import Text from './Text'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: keyof typeof Ionicons.glyphMap
  rightIcon?: keyof typeof Ionicons.glyphMap
  children?: React.ReactNode
  className?: string
  textClassName?: string
  animate?: boolean
}

const variantStyles = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-secondary-500 active:bg-secondary-600',
  outline: 'bg-transparent border-2 border-primary-500',
  ghost: 'bg-transparent',
  danger: 'bg-red-500 active:bg-red-600',
}

const sizeStyles = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
  xl: 'px-8 py-5',
}

const textSizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  textClassName = '',
  disabled,
  animate = true,
  onPress,
  ...props
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    if (animate && !disabled && !loading) {
      scale.value = withSpring(0.95, { damping: 10, stiffness: 400 })
    }
  }

  const handlePressOut = () => {
    if (animate && !disabled && !loading) {
      scale.value = withSpring(1, { damping: 10, stiffness: 400 })
    }
  }

  const handlePress = (e: any) => {
    if (!disabled && !loading && onPress) {
      if (animate) {
        scale.value = withSequence(
          withSpring(0.95, { damping: 10, stiffness: 400 }),
          withSpring(1, { damping: 10, stiffness: 400 }),
        )
      }
      onPress(e)
    }
  }

  const buttonClass = cn(
    'flex-row items-center justify-center rounded-xl',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50',
    className,
  )

  const textColor =
    variant === 'outline' || variant === 'ghost' ? 'primary' : 'white'

  const iconColor =
    variant === 'outline' || variant === 'ghost' ? '#10B981' : '#FFFFFF'

  const iconSize =
    size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28

  return (
    <AnimatedTouchable
      className={buttonClass}
      disabled={disabled || loading}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animate ? animatedStyle : undefined}
      activeOpacity={animate ? 1 : 0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} size='small' />
      ) : (
        <>
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={iconSize}
              color={iconColor}
              style={{ marginRight: 8 }}
            />
          )}
          {typeof children === 'string' ? (
            <Text
              color={textColor}
              className={cn(
                textSizeStyles[size],
                'font-semibold',
                textClassName,
              )}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {rightIcon && (
            <Ionicons
              name={rightIcon}
              size={iconSize}
              color={iconColor}
              style={{ marginLeft: 8 }}
            />
          )}
        </>
      )}
    </AnimatedTouchable>
  )
}

export default Button
