import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { FontAwesome } from '@expo/vector-icons';
// Types are now globally available from .d.ts files

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps extends ProgressRingData {
  size?: number;
  strokeWidth?: number;
  delay?: number;
  showValue?: boolean;
  icon?: string;
}

export default function ProgressRing({
  value,
  maxValue,
  color,
  label,
  unit,
  size = 120,
  strokeWidth = 8,
  delay = 0,
  showValue = true,
  icon,
}: ProgressRingProps) {
  const animatedValue = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / maxValue, 1);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });
      opacity.value = withSpring(1);
      animatedValue.value = withTiming(progress, { duration: 1500 });
    }, delay);
  }, [progress, delay]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (animatedValue.value * circumference);
    return {
      strokeDashoffset,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const displayValue = interpolate(
      animatedValue.value,
      [0, progress],
      [0, value]
    );
    return {
      opacity: opacity.value,
    };
  });

  const getProgressColor = () => {
    if (progress >= 1) return '#10B981'; // Success green
    if (progress >= 0.7) return color;
    if (progress >= 0.4) return '#F59E0B'; // Warning yellow
    return '#EF4444'; // Danger red
  };

  return (
    <Animated.View style={[{ alignItems: 'center' }, containerStyle]}>
      <View style={{ position: 'relative' }}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={color} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#374151"
            strokeWidth={strokeWidth}
            fill="none"
            opacity={0.3}
          />
          
          {/* Progress circle */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            animatedProps={animatedProps}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        {/* Center content */}
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon && (
            <FontAwesome 
              name={icon as any} 
              size={24} 
              color={getProgressColor()} 
              style={{ marginBottom: 4 }}
            />
          )}
          
          {showValue && (
            <Animated.Text 
              className="text-white text-lg font-bold text-center"
              style={animatedTextStyle}
            >
              {Math.round(value).toLocaleString()}
              {unit && (
                <Text className="text-gray-400 text-sm font-normal">
                  {unit}
                </Text>
              )}
            </Animated.Text>
          )}
          
          <Text className="text-gray-500 text-xs text-center mt-1">
            of {maxValue.toLocaleString()}{unit}
          </Text>
        </View>
      </View>

      {/* Label */}
      <Animated.Text 
        className="text-gray-300 text-sm font-medium text-center mt-3"
        style={{ opacity: opacity.value }}
      >
        {label}
      </Animated.Text>

      {/* Progress percentage */}
      <Animated.Text 
        className="text-xs font-semibold mt-1"
        style={[
          { color: getProgressColor() },
          { opacity: opacity.value }
        ]}
      >
        {Math.round(progress * 100)}%
      </Animated.Text>
    </Animated.View>
  );
}