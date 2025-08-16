// Challenge schema inferred types
type ChallengeCategoryType =
  import('../schemas/challenges').ChallengeCategoryInfer
type ChallengeDifficultyType =
  import('../schemas/challenges').ChallengeDifficultyInfer
type ChallengeProgressType =
  import('../schemas/challenges').ChallengeProgressInfer
type ChallengeType = import('../schemas/challenges').ChallengeInfer
type UserChallengeType = import('../schemas/challenges').UserChallengeInfer
type CreateChallengeType = import('../schemas/challenges').CreateChallengeInfer
type JoinChallengeType = import('../schemas/challenges').JoinChallengeInfer

// Challenge state types
interface ChallengeState {
  challenges: ChallengeType[]
  userChallenges: UserChallengeType[]
  activeChallenges: UserChallengeType[]
  completedChallenges: UserChallengeType[]
  featuredChallenges: ChallengeType[]
  currentChallenge: ChallengeType | null
  isLoading: boolean
  error: string | null
  filters: ChallengeFilters
  searchQuery: string
}

interface ChallengeActions {
  loadChallenges: (filters?: ChallengeFilters) => Promise<void>
  loadUserChallenges: () => Promise<void>
  joinChallenge: (data: JoinChallengeType) => Promise<void>
  leaveChallenge: (challengeId: string) => Promise<void>
  updateProgress: (
    challengeId: string,
    progress: ChallengeProgressType,
  ) => Promise<void>
  completeChallenge: (challengeId: string) => Promise<void>
  pauseChallenge: (challengeId: string) => Promise<void>
  resumeChallenge: (challengeId: string) => Promise<void>
  createChallenge: (data: CreateChallengeType) => Promise<void>
  searchChallenges: (query: string) => Promise<void>
  setCurrentChallenge: (challenge: ChallengeType | null) => void
  clearError: () => void
}

// Challenge context type
interface ChallengeContextType extends ChallengeState, ChallengeActions {}

// Challenge hook return type
type UseChallengeReturn = ChallengeContextType

// Challenge filters type
interface ChallengeFilters {
  categories?: ChallengeCategoryType[]
  difficulties?: ChallengeDifficultyType[]
  duration?: {
    min: number
    max: number
  }
  status?: UserChallengeType['status'][]
  isPublic?: boolean
  sortBy?: 'popularity' | 'difficulty' | 'duration' | 'created' | 'name'
  sortOrder?: 'asc' | 'desc'
}

// Challenge statistics type
interface ChallengeStats {
  totalChallenges: number
  activeChallenges: number
  completedChallenges: number
  totalPoints: number
  badges: string[]
  currentStreak: number
  longestStreak: number
  completionRate: number
  favoriteCategory: ChallengeCategoryType
}

// Leaderboard entry type
interface LeaderboardEntry {
  userId: string
  username: string
  avatar?: string
  points: number
  completedChallenges: number
  currentStreak: number
  rank: number
}

// Challenge notification type
interface ChallengeNotification {
  id: string
  type: 'reminder' | 'milestone' | 'completion' | 'streak' | 'friend_joined'
  challengeId: string
  title: string
  message: string
  data?: any
  read: boolean
  createdAt: Date
}
