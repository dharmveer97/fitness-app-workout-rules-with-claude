import React, { useState } from 'react'

import { ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'

import { View, Text } from '@/components/Themed'
import { Button, ButtonText } from '@/components/ui/button'

const { width: _width } = Dimensions.get('window')

interface Challenge {
  id: string
  title: string
  description: string
  category: 'fitness' | 'nutrition' | 'mindfulness' | 'hydration'
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  tasks: Task[]
  progress: number
  daysLeft: number
  participants: number
  image?: string
  color: string
}

interface Task {
  id: string
  title: string
  completed: boolean
  points: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: Date
  progress?: number
  total?: number
}

export default function ChallengesScreen() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  )
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'active' | 'available' | 'completed'
  >('active')

  const activeChallenges: Challenge[] = [
    {
      id: '1',
      title: '7-Day Hydration Challenge',
      description: 'Drink 8 glasses of water daily for a week',
      category: 'hydration',
      difficulty: 'easy',
      points: 100,
      progress: 57,
      daysLeft: 3,
      participants: 234,
      color: '#06B6D4',
      tasks: [
        {
          id: 't1',
          title: 'Drink water upon waking',
          completed: true,
          points: 10,
        },
        {
          id: 't2',
          title: 'Drink 2 glasses before lunch',
          completed: true,
          points: 15,
        },
        {
          id: 't3',
          title: 'Drink 2 glasses in afternoon',
          completed: false,
          points: 15,
        },
        {
          id: 't4',
          title: 'Complete daily water goal',
          completed: false,
          points: 20,
        },
        { id: 't5', title: 'Log water intake', completed: true, points: 10 },
      ],
    },
    {
      id: '2',
      title: '30-Day Fitness Journey',
      description: 'Complete daily workouts and build consistency',
      category: 'fitness',
      difficulty: 'medium',
      points: 500,
      progress: 23,
      daysLeft: 23,
      participants: 1567,
      color: '#EF4444',
      tasks: [
        {
          id: 't6',
          title: '30 min cardio workout',
          completed: false,
          points: 30,
        },
        { id: 't7', title: '10,000 steps', completed: true, points: 25 },
        { id: 't8', title: 'Strength training', completed: false, points: 35 },
        {
          id: 't9',
          title: 'Post-workout stretching',
          completed: false,
          points: 15,
        },
        {
          id: 't10',
          title: 'Log workout details',
          completed: false,
          points: 10,
        },
      ],
    },
  ]

  const availableChallenges: Challenge[] = [
    {
      id: '3',
      title: 'Mindful Mornings',
      description: '14 days of morning meditation and journaling',
      category: 'mindfulness',
      difficulty: 'easy',
      points: 200,
      progress: 0,
      daysLeft: 14,
      participants: 892,
      color: '#8B5CF6',
      tasks: [],
    },
    {
      id: '4',
      title: 'Clean Eating Challenge',
      description: 'Eat whole foods for 21 days',
      category: 'nutrition',
      difficulty: 'hard',
      points: 750,
      progress: 0,
      daysLeft: 21,
      participants: 445,
      color: '#10B981',
      tasks: [],
    },
  ]

  const achievements: Achievement[] = [
    {
      id: 'a1',
      title: 'Early Bird',
      description: 'Complete 5 morning workouts',
      icon: 'sunny',
      earned: true,
      earnedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'a2',
      title: 'Hydration Hero',
      description: 'Meet water goals for 7 days',
      icon: 'water',
      earned: false,
      progress: 4,
      total: 7,
    },
    {
      id: 'a3',
      title: 'Streak Master',
      description: 'Maintain a 30-day streak',
      icon: 'flame',
      earned: false,
      progress: 12,
      total: 30,
    },
    {
      id: 'a4',
      title: 'Challenge Champion',
      description: 'Complete 10 challenges',
      icon: 'trophy',
      earned: false,
      progress: 3,
      total: 10,
    },
  ]

  const handleTaskToggle = (challengeId: string, taskId: string) => {
    // In a real app, this would update the state/backend
    console.log('Toggle task:', taskId, 'in challenge:', challengeId)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fitness':
        return 'fitness'
      case 'nutrition':
        return 'nutrition'
      case 'mindfulness':
        return 'flower'
      case 'hydration':
        return 'water'
      default:
        return 'star'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#10B981'
      case 'medium':
        return '#F97316'
      case 'hard':
        return '#EF4444'
      default:
        return '#6B7280'
    }
  }

  const renderChallenge = (challenge: Challenge, index: number) => (
    <Animated.View
      key={challenge.id}
      entering={FadeInDown.delay(200 + index * 100).duration(600)}
    >
      <TouchableOpacity
        onPress={() => {
          setSelectedChallenge(challenge)
          setShowModal(true)
        }}
        className='mb-6 overflow-hidden'
        style={{
          shadowColor: challenge.color,
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 8,
        }}
      >
        <LinearGradient
          colors={[
            challenge.color,
            `${challenge.color}DD`,
            `${challenge.color}BB`,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 24, padding: 3 }}
        >
          <View className='overflow-hidden rounded-[21px] bg-surface-secondary'>
            <LinearGradient
              colors={[
                'rgba(255,255,255,0.05)',
                'transparent',
                `${challenge.color}10`,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 20 }}
            >
              {/* Header */}
              <View className='mb-4 flex-row items-start justify-between'>
                <View className='mr-3 flex-1'>
                  <View className='mb-3 flex-row items-center'>
                    <View
                      className='mr-3 h-12 w-12 items-center justify-center rounded-2xl shadow-lg'
                      style={{
                        backgroundColor: challenge.color,
                        shadowColor: challenge.color,
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                      }}
                    >
                      <Ionicons
                        name={getCategoryIcon(challenge.category) as any}
                        size={24}
                        color='white'
                      />
                    </View>
                    <View className='flex-1'>
                      <Text className='text-primary mb-1 text-xl font-bold'>
                        {challenge.title}
                      </Text>
                      <View className='flex-row items-center'>
                        <View
                          className='mr-2 rounded-full px-3 py-1'
                          style={{
                            backgroundColor: `${getDifficultyColor(challenge.difficulty)}20`,
                          }}
                        >
                          <Text
                            className='text-xs font-bold capitalize'
                            style={{
                              color: getDifficultyColor(challenge.difficulty),
                            }}
                          >
                            {challenge.difficulty}
                          </Text>
                        </View>
                        <View className='rounded-full bg-yellow-500/20 px-3 py-1'>
                          <Text className='text-xs font-bold text-yellow-500'>
                            ⭐ {challenge.points} pts
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <Text className='text-secondary mb-4 text-base leading-relaxed'>
                    {challenge.description}
                  </Text>
                </View>
              </View>

              {/* Progress Section */}
              <View className='mb-4 rounded-2xl bg-black/10 p-4 backdrop-blur-sm'>
                <View className='mb-3 flex-row items-center justify-between'>
                  <Text className='text-primary font-bold'>
                    Progress Tracking
                  </Text>
                  <Text
                    className='text-2xl font-black'
                    style={{ color: challenge.color }}
                  >
                    {challenge.progress}%
                  </Text>
                </View>

                <View className='mb-2 h-3 overflow-hidden rounded-full bg-surface-primary'>
                  <LinearGradient
                    colors={[challenge.color, `${challenge.color}CC`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: `${challenge.progress}%`,
                      height: '100%',
                      borderRadius: 12,
                    }}
                  />
                </View>

                <Text className='text-tertiary text-xs'>
                  {Math.round((challenge.progress / 100) * challenge.daysLeft)}{' '}
                  of {challenge.daysLeft} days completed
                </Text>
              </View>

              {/* Stats Row */}
              <View className='flex-row gap-2 justify-between'>
                <View className='flex-1 flex-row items-center rounded-xl bg-surface-primary px-3 py-2'>
                  <View className='mr-2 h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20'>
                    <Ionicons name='time-outline' size={16} color='#3B82F6' />
                  </View>
                  <View>
                    <Text className='text-primary text-sm font-bold'>
                      {challenge.daysLeft}
                    </Text>
                    <Text className='text-tertiary text-xs'>days left</Text>
                  </View>
                </View>

                <View className='flex-1 flex-row items-center rounded-xl bg-surface-primary px-3 py-2'>
                  <View className='mr-2 h-8 w-8 items-center justify-center rounded-lg bg-green-500/20'>
                    <Ionicons name='people-outline' size={16} color='#10B981' />
                  </View>
                  <View>
                    <Text className='text-primary text-sm font-bold'>
                      {challenge.participants.toLocaleString()}
                    </Text>
                    <Text className='text-tertiary text-xs'>joined</Text>
                  </View>
                </View>

                <View className='flex-1 flex-row items-center rounded-xl bg-surface-primary px-3 py-2'>
                  <View className='mr-2 h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20'>
                    <Ionicons name='trophy' size={16} color='#8B5CF6' />
                  </View>
                  <View>
                    <Text className='text-primary text-sm font-bold'>
                      #{Math.floor(Math.random() * 50) + 1}
                    </Text>
                    <Text className='text-tertiary text-xs'>rank</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <View className='flex-1'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className='px-6 py-4'>
          {/* Header with gradient border */}
          <View className='mb-8 mt-4'>
            <LinearGradient
              colors={['#667eea', '#764ba2', '#f093fb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: 2, borderRadius: 1, marginBottom: 20 }}
            />
            <View className='pb-4'>
              <Text className='text-secondary text-lg'>Daily Challenges</Text>
              <Text className='text-primary text-3xl font-bold'>
                Push Your Limits
              </Text>
            </View>
            <LinearGradient
              colors={['#667eea', '#764ba2', '#f093fb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: 1, borderRadius: 1 }}
            />
          </View>

          {/* Stats Overview */}
          <Animated.View entering={FadeInDown.delay(200).duration(800)}>
            <LinearGradient
              colors={['#8B5CF6', '#6366F1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 20, padding: 20, marginBottom: 24 }}
            >
              <View className='mb-4 flex-row items-center justify-between'>
                <Text className='text-xl font-bold text-white'>
                  Your Progress
                </Text>
                <TouchableOpacity>
                  <Ionicons name='stats-chart' size={22} color='white' />
                </TouchableOpacity>
              </View>

              <View className='flex-row justify-between'>
                <View className='items-center'>
                  <Text className='text-3xl font-bold text-white'>1,247</Text>
                  <Text className='text-sm text-white/80'>Total Points</Text>
                </View>
                <View className='items-center'>
                  <Text className='text-3xl font-bold text-white'>12</Text>
                  <Text className='text-sm text-white/80'>Day Streak</Text>
                </View>
                <View className='items-center'>
                  <Text className='text-3xl font-bold text-white'>5</Text>
                  <Text className='text-sm text-white/80'>Completed</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Enhanced Tabs */}
          <View className='mb-6 rounded-2xl border border-surface-primary bg-surface-secondary p-2 shadow-sm'>
            <View className='flex-row gap-1'>
              {(['active', 'available', 'completed'] as const).map(
                (tab, _index) => {
                  const isActive = activeTab === tab
                  const tabIcons = {
                    active: 'flash',
                    available: 'add-circle-outline',
                    completed: 'trophy',
                  }
                  const tabColors = {
                    active: '#10B981',
                    available: '#3B82F6',
                    completed: '#F59E0B',
                  }

                  return (
                    <TouchableOpacity
                      key={tab}
                      onPress={() => setActiveTab(tab)}
                      className={`flex-1 rounded-xl px-3 py-4 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg'
                          : 'bg-transparent'
                      }`}
                      style={{
                        shadowColor: isActive ? '#8B5CF6' : 'transparent',
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: isActive ? 8 : 0,
                      }}
                    >
                      <View className='items-center'>
                        <Ionicons
                          name={tabIcons[tab] as any}
                          size={20}
                          color={isActive ? 'white' : tabColors[tab]}
                        />
                        <Text
                          className={`mt-1 text-center text-sm font-bold capitalize ${
                            isActive ? 'text-white' : 'text-secondary'
                          }`}
                        >
                          {tab}
                        </Text>
                        {tab === 'active' && (
                          <View className='absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500'>
                            <View className='h-full w-full animate-pulse rounded-full bg-red-500' />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  )
                },
              )}
            </View>
          </View>

          {/* Challenge List */}
          {activeTab === 'active' && (
            <View>
              <Text className='text-primary mb-4 text-lg font-semibold'>
                Your Active Challenges
              </Text>
              {activeChallenges.map((challenge, index) =>
                renderChallenge(challenge, index),
              )}
            </View>
          )}

          {activeTab === 'available' && (
            <View>
              <Text className='text-primary mb-4 text-lg font-semibold'>
                Join New Challenges
              </Text>
              {availableChallenges.map((challenge, index) =>
                renderChallenge(challenge, index),
              )}
            </View>
          )}

          {activeTab === 'completed' && (
            <View className='items-center justify-center py-12'>
              <Ionicons
                name='trophy'
                size={64}
                color='rgb(var(--text-tertiary))'
              />
              <Text className='text-secondary mt-4 text-center'>
                No completed challenges yet.{'\n'}Keep pushing!
              </Text>
            </View>
          )}

          {/* Enhanced Achievements Section */}
          <View className='mt-8'>
            <View className='mb-6 flex-row items-center justify-between'>
              <View>
                <Text className='text-primary text-2xl font-bold'>
                  🏆 Achievements
                </Text>
                <Text className='text-secondary mt-1 text-sm'>
                  Your milestone collection
                </Text>
              </View>
              <TouchableOpacity className='rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 shadow-lg'>
                <Text className='text-sm font-bold text-white'>View All</Text>
              </TouchableOpacity>
            </View>

            <View className='space-y-4'>
              {achievements.map((achievement, index) => {
                const progressPercentage =
                  achievement.progress && achievement.total
                    ? (achievement.progress / achievement.total) * 100
                    : 0
                const achievementColors = {
                  sunny: ['#FFA500', '#FF8C00'] as const,
                  water: ['#00CED1', '#1E90FF'] as const,
                  flame: ['#FF6347', '#DC143C'] as const,
                  trophy: ['#FFD700', '#FFA500'] as const,
                }
                const colors =
                  achievementColors[
                    achievement.icon as keyof typeof achievementColors
                  ] || (['#10B981', '#059669'] as const)

                return (
                  <Animated.View
                    key={achievement.id}
                    entering={FadeIn.delay(400 + index * 100).duration(600)}
                    className='mb-4'
                  >
                    <TouchableOpacity
                      className={`overflow-hidden rounded-2xl ${
                        achievement.earned ? 'opacity-100' : 'opacity-80'
                      }`}
                      style={{
                        shadowColor: achievement.earned
                          ? colors[0]
                          : 'transparent',
                        shadowOpacity: 0.3,
                        shadowRadius: 12,
                        elevation: achievement.earned ? 8 : 4,
                      }}
                    >
                      {achievement.earned ? (
                        <LinearGradient
                          colors={colors}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{ padding: 2 }}
                        >
                          <View className='rounded-[14px] bg-surface-secondary p-5'>
                            <LinearGradient
                              colors={['rgba(255,255,255,0.05)', 'transparent']}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 14,
                              }}
                            />
                            <View className='mb-3 flex-row items-center justify-between'>
                              <View
                                className='h-16 w-16 items-center justify-center rounded-2xl shadow-lg'
                                style={{
                                  backgroundColor: colors[0],
                                  shadowColor: colors[0],
                                  shadowOpacity: 0.4,
                                  shadowRadius: 8,
                                }}
                              >
                                <Ionicons
                                  name={achievement.icon as any}
                                  size={32}
                                  color='white'
                                />
                              </View>
                              <View className='h-12 w-12 items-center justify-center rounded-2xl bg-green-500/20'>
                                <Ionicons
                                  name='checkmark'
                                  size={24}
                                  color='#10B981'
                                />
                              </View>
                            </View>
                            <Text className='text-primary mb-2 text-xl font-bold'>
                              {achievement.title}
                            </Text>
                            <Text className='text-secondary mb-3 text-sm'>
                              {achievement.description}
                            </Text>
                            <View className='rounded-xl bg-green-500/20 p-3'>
                              <Text className='text-center font-bold text-green-500'>
                                ✓ COMPLETED -{' '}
                                {achievement.earnedDate
                                  ? new Date(
                                      achievement.earnedDate,
                                    ).toLocaleDateString()
                                  : 'Recently'}
                              </Text>
                            </View>
                          </View>
                        </LinearGradient>
                      ) : (
                        <View className='rounded-2xl border border-surface-primary bg-surface-secondary p-5 shadow-sm'>
                          <View className='mb-3 flex-row items-center justify-between'>
                            <View className='h-16 w-16 items-center justify-center rounded-2xl border border-surface-primary bg-surface-primary'>
                              <Ionicons
                                name={achievement.icon as any}
                                size={28}
                                color='rgb(var(--text-tertiary))'
                              />
                            </View>
                            <View className='rounded-xl border border-surface-primary bg-surface-primary px-3 py-1'>
                              <Text className='text-tertiary text-xs font-medium'>
                                In Progress
                              </Text>
                            </View>
                          </View>
                          <Text className='text-secondary mb-2 text-lg font-bold'>
                            {achievement.title}
                          </Text>
                          <Text className='text-tertiary mb-4 text-sm'>
                            {achievement.description}
                          </Text>

                          {achievement.progress && achievement.total && (
                            <View>
                              <View className='mb-2 flex-row items-center justify-between'>
                                <Text className='text-secondary text-sm font-semibold'>
                                  Progress: {achievement.progress}/
                                  {achievement.total}
                                </Text>
                                <Text className='font-bold text-brand-primary'>
                                  {Math.round(progressPercentage)}%
                                </Text>
                              </View>
                              <View className='mb-2 h-2 overflow-hidden rounded-full bg-surface-primary'>
                                <LinearGradient
                                  colors={colors}
                                  start={{ x: 0, y: 0 }}
                                  end={{ x: 1, y: 0 }}
                                  style={{
                                    width: `${progressPercentage}%`,
                                    height: '100%',
                                    borderRadius: 4,
                                  }}
                                />
                              </View>
                              <Text className='text-tertiary text-center text-xs'>
                                {achievement.total - achievement.progress} more
                                to unlock!
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Challenge Details Modal */}
      <Modal
        visible={showModal}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View className='flex-1 justify-end bg-black/50'>
          <View className='max-h-[80%] rounded-t-3xl border-t border-surface-primary bg-surface-primary'>
            {selectedChallenge && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className='p-6'>
                  <View className='mb-4 h-1 w-12 self-center rounded-full bg-surface-secondary' />

                  <View className='mb-4 flex-row items-center justify-between'>
                    <Text className='text-primary text-2xl font-bold'>
                      {selectedChallenge.title}
                    </Text>
                    <TouchableOpacity onPress={() => setShowModal(false)}>
                      <Ionicons
                        name='close'
                        size={24}
                        color='rgb(var(--text-secondary))'
                      />
                    </TouchableOpacity>
                  </View>

                  <Text className='text-secondary mb-6'>
                    {selectedChallenge.description}
                  </Text>

                  <Text className='text-primary mb-3 text-lg font-semibold'>
                    Today's Tasks
                  </Text>

                  {selectedChallenge.tasks.map((task) => (
                    <TouchableOpacity
                      key={task.id}
                      onPress={() =>
                        handleTaskToggle(selectedChallenge.id, task.id)
                      }
                      className='mb-3 flex-row items-center rounded-xl border border-surface-primary bg-surface-secondary p-4 shadow-sm'
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleTaskToggle(selectedChallenge.id, task.id)
                        }
                        className={`mr-3 h-6 w-6 items-center justify-center rounded-full border-2 ${
                          task.completed
                            ? 'border-brand-primary bg-brand-primary'
                            : 'border-secondary'
                        }`}
                      >
                        {task.completed && (
                          <Ionicons name='checkmark' size={16} color='white' />
                        )}
                      </TouchableOpacity>
                      <Text
                        className={`flex-1 ${
                          task.completed
                            ? 'text-secondary line-through'
                            : 'text-primary'
                        }`}
                      >
                        {task.title}
                      </Text>
                      <Text className='font-semibold text-brand-primary'>
                        +{task.points} pts
                      </Text>
                    </TouchableOpacity>
                  ))}

                  <Button
                    variant='solid'
                    action='primary'
                    size='lg'
                    className='mt-4 w-full'
                    onPress={() => setShowModal(false)}
                  >
                    <ButtonText>Complete Challenge</ButtonText>
                  </Button>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}
