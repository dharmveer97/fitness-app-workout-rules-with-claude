import React, { useState } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text } from '@/components/Themed'
import { Button, ButtonText } from '@/components/ui/button'

const { width } = Dimensions.get('window')

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
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'active' | 'available' | 'completed'>('active')

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
        { id: 't1', title: 'Drink water upon waking', completed: true, points: 10 },
        { id: 't2', title: 'Drink 2 glasses before lunch', completed: true, points: 15 },
        { id: 't3', title: 'Drink 2 glasses in afternoon', completed: false, points: 15 },
        { id: 't4', title: 'Complete daily water goal', completed: false, points: 20 },
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
        { id: 't6', title: '30 min cardio workout', completed: false, points: 30 },
        { id: 't7', title: '10,000 steps', completed: true, points: 25 },
        { id: 't8', title: 'Strength training', completed: false, points: 35 },
        { id: 't9', title: 'Post-workout stretching', completed: false, points: 15 },
        { id: 't10', title: 'Log workout details', completed: false, points: 10 },
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
      case 'fitness': return 'fitness'
      case 'nutrition': return 'nutrition'
      case 'mindfulness': return 'flower'
      case 'hydration': return 'water'
      default: return 'star'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10B981'
      case 'medium': return '#F97316'
      case 'hard': return '#EF4444'
      default: return '#6B7280'
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
        className='border-primary mb-4 overflow-hidden rounded-2xl border bg-surface-secondary'
      >
        <LinearGradient
          colors={[`${challenge.color}20`, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16 }}
        >
          <View className='mb-3 flex-row items-start justify-between'>
            <View className='flex-1'>
              <View className='mb-2 flex-row items-center'>
                <View
                  className='mr-2 h-8 w-8 items-center justify-center rounded-full'
                  style={{ backgroundColor: `${challenge.color}20` }}
                >
                  <Ionicons
                    name={getCategoryIcon(challenge.category) as any}
                    size={18}
                    color={challenge.color}
                  />
                </View>
                <Text className='text-primary flex-1 text-lg font-semibold'>
                  {challenge.title}
                </Text>
              </View>
              <Text className='text-secondary mb-3 text-sm'>
                {challenge.description}
              </Text>
            </View>
            <View
              className='rounded-full px-2 py-1'
              style={{ backgroundColor: `${getDifficultyColor(challenge.difficulty)}20` }}
            >
              <Text
                className='text-xs font-semibold capitalize'
                style={{ color: getDifficultyColor(challenge.difficulty) }}
              >
                {challenge.difficulty}
              </Text>
            </View>
          </View>

          <View className='mb-3'>
            <View className='mb-1 flex-row items-center justify-between'>
              <Text className='text-tertiary text-xs'>Progress</Text>
              <Text className='text-secondary text-xs font-semibold'>
                {challenge.progress}%
              </Text>
            </View>
            <View className='bg-surface-primary h-2 overflow-hidden rounded-full'>
              <View
                className='h-full rounded-full'
                style={{
                  width: `${challenge.progress}%`,
                  backgroundColor: challenge.color,
                }}
              />
            </View>
          </View>

          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center space-x-4'>
              <View className='flex-row items-center'>
                <Ionicons name='time-outline' size={14} color='rgb(var(--text-tertiary))' />
                <Text className='text-tertiary ml-1 text-xs'>
                  {challenge.daysLeft} days left
                </Text>
              </View>
              <View className='flex-row items-center'>
                <Ionicons name='people-outline' size={14} color='rgb(var(--text-tertiary))' />
                <Text className='text-tertiary ml-1 text-xs'>
                  {challenge.participants}
                </Text>
              </View>
            </View>
            <View className='flex-row items-center'>
              <Ionicons name='star' size={14} color='#FFA500' />
              <Text className='ml-1 text-sm font-semibold text-yellow-500'>
                {challenge.points} pts
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <View className='flex-1 bg-surface-primary'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className='px-6 py-4'>
          {/* Header */}
          <View className='mb-6 mt-4'>
            <Text className='text-secondary text-lg'>Daily Challenges</Text>
            <Text className='text-primary text-3xl font-bold'>
              Push Your Limits
            </Text>
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
                <Text className='text-xl font-bold text-white'>Your Progress</Text>
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

          {/* Tabs */}
          <View className='mb-6 flex-row rounded-xl bg-surface-secondary p-1'>
            {(['active', 'available', 'completed'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`flex-1 rounded-lg py-3 ${
                  activeTab === tab ? 'bg-brand-primary' : ''
                }`}
              >
                <Text
                  className={`text-center font-semibold capitalize ${
                    activeTab === tab ? 'text-white' : 'text-secondary'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Challenge List */}
          {activeTab === 'active' && (
            <View>
              <Text className='text-primary mb-4 text-lg font-semibold'>
                Your Active Challenges
              </Text>
              {activeChallenges.map((challenge, index) => renderChallenge(challenge, index))}
            </View>
          )}

          {activeTab === 'available' && (
            <View>
              <Text className='text-primary mb-4 text-lg font-semibold'>
                Join New Challenges
              </Text>
              {availableChallenges.map((challenge, index) => renderChallenge(challenge, index))}
            </View>
          )}

          {activeTab === 'completed' && (
            <View className='items-center justify-center py-12'>
              <Ionicons name='trophy' size={64} color='rgb(var(--text-tertiary))' />
              <Text className='text-secondary mt-4 text-center'>
                No completed challenges yet.{'\n'}Keep pushing!
              </Text>
            </View>
          )}

          {/* Achievements Section */}
          <View className='mt-8'>
            <Text className='text-primary mb-4 text-lg font-semibold'>
              Achievements
            </Text>
            <View className='flex-row flex-wrap justify-between'>
              {achievements.map((achievement, index) => (
                <Animated.View
                  key={achievement.id}
                  entering={FadeIn.delay(400 + index * 50).duration(500)}
                  className='mb-4 w-[48%]'
                >
                  <TouchableOpacity
                    className={`border-primary rounded-xl border p-4 ${
                      achievement.earned ? 'bg-brand-primary/10' : 'bg-surface-secondary'
                    }`}
                  >
                    <View className='mb-2 flex-row items-center justify-between'>
                      <Ionicons
                        name={achievement.icon as any}
                        size={24}
                        color={achievement.earned ? '#10B981' : 'rgb(var(--text-tertiary))'}
                      />
                      {achievement.earned && (
                        <Ionicons name='checkmark-circle' size={20} color='#10B981' />
                      )}
                    </View>
                    <Text className={`font-semibold ${
                      achievement.earned ? 'text-primary' : 'text-secondary'
                    }`}>
                      {achievement.title}
                    </Text>
                    <Text className='text-tertiary mt-1 text-xs'>
                      {achievement.description}
                    </Text>
                    {!achievement.earned && achievement.progress && (
                      <View className='mt-2'>
                        <View className='bg-surface-primary h-1 overflow-hidden rounded-full'>
                          <View
                            className='bg-brand-primary h-full rounded-full'
                            style={{
                              width: `${(achievement.progress / (achievement.total || 1)) * 100}%`,
                            }}
                          />
                        </View>
                        <Text className='text-tertiary mt-1 text-xs'>
                          {achievement.progress}/{achievement.total}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              ))}
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
          <View className='bg-surface-primary max-h-[80%] rounded-t-3xl'>
            {selectedChallenge && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className='p-6'>
                  <View className='bg-surface-secondary mb-4 h-1 w-12 self-center rounded-full' />
                  
                  <View className='mb-4 flex-row items-center justify-between'>
                    <Text className='text-primary text-2xl font-bold'>
                      {selectedChallenge.title}
                    </Text>
                    <TouchableOpacity onPress={() => setShowModal(false)}>
                      <Ionicons name='close' size={24} color='rgb(var(--text-secondary))' />
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
                      onPress={() => handleTaskToggle(selectedChallenge.id, task.id)}
                      className='border-primary mb-3 flex-row items-center rounded-xl border bg-surface-secondary p-4'
                    >
                      <TouchableOpacity
                        onPress={() => handleTaskToggle(selectedChallenge.id, task.id)}
                        className={`mr-3 h-6 w-6 items-center justify-center rounded-full border-2 ${
                          task.completed
                            ? 'bg-brand-primary border-brand-primary'
                            : 'border-secondary'
                        }`}
                      >
                        {task.completed && (
                          <Ionicons name='checkmark' size={16} color='white' />
                        )}
                      </TouchableOpacity>
                      <Text
                        className={`flex-1 ${
                          task.completed ? 'text-secondary line-through' : 'text-primary'
                        }`}
                      >
                        {task.title}
                      </Text>
                      <Text className='text-brand-primary font-semibold'>
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