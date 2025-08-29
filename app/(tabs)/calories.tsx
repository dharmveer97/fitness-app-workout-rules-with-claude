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
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text } from '@/components/Themed'
import { Button, ButtonText } from '@/components/ui/button'

const { width } = Dimensions.get('window')

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
  const [todayCalories, setTodayCalories] = useState(1245)
  const [calorieGoal] = useState(2000)
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast')
  
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
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200',
    },
    {
      id: '2',
      name: 'Brown Rice',
      calories: 112,
      protein: 2.6,
      carbs: 24,
      fat: 0.9,
      serving: '100g',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200',
    },
    {
      id: '3',
      name: 'Mixed Salad',
      calories: 35,
      protein: 2,
      carbs: 7,
      fat: 0.5,
      serving: '1 bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
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

  const getNutrientColor = (percentage: number) => {
    if (percentage < 30) return '#FF5722'
    if (percentage < 70) return '#FFA500'
    return '#4CAF50'
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-surface-primary'
    >
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
              colors={['#4facfe', '#00f2fe']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 20, padding: 1, marginBottom: 24 }}
            >
              <View className='bg-surface-secondary rounded-[19px] p-6'>
                <View className='mb-4 flex-row items-center justify-between'>
                  <Text className='text-primary text-lg font-semibold'>Today's Intake</Text>
                  <TouchableOpacity>
                    <Ionicons name='calendar' size={22} color='rgb(var(--text-brand))' />
                  </TouchableOpacity>
                </View>

                {/* Circular Progress */}
                <View className='mb-6 items-center'>
                  <View className='relative h-32 w-32'>
                    <View className='absolute inset-0 items-center justify-center'>
                      <Text className='text-primary text-3xl font-bold'>{todayCalories}</Text>
                      <Text className='text-secondary text-sm'>of {calorieGoal} cal</Text>
                    </View>
                    <View
                      className='absolute inset-0 rounded-full border-8'
                      style={{
                        borderColor: '#1f2937',
                        borderTopColor: caloriePercentage > 0 ? '#4facfe' : '#1f2937',
                        borderRightColor: caloriePercentage > 25 ? '#4facfe' : '#1f2937',
                        borderBottomColor: caloriePercentage > 50 ? '#4facfe' : '#1f2937',
                        borderLeftColor: caloriePercentage > 75 ? '#4facfe' : '#1f2937',
                        transform: [{ rotate: '-90deg' }],
                      }}
                    />
                  </View>
                  <Text className='text-secondary mt-2 text-sm'>
                    {calorieGoal - todayCalories} calories remaining
                  </Text>
                </View>

                {/* Macros */}
                <View className='flex-row justify-between'>
                  <View className='items-center'>
                    <View className='bg-red-500/20 mb-2 h-12 w-12 items-center justify-center rounded-full'>
                      <Text className='text-red-500 font-bold'>P</Text>
                    </View>
                    <Text className='text-primary font-semibold'>78g</Text>
                    <Text className='text-tertiary text-xs'>Protein</Text>
                  </View>
                  <View className='items-center'>
                    <View className='bg-blue-500/20 mb-2 h-12 w-12 items-center justify-center rounded-full'>
                      <Text className='text-blue-500 font-bold'>C</Text>
                    </View>
                    <Text className='text-primary font-semibold'>145g</Text>
                    <Text className='text-tertiary text-xs'>Carbs</Text>
                  </View>
                  <View className='items-center'>
                    <View className='bg-yellow-500/20 mb-2 h-12 w-12 items-center justify-center rounded-full'>
                      <Text className='text-yellow-500 font-bold'>F</Text>
                    </View>
                    <Text className='text-primary font-semibold'>42g</Text>
                    <Text className='text-tertiary text-xs'>Fats</Text>
                  </View>
                  <View className='items-center'>
                    <View className='bg-green-500/20 mb-2 h-12 w-12 items-center justify-center rounded-full'>
                      <Text className='text-green-500 font-bold'>W</Text>
                    </View>
                    <Text className='text-primary font-semibold'>1.8L</Text>
                    <Text className='text-tertiary text-xs'>Water</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* AI Food Scanner */}
          <Animated.View entering={FadeInDown.delay(300).duration(800)}>
            <View className='border-primary mb-6 rounded-2xl border bg-surface-secondary p-6'>
              <Text className='text-primary mb-4 text-lg font-semibold'>
                AI Food Scanner
              </Text>
              
              <View className='mb-4 flex-row space-x-3'>
                <TouchableOpacity
                  onPress={handleCameraScan}
                  className='bg-brand-primary/20 flex-1 flex-row items-center justify-center rounded-xl py-4'
                >
                  <Ionicons name='camera' size={24} color='#10B981' />
                  <Text className='text-brand-primary ml-2 font-semibold'>
                    Scan Food
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity className='bg-blue-500/20 flex-1 flex-row items-center justify-center rounded-xl py-4'>
                  <Ionicons name='image' size={24} color='#3B82F6' />
                  <Text className='ml-2 font-semibold text-blue-500'>
                    Upload Photo
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Search Bar */}
              <View className='bg-surface-primary flex-row items-center rounded-xl px-4 py-3'>
                <Ionicons name='search' size={20} color='rgb(var(--text-secondary))' />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder='Search food or scan barcode...'
                  placeholderTextColor='rgb(var(--text-tertiary))'
                  className='text-primary ml-3 flex-1'
                  style={{ fontSize: 16 }}
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons 
                    name='barcode-scan' 
                    size={22} 
                    color='rgb(var(--text-secondary))' 
                  />
                </TouchableOpacity>
              </View>

              {/* AI Suggestion */}
              {isScanning && (
                <Animated.View style={animatedScanStyle}>
                  <View className='bg-gradient-to-r from-blue-500/10 to-green-500/10 mt-4 rounded-xl p-4'>
                    <View className='mb-2 flex-row items-center'>
                      <View className='bg-gradient-to-r from-blue-500 to-green-500 mr-2 h-2 w-2 rounded-full' />
                      <Text className='text-secondary text-sm'>AI is analyzing...</Text>
                    </View>
                    <Text className='text-primary'>
                      Point your camera at food to instantly identify and track calories
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
            <View className='flex-row space-x-3'>
              {mealTypes.map((meal) => (
                <TouchableOpacity
                  key={meal.id}
                  onPress={() => setSelectedMeal(meal.id as any)}
                  className={`rounded-xl px-4 py-3 ${
                    selectedMeal === meal.id ? 'bg-brand-primary/20' : 'bg-surface-secondary'
                  }`}
                >
                  <View className='flex-row items-center'>
                    <Ionicons 
                      name={meal.icon as any} 
                      size={20} 
                      color={selectedMeal === meal.id ? meal.color : 'rgb(var(--text-secondary))'} 
                    />
                    <Text 
                      className={`ml-2 font-medium ${
                        selectedMeal === meal.id ? 'text-brand-primary' : 'text-secondary'
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
                <TouchableOpacity className='border-primary mb-3 flex-row rounded-xl border bg-surface-secondary p-3'>
                  <Image
                    source={{ uri: food.image }}
                    className='mr-3 h-16 w-16 rounded-lg'
                  />
                  <View className='flex-1'>
                    <Text className='text-primary font-semibold'>{food.name}</Text>
                    <Text className='text-secondary text-sm'>{food.serving}</Text>
                    <View className='mt-1 flex-row space-x-3'>
                      <Text className='text-brand-primary text-xs font-semibold'>
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
              <View key={meal.id} className='border-primary mb-4 rounded-xl border bg-surface-secondary p-4'>
                <View className='mb-3 flex-row items-center justify-between'>
                  <View className='flex-row items-center'>
                    <Ionicons 
                      name={mealTypes.find(m => m.id === meal.type)?.icon as any} 
                      size={20} 
                      color={mealTypes.find(m => m.id === meal.type)?.color} 
                    />
                    <Text className='text-primary ml-2 font-semibold capitalize'>
                      {meal.type}
                    </Text>
                  </View>
                  <Text className='text-secondary text-sm'>
                    {meal.items.reduce((sum, item) => sum + item.calories, 0)} cal
                  </Text>
                </View>
                {meal.items.map((item) => (
                  <View key={item.id} className='mb-2'>
                    <View className='flex-row items-center justify-between'>
                      <Text className='text-secondary flex-1'>{item.name}</Text>
                      <Text className='text-brand-primary text-sm font-semibold'>
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
    </KeyboardAvoidingView>
  )
}