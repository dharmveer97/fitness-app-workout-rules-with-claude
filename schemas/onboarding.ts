import { z } from 'zod'

// Personal Info Schema
export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  dateOfBirth: z.date().refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear()
    return age >= 13 && age <= 120
  }, 'You must be between 13 and 120 years old'),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
  height: z
    .number()
    .min(50, 'Height must be at least 50cm')
    .max(300, 'Height must be less than 300cm'),
  weight: z
    .number()
    .min(20, 'Weight must be at least 20kg')
    .max(500, 'Weight must be less than 500kg'),
  activityLevel: z.enum([
    'sedentary',
    'lightly-active',
    'moderately-active',
    'very-active',
    'extremely-active',
  ]),
})

// Goals Schema
export const goalsSchema = z.object({
  primaryGoal: z.enum([
    'lose-weight',
    'gain-weight',
    'maintain-weight',
    'build-muscle',
    'improve-fitness',
    'general-health',
  ]),
  targetWeight: z
    .number()
    .min(20, 'Target weight must be at least 20kg')
    .max(500, 'Target weight must be less than 500kg')
    .optional(),
  dailyWaterGoal: z
    .number()
    .min(1, 'Water goal must be at least 1 glass')
    .max(20, 'Water goal must be less than 20 glasses')
    .default(8),
  dailyStepsGoal: z
    .number()
    .min(1000, 'Steps goal must be at least 1000')
    .max(50000, 'Steps goal must be less than 50000')
    .default(10000),
  sleepGoal: z
    .number()
    .min(4, 'Sleep goal must be at least 4 hours')
    .max(12, 'Sleep goal must be less than 12 hours')
    .default(8),
  weeklyWorkoutGoal: z
    .number()
    .min(0, 'Workout goal cannot be negative')
    .max(14, 'Workout goal must be less than 14 per week')
    .default(3),
})

// Preferences Schema
export const preferencesSchema = z.object({
  units: z.enum(['metric', 'imperial']).default('metric'),
  theme: z.enum(['light', 'dark', 'auto']).default('dark'),
  language: z.string().default('en'),
  notifications: z.object({
    enabled: z.boolean().default(true),
    waterReminders: z.boolean().default(true),
    challengeReminders: z.boolean().default(true),
    journalReminders: z.boolean().default(true),
    motivationalQuotes: z.boolean().default(true),
    reminderTimes: z.object({
      morning: z.string().default('08:00'),
      afternoon: z.string().default('14:00'),
      evening: z.string().default('20:00'),
    }),
  }),
  privacy: z.object({
    shareStats: z.boolean().default(false),
    allowFriends: z.boolean().default(true),
    publicProfile: z.boolean().default(false),
  }),
})

// Complete Onboarding Schema
export const completeOnboardingSchema = z.object({
  personalInfo: personalInfoSchema,
  goals: goalsSchema,
  preferences: preferencesSchema,
})

// Inferred Types
export type PersonalInfoStepInfer = z.infer<typeof personalInfoSchema>
export type GoalsStepInfer = z.infer<typeof goalsSchema>
export type PreferencesStepInfer = z.infer<typeof preferencesSchema>
export type CompleteOnboardingInfer = z.infer<typeof completeOnboardingSchema>
