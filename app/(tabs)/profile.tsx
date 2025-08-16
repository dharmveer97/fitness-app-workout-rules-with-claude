import React, { useState, useCallback } from 'react'

import { View, Text, ScrollView, Alert, RefreshControl } from 'react-native'

import GoalInput from '@/components/profile/GoalInput'
import ProfileHeader from '@/components/profile/ProfileHeader'
import SettingsItem from '@/components/profile/SettingsItem'
import { SettingsThemeToggle } from '@/components/theme/ThemeToggle'
import { useAuthStore } from '@/stores'

// Import our components

// Types are now globally available from .d.ts files

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore((state) => ({
    user: state.user,
    signOut: state.signOut,
  }))

  const [refreshing, setRefreshing] = useState(false)
  const [showGoalsSection, setShowGoalsSection] = useState(false)

  // Mock user profile data - in a real app, this would come from your API/state
  const userProfile: UserProfile = {
    id: user?.id ?? '1',
    name: user?.name ?? 'John Doe',
    email: user?.email ?? 'john.doe@example.com',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    age: 28,
    height: 180, // cm
    weight: 75, // kg
    gender: 'male',
    fitnessLevel: 'intermediate',
    unitSystem: 'metric',
    joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
    updatedAt: new Date(),
    stats: {
      totalWorkouts: 156,
      totalDuration: 7800, // minutes
      caloriesBurned: 31200,
      averageIntensity: 7.5,
    },
    goals: {
      dailySteps: 10000,
      dailyWater: 2500, // ml
      dailyCalories: 2200,
      weeklyWorkouts: 5,
      sleepHours: 8,
      weightGoal: 70,
      weightGoalDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    },
    preferences: {
      notifications: {
        workoutReminders: true,
        waterReminders: true,
        sleepReminders: false,
      },
      privacy: {
        shareStats: false,
        shareWorkouts: true,
      },
    },
  }

  const [goals, setGoals] = useState<UserGoals>(userProfile.goals)
  const [notifications, setNotifications] = useState(
    userProfile.preferences.notifications,
  )
  const [privacy, setPrivacy] = useState(userProfile.preferences.privacy)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!')
  }

  const handleChangeAvatar = () => {
    Alert.alert('Change Avatar', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => Alert.alert('Camera', 'Camera feature coming soon!'),
      },
      {
        text: 'Gallery',
        onPress: () => Alert.alert('Gallery', 'Gallery feature coming soon!'),
      },
      { text: 'Cancel', style: 'cancel' },
    ])
  }

  const handleGoalChange = (goalType: keyof UserGoals, value: number) => {
    setGoals((prev) => ({
      ...prev,
      [goalType]: value,
    }))
    // In a real app, you'd save this to your API/state
  }

  const handleNotificationToggle = (
    notificationType: keyof typeof notifications,
    value: boolean,
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [notificationType]: value,
    }))
    // In a real app, you'd save this to your API/state
  }

  const handlePrivacyToggle = (
    privacyType: keyof typeof privacy,
    value: boolean,
  ) => {
    setPrivacy((prev) => ({
      ...prev,
      [privacyType]: value,
    }))
    // In a real app, you'd save this to your API/state
  }

  const handleAccountSettings = () => {
    Alert.alert('Account Settings', 'Account management features coming soon!')
  }

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support feature coming soon!')
  }

  const handleAbout = () => {
    Alert.alert(
      'About',
      'Daily fitness Fitness App\nVersion 1.0.0\n\nTrack your fitness journey with style!',
    )
  }

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => signOut(),
      },
    ])
  }

  return (
    <View className='flex-1 bg-surface-primary'>
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
          {/* Profile Header */}
          <View className='mb-8 mt-4'>
            <ProfileHeader
              profile={userProfile}
              onEditPress={handleEditProfile}
              onAvatarPress={handleChangeAvatar}
            />
          </View>

          {/* Goals Section */}
          <View className='mb-8'>
            <View className='border-primary rounded-2xl border bg-surface-secondary p-1'>
              <SettingsItem
                icon='target'
                title='Daily Goals'
                subtitle='Set your daily fitness targets'
                type='navigation'
                color='#10B981'
                onPress={() => setShowGoalsSection(!showGoalsSection)}
              />
            </View>

            {showGoalsSection && (
              <View className='mt-4'>
                <GoalInput
                  icon='footprint-o'
                  label='Daily Steps'
                  value={goals.dailySteps}
                  unit='steps'
                  min={1000}
                  max={30000}
                  step={500}
                  color='#10B981'
                  onValueChange={(value) =>
                    handleGoalChange('dailySteps', value)
                  }
                  delay={100}
                  suggestions={[8000, 10000, 12000, 15000]}
                />

                <GoalInput
                  icon='tint'
                  label='Daily Water'
                  value={goals.dailyWater}
                  unit='ml'
                  min={500}
                  max={5000}
                  step={250}
                  color='#06B6D4'
                  onValueChange={(value) =>
                    handleGoalChange('dailyWater', value)
                  }
                  delay={200}
                  suggestions={[2000, 2500, 3000, 3500]}
                />

                <GoalInput
                  icon='fire'
                  label='Daily Calories'
                  value={goals.dailyCalories}
                  unit='cal'
                  min={1200}
                  max={4000}
                  step={100}
                  color='#F97316'
                  onValueChange={(value) =>
                    handleGoalChange('dailyCalories', value)
                  }
                  delay={300}
                  suggestions={[2000, 2200, 2500, 3000]}
                />

                <GoalInput
                  icon='heartbeat'
                  label='Weekly Workouts'
                  value={goals.weeklyWorkouts}
                  unit='workouts'
                  min={1}
                  max={14}
                  step={1}
                  color='#EF4444'
                  onValueChange={(value) =>
                    handleGoalChange('weeklyWorkouts', value)
                  }
                  delay={400}
                  suggestions={[3, 4, 5, 6, 7]}
                />
              </View>
            )}
          </View>

          {/* Notifications Section */}
          <View className='mb-8'>
            <Text className='text-primary mb-4 text-xl font-bold'>
              Notifications
            </Text>
            <View className='space-y-1'>
              <SettingsItem
                icon='bell'
                title='Workout Reminders'
                subtitle='Get reminded about your scheduled workouts'
                type='switch'
                color='#EF4444'
                value={notifications.workoutReminders}
                onToggle={(value) =>
                  handleNotificationToggle('workoutReminders', value)
                }
                delay={100}
              />

              <SettingsItem
                icon='tint'
                title='Water Reminders'
                subtitle='Stay hydrated with regular water reminders'
                type='switch'
                color='#06B6D4'
                value={notifications.waterReminders}
                onToggle={(value) =>
                  handleNotificationToggle('waterReminders', value)
                }
                delay={150}
              />

              <SettingsItem
                icon='moon-o'
                title='Sleep Reminders'
                subtitle="Get reminded when it's time to sleep"
                type='switch'
                color='#8B5CF6'
                value={notifications.sleepReminders}
                onToggle={(value) =>
                  handleNotificationToggle('sleepReminders', value)
                }
                delay={200}
              />
            </View>
          </View>

          {/* Privacy Section */}
          <View className='mb-8'>
            <Text className='text-primary mb-4 text-xl font-bold'>Privacy</Text>
            <View className='space-y-1'>
              <SettingsItem
                icon='share'
                title='Share Stats'
                subtitle='Allow others to see your fitness stats'
                type='switch'
                color='#10B981'
                value={privacy.shareStats}
                onToggle={(value) => handlePrivacyToggle('shareStats', value)}
                delay={100}
              />

              <SettingsItem
                icon='heartbeat'
                title='Share Workouts'
                subtitle='Allow others to see your workout activities'
                type='switch'
                color='#EF4444'
                value={privacy.shareWorkouts}
                onToggle={(value) =>
                  handlePrivacyToggle('shareWorkouts', value)
                }
                delay={150}
              />
            </View>
          </View>

          {/* Appearance Section */}
          <View className='mb-8'>
            <Text className='text-primary mb-4 text-xl font-bold'>
              Appearance
            </Text>
            <View className='border-primary rounded-2xl border bg-surface-secondary p-4'>
              <View className='mb-4'>
                <Text className='text-primary mb-2 text-lg font-semibold'>
                  Theme
                </Text>
                <Text className='text-secondary mb-4 text-sm'>
                  Choose your preferred theme
                </Text>
                <SettingsThemeToggle />
              </View>
            </View>
          </View>

          {/* General Settings */}
          <View className='mb-8'>
            <Text className='text-primary mb-4 text-xl font-bold'>General</Text>
            <View className='space-y-1'>
              <SettingsItem
                icon='user'
                title='Account Settings'
                subtitle='Manage your account details and preferences'
                type='navigation'
                color='#6B7280'
                onPress={handleAccountSettings}
                delay={100}
              />

              <SettingsItem
                icon='globe'
                title='Units'
                subtitle='Metric system'
                value={
                  userProfile.unitSystem === 'metric' ? 'Metric' : 'Imperial'
                }
                type='value'
                color='#6B7280'
                onPress={() =>
                  Alert.alert('Units', 'Unit system settings coming soon!')
                }
                delay={150}
              />

              <SettingsItem
                icon='question-circle'
                title='Help & Support'
                subtitle='Get help or contact our support team'
                type='navigation'
                color='#6B7280'
                onPress={handleSupport}
                delay={200}
              />

              <SettingsItem
                icon='info-circle'
                title='About'
                subtitle='App version and information'
                type='navigation'
                color='#6B7280'
                onPress={handleAbout}
                delay={250}
              />
            </View>
          </View>

          {/* Sign Out */}
          <View className='mb-8'>
            <SettingsItem
              icon='sign-out'
              title='Sign Out'
              subtitle='Sign out of your account'
              type='action'
              color='#EF4444'
              onPress={handleSignOut}
              destructive
            />
          </View>

          {/* Footer spacing */}
          <View className='h-8' />
        </View>
      </ScrollView>
    </View>
  )
}
