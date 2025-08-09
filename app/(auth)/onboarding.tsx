import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  useAnimatedScrollHandler,
  runOnJS
} from 'react-native-reanimated';
import { completeOnboarding } from '@/state/slices/authSlice';
import AuthButton from '@/components/auth/AuthButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// OnboardingSlide, OnboardingSlideProps, PaginationDotProps are globally available from /types/components.d.ts

const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Track Your Workouts',
    subtitle: 'Smart Fitness Tracking',
    description: 'Log your exercises, sets, reps, and weights with our intuitive interface. Track your progress over time.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
    icon: 'fitness',
    gradient: ['#10B981', '#059669'],
  },
  {
    id: '2',
    title: 'Nutrition Insights',
    subtitle: 'Fuel Your Success',
    description: 'Get personalized nutrition recommendations and track your daily intake to optimize your performance.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000',
    icon: 'nutrition',
    gradient: ['#F97316', '#EA580C'],
  },
  {
    id: '3',
    title: 'Monitor Progress',
    subtitle: 'See Your Growth',
    description: 'Visualize your fitness journey with detailed analytics, charts, and milestone achievements.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
    icon: 'analytics',
    gradient: ['#8B5CF6', '#7C3AED'],
  },
  {
    id: '4',
    title: 'Join Community',
    subtitle: 'Stay Motivated Together',
    description: 'Connect with like-minded fitness enthusiasts, share achievements, and motivate each other.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000',
    icon: 'people',
    gradient: ['#EF4444', '#DC2626'],
  },
  {
    id: '5',
    title: 'Ready to Start?',
    subtitle: 'Your Fitness Journey Begins',
    description: 'Join thousands of users who have transformed their lives with our comprehensive fitness platform.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000',
    icon: 'rocket',
    gradient: ['#10B981', '#059669'],
  },
];

export default function OnboardingScreen() {
  const dispatch = useDispatch();
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useSharedValue(0);
  const isLastSlide = currentIndex === onboardingSlides.length - 1;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / SCREEN_WIDTH);
      runOnJS(setCurrentIndex)(index);
    },
  });

  const handleNext = () => {
    if (isLastSlide) {
      handleGetStarted();
    } else {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    dispatch(completeOnboarding());
    router.replace('/(auth)/sign-in');
  };

  const goToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  };

  return (
    <View className="flex-1 bg-dark-900">
      <StatusBar style="light" />

      {/* Header with Skip button */}
      <View className="flex-row justify-end items-center pt-12 px-6 pb-4">
        <TouchableOpacity
          onPress={handleSkip}
          className="py-2 px-4 rounded-full bg-dark-700"
        >
          <Text className="text-dark-300 text-sm font-medium">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        decelerationRate="fast"
        className="flex-1"
      >
        {onboardingSlides.map((slide, index) => (
          <OnboardingSlide
            key={slide.id}
            slide={slide}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>

      {/* Bottom Section */}
      <View className="px-6 pb-8">
        {/* Pagination Dots */}
        <View className="flex-row justify-center items-center mb-8">
          {onboardingSlides.map((_, index) => (
            <PaginationDot
              key={index}
              index={index}
              currentIndex={currentIndex}
              onPress={() => goToSlide(index)}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View className="gap-3">
          <AuthButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={handleNext}
            rightIcon={isLastSlide ? "rocket" : "arrow-forward"}
          />

          {!isLastSlide && (
            <TouchableOpacity
              onPress={handleGetStarted}
              className="py-3"
            >
              <Text className="text-center text-dark-400 text-sm">
                I already have an account
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}


function OnboardingSlide({ slide, index, scrollX }: OnboardingSlideProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5]);
    const scale = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8]);
    const translateY = interpolate(scrollX.value, inputRange, [50, 0, 50]);

    return {
      opacity,
      transform: [{ scale }, { translateY }],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const scale = interpolate(scrollX.value, inputRange, [1.2, 1, 1.2]);
    const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={{ width: SCREEN_WIDTH }} className="flex-1 px-6">
      <Animated.View style={animatedStyle} className="flex-1 justify-center items-center">
        {/* Image Section */}
        <View className="relative mb-8">
          <View className="w-80 h-80 rounded-3xl overflow-hidden bg-dark-700">
            <Animated.Image
              source={{ uri: slide.image }}
              style={[imageAnimatedStyle, { width: '100%', height: '100%' }]}
              className="rounded-3xl"
            />
          </View>

          {/* Floating Icon */}
          <View className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary-500 rounded-2xl items-center justify-center shadow-lg">
            <Ionicons name={slide.icon} size={28} color="white" />
          </View>
        </View>

        {/* Text Content */}
        <View className="items-center px-4">
          <Text className="text-primary-400 text-sm font-semibold mb-2 text-center">
            {slide.subtitle}
          </Text>

          <Text className="text-white text-2xl font-bold mb-4 text-center">
            {slide.title}
          </Text>

          <Text className="text-dark-300 text-base leading-6 text-center max-w-sm">
            {slide.description}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}


function PaginationDot({ index, currentIndex, onPress }: PaginationDotProps) {
  const isActive = index === currentIndex;

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isActive ? 1.2 : 1);
    const opacity = withSpring(isActive ? 1 : 0.5);
    const width = withSpring(isActive ? 24 : 8);

    return {
      transform: [{ scale }],
      opacity,
      width,
    };
  });

  return (
    <TouchableOpacity onPress={onPress} className="mx-1">
      <Animated.View
        style={animatedStyle}
        className={`h-2 rounded-full ${isActive ? 'bg-primary-500' : 'bg-dark-600'}`}
      />
    </TouchableOpacity>
  );
}
