import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  useAnimatedProps,
  interpolate,
  useDerivedValue
} from 'react-native-reanimated';
import Svg, { Rect } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
  className?: string;
}

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'number',
    label: 'One number',
    test: (password) => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'One special character',
    test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  },
];

type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

const getPasswordStrength = (password: string): PasswordStrength => {
  if (password.length === 0) return 'weak';
  
  const metRequirements = passwordRequirements.filter(req => req.test(password)).length;
  
  if (metRequirements <= 2) return 'weak';
  if (metRequirements === 3) return 'fair';
  if (metRequirements === 4) return 'good';
  return 'strong';
};

const strengthConfig = {
  weak: {
    color: '#EF4444',
    bgColor: '#FEE2E2',
    progress: 0.25,
    label: 'Weak',
  },
  fair: {
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    progress: 0.5,
    label: 'Fair',
  },
  good: {
    color: '#10B981',
    bgColor: '#D1FAE5',
    progress: 0.75,
    label: 'Good',
  },
  strong: {
    color: '#059669',
    bgColor: '#A7F3D0',
    progress: 1,
    label: 'Strong',
  },
};

export default function PasswordStrengthIndicator({
  password,
  showRequirements = true,
  className = '',
}: PasswordStrengthIndicatorProps) {
  const strength = getPasswordStrength(password);
  const config = strengthConfig[strength];
  
  const progress = useSharedValue(0);
  
  React.useEffect(() => {
    progress.value = withSpring(password.length > 0 ? config.progress : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [password, config.progress]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [0, 1], [0, 100]);
    
    return {
      width: `${width}%`,
      backgroundColor: config.color,
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.1, 1], [0, 1, 1]);
    
    return {
      opacity,
      color: config.color,
    };
  });

  if (password.length === 0) {
    return null;
  }

  return (
    <View className={`mt-4 ${className}`}>
      {/* Progress Bar */}
      <View className="mb-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-dark-300">Password Strength</Text>
          <Animated.Text 
            style={animatedLabelStyle}
            className="text-sm font-medium"
          >
            {config.label}
          </Animated.Text>
        </View>
        
        <View className="h-2 bg-dark-700 rounded-full overflow-hidden">
          <Animated.View
            style={animatedProgressStyle}
            className="h-full rounded-full transition-all duration-300"
          />
        </View>
      </View>

      {/* Requirements List */}
      {showRequirements && (
        <View className="space-y-2">
          <Text className="text-sm text-dark-300 mb-2">Password must contain:</Text>
          {passwordRequirements.map((requirement) => {
            const isMet = requirement.test(password);
            
            return (
              <RequirementItem
                key={requirement.id}
                label={requirement.label}
                isMet={isMet}
                isVisible={password.length > 0}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

interface RequirementItemProps {
  label: string;
  isMet: boolean;
  isVisible: boolean;
}

function RequirementItem({ label, isMet, isVisible }: RequirementItemProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const iconRotation = useSharedValue(0);

  React.useEffect(() => {
    if (isVisible) {
      opacity.value = withSpring(1, { damping: 15 });
      scale.value = withSpring(1, { damping: 15 });
    } else {
      opacity.value = withSpring(0, { damping: 15 });
      scale.value = withSpring(0.8, { damping: 15 });
    }
  }, [isVisible]);

  React.useEffect(() => {
    if (isMet) {
      iconRotation.value = withSpring(360, { damping: 10 });
    } else {
      iconRotation.value = withSpring(0, { damping: 10 });
    }
  }, [isMet]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${iconRotation.value}deg` }],
    };
  });

  return (
    <Animated.View 
      style={animatedStyle}
      className="flex-row items-center"
    >
      <Animated.View style={iconAnimatedStyle} className="mr-2">
        <Ionicons
          name={isMet ? 'checkmark-circle' : 'ellipse-outline'}
          size={16}
          color={isMet ? '#10B981' : '#71717A'}
        />
      </Animated.View>
      <Text 
        className={`text-sm ${isMet ? 'text-primary-400' : 'text-dark-400'} transition-colors duration-200`}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

// Simpler version without requirements list
export function SimplePasswordStrength({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  const config = strengthConfig[strength];
  
  const progress = useSharedValue(0);
  
  React.useEffect(() => {
    progress.value = withSpring(password.length > 0 ? config.progress : 0);
  }, [password, config.progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [0, 1], [0, 100]);
    
    return {
      width: `${width}%`,
      backgroundColor: config.color,
    };
  });

  if (password.length === 0) {
    return null;
  }

  return (
    <View className="mt-2">
      <View className="h-1 bg-dark-700 rounded-full overflow-hidden">
        <Animated.View
          style={animatedStyle}
          className="h-full rounded-full"
        />
      </View>
    </View>
  );
}