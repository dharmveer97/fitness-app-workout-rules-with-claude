// Global type definitions

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  dateOfBirth?: Date;
  goals: UserGoals;
  preferences: UserPreferences;
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
}

interface UserGoals {
  dailyWater: number; // glasses
  dailySteps: number;
  sleepHours: number;
  weeklyWorkouts: number;
  weight?: {
    current: number;
    target: number;
    unit: 'kg' | 'lbs';
  };
  calorieGoal?: number;
}

interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  notifications: {
    enabled: boolean;
    waterReminders: boolean;
    challengeReminders: boolean;
    journalReminders: boolean;
    motivationalQuotes: boolean;
  };
  units: 'metric' | 'imperial';
  language: string;
  privacy: {
    shareStats: boolean;
    allowFriends: boolean;
  };
}

interface UserStats {
  totalJournalEntries: number;
  currentStreak: number;
  longestStreak: number;
  challengesCompleted: number;
  totalWaterGlasses: number;
  totalSteps: number;
}

// Journal types
type JournalEntryType = import('../schemas/journal').JournalEntryInfer;
type MoodType = import('../schemas/journal').MoodInfer;
type TodoItemType = import('../schemas/journal').TodoItemInfer;

// Challenge types
type ChallengeType = import('../schemas/challenges').ChallengeInfer;
type UserChallengeType = import('../schemas/challenges').UserChallengeInfer;

// Food types
type FoodEntryType = import('../schemas/food').FoodEntryInfer;
type FoodItemType = import('../schemas/food').FoodItemInfer;

// Hook types
interface ThemeColorProps {
  light?: string;
  dark?: string;
}

interface UseOnboardingSlidesProps {
  slidesLength: number;
  onLastSlide?: () => void;
}

interface UseOnboardingSlidesReturn<T> {
  currentIndex: number;
  scrollX: import('react-native').Animated.Value;
  slidesRef: any;
  width: number;
  viewableItemsChanged: (info: { viewableItems: import('react-native').ViewToken[] }) => void;
  viewConfig: { viewAreaCoveragePercentThreshold: number };
  scrollToNext: () => void;
  scrollToPrev: () => void;
}

interface UseImageUploaderResult {
  image: string | null;
  uploading: boolean;
  pickImage: () => Promise<void>;
  takePhoto: () => Promise<void>;
}
