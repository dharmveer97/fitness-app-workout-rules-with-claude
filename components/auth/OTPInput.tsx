import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withSequence,
  withTiming 
} from 'react-native-reanimated';

// Types are now globally available from /types/components.d.ts

const { width } = Dimensions.get('window');
const INPUT_WIDTH = Math.min((width - 80) / 6, 50);

export default function OTPInput({
  length = 6,
  value,
  onChangeText,
  onComplete,
  error,
  autoFocus = true,
}: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<TextInput[]>([]);
  const shakeAnimation = useSharedValue(0);
  
  // Animation values for each input
  const scaleValues = useRef(
    Array.from({ length }, () => useSharedValue(1))
  ).current;
  
  const borderValues = useRef(
    Array.from({ length }, () => useSharedValue(0))
  ).current;

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (error) {
      // Shake animation on error
      shakeAnimation.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error]);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleChangeText = (text: string, index: number) => {
    // Remove non-numeric characters
    const cleanText = text.replace(/[^0-9]/g, '');
    
    if (cleanText.length === 0) {
      // Handle deletion
      const newValue = value.substring(0, index) + value.substring(index + 1);
      onChangeText(newValue);
      
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      }
    } else if (cleanText.length === 1) {
      // Single digit input
      const newValue = value.substring(0, index) + cleanText + value.substring(index + 1);
      onChangeText(newValue);
      
      // Animate the current input
      scaleValues[index].value = withSequence(
        withSpring(1.1, { damping: 15 }),
        withSpring(1, { damping: 15 })
      );
      
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
    } else if (cleanText.length > 1) {
      // Handle paste operation
      const pastedValue = cleanText.slice(0, length);
      onChangeText(pastedValue);
      
      // Focus the next empty field or last field
      const nextIndex = Math.min(pastedValue.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setFocusedIndex(nextIndex);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && value[index] === undefined && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    borderValues[index].value = withSpring(1);
  };

  const handleBlur = (index: number) => {
    borderValues[index].value = withSpring(0);
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeAnimation.value }],
    };
  });

  const getInputAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const isError = !!error;
      const isFocused = focusedIndex === index;
      const hasValue = value[index] !== undefined;
      
      let borderColor = '#27272A'; // dark-600
      if (isError) {
        borderColor = '#EF4444'; // red-500
      } else if (isFocused) {
        borderColor = '#10B981'; // primary-500
      } else if (hasValue) {
        borderColor = '#10B981'; // primary-500
      }

      return {
        transform: [{ scale: scaleValues[index].value }],
        borderColor,
        borderWidth: isFocused || hasValue || isError ? 2 : 1,
        backgroundColor: hasValue ? '#065F46' : '#18181B', // primary-800 : dark-700
      };
    });
  };

  return (
    <View className="items-center">
      <Animated.View 
        style={containerAnimatedStyle}
        className="flex-row justify-center items-center gap-3 mb-2"
      >
        {Array.from({ length }, (_, index) => (
          <Animated.View
            key={index}
            style={[
              getInputAnimatedStyle(index),
              {
                width: INPUT_WIDTH,
                height: INPUT_WIDTH,
              }
            ]}
            className="rounded-xl justify-center items-center"
          >
            <TextInput
              ref={(ref) => {
                if (ref) {
                  inputRefs.current[index] = ref;
                }
              }}
              value={value[index] || ''}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
              onFocus={() => handleFocus(index)}
              onBlur={() => handleBlur(index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              className="text-white text-xl font-bold text-center w-full h-full"
              style={{ textAlign: 'center' }}
              selectionColor="#10B981"
            />
          </Animated.View>
        ))}
      </Animated.View>
      
      {error && (
        <Animated.View className="flex-row items-center justify-center mt-2">
          <Text className="text-red-500 text-sm text-center">{error}</Text>
        </Animated.View>
      )}
    </View>
  );
}

// Helper component for OTP with timer
// OTPWithTimerProps is globally available from /types/components.d.ts

export function OTPWithTimer({
  resendTimer = 60,
  onResend,
  resendText = "Didn't receive code?",
  ...otpProps
}: OTPWithTimerProps) {
  const [timer, setTimer] = useState(resendTimer);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [timer]);

  const handleResend = () => {
    if (canResend && onResend) {
      onResend();
      setTimer(resendTimer);
      setCanResend(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View className="items-center">
      <OTPInput {...otpProps} />
      
      <View className="mt-6 items-center">
        <Text className="text-dark-400 text-sm mb-2">{resendText}</Text>
        {canResend ? (
          <Text 
            className="text-primary-500 text-sm font-semibold"
            onPress={handleResend}
          >
            Resend Code
          </Text>
        ) : (
          <Text className="text-dark-400 text-sm">
            Resend in {formatTime(timer)}
          </Text>
        )}
      </View>
    </View>
  );
}