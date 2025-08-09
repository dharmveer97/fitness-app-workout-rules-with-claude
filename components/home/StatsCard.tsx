import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  withSequence,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
// Types are now globally available from .d.ts files
interface StatsCardPropsExtended extends StatsCardProps {
  onPress?: () => void;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon,
  color,
  trend,
  onPress,
  delay = 0,
}: StatsCardPropsExtended) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const slideY = useSharedValue(50);
  const countValue = useSharedValue(0);

  useEffect(() => {
    // Entrance animation
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });
      opacity.value = withSpring(1);
      slideY.value = withSpring(0);
      
      // Animate the number counting if it's a number
      if (typeof value === 'number') {
        countValue.value = withSpring(value, { damping: 15, stiffness: 80 });
      }
    }, delay);
  }, [value, delay]);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: slideY.value },
      ],
      opacity: opacity.value,
    };
  });

  const pressInStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value * 0.95 }],
    };
  });

  const animatedNumberStyle = useAnimatedStyle(() => {
    const displayValue = typeof value === 'number' 
      ? interpolate(countValue.value, [0, value], [0, value])
      : 0;
    
    return {
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSequence(
      withSpring(1.05, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 12, stiffness: 100 })
    );
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'arrow-up';
    if (trend === 'down') return 'arrow-down';
    return 'minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return '#10B981';
    if (trend === 'down') return '#EF4444';
    return '#6B7280';
  };

  const formatValue = () => {
    if (typeof value === 'number' && countValue.value) {
      const animatedValue = Math.round(countValue.value);
      return animatedValue.toLocaleString();
    }
    return value.toString();
  };

  return (
    <Animated.View style={cardAnimatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        disabled={!onPress}
        className="bg-[#18181B] rounded-2xl p-4 border border-gray-800/50"
      >
        <View className="flex-row items-center justify-between mb-3">
          <View 
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{ backgroundColor: color + '20' }}
          >
            <FontAwesome 
              name={icon as any} 
              size={20} 
              color={color} 
            />
          </View>
          
          {change !== undefined && (
            <View className="flex-row items-center space-x-1">
              <FontAwesome 
                name={getTrendIcon()} 
                size={12} 
                color={getTrendColor()} 
              />
              <Text 
                className="text-xs font-semibold"
                style={{ color: getTrendColor() }}
              >
                {Math.abs(change)}%
              </Text>
            </View>
          )}
        </View>

        <View className="space-y-1">
          <Text className="text-gray-400 text-sm font-medium">
            {title}
          </Text>
          
          <Animated.View className="flex-row items-baseline space-x-1">
            <Animated.Text 
              className="text-white text-2xl font-bold"
              style={animatedNumberStyle}
            >
              {formatValue()}
            </Animated.Text>
            {unit && (
              <Text className="text-gray-400 text-sm font-medium">
                {unit}
              </Text>
            )}
          </Animated.View>
          
          {changeLabel && (
            <Text className="text-gray-500 text-xs">
              {changeLabel}
            </Text>
          )}
        </View>

        {/* Subtle gradient overlay */}
        <View 
          className="absolute inset-0 rounded-2xl opacity-5"
          style={{
            background: `linear-gradient(135deg, ${color}, transparent)`,
          }}
          pointerEvents="none"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}