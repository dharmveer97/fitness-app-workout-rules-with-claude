// Global type definitions - Non-conflicting types only

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
