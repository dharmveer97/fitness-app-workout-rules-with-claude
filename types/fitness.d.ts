// Fitness and health related global type definitions

type WorkoutType = 'strength' | 'cardio' | 'yoga' | 'hiit' | 'pilates' | 'running' | 'cycling' | 'swimming' | 'other';

type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

type ActivityType = 'workout' | 'meal' | 'water' | 'sleep' | 'steps' | 'weight' | 'heart_rate';

type UnitSystem = 'metric' | 'imperial';

interface WorkoutExercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  weight?: number;
  restTime?: number; // in seconds
  calories?: number;
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  difficulty: WorkoutDifficulty;
  duration: number; // in minutes
  calories?: number;
  exercises: WorkoutExercise[];
  description?: string;
  imageUrl?: string;
  isCompleted?: boolean;
  completedAt?: Date;
  targetMuscleGroups?: string[];
  equipment?: string[];
}

interface WorkoutSession {
  id: string;
  workoutId: string;
  workout: Workout;
  startTime: Date;
  endTime?: Date;
  actualDuration?: number; // in minutes
  caloriesBurned?: number;
  notes?: string;
  exercises: {
    exerciseId: string;
    sets: {
      reps?: number;
      weight?: number;
      duration?: number;
      restTime?: number;
    }[];
  }[];
}

interface DailyStats {
  date: string; // YYYY-MM-DD format
  steps: number;
  caloriesBurned: number;
  caloriesConsumed: number;
  waterIntake: number; // in ml
  sleepHours: number;
  workouts: number;
  activeMinutes: number;
  heartRate?: {
    resting: number;
    max: number;
    average: number;
  };
  weight?: number; // in kg or lbs
}

interface WeeklyProgress {
  week: string; // YYYY-WW format
  totalSteps: number;
  totalCaloriesBurned: number;
  totalWaterIntake: number;
  totalWorkouts: number;
  averageSleepHours: number;
  dailyStats: DailyStats[];
}

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  value?: number;
  unit?: string;
  timestamp: Date;
  calories?: number;
  duration?: number; // in minutes
  metadata?: Record<string, any>;
}

interface UserGoals {
  dailySteps: number;
  dailyWater: number; // in ml
  dailyCalories: number;
  weeklyWorkouts: number;
  sleepHours: number;
  weightGoal?: number; // in kg or lbs
  weightGoalDate?: Date;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  age?: number;
  height?: number; // in cm or inches
  weight?: number; // in kg or lbs
  gender?: 'male' | 'female' | 'other';
  fitnessLevel: WorkoutDifficulty;
  unitSystem: UnitSystem;
  goals: UserGoals;
  joinDate: Date;
  stats?: WorkoutStats;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    notifications: {
      workoutReminders: boolean;
      waterReminders: boolean;
      sleepReminders: boolean;
    };
    privacy: {
      shareStats: boolean;
      shareWorkouts: boolean;
    };
  };
}

interface WorkoutCategory {
  id: string;
  name: string;
  type: WorkoutType;
  description: string;
  imageUrl?: string;
  workoutCount: number;
  estimatedCalories: number;
  averageDuration: number;
  color?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlockedAt?: Date;
  progress?: number;
  target?: number;
  category: 'workout' | 'streak' | 'calories' | 'steps' | 'water' | 'sleep';
}

interface ProgressRingData {
  value: number;
  maxValue: number;
  color: string;
  label: string;
  unit?: string;
  icon?: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
}

interface StatsCardData {
  title: string;
  value: number | string;
  unit?: string;
  change?: number; // percentage change
  changeLabel?: string;
  icon: string;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface WeeklyData {
  day: string;
  value: number;
  label?: string;
}

interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  caloriesBurned: number;
  averageIntensity: number;
}