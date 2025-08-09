import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

interface QuickActionButtonProps {
  title: string;
  icon: string;
  color?: string;
  onPress: () => void;
  delay?: number;
  variant?: 'primary' | 'secondary';
}

export default function QuickActionButton({
  title,
  icon,
  color = '#10B981',
  onPress,
  delay = 0,
  variant = 'primary',
}: QuickActionButtonProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(-5);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });
      opacity.value = withSpring(1);
      rotate.value = withSpring(0);
    }, delay);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.92);
    rotate.value = withSpring(-1);
  };

  const handlePressOut = () => {
    scale.value = withSequence(
      withSpring(1.08, { damping: 6, stiffness: 200 }),
      withSpring(1, { damping: 12, stiffness: 100 })
    );
    rotate.value = withSpring(0);
  };

  const getBackgroundStyle = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: color,
      };
    } else {
      return {
        backgroundColor: '#18181B',
        borderWidth: 1,
        borderColor: color + '40',
      };
    }
  };

  const getTextColor = () => {
    return variant === 'primary' ? '#FFFFFF' : color;
  };

  const getIconColor = () => {
    return variant === 'primary' ? '#FFFFFF' : color;
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        className="flex-1 rounded-2xl p-4 items-center justify-center min-h-[100px]"
        style={getBackgroundStyle()}
      >
        {/* Icon */}
        <Animated.View 
          className="w-12 h-12 rounded-full items-center justify-center mb-3"
          style={{
            backgroundColor: variant === 'primary' ? 'rgba(255,255,255,0.2)' : color + '20',
          }}
        >
          <FontAwesome 
            name={icon as any} 
            size={22} 
            color={getIconColor()} 
          />
        </Animated.View>

        {/* Title */}
        <Text 
          className="text-base font-semibold text-center"
          style={{ color: getTextColor() }}
        >
          {title}
        </Text>

        {/* Subtle gradient overlay for primary variant */}
        {variant === 'primary' && (
          <Animated.View 
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{
              backgroundColor: 'transparent',
            }}
            pointerEvents="none"
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}