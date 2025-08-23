import React, { useCallback, useState } from 'react'

import {
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native'

import { router } from 'expo-router'

import { FontAwesome } from '@expo/vector-icons'

// Import themed components for proper dark/light mode
import ActivityItem from '@/components/home/ActivityItem'
import QuickActionButton from '@/components/home/QuickActionButton'
import StatsCard from '@/components/home/StatsCard'
import { HeaderThemeToggle } from '@/components/theme/ThemeToggle'
import { View, Text } from '@/components/Themed'
import { useAuthStore } from '@/stores'

const selectUser = (state: any) => state.user
const selectAccessToken = (state: any) => state.accessToken

export default function HomeScreen() {
  const user = useAuthStore(selectUser)
  const accessToken = useAuthStore(selectAccessToken)

  const isAuthenticated = Boolean(accessToken)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Handlers for user interactions (must be before early returns)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  const handleStatsPress = useCallback((statTitle: string) => {
    Alert.alert('Stat Pressed', `You pressed ${statTitle}`)
  }, [])

  const _handleGoalPress = useCallback((goalLabel: string) => {
    Alert.alert('Goal Pressed', `You pressed ${goalLabel} goal`)
  }, [])

  const handleQuickAction = useCallback((actionTitle: string) => {
    Alert.alert('Quick Action', `You pressed ${actionTitle}`)
  }, [])

  const handleActivityPress = useCallback((activity: any) => {
    Alert.alert('Activity Details', `View details for ${activity.title}`)
  }, [])

  // Safety check - redirect if not authenticated
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!isAuthenticated) {
        router.replace('/(auth)/sign-in')
      }
    }, 500) // Small delay to prevent flash

    return () => clearTimeout(timer)
  }, [isAuthenticated])

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center bg-surface-primary'>
        <Text className='text-primary text-lg'>Loading...</Text>
      </View>
    )
  }

  // If not authenticated, show nothing (will redirect)
  if (!isAuthenticated || !user) {
    return null
  }

  // Mock data - in a real app, this would come from your API/state
  const todayStats: StatsCardData[] = [
    {
      title: 'Steps',
      value: 8432,
      unit: '',
      change: 12,
      changeLabel: 'vs yesterday',
      icon: 'footprint-o',
      color: '#10B981',
      trend: 'up',
    },
    {
      title: 'Calories Burned',
      value: 642,
      unit: 'cal',
      change: -5,
      changeLabel: 'vs yesterday',
      icon: 'fire',
      color: '#F97316',
      trend: 'down',
    },
    {
      title: 'Active Time',
      value: 47,
      unit: 'min',
      change: 23,
      changeLabel: 'vs yesterday',
      icon: 'clock-o',
      color: '#3B82F6',
      trend: 'up',
    },
    {
      title: 'Water Intake',
      value: 1.8,
      unit: 'L',
      change: 8,
      changeLabel: 'vs yesterday',
      icon: 'tint',
      color: '#06B6D4',
      trend: 'up',
    },
  ]

  const dailyGoals = [
    {
      label: 'Steps',
      value: 8432,
      maxValue: 10000,
      color: '#10B981',
      icon: 'footprint-o',
    },
    {
      label: 'Calories',
      value: 642,
      maxValue: 800,
      color: '#F97316',
      icon: 'fire',
      unit: 'cal',
    },
    {
      label: 'Water',
      value: 1.8,
      maxValue: 2.5,
      color: '#06B6D4',
      icon: 'tint',
      unit: 'L',
    },
  ]

  // Weekly data temporarily removed

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'workout',
      title: 'Morning Run',
      description: 'Central Park Loop',
      value: 5.2,
      unit: 'km',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      calories: 342,
      duration: 28,
    },
    {
      id: '2',
      type: 'water',
      title: 'Water Logged',
      value: 500,
      unit: 'ml',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'meal',
      title: 'Protein Shake',
      description: 'Post-workout recovery',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      calories: 285,
    },
  ]

  return (
    <View className='flex-1'>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='rgb(var(--text-brand))'
          />
        }
        showsVerticalScrollIndicator={false}
        className='flex-1'
      >
        <View className='px-6 py-4'>
          {/* Header */}
          <View className='mb-8 mt-4 flex-row items-center justify-between'>
            <View className='flex-1'>
              <Text className='text-secondary text-lg'>Good morning</Text>
              <Text className='text-primary text-3xl font-bold'>
                {user?.name ?? 'Athlete'}
              </Text>
            </View>
            <View className='flex-row items-center space-x-3'>
              <HeaderThemeToggle />
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/profile')}
                className='border-primary h-12 w-12 items-center justify-center rounded-full border bg-surface-secondary'
              >
                <FontAwesome
                  name='user'
                  size={20}
                  color='rgb(var(--text-brand))'
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Today's Stats Cards */}
          <View className='mb-8'>
            <Text className='text-primary mb-4 text-xl font-bold'>
              Today's Stats
            </Text>
            <View className='flex-row flex-wrap justify-between'>
              {todayStats.map((stat, index) => (
                <View key={stat.title} className='mb-4 w-[48%]'>
                  <StatsCard
                    {...stat}
                    delay={index * 100}
                    onPress={() => handleStatsPress(stat.title)}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Daily Goals Progress Rings */}
          <View className='mb-8'>
            <Text className='text-primary mb-4 text-xl font-bold'>
              Daily Goals
            </Text>
            <View className='border-primary rounded-2xl border bg-surface-secondary p-6'>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className='flex-row'>
                  {dailyGoals.map((goal, index) => (
                    <View
                      key={goal.label}
                      className={`items-center ${index !== dailyGoals.length - 1 ? 'mr-8' : ''}`}
                    >
                      <View className='relative h-20 w-20 items-center justify-center rounded-full bg-gray-800'>
                        <View
                          className='absolute inset-1 rounded-full border-4'
                          style={{
                            borderColor: goal.color,
                            borderTopColor:
                              goal.value >= goal.maxValue
                                ? goal.color
                                : '#374151',
                            borderRightColor:
                              goal.value >= goal.maxValue * 0.75
                                ? goal.color
                                : '#374151',
                            borderBottomColor:
                              goal.value >= goal.maxValue * 0.5
                                ? goal.color
                                : '#374151',
                            borderLeftColor:
                              goal.value >= goal.maxValue * 0.25
                                ? goal.color
                                : '#374151',
                            transform: [{ rotate: '-90deg' }],
                          }}
                        />
                        <Text className='text-sm font-bold text-white'>
                          {typeof goal.value === 'number' && goal.value < 10
                            ? goal.value.toFixed(1)
                            : Math.round(goal.value)}
                        </Text>
                      </View>
                      <Text className='mt-2 text-xs text-gray-400'>
                        {goal.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Weekly Progress Chart - Temporarily Disabled */}
          <View className='mb-8'>
            <View className='border-primary rounded-2xl border bg-surface-secondary p-4'>
              <Text className='text-primary mb-4 text-xl font-bold'>
                Weekly Steps
              </Text>
              <View className='h-48 items-center justify-center'>
                <Text className='text-secondary text-center'>
                  Chart temporarily unavailable
                </Text>
                <Text className='text-tertiary text-center text-sm'>
                  Will be restored soon
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className='mb-8'>
            <Text className='text-primary mb-4 text-xl font-bold'>
              Quick Actions
            </Text>
            <View className='flex-row flex-wrap gap-3'>
              <View className='w-[48%]'>
                <QuickActionButton
                  title='Start Workout'
                  icon='heartbeat'
                  color='#EF4444'
                  onPress={() => handleQuickAction('workout')}
                  delay={500}
                />
              </View>
              <View className='w-[48%]'>
                <QuickActionButton
                  title='Log Meal'
                  icon='cutlery'
                  color='#F97316'
                  onPress={() => handleQuickAction('meal')}
                  delay={550}
                  variant='secondary'
                />
              </View>
              <View className='w-[48%]'>
                <QuickActionButton
                  title='Track Water'
                  icon='tint'
                  color='#06B6D4'
                  onPress={() => handleQuickAction('water')}
                  delay={600}
                  variant='secondary'
                />
              </View>
              <View className='w-[48%]'>
                <QuickActionButton
                  title='Log Sleep'
                  icon='moon-o'
                  color='#8B5CF6'
                  onPress={() => handleQuickAction('sleep')}
                  delay={650}
                  variant='secondary'
                />
              </View>
            </View>
          </View>

          {/* Recent Activities */}
          <View className='mb-8'>
            <View className='mb-4 flex-row items-center justify-between'>
              <Text className='text-primary text-xl font-bold'>
                Recent Activities
              </Text>
              <TouchableOpacity>
                <Text className='text-brand text-base font-semibold'>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                onPress={() => handleActivityPress(activity)}
                delay={700 + index * 50}
              />
            ))}
          </View>

          {/* Footer spacing */}
          <View className='h-8' />
        </View>
      </ScrollView>
    </View>
  )
}
