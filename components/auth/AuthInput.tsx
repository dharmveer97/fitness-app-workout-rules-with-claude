import React, { useState } from 'react'

import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

// AuthInputProps is globally available from /types/components.d.ts

export default function AuthInput({
  label,
  error,
  touched,
  isPassword = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...textInputProps
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const focusAnimation = useSharedValue(0)
  const errorAnimation = useSharedValue(0)

  React.useEffect(() => {
    focusAnimation.value = withSpring(isFocused ? 1 : 0)
  }, [isFocused])

  React.useEffect(() => {
    errorAnimation.value = withSpring(touched && error ? 1 : 0)
  }, [touched, error])

  const animatedBorderStyle = useAnimatedStyle(() => {
    const borderColor =
      errorAnimation.value > 0
        ? '#EF4444' // red-500
        : focusAnimation.value > 0
          ? '#10B981' // primary-500
          : '#27272A' // dark-600

    return {
      borderColor,
      borderWidth: focusAnimation.value > 0 ? 2 : 1,
    }
  })

  const animatedLabelStyle = useAnimatedStyle(() => {
    const color =
      errorAnimation.value > 0
        ? '#EF4444'
        : focusAnimation.value > 0
          ? '#10B981'
          : '#A1A1AA'

    return {
      color,
    }
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View className='mb-4'>
      <Animated.Text
        style={animatedLabelStyle}
        className='mb-2 text-sm font-medium'
      >
        {label}
      </Animated.Text>

      <Animated.View
        style={animatedBorderStyle}
        className='bg-dark-700 flex-row items-center rounded-xl px-4 py-4'
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? '#10B981' : '#71717A'}
            style={{ marginRight: 12 }}
          />
        )}

        <TextInput
          {...textInputProps}
          secureTextEntry={isPassword && !showPassword}
          onFocus={(e) => {
            setIsFocused(true)
            textInputProps.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            textInputProps.onBlur?.(e)
          }}
          className='flex-1 text-base text-white'
          placeholderTextColor='#71717A'
          selectionColor='#10B981'
        />

        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className='ml-3'
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color='#71717A'
            />
          </TouchableOpacity>
        )}

        {rightIcon && !isPassword && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className='ml-3'
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={rightIcon} size={20} color='#71717A' />
          </TouchableOpacity>
        )}
      </Animated.View>

      {touched && error && (
        <Animated.View
          style={{
            opacity: errorAnimation,
            transform: [{ translateY: errorAnimation.value > 0 ? 0 : -10 }],
          }}
        >
          <View className='mt-2 flex-row items-center'>
            <Ionicons name='alert-circle' size={16} color='#EF4444' />
            <Text className='ml-1 flex-1 text-sm text-red-500'>{error}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  )
}
