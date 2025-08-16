import { z } from 'zod'

// Enum schemas
export const WorkoutTypeSchema = z.enum([
  'strength',
  'cardio',
  'yoga',
  'hiit',
  'pilates',
  'running',
  'cycling',
  'swimming',
  'other',
])

export const WorkoutDifficultySchema = z.enum([
  'beginner',
  'intermediate',
  'advanced',
])

export const ActivityTypeSchema = z.enum([
  'workout',
  'meal',
  'water',
  'sleep',
  'steps',
  'weight',
  'heart_rate',
])

export const UnitSystemSchema = z.enum(['metric', 'imperial'])

// Exercise schema
export const WorkoutExerciseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Exercise name is required'),
  sets: z.number().int().positive().optional(),
  reps: z.number().int().positive().optional(),
  duration: z.number().int().positive().optional(), // in seconds
  weight: z.number().positive().optional(),
  restTime: z.number().int().positive().optional(), // in seconds
  calories: z.number().positive().optional(),
  notes: z.string().optional(),
})

// Workout schema
export const WorkoutSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Workout name is required'),
  type: WorkoutTypeSchema,
  difficulty: WorkoutDifficultySchema,
  duration: z.number().int().positive('Duration must be positive'),
  calories: z.number().positive().optional(),
  exercises: z.array(WorkoutExerciseSchema),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isCompleted: z.boolean().optional().default(false),
  completedAt: z.date().optional(),
  targetMuscleGroups: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
})

// Workout session schema
export const WorkoutSessionSchema = z.object({
  id: z.string(),
  workoutId: z.string(),
  workout: WorkoutSchema,
  startTime: z.date(),
  endTime: z.date().optional(),
  actualDuration: z.number().int().positive().optional(),
  caloriesBurned: z.number().positive().optional(),
  notes: z.string().optional(),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      sets: z.array(
        z.object({
          reps: z.number().int().positive().optional(),
          weight: z.number().positive().optional(),
          duration: z.number().int().positive().optional(),
          restTime: z.number().int().positive().optional(),
        }),
      ),
    }),
  ),
})

// Daily stats schema
export const DailyStatsSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  steps: z.number().int().min(0, 'Steps cannot be negative'),
  caloriesBurned: z.number().min(0, 'Calories burned cannot be negative'),
  caloriesConsumed: z.number().min(0, 'Calories consumed cannot be negative'),
  waterIntake: z.number().min(0, 'Water intake cannot be negative'), // in ml
  sleepHours: z.number().min(0).max(24, 'Sleep hours must be between 0 and 24'),
  workouts: z.number().int().min(0, 'Number of workouts cannot be negative'),
  activeMinutes: z.number().int().min(0, 'Active minutes cannot be negative'),
  heartRate: z
    .object({
      resting: z.number().int().min(30).max(200),
      max: z.number().int().min(100).max(220),
      average: z.number().int().min(50).max(200),
    })
    .optional(),
  weight: z.number().positive().optional(),
})

// Weekly progress schema
export const WeeklyProgressSchema = z.object({
  week: z.string().regex(/^\d{4}-W\d{2}$/, 'Week must be in YYYY-WW format'),
  totalSteps: z.number().int().min(0),
  totalCaloriesBurned: z.number().min(0),
  totalWaterIntake: z.number().min(0),
  totalWorkouts: z.number().int().min(0),
  averageSleepHours: z.number().min(0).max(24),
  dailyStats: z.array(DailyStatsSchema),
})

// Activity schema
export const ActivitySchema = z.object({
  id: z.string(),
  type: ActivityTypeSchema,
  title: z.string().min(1, 'Activity title is required'),
  description: z.string().optional(),
  value: z.number().optional(),
  unit: z.string().optional(),
  timestamp: z.date(),
  calories: z.number().positive().optional(),
  duration: z.number().int().positive().optional(),
  metadata: z.record(z.any()).optional(),
})

// User goals schema
export const UserGoalsSchema = z.object({
  dailySteps: z
    .number()
    .int()
    .min(1000, 'Daily steps goal must be at least 1000')
    .max(50000, 'Daily steps goal cannot exceed 50000'),
  dailyWater: z
    .number()
    .min(500, 'Daily water goal must be at least 500ml')
    .max(5000, 'Daily water goal cannot exceed 5000ml'),
  dailyCalories: z
    .number()
    .min(1200, 'Daily calories goal must be at least 1200')
    .max(5000, 'Daily calories goal cannot exceed 5000'),
  weeklyWorkouts: z
    .number()
    .int()
    .min(1, 'Weekly workouts goal must be at least 1')
    .max(14, 'Weekly workouts goal cannot exceed 14'),
  sleepHours: z
    .number()
    .min(6, 'Sleep hours goal must be at least 6')
    .max(12, 'Sleep hours goal cannot exceed 12'),
  weightGoal: z.number().positive().optional(),
  weightGoalDate: z.date().optional(),
})

// User profile schema
export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  avatar: z.string().url().optional(),
  age: z
    .number()
    .int()
    .min(13, 'Age must be at least 13')
    .max(120, 'Age cannot exceed 120')
    .optional(),
  height: z.number().positive('Height must be positive').optional(),
  weight: z.number().positive('Weight must be positive').optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  fitnessLevel: WorkoutDifficultySchema,
  unitSystem: UnitSystemSchema,
  goals: UserGoalsSchema,
  joinDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  stats: z.object({
    totalWorkouts: z.number().int().min(0),
    totalDuration: z.number().min(0),
    caloriesBurned: z.number().min(0),
    averageIntensity: z.number().min(0).max(10),
  }).optional(),
  preferences: z.object({
    notifications: z.object({
      workoutReminders: z.boolean().default(true),
      waterReminders: z.boolean().default(true),
      sleepReminders: z.boolean().default(true),
    }),
    privacy: z.object({
      shareStats: z.boolean().default(false),
      shareWorkouts: z.boolean().default(false),
    }),
  }),
})

// Workout category schema
export const WorkoutCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Category name is required'),
  type: WorkoutTypeSchema,
  description: z.string(),
  imageUrl: z.string().url().optional(),
  workoutCount: z.number().int().min(0),
  estimatedCalories: z.number().min(0),
  averageDuration: z.number().min(0),
  color: z.string().optional(),
})

// Achievement schema
export const AchievementSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Achievement name is required'),
  description: z.string().min(1, 'Achievement description is required'),
  iconName: z.string().min(1, 'Icon name is required'),
  unlockedAt: z.date().optional(),
  progress: z.number().min(0).max(100).optional(),
  target: z.number().positive().optional(),
  category: z.enum([
    'workout',
    'streak',
    'calories',
    'steps',
    'water',
    'sleep',
  ]),
})

// Progress ring data schema
export const ProgressRingDataSchema = z.object({
  value: z.number().min(0, 'Value cannot be negative'),
  maxValue: z.number().positive('Max value must be positive'),
  color: z.string().min(1, 'Color is required'),
  label: z.string().min(1, 'Label is required'),
  unit: z.string().optional(),
})

// Chart data point schema
export const ChartDataPointSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.number(),
  date: z.string().optional(),
})

// Stats card data schema
export const StatsCardDataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  value: z.union([z.number(), z.string()]),
  unit: z.string().optional(),
  change: z.number().optional(),
  changeLabel: z.string().optional(),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required'),
  trend: z.enum(['up', 'down', 'neutral']).optional(),
})

// Form schemas for user input
export const StartWorkoutSchema = z.object({
  workoutId: z.string().min(1, 'Workout ID is required'),
  startTime: z.date().default(() => new Date()),
  notes: z.string().optional(),
})

export const LogActivitySchema = z.object({
  type: ActivityTypeSchema,
  title: z.string().min(1, 'Activity title is required'),
  value: z.number().positive('Value must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  timestamp: z.date().default(() => new Date()),
  calories: z.number().positive().optional(),
  duration: z.number().int().positive().optional(),
})

export const UpdateGoalsSchema = UserGoalsSchema.partial()

export const UpdateProfileSchema = UserProfileSchema.omit({
  id: true,
  joinDate: true,
}).partial()

// Inferred Types for Global Usage
export type WorkoutTypeInfer = z.infer<typeof WorkoutTypeSchema>
export type WorkoutDifficultyInfer = z.infer<typeof WorkoutDifficultySchema>
export type ActivityTypeInfer = z.infer<typeof ActivityTypeSchema>
export type UnitSystemInfer = z.infer<typeof UnitSystemSchema>
export type WorkoutExerciseInfer = z.infer<typeof WorkoutExerciseSchema>
export type WorkoutInfer = z.infer<typeof WorkoutSchema>
export type WorkoutSessionInfer = z.infer<typeof WorkoutSessionSchema>
export type DailyStatsInfer = z.infer<typeof DailyStatsSchema>
export type WeeklyProgressInfer = z.infer<typeof WeeklyProgressSchema>
export type ActivityInfer = z.infer<typeof ActivitySchema>
export type UserGoalsInfer = z.infer<typeof UserGoalsSchema>
export type UserProfileInfer = z.infer<typeof UserProfileSchema>
export type WorkoutCategoryInfer = z.infer<typeof WorkoutCategorySchema>
export type AchievementInfer = z.infer<typeof AchievementSchema>
export type ProgressRingDataInfer = z.infer<typeof ProgressRingDataSchema>
export type ChartDataPointInfer = z.infer<typeof ChartDataPointSchema>
export type StatsCardDataInfer = z.infer<typeof StatsCardDataSchema>
export type StartWorkoutInfer = z.infer<typeof StartWorkoutSchema>
export type LogActivityInfer = z.infer<typeof LogActivitySchema>
export type UpdateGoalsInfer = z.infer<typeof UpdateGoalsSchema>
export type UpdateProfileInfer = z.infer<typeof UpdateProfileSchema>
