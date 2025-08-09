import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
// ProfileHeaderProps is globally available from /types/components.d.ts

export default function ProfileHeader({
  profile,
  onEditPress,
  onAvatarPress,
}: ProfileHeaderProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 100 });
    opacity.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const formatJoinDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long' 
    };
    return profile.joinDate.toLocaleDateString('en-US', options);
  };

  const getFitnessLevelColor = () => {
    switch (profile.fitnessLevel) {
      case 'beginner':
        return '#10B981'; // Green
      case 'intermediate':
        return '#F59E0B'; // Yellow
      case 'advanced':
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const getFitnessLevelIcon = () => {
    switch (profile.fitnessLevel) {
      case 'beginner':
        return 'leaf';
      case 'intermediate':
        return 'fire';
      case 'advanced':
        return 'trophy';
      default:
        return 'circle';
    }
  };

  return (
    <Animated.View 
      className="bg-[#18181B] rounded-2xl p-6 border border-gray-800/50"
      style={animatedStyle}
    >
      {/* Header with edit button */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-xl font-bold">Profile</Text>
        {onEditPress && (
          <TouchableOpacity
            onPress={onEditPress}
            className="bg-gray-800 rounded-full p-2"
          >
            <FontAwesome name="edit" size={16} color="#10B981" />
          </TouchableOpacity>
        )}
      </View>

      {/* Avatar and basic info */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={onAvatarPress}
          disabled={!onAvatarPress}
        >
          <View className="relative">
            {profile.avatar ? (
              <Image
                source={{ uri: profile.avatar }}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <View className="w-20 h-20 rounded-full bg-gray-700 items-center justify-center">
                <FontAwesome name="user" size={32} color="#9CA3AF" />
              </View>
            )}
            
            {/* Online indicator */}
            <View className="absolute bottom-1 right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#18181B]" />
            
            {/* Camera icon overlay if avatar can be changed */}
            {onAvatarPress && (
              <View className="absolute inset-0 rounded-full bg-black/30 items-center justify-center">
                <FontAwesome name="camera" size={20} color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View className="flex-1 ml-4">
          <Text className="text-white text-2xl font-bold mb-1">
            {profile.name}
          </Text>
          <Text className="text-gray-400 text-base mb-2">
            {profile.email}
          </Text>
          <View className="flex-row items-center space-x-2">
            <View 
              className="px-3 py-1 rounded-full flex-row items-center space-x-1"
              style={{ backgroundColor: getFitnessLevelColor() + '20' }}
            >
              <FontAwesome 
                name={getFitnessLevelIcon()} 
                size={12} 
                color={getFitnessLevelColor()} 
              />
              <Text 
                className="text-xs font-semibold capitalize"
                style={{ color: getFitnessLevelColor() }}
              >
                {profile.fitnessLevel}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats row */}
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 items-center">
          <Text className="text-white text-lg font-bold">
            {profile.goals.weeklyWorkouts}
          </Text>
          <Text className="text-gray-400 text-sm">
            Weekly Goal
          </Text>
        </View>
        
        <View className="w-px bg-gray-800 mx-4" />
        
        <View className="flex-1 items-center">
          <Text className="text-white text-lg font-bold">
            {profile.goals.dailySteps.toLocaleString()}
          </Text>
          <Text className="text-gray-400 text-sm">
            Daily Steps
          </Text>
        </View>
        
        <View className="w-px bg-gray-800 mx-4" />
        
        <View className="flex-1 items-center">
          <Text className="text-white text-lg font-bold">
            {formatJoinDate()}
          </Text>
          <Text className="text-gray-400 text-sm">
            Member Since
          </Text>
        </View>
      </View>

      {/* Additional info */}
      <View className="border-t border-gray-800/50 pt-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2">
            <FontAwesome 
              name="globe" 
              size={16} 
              color="#6B7280" 
            />
            <Text className="text-gray-400 text-sm">
              {profile.unitSystem === 'metric' ? 'Metric System' : 'Imperial System'}
            </Text>
          </View>
          
          {profile.age && (
            <View className="flex-row items-center space-x-2">
              <FontAwesome 
                name="calendar" 
                size={16} 
                color="#6B7280" 
              />
              <Text className="text-gray-400 text-sm">
                {profile.age} years old
              </Text>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
}