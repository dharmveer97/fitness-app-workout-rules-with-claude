import React, { useState, forwardRef } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import Text from './Text';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
  inputClassName?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'phone';
}

const variantStyles = {
  default: 'bg-dark-800 border border-dark-700',
  filled: 'bg-dark-700 border border-transparent',
  outline: 'bg-transparent border-2 border-dark-600',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
};

const focusStyles = {
  default: 'focus:border-primary-500',
  filled: 'focus:border-primary-500',
  outline: 'focus:border-primary-500',
};

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onRightIconPress,
      variant = 'default',
      size = 'md',
      containerClassName = '',
      inputClassName = '',
      type = 'text',
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    const animatedValue = new Animated.Value(0);

    const handleFocus = () => {
      setIsFocused(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      props.onFocus?.(null as any);
    };

    const handleBlur = () => {
      setIsFocused(false);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      props.onBlur?.(null as any);
    };

    const getKeyboardType = () => {
      switch (type) {
        case 'email':
          return 'email-address';
        case 'number':
          return 'numeric';
        case 'phone':
          return 'phone-pad';
        default:
          return 'default';
      }
    };

    const inputClass = cn(
      'text-white rounded-xl',
      variantStyles[variant],
      sizeStyles[size],
      isFocused && focusStyles[variant],
      error && 'border-red-500',
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      inputClassName
    );

    const borderColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: error ? ['#EF4444', '#EF4444'] : ['#374151', '#10B981'],
    });

    return (
      <View className={cn('w-full', containerClassName)}>
        {label && (
          <Text variant="label" color="gray" className="mb-2">
            {label}
          </Text>
        )}
        
        <Animated.View
          style={{
            borderColor: isFocused ? borderColor : undefined,
          }}
          className="relative"
        >
          {leftIcon && (
            <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
              <Ionicons
                name={leftIcon}
                size={20}
                color={isFocused ? '#10B981' : '#9CA3AF'}
              />
            </View>
          )}
          
          <TextInput
            ref={ref}
            className={inputClass}
            placeholderTextColor="#6B7280"
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType={getKeyboardType()}
            secureTextEntry={type === 'password' ? isSecure : false}
            autoCapitalize={type === 'email' ? 'none' : props.autoCapitalize}
            {...props}
          />
          
          {(rightIcon || type === 'password') && (
            <TouchableOpacity
              onPress={() => {
                if (type === 'password') {
                  setIsSecure(!isSecure);
                }
                onRightIconPress?.();
              }}
              className="absolute right-3 top-0 bottom-0 justify-center z-10"
            >
              <Ionicons
                name={
                  type === 'password'
                    ? isSecure
                      ? 'eye-off'
                      : 'eye'
                    : rightIcon!
                }
                size={20}
                color={isFocused ? '#10B981' : '#9CA3AF'}
              />
            </TouchableOpacity>
          )}
        </Animated.View>
        
        {hint && !error && (
          <Text variant="caption" color="gray" className="mt-1">
            {hint}
          </Text>
        )}
        
        {error && (
          <Text variant="caption" color="error" className="mt-1">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

export default Input;