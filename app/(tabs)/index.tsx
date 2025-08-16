import React, { useCallback, useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native'

import { router } from 'expo-router'

import { FontAwesome } from '@expo/vector-icons'

// Import our new components
import ActivityItem from '@/components/home/ActivityItem'
import ProgressRing from '@/components/home/ProgressRing'
import QuickActionButton from '@/components/home/QuickActionButton'
import StatsCard from '@/components/home/StatsCard'
import WeeklyChart from '@/components/home/WeeklyChart'
import { useAuthStore } from '@/stores'

// Types are now globally available from .d.ts files

export default function HomeScreen() {
  const { user, accessToken } = useAuthStore((state) => ({
    user: state.user,
    accessToken: state.accessToken,
  }))

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
      <View className='flex-1 items-center justify-center bg-[#111827]'>
        <Text className='text-lg text-white'>Loading...</Text>
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

  const dailyGoals: ProgressRingDataWithIcon[] = [
    {
      value: 8432,
      maxValue: 10000,
      color: '#10B981',
      label: 'Steps',
      icon: 'footprint-o',
    },
    {
      value: 642,
      maxValue: 800,
      color: '#F97316',
      label: 'Calories',
      unit: 'cal',
      icon: 'fire',
    },
    {
      value: 1.8,
      maxValue: 2.5,
      color: '#06B6D4',
      label: 'Water',
      unit: 'L',
      icon: 'tint',
    },
  ]

  const weeklyData: ChartDataPoint[] = [
    { label: 'Monday', value: 7832 },
    { label: 'Tuesday', value: 9124 },
    { label: 'Wednesday', value: 6543 },
    { label: 'Thursday', value: 8901 },
    { label: 'Friday', value: 10234 },
    { label: 'Saturday', value: 11567 },
    { label: 'Sunday', value: 8432 },
  ]

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
    <View className='flex-1 bg-[#0A0A0B]'>
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
              <Text className='text-lg text-gray-400'>Good morning</Text>
              <Text className='text-3xl font-bold text-white'>
                {user?.name ?? 'Athlete'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/profile')}
              className='h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-[#18181B]'
            >
              <FontAwesome name='user' size={20} color='#10B981' />
            </TouchableOpacity>
          </View>

          {/* Today's Stats Cards */}
          <View className='mb-8'>
            <Text className='mb-4 text-xl font-bold text-white'>
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
            <Text className='mb-4 text-xl font-bold text-white'>
              Daily Goals
            </Text>
            <View className='rounded-2xl border border-gray-800/50 bg-[#18181B] p-6'>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className='flex-row space-x-8'>
                  {dailyGoals.map((goal, index) => (
                    <ProgressRing
                      key={goal.label}
                      {...goal}
                      delay={200 + index * 150}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Weekly Progress Chart */}
          <View className='mb-8'>
            <WeeklyChart
              data={weeklyData}
              title='Weekly Steps'
              color='#10B981'
              delay={400}
            />
          </View>

          {/* Quick Actions */}
          <View className='mb-8'>
            <Text className='mb-4 text-xl font-bold text-white'>
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
              <Text className='text-xl font-bold text-white'>
                Recent Activities
              </Text>
              <TouchableOpacity>
                <Text className='text-base font-semibold text-[#10B981]'>
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
