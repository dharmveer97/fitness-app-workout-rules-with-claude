import React, { useState } from 'react'

import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { View, Text } from '@/components/Themed'

const { width: _width } = Dimensions.get('window')

interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving: string
  image?: string
}

interface MealEntry {
  id: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  items: FoodItem[]
  timestamp: Date
}

export default function CaloriesScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [todayCalories, _setTodayCalories] = useState(1245)
  const [calorieGoal] = useState(2000)
  const [selectedMeal, setSelectedMeal] = useState<
    'breakfast' | 'lunch' | 'dinner' | 'snack'
  >('breakfast')

  const scanAnimation = useSharedValue(0)

  const mockFoodSuggestions: FoodItem[] = [
    {
      id: '1',
      name: 'Grilled Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      serving: '100g',
      image:
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200',
    },
    {
      id: '2',
      name: 'Brown Rice',
      calories: 112,
      protein: 2.6,
      carbs: 24,
      fat: 0.9,
      serving: '100g',
      image:
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200',
    },
    {
      id: '3',
      name: 'Mixed Salad',
      calories: 35,
      protein: 2,
      carbs: 7,
      fat: 0.5,
      serving: '1 bowl',
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
    },
  ]

  const todayMeals: MealEntry[] = [
    {
      id: '1',
      type: 'breakfast',
      items: [
        {
          id: 'b1',
          name: 'Oatmeal with Berries',
          calories: 280,
          protein: 8,
          carbs: 45,
          fat: 6,
          serving: '1 bowl',
        },
        {
          id: 'b2',
          name: 'Greek Yogurt',
          calories: 100,
          protein: 17,
          carbs: 6,
          fat: 0,
          serving: '150g',
        },
      ],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'lunch',
      items: [
        {
          id: 'l1',
          name: 'Chicken Sandwich',
          calories: 420,
          protein: 32,
          carbs: 38,
          fat: 12,
          serving: '1 sandwich',
        },
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ]

  const handleCameraScan = () => {
    setIsScanning(!isScanning)
    scanAnimation.value = withSpring(isScanning ? 0 : 1)
  }

  const animatedScanStyle = useAnimatedStyle(() => ({
    opacity: scanAnimation.value,
    transform: [{ scale: scanAnimation.value }],
  }))

  const caloriePercentage = (todayCalories / calorieGoal) * 100

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: 'sunny', color: '#FFA500' },
    { id: 'lunch', name: 'Lunch', icon: 'partly-sunny', color: '#4CAF50' },
    { id: 'dinner', name: 'Dinner', icon: 'moon', color: '#9C27B0' },
    { id: 'snack', name: 'Snack', icon: 'nutrition', color: '#FF5722' },
  ]

  const _getNutrientColor = (_percentage: number) => {
    if (_percentage < 30) return '#FF5722'
    if (_percentage < 70) return '#FFA500'
    return '#4CAF50'
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1'
    >
      <View className='flex-1'>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className='flex-1'
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className='px-6 py-4'>
            {/* Header */}
            <View className='mb-6 mt-4'>
              <Text className='text-secondary text-lg'>AI Calorie Tracker</Text>
              <Text className='text-primary text-3xl font-bold'>
                Track Your Nutrition
              </Text>
            </View>

            {/* Daily Progress Card */}
            <Animated.View entering={FadeInDown.delay(200).duration(800)}>
              <LinearGradient
                colors={['#667eea', '#764ba2', '#f093fb']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 24,
                  padding: 2,
                  marginBottom: 28,
                  shadowColor: '#000',
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <View className='overflow-hidden rounded-[22px] bg-surface-secondary'>
                  <LinearGradient
                    colors={['rgba(255,255,255,0.03)', 'transparent']}
                    style={{ padding: 24 }}
                  >
                    <View className='mb-6 flex-row items-center justify-between'>
                      <View>
                        <Text className='text-2xl font-bold text-white'>
                          Nutrition Tracker
                        </Text>
                        <Text className='mt-1 text-sm text-white/70'>
                          Daily Overview
                        </Text>
                      </View>
                      <TouchableOpacity className='rounded-2xl bg-white/10 p-3 backdrop-blur-lg'>
                        <Ionicons name='stats-chart' size={24} color='white' />
                      </TouchableOpacity>
                    </View>

                    {/* Enhanced Circular Progress */}
                    <View className='mb-8 items-center'>
                      <View className='relative h-44 w-44'>
                        {/* Background ring */}
                        <View className='absolute inset-0 rounded-full bg-gradient-to-tr from-purple-900/20 to-pink-900/20' />

                        {/* Progress ring */}
                        <View
                          className='absolute inset-2 rounded-full border-[12px]'
                          style={{
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderTopColor:
                              caloriePercentage > 0
                                ? '#667eea'
                                : 'rgba(255,255,255,0.1)',
                            borderRightColor:
                              caloriePercentage > 25
                                ? '#764ba2'
                                : 'rgba(255,255,255,0.1)',
                            borderBottomColor:
                              caloriePercentage > 50
                                ? '#f093fb'
                                : 'rgba(255,255,255,0.1)',
                            borderLeftColor:
                              caloriePercentage > 75
                                ? '#f5576c'
                                : 'rgba(255,255,255,0.1)',
                            transform: [{ rotate: '-90deg' }],
                            shadowColor: '#667eea',
                            shadowOpacity: 0.5,
                            shadowRadius: 10,
                          }}
                        />

                        {/* Center content */}
                        <View className='absolute inset-0 items-center justify-center'>
                          <Text className='mb-1 text-5xl font-bold text-white'>
                            {todayCalories}
                          </Text>
                          <Text className='text-base text-white/60'>
                            of {calorieGoal} cal
                          </Text>
                          <View className='mt-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1'>
                            <Text className='text-xs font-bold text-white'>
                              {Math.round(caloriePercentage)}% Complete
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View className='mt-4 rounded-2xl bg-white/5 px-4 py-2 backdrop-blur-sm'>
                        <Text className='text-sm font-medium text-white/90'>
                          🔥 {calorieGoal - todayCalories} calories to go!
                        </Text>
                      </View>
                    </View>

                    {/* Enhanced Macros */}
                    <View className='rounded-2xl bg-black/20 p-4 backdrop-blur-lg'>
                      <Text className='mb-4 text-center text-sm font-semibold text-white/80'>
                        MACRONUTRIENTS
                      </Text>
                      <View className='flex-row justify-between'>
                        <TouchableOpacity className='flex-1 items-center'>
                          <View className='mb-3 h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg'>
                            <MaterialCommunityIcons
                              name='food-steak'
                              size={28}
                              color='white'
                            />
                          </View>
                          <Text className='text-xl font-bold text-white'>
                            78g
                          </Text>
                          <Text className='mt-1 text-xs text-white/60'>
                            Protein
                          </Text>
                          <View className='mt-2 h-1 w-full rounded-full bg-red-500/30'>
                            <View
                              className='h-full rounded-full bg-gradient-to-r from-red-500 to-rose-600'
                              style={{ width: '65%' }}
                            />
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='flex-1 items-center'>
                          <View className='mb-3 h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg'>
                            <MaterialCommunityIcons
                              name='bread-slice'
                              size={28}
                              color='white'
                            />
                          </View>
                          <Text className='text-xl font-bold text-white'>
                            145g
                          </Text>
                          <Text className='mt-1 text-xs text-white/60'>
                            Carbs
                          </Text>
                          <View className='mt-2 h-1 w-full rounded-full bg-blue-500/30'>
                            <View
                              className='h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-600'
                              style={{ width: '72%' }}
                            />
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='flex-1 items-center'>
                          <View className='mb-3 h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg'>
                            <MaterialCommunityIcons
                              name='oil'
                              size={28}
                              color='white'
                            />
                          </View>
                          <Text className='text-xl font-bold text-white'>
                            42g
                          </Text>
                          <Text className='mt-1 text-xs text-white/60'>
                            Fats
                          </Text>
                          <View className='mt-2 h-1 w-full rounded-full bg-yellow-500/30'>
                            <View
                              className='h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-600'
                              style={{ width: '45%' }}
                            />
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='flex-1 items-center'>
                          <View className='mb-3 h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg'>
                            <MaterialCommunityIcons
                              name='water'
                              size={28}
                              color='white'
                            />
                          </View>
                          <Text className='text-xl font-bold text-white'>
                            1.8L
                          </Text>
                          <Text className='mt-1 text-xs text-white/60'>
                            Water
                          </Text>
                          <View className='mt-2 h-1 w-full rounded-full bg-cyan-500/30'>
                            <View
                              className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600'
                              style={{ width: '60%' }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Enhanced AI Food Scanner */}
            <Animated.View entering={FadeInDown.delay(300).duration(800)}>
              <View className='mb-8 rounded-2xl border border-surface-primary bg-surface-secondary p-6 shadow-sm'>
                <View className='mb-6 flex-row items-center justify-between'>
                  <View>
                    <Text className='text-primary text-xl font-bold'>
                      🤖 AI Food Scanner
                    </Text>
                    <Text className='text-secondary mt-1 text-sm'>
                      Powered by advanced AI recognition
                    </Text>
                  </View>
                  <View className='rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1'>
                    <Text className='text-xs font-bold text-white'>SMART</Text>
                  </View>
                </View>

                <View className='mb-6 flex-row justify-between gap-3'>
                  <TouchableOpacity
                    onPress={handleCameraScan}
                    className='flex-1 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-4'
                    style={{
                      shadowColor: '#10B981',
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 6,
                    }}
                  >
                    <View className='items-center'>
                      <View className='mb-2 h-12 w-12 items-center justify-center rounded-2xl bg-white/20'>
                        <Ionicons name='camera' size={24} color='white' />
                      </View>
                      <Text className='text-sm font-bold text-white'>
                        Scan Food
                      </Text>
                      <Text className='mt-1 text-xs text-white/80'>
                        Point & Identify
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className='flex-1 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 p-4'
                    style={{
                      shadowColor: '#3B82F6',
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 6,
                    }}
                  >
                    <View className='items-center'>
                      <View className='mb-2 h-12 w-12 items-center justify-center rounded-2xl bg-white/20'>
                        <Ionicons name='images' size={24} color='white' />
                      </View>
                      <Text className='text-sm font-bold text-white'>
                        Upload Photo
                      </Text>
                      <Text className='mt-1 text-xs text-white/80'>
                        From Gallery
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className='flex-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 p-4'
                    style={{
                      shadowColor: '#8B5CF6',
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 6,
                    }}
                  >
                    <View className='items-center'>
                      <View className='mb-2 h-12 w-12 items-center justify-center rounded-2xl bg-white/20'>
                        <MaterialCommunityIcons
                          name='barcode-scan'
                          size={24}
                          color='white'
                        />
                      </View>
                      <Text className='text-sm font-bold text-white'>
                        Scan Barcode
                      </Text>
                      <Text className='mt-1 text-xs text-white/80'>
                        Product Info
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Enhanced Search Bar */}
                <View className='rounded-2xl border border-surface-primary bg-surface-secondary p-1 shadow-sm'>
                  <View className='flex-row items-center rounded-xl bg-surface-primary px-4 py-4'>
                    <View className='mr-3 h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10'>
                      <Ionicons
                        name='search'
                        size={20}
                        color='rgb(var(--text-brand))'
                      />
                    </View>
                    <TextInput
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder='Search food, ingredients, or meals...'
                      placeholderTextColor='rgb(var(--text-tertiary))'
                      className='text-primary flex-1'
                      style={{ fontSize: 16 }}
                    />
                    <TouchableOpacity className='ml-3 h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10'>
                      <MaterialCommunityIcons
                        name='barcode-scan'
                        size={20}
                        color='#8B5CF6'
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* AI Suggestion */}
                {isScanning && (
                  <Animated.View style={animatedScanStyle}>
                    <View className='mt-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-green-500/10 p-4'>
                      <View className='mb-2 flex-row items-center'>
                        <View className='mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500' />
                        <Text className='text-secondary text-sm'>
                          AI is analyzing...
                        </Text>
                      </View>
                      <Text className='text-primary'>
                        Point your camera at food to instantly identify and
                        track calories
                      </Text>
                    </View>
                  </Animated.View>
                )}
              </View>
            </Animated.View>

            {/* Meal Type Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className='mb-6'
            >
              <View className='flex-row gap-3'>
                {mealTypes.map((meal) => (
                  <TouchableOpacity
                    key={meal.id}
                    onPress={() => setSelectedMeal(meal.id as any)}
                    className={`rounded-xl border px-4 py-3 ${
                      selectedMeal === meal.id
                        ? 'border-brand-primary bg-brand-primary/20'
                        : 'border-surface-primary bg-surface-secondary'
                    }`}
                  >
                    <View className='flex-row items-center'>
                      <Ionicons
                        name={meal.icon as any}
                        size={20}
                        color={
                          selectedMeal === meal.id
                            ? meal.color
                            : 'rgb(var(--text-secondary))'
                        }
                      />
                      <Text
                        className={`ml-2 font-medium ${
                          selectedMeal === meal.id
                            ? 'text-brand-primary'
                            : 'text-secondary'
                        }`}
                      >
                        {meal.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Food Suggestions */}
            <View className='mb-6'>
              <Text className='text-primary mb-4 text-lg font-semibold'>
                Quick Add
              </Text>
              {mockFoodSuggestions.map((food, index) => (
                <Animated.View
                  key={food.id}
                  entering={FadeInDown.delay(400 + index * 100).duration(600)}
                >
                  <TouchableOpacity className='mb-3 flex-row rounded-xl border border-surface-primary bg-surface-secondary p-3 shadow-sm'>
                    <Image
                      source={{ uri: food.image }}
                      className='mr-3 h-16 w-16 rounded-lg'
                    />
                    <View className='flex-1'>
                      <Text className='text-primary font-semibold'>
                        {food.name}
                      </Text>
                      <Text className='text-secondary text-sm'>
                        {food.serving}
                      </Text>
                      <View className='mt-1 flex-row gap-4'>
                        <Text className='text-xs font-semibold text-brand-primary'>
                          {food.calories} cal
                        </Text>
                        <Text className='text-tertiary text-xs'>
                          P: {food.protein}g
                        </Text>
                        <Text className='text-tertiary text-xs'>
                          C: {food.carbs}g
                        </Text>
                        <Text className='text-tertiary text-xs'>
                          F: {food.fat}g
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity className='justify-center'>
                      <Ionicons name='add-circle' size={28} color='#10B981' />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* Today's Meals */}
            <View>
              <Text className='text-primary mb-4 text-lg font-semibold'>
                Today's Meals
              </Text>
              {todayMeals.map((meal) => (
                <View
                  key={meal.id}
                  className='mb-4 rounded-xl border border-surface-primary bg-surface-secondary p-4 shadow-sm'
                >
                  <View className='mb-3 flex-row items-center justify-between'>
                    <View className='flex-row items-center'>
                      <Ionicons
                        name={
                          mealTypes.find((m) => m.id === meal.type)?.icon as any
                        }
                        size={20}
                        color={mealTypes.find((m) => m.id === meal.type)?.color}
                      />
                      <Text className='text-primary ml-2 font-semibold capitalize'>
                        {meal.type}
                      </Text>
                    </View>
                    <Text className='text-secondary text-sm'>
                      {meal.items.reduce((sum, item) => sum + item.calories, 0)}{' '}
                      cal
                    </Text>
                  </View>
                  {meal.items.map((item) => (
                    <View key={item.id} className='mb-2'>
                      <View className='flex-row items-center justify-between'>
                        <Text className='text-secondary flex-1'>
                          {item.name}
                        </Text>
                        <Text className='text-sm font-semibold text-brand-primary'>
                          {item.calories} cal
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}
