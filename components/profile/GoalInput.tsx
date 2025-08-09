import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

// GoalInputProps is globally available from /types/components.d.ts

export default function GoalInput({
  icon,
  label,
  value,
  unit,
  min = 0,
  max = 99999,
  step = 1,
  color = '#10B981',
  onValueChange,
  delay = 0,
  suggestions = [],
}: GoalInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());
  const [isFocused, setIsFocused] = useState(false);
  
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const slideY = useSharedValue(20);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });
      opacity.value = withSpring(1);
      slideY.value = withSpring(0);
    }, delay);
  }, [delay]);

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: slideY.value },
      ],
      opacity: opacity.value,
    };
  });

  const handleInputChange = (text: string) => {
    const numericValue = parseInt(text, 10);
    setInputValue(text);
    
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onValueChange(numericValue);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    const numericValue = parseInt(inputValue, 10);
    
    if (isNaN(numericValue) || numericValue < min) {
      setInputValue(min.toString());
      onValueChange(min);
    } else if (numericValue > max) {
      setInputValue(max.toString());
      onValueChange(max);
    } else {
      setInputValue(numericValue.toString());
      onValueChange(numericValue);
    }
  };

  const adjustValue = (increment: boolean) => {
    const currentValue = parseInt(inputValue, 10) || 0;
    const newValue = increment ? currentValue + step : currentValue - step;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    
    setInputValue(clampedValue.toString());
    onValueChange(clampedValue);
  };

  const handleSuggestionPress = (suggestionValue: number) => {
    setInputValue(suggestionValue.toString());
    onValueChange(suggestionValue);
  };

  return (
    <Animated.View 
      className="bg-[#18181B] rounded-2xl p-4 border border-gray-800/50 mb-4"
      style={animatedStyle}
    >
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <View 
          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: color + '20' }}
        >
          <FontAwesome 
            name={icon as any} 
            size={18} 
            color={color} 
          />
        </View>
        <Text className="text-white text-lg font-semibold flex-1">
          {label}
        </Text>
      </View>

      {/* Input with controls */}
      <View className="flex-row items-center space-x-3 mb-4">
        <TouchableOpacity
          onPress={() => adjustValue(false)}
          className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center"
          disabled={parseInt(inputValue, 10) <= min}
        >
          <FontAwesome 
            name="minus" 
            size={18} 
            color={parseInt(inputValue, 10) <= min ? '#4B5563' : color} 
          />
        </TouchableOpacity>

        <View className="flex-1">
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleInputBlur}
            keyboardType="numeric"
            selectTextOnFocus
            className="bg-gray-800 rounded-xl p-4 text-white text-center text-xl font-bold"
            style={{
              borderWidth: isFocused ? 2 : 1,
              borderColor: isFocused ? color : '#374151',
            }}
          />
          <Text className="text-gray-400 text-sm text-center mt-2">
            {unit}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => adjustValue(true)}
          className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center"
          disabled={parseInt(inputValue, 10) >= max}
        >
          <FontAwesome 
            name="plus" 
            size={18} 
            color={parseInt(inputValue, 10) >= max ? '#4B5563' : color} 
          />
        </TouchableOpacity>
      </View>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <View>
          <Text className="text-gray-400 text-sm mb-2">Quick Options</Text>
          <View className="flex-row flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSuggestionPress(suggestion)}
                className="px-3 py-2 rounded-full border border-gray-700"
                style={{
                  backgroundColor: value === suggestion ? color + '20' : 'transparent',
                  borderColor: value === suggestion ? color : '#374151',
                }}
              >
                <Text 
                  className="text-sm font-medium"
                  style={{
                    color: value === suggestion ? color : '#9CA3AF'
                  }}
                >
                  {suggestion.toLocaleString()} {unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Range info */}
      <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-800/50">
        <Text className="text-gray-500 text-xs">
          Min: {min} {unit}
        </Text>
        <Text className="text-gray-500 text-xs">
          Max: {max.toLocaleString()} {unit}
        </Text>
      </View>
    </Animated.View>
  );
}