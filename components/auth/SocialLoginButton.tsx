import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// SocialProvider type is globally available from /types/auth.d.ts

// SocialLoginButtonProps is globally available from /types/components.d.ts

const providerConfig = {
  google: {
    title: 'Continue with Google',
    icon: 'logo-google',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    borderColor: '#E5E7EB',
  },
  apple: {
    title: 'Continue with Apple',
    icon: 'logo-apple',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    borderColor: '#000000',
  },
  facebook: {
    title: 'Continue with Facebook',
    icon: 'logo-facebook',
    backgroundColor: '#1877F2',
    textColor: '#FFFFFF',
    borderColor: '#1877F2',
  },
} as const;

export default function SocialLoginButton({
  provider,
  onPress,
  loading = false,
  disabled = false,
}: SocialLoginButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const config = providerConfig[provider];

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
      if (!loading && !disabled) {
        runOnJS(onPress)();
      }
    },
    onFail: () => {
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
    },
  });

  const getButtonStyle = () => {
    if (disabled || loading) {
      return {
        backgroundColor: '#27272A', // dark-600
        borderColor: '#27272A',
      };
    }
    return {
      backgroundColor: config.backgroundColor,
      borderColor: config.borderColor,
    };
  };

  const getTextColor = () => {
    if (disabled || loading) {
      return '#71717A'; // dark-300
    }
    return config.textColor;
  };

  const getIconColor = () => {
    if (disabled || loading) {
      return '#71717A'; // dark-300
    }
    
    // For specific providers, use their brand colors
    if (provider === 'google') return '#4285F4';
    if (provider === 'apple') return config.textColor;
    if (provider === 'facebook') return '#FFFFFF';
    
    return config.textColor;
  };

  return (
    <TapGestureHandler onGestureEvent={tapHandler} enabled={!disabled && !loading}>
      <AnimatedTouchableOpacity
        style={[
          animatedStyle,
          {
            ...getButtonStyle(),
            borderWidth: 1,
          }
        ]}
        className="flex-row items-center justify-center w-full px-6 py-4 rounded-xl mb-3"
        activeOpacity={1}
        disabled={disabled || loading}
      >
        {loading ? (
          <View className="flex-row items-center">
            <View className="w-5 h-5 mr-3">
              <Ionicons name="reload" size={20} color={getIconColor()} />
            </View>
            <Text 
              style={{ color: getTextColor() }}
              className="text-base font-semibold"
            >
              Connecting...
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            {provider === 'google' && (
              <View className="w-5 h-5 mr-3">
                <Ionicons name={config.icon} size={20} color={getIconColor()} />
              </View>
            )}
            {provider === 'apple' && (
              <View className="w-5 h-5 mr-3">
                <Ionicons name={config.icon} size={20} color={getIconColor()} />
              </View>
            )}
            {provider === 'facebook' && (
              <View className="w-5 h-5 mr-3">
                <Ionicons name={config.icon} size={20} color={getIconColor()} />
              </View>
            )}
            <Text 
              style={{ color: getTextColor() }}
              className="text-base font-semibold"
            >
              {config.title}
            </Text>
          </View>
        )}
      </AnimatedTouchableOpacity>
    </TapGestureHandler>
  );
}

// Wrapper component for multiple social login options
// SocialLoginGroupProps is globally available from /types/components.d.ts

export function SocialLoginGroup({
  onGooglePress,
  onApplePress,
  onFacebookPress,
  googleLoading = false,
  appleLoading = false,
  facebookLoading = false,
  disabled = false,
}: SocialLoginGroupProps) {
  return (
    <View className="w-full">
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-dark-600" />
        <Text className="mx-4 text-dark-400 text-sm">Or continue with</Text>
        <View className="flex-1 h-px bg-dark-600" />
      </View>
      
      {onGooglePress && (
        <SocialLoginButton
          provider="google"
          onPress={onGooglePress}
          loading={googleLoading}
          disabled={disabled}
        />
      )}
      
      {onApplePress && (
        <SocialLoginButton
          provider="apple"
          onPress={onApplePress}
          loading={appleLoading}
          disabled={disabled}
        />
      )}
      
      {onFacebookPress && (
        <SocialLoginButton
          provider="facebook"
          onPress={onFacebookPress}
          loading={facebookLoading}
          disabled={disabled}
        />
      )}
    </View>
  );
}