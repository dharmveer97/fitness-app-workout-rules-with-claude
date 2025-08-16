// Fitness and health related global type definitions - Schema integrated types

// Schema inferred types from fitness.ts
type WorkoutType = import('../schemas/fitness').WorkoutTypeInfer
type WorkoutDifficulty = import('../schemas/fitness').WorkoutDifficultyInfer
type ActivityType = import('../schemas/fitness').ActivityTypeInfer
type UnitSystem = import('../schemas/fitness').UnitSystemInfer
type WorkoutExercise = import('../schemas/fitness').WorkoutExerciseInfer
type Workout = import('../schemas/fitness').WorkoutInfer
type WorkoutSession = import('../schemas/fitness').WorkoutSessionInfer
type DailyStats = import('../schemas/fitness').DailyStatsInfer
type WeeklyProgress = import('../schemas/fitness').WeeklyProgressInfer
type Activity = import('../schemas/fitness').ActivityInfer
type UserGoals = import('../schemas/fitness').UserGoalsInfer
type UserProfile = import('../schemas/fitness').UserProfileInfer
type WorkoutCategory = import('../schemas/fitness').WorkoutCategoryInfer
type Achievement = import('../schemas/fitness').AchievementInfer
type ProgressRingData = import('../schemas/fitness').ProgressRingDataInfer
type ChartDataPoint = import('../schemas/fitness').ChartDataPointInfer
type StatsCardData = import('../schemas/fitness').StatsCardDataInfer

// Additional fitness types not covered by schemas

interface WeeklyData {
  day: string
  value: number
  label?: string
}

interface WorkoutStats {
  totalWorkouts: number
  totalDuration: number
  caloriesBurned: number
  averageIntensity: number
}

interface ProgressRingDataWithIcon extends ProgressRingData {
  icon?: string
}
