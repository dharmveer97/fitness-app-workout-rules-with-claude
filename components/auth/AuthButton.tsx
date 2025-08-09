import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// AuthButtonProps is globally available from /types/components.d.ts

export default function AuthButton({
  title,
  loading = false,
  variant = 'primary',
  size = 'large',
  leftIcon,
  rightIcon,
  fullWidth = true,
  disabled,
  onPress,
  ...touchableOpacityProps
}: AuthButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const tapHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: () => {
      scale.value = withSpring(0.95);
      opacity.value = withSpring(0.8);
    },
    onEnd: () => {
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
      if (onPress && !loading && !disabled) {
        runOnJS((event: any) => onPress(event))({});
      }
    },
    onFail: () => {
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
    },
  });

  const getButtonStyles = () => {
    const baseStyles = 'flex-row items-center justify-center rounded-xl';
    const sizeStyles = {
      small: 'px-4 py-2',
      medium: 'px-6 py-3',
      large: 'px-6 py-4',
    };
    const widthStyles = fullWidth ? 'w-full' : '';

    let variantStyles = '';
    switch (variant) {
      case 'primary':
        variantStyles = disabled || loading
          ? 'bg-dark-600'
          : 'bg-primary-500';
        break;
      case 'secondary':
        variantStyles = disabled || loading
          ? 'bg-dark-600'
          : 'bg-dark-700 border border-dark-500';
        break;
      case 'outline':
        variantStyles = disabled || loading
          ? 'border border-dark-600'
          : 'border-2 border-primary-500 bg-transparent';
        break;
    }

    return `${baseStyles} ${sizeStyles[size]} ${widthStyles} ${variantStyles}`;
  };

  const getTextStyles = () => {
    const baseStyles = 'font-semibold';
    const sizeStyles = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };

    let colorStyles = '';
    if (disabled || loading) {
      colorStyles = 'text-dark-400';
    } else {
      switch (variant) {
        case 'primary':
          colorStyles = 'text-white';
          break;
        case 'secondary':
          colorStyles = 'text-white';
          break;
        case 'outline':
          colorStyles = 'text-primary-500';
          break;
      }
    }

    return `${baseStyles} ${sizeStyles[size]} ${colorStyles}`;
  };

  const getIconColor = () => {
    if (disabled || loading) return '#52525B'; // dark-400

    switch (variant) {
      case 'primary':
      case 'secondary':
        return '#FFFFFF';
      case 'outline':
        return '#10B981'; // primary-500
      default:
        return '#FFFFFF';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'medium': return 18;
      case 'large': return 20;
    }
  };

  return (
    <TapGestureHandler onGestureEvent={tapHandler} enabled={!disabled && !loading}>
      <AnimatedTouchableOpacity
        {...touchableOpacityProps}
        style={animatedStyle}
        className={getButtonStyles()}
        activeOpacity={1}
        disabled={disabled || loading}
      >
        {loading ? (
          <>
            <ActivityIndicator
              size="small"
              color={getIconColor()}
              style={{ marginRight: 8 }}
            />
            <Text className={getTextStyles()}>Loading...</Text>
          </>
        ) : (
          <>
            {leftIcon && (
              <Ionicons
                name={leftIcon}
                size={getIconSize()}
                color={getIconColor()}
                style={{ marginRight: 8 }}
              />
            )}
            <Text className={getTextStyles()}>{title}</Text>
            {rightIcon && (
              <Ionicons
                name={rightIcon}
                size={getIconSize()}
                color={getIconColor()}
                style={{ marginLeft: 8 }}
              />
            )}
          </>
        )}
      </AnimatedTouchableOpacity>
    </TapGestureHandler>
  );
}