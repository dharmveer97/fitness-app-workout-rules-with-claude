import React, { useState, useCallback } from 'react'

import {
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

// Import themed components for proper dark/light mode
import { View, Text, useThemeColor } from '@/components/Themed'

// Types are now globally available from .d.ts files

export default function WorkoutsScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [_selectedCategory, setSelectedCategory] = useState<string>('all')

  // Get theme-aware border color
  const borderColor = useThemeColor(
    { light: '#E8ECF0', dark: '#30363D' },
    'text',
  )

  // Mock data - in a real app, this would come from your API/state
  const workoutCategories: WorkoutCategory[] = [
    {
      id: '1',
      name: 'Strength',
      type: 'strength',
      description: 'Build muscle and increase power',
      workoutCount: 24,
      estimatedCalories: 400,
      averageDuration: 45,
      color: '#EF4444',
    },
    {
      id: '2',
      name: 'Cardio',
      type: 'cardio',
      description: 'Improve heart health and endurance',
      workoutCount: 18,
      estimatedCalories: 350,
      averageDuration: 30,
      color: '#3B82F6',
    },
    {
      id: '3',
      name: 'HIIT',
      type: 'hiit',
      description: 'High intensity interval training',
      workoutCount: 12,
      estimatedCalories: 500,
      averageDuration: 20,
      color: '#F97316',
    },
    {
      id: '4',
      name: 'Yoga',
      type: 'yoga',
      description: 'Flexibility and mindfulness',
      workoutCount: 15,
      estimatedCalories: 200,
      averageDuration: 60,
      color: '#8B5CF6',
    },
  ]

  const recommendedWorkouts: Workout[] = [
    {
      id: '1',
      name: 'Upper Body Strength',
      type: 'strength',
      difficulty: 'intermediate',
      duration: 45,
      calories: 420,
      description: 'Focus on chest, shoulders, and arms',
      exercises: [],
      targetMuscleGroups: ['Chest', 'Shoulders', 'Arms'],
      equipment: ['Dumbbells', 'Bench'],
      isCompleted: false,
    },
    {
      id: '2',
      name: 'Morning Cardio Blast',
      type: 'cardio',
      difficulty: 'beginner',
      duration: 30,
      calories: 320,
      description: 'Start your day with energy',
      exercises: [],
      targetMuscleGroups: ['Full Body'],
      equipment: ['None'],
      isCompleted: false,
    },
    {
      id: '3',
      name: 'HIIT Fat Burner',
      type: 'hiit',
      difficulty: 'advanced',
      duration: 25,
      calories: 480,
      description: 'High intensity fat burning session',
      exercises: [],
      targetMuscleGroups: ['Full Body'],
      equipment: ['None'],
      isCompleted: false,
    },
  ]

  const recentWorkouts: WorkoutSession[] = [
    {
      id: '1',
      workoutId: '1',
      workout: recommendedWorkouts[0],
      startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
      actualDuration: 45,
      caloriesBurned: 420,
      exercises: [],
    },
    {
      id: '2',
      workoutId: '2',
      workout: recommendedWorkouts[1],
      startTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 48 * 60 * 60 * 1000 + 30 * 60 * 1000),
      actualDuration: 30,
      caloriesBurned: 320,
      exercises: [],
    },
  ]

  const weeklyStats = {
    completedWorkouts: 4,
    totalMinutes: 180,
    totalCalories: 1240,
    goalWorkouts: 5,
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const handleCategoryPress = (category: WorkoutCategory) => {
    setSelectedCategory(category.id)
    Alert.alert(
      category.name,
      `Showing ${category.name.toLowerCase()} workouts`,
    )
  }

  const handleWorkoutPress = (workout: Workout) => {
    Alert.alert(
      workout.name,
      `Duration: ${workout.duration} min\nDifficulty: ${workout.difficulty}\nCalories: ~${workout.calories}`,
    )
  }

  const handleStartWorkout = (workout: Workout) => {
    Alert.alert(
      'Start Workout',
      `Ready to start "${workout.name}"?\n\nDuration: ${workout.duration} min\nEstimated calories: ${workout.calories}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start',
          onPress: () =>
            Alert.alert(
              'Workout Started!',
              'Workout tracking feature coming soon!',
            ),
        },
      ],
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10B981'
      case 'intermediate':
        return '#F59E0B'
      case 'advanced':
        return '#EF4444'
      default:
        return '#6B7280'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'leaf'
      case 'intermediate':
        return 'fire'
      case 'advanced':
        return 'trophy'
      default:
        return 'circle'
    }
  }

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <View className='flex-1'>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#10B981'
          />
        }
        showsVerticalScrollIndicator={false}
        className='flex-1'
      >
        <View className='px-6 py-4'>
          {/* Header */}
          <View className='mb-8 mt-4 flex-row items-center justify-between'>
            <View>
              <Text className='text-3xl font-bold text-white'>Workouts</Text>
              <Text className='text-base text-gray-400'>
                {weeklyStats.completedWorkouts}/{weeklyStats.goalWorkouts} this
                week
              </Text>
            </View>
            <TouchableOpacity className='h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-[#18181B]'>
              <FontAwesome name='search' size={20} color='#10B981' />
            </TouchableOpacity>
          </View>

          {/* Weekly Progress */}
          <View className='mb-8 rounded-2xl border border-gray-800/50 bg-[#18181B] p-6'>
            <Text className='mb-4 text-xl font-bold text-white'>This Week</Text>
            <View className='flex-row items-center space-x-6'>
              <View className='items-center'>
                <View className='relative mr-3 h-16 w-16 items-center justify-center rounded-full bg-gray-800'>
                  <View
                    className='absolute inset-0 rounded-full border-4 border-gray-700'
                    style={{
                      borderTopColor:
                        weeklyStats.completedWorkouts >=
                        weeklyStats.goalWorkouts
                          ? '#10B981'
                          : '#374151',
                      borderRightColor:
                        weeklyStats.completedWorkouts >=
                        weeklyStats.goalWorkouts * 0.75
                          ? '#10B981'
                          : '#374151',
                      borderBottomColor:
                        weeklyStats.completedWorkouts >=
                        weeklyStats.goalWorkouts * 0.5
                          ? '#10B981'
                          : '#374151',
                      borderLeftColor:
                        weeklyStats.completedWorkouts >=
                        weeklyStats.goalWorkouts * 0.25
                          ? '#10B981'
                          : '#374151',
                      transform: [{ rotate: '-90deg' }],
                    }}
                  />
                  <Text className='text-lg font-bold text-white'>
                    {weeklyStats.completedWorkouts}
                  </Text>
                </View>
                <Text className='mt-2 text-sm text-gray-400'>Workouts</Text>
              </View>

              <View className='flex-1'>
                <View className='mb-2 flex-row justify-between'>
                  <Text className='text-sm text-gray-400'>Minutes</Text>
                  <Text className='text-sm font-semibold text-white'>
                    {weeklyStats.totalMinutes}
                  </Text>
                </View>
                <View className='mb-2 flex-row justify-between'>
                  <Text className='text-sm text-gray-400'>Calories</Text>
                  <Text className='text-sm font-semibold text-white'>
                    {weeklyStats.totalCalories}
                  </Text>
                </View>
                <View className='flex-row justify-between'>
                  <Text className='text-sm text-gray-400'>Goal Progress</Text>
                  <Text className='text-sm font-semibold text-[#10B981]'>
                    {Math.round(
                      (weeklyStats.completedWorkouts /
                        weeklyStats.goalWorkouts) *
                        100,
                    )}
                    %
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Workout Categories */}
          <View className='mb-8'>
            <Text className='mb-4 text-xl font-bold'>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className='flex-row'>
                {workoutCategories.map((category, index) => (
                  <View
                    key={category.id}
                    lightColor='transparent'
                    darkColor='transparent'
                    className={
                      index !== workoutCategories.length - 1 ? 'mr-4' : ''
                    }
                  >
                    <View
                      lightColor='#FAFBFC'
                      darkColor='#161B22'
                      className='min-w-[140px] rounded-2xl border p-4'
                      style={{
                        borderColor,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => handleCategoryPress(category)}
                        className='w-full'
                      >
                        <View
                          lightColor='transparent'
                          darkColor='transparent'
                          className='mb-3 h-12 w-12 items-center justify-center rounded-xl'
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <FontAwesome
                            name={
                              category.type === 'strength'
                                ? 'male'
                                : category.type === 'cardio'
                                  ? 'heart'
                                  : category.type === 'hiit'
                                    ? 'fire'
                                    : 'leaf'
                            }
                            size={20}
                            color={category.color}
                          />
                        </View>
                        <Text className='mb-1 text-base font-semibold'>
                          {category.name}
                        </Text>
                        <Text
                          className='mb-2 text-xs'
                          numberOfLines={2}
                          lightColor='#677788'
                          darkColor='#8B949E'
                        >
                          {category.description}
                        </Text>
                        <Text
                          className='text-xs'
                          lightColor='#9AA5B1'
                          darkColor='#6E7681'
                        >
                          {category.workoutCount} workouts
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Recommended Workouts */}
          <View className='mb-8'>
            <View className='mb-4 flex-row items-center justify-between'>
              <Text className='text-xl font-bold text-white'>Recommended</Text>
              <TouchableOpacity>
                <Text className='text-base font-semibold text-[#10B981]'>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            {recommendedWorkouts.map((workout) => (
              <View
                key={workout.id}
                className='mb-4 rounded-2xl border border-gray-800/50 bg-[#18181B] p-4'
              >
                <TouchableOpacity onPress={() => handleWorkoutPress(workout)}>
                  <View className='mb-3 flex-row items-center justify-between'>
                    <View className='flex-1'>
                      <Text className='mb-1 text-lg font-bold text-white'>
                        {workout.name}
                      </Text>
                      <Text
                        className='mb-2 text-sm text-gray-400'
                        numberOfLines={2}
                      >
                        {workout.description}
                      </Text>
                      <View className='flex-row items-center space-x-4'>
                        <View className='flex-row items-center space-x-1'>
                          <FontAwesome
                            name='clock-o'
                            size={12}
                            color='#6B7280'
                          />
                          <Text className='text-xs text-gray-400'>
                            {workout.duration} min
                          </Text>
                        </View>
                        <View className='flex-row items-center space-x-1'>
                          <FontAwesome name='fire' size={12} color='#F97316' />
                          <Text className='text-xs text-gray-400'>
                            {workout.calories} cal
                          </Text>
                        </View>
                        <View
                          className='flex-row items-center space-x-1 rounded-full px-2 py-1'
                          style={{
                            backgroundColor: `${getDifficultyColor(workout.difficulty)}20`,
                          }}
                        >
                          <FontAwesome
                            name={getDifficultyIcon(workout.difficulty)}
                            size={10}
                            color={getDifficultyColor(workout.difficulty)}
                          />
                          <Text
                            className='text-xs font-semibold capitalize'
                            style={{
                              color: getDifficultyColor(workout.difficulty),
                            }}
                          >
                            {workout.difficulty}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleStartWorkout(workout)}
                      className='ml-4 h-12 w-12 items-center justify-center rounded-full bg-[#10B981]'
                    >
                      <FontAwesome name='play' size={16} color='white' />
                    </TouchableOpacity>
                  </View>

                  {workout.targetMuscleGroups && (
                    <View className='flex-row flex-wrap gap-2'>
                      {workout.targetMuscleGroups.map((muscle, muscleIndex) => (
                        <View
                          key={muscleIndex}
                          className='rounded-full bg-gray-800 px-2 py-1'
                        >
                          <Text className='text-xs text-gray-300'>
                            {muscle}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Recent Workouts */}
          <View className='mb-8'>
            <View className='mb-4 flex-row items-center justify-between'>
              <View>
                <Text className='text-2xl font-bold text-white'>
                  Recent Activity
                </Text>
                <Text className='text-sm text-gray-400 mt-1'>
                  Your workout history
                </Text>
              </View>
              <TouchableOpacity className='bg-[#10B981]/10 px-4 py-2 rounded-full flex-row items-center'>
                <FontAwesome name='history' size={14} color='#10B981' />
                <Text className='text-sm font-semibold text-[#10B981] ml-2'>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View className='space-y-4'>
              {recentWorkouts.map((session, index) => (
                <TouchableOpacity
                  key={session.id}
                  className='overflow-hidden'
                >
                  <View className='rounded-2xl bg-gradient-to-r from-[#10B981]/5 to-transparent border border-gray-800/30 p-1'>
                    <View className='rounded-[15px] bg-[#18181B] p-5'>
                      <View className='flex-row items-start justify-between mb-3'>
                        <View className='flex-row items-center flex-1'>
                          <View className='h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] shadow-lg'>
                            <FontAwesome name='check' size={20} color='white' />
                          </View>
                          <View className='ml-4 flex-1'>
                            <Text className='text-lg font-bold text-white mb-1'>
                              {session.workout.name}
                            </Text>
                            <View className='flex-row items-center'>
                              <View className='bg-[#10B981]/20 px-2 py-1 rounded-full mr-2'>
                                <Text className='text-xs font-semibold text-[#10B981]'>
                                  Completed
                                </Text>
                              </View>
                              <Text className='text-xs text-gray-500'>
                                {formatDate(session.startTime)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      
                      <View className='flex-row items-center justify-between bg-gray-900/50 rounded-xl p-3'>
                        <View className='flex-row items-center flex-1'>
                          <View className='flex-row items-center mr-6'>
                            <View className='h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 mr-2'>
                              <FontAwesome name='clock-o' size={14} color='#3B82F6' />
                            </View>
                            <View>
                              <Text className='text-xs text-gray-500'>Duration</Text>
                              <Text className='text-sm font-bold text-white'>
                                {session.actualDuration} min
                              </Text>
                            </View>
                          </View>
                          
                          <View className='flex-row items-center mr-6'>
                            <View className='h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 mr-2'>
                              <FontAwesome name='fire' size={14} color='#F97316' />
                            </View>
                            <View>
                              <Text className='text-xs text-gray-500'>Calories</Text>
                              <Text className='text-sm font-bold text-orange-400'>
                                {session.caloriesBurned}
                              </Text>
                            </View>
                          </View>
                          
                          <View className='flex-row items-center'>
                            <View className='h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 mr-2'>
                              <FontAwesome name='line-chart' size={14} color='#8B5CF6' />
                            </View>
                            <View>
                              <Text className='text-xs text-gray-500'>Intensity</Text>
                              <Text className='text-sm font-bold text-purple-400'>
                                High
                              </Text>
                            </View>
                          </View>
                        </View>
                        
                        <View className='h-10 w-10 items-center justify-center rounded-full bg-gray-800'>
                          <FontAwesome name='chevron-right' size={14} color='#10B981' />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Footer spacing */}
          <View className='h-8' />
        </View>
      </ScrollView>
    </View>
  )
}
