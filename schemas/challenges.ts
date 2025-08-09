import { z } from 'zod';

// Challenge Category Schema
export const challengeCategorySchema = z.enum([
  'fitness',
  'nutrition',
  'mindfulness',
  'sleep',
  'hydration',
  'social',
  'learning',
  'creativity',
  'productivity',
  'wellness',
]);

// Challenge Difficulty Schema
export const challengeDifficultySchema = z.enum([
  'easy',
  'medium',
  'hard',
  'expert',
]);

// Challenge Progress Schema
export const challengeProgressSchema = z.object({
  date: z.date(),
  completed: z.boolean(),
  progress: z.number().min(0).max(100),
  notes: z.string().optional(),
  evidence: z.array(z.string()).optional(), // Image URLs
  timeSpent: z.number().min(0).optional(), // in minutes
});

// Challenge Schema
export const challengeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Challenge name is required').max(100),
  description: z.string().min(1, 'Challenge description is required').max(500),
  category: challengeCategorySchema,
  difficulty: challengeDifficultySchema,
  duration: z.number().min(1).max(365), // days
  icon: z.string(),
  color: z.string(),
  isPublic: z.boolean().default(true),
  createdBy: z.string().optional(), // user ID for custom challenges
  requirements: z.array(z.string()).default([]),
  rewards: z.object({
    points: z.number().min(0),
    badges: z.array(z.string()).default([]),
    title: z.string().optional(),
  }),
  participants: z.number().min(0).default(0),
  completionRate: z.number().min(0).max(100).default(0),
  tags: z.array(z.string()).max(10).default([]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

// User Challenge Schema
export const userChallengeSchema = z.object({
  challengeId: z.string(),
  userId: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.enum(['active', 'completed', 'paused', 'abandoned']),
  progress: z.array(challengeProgressSchema).default([]),
  currentStreak: z.number().min(0).default(0),
  bestStreak: z.number().min(0).default(0),
  completionPercentage: z.number().min(0).max(100).default(0),
  lastActivity: z.date().optional(),
  notes: z.string().optional(),
  isPrivate: z.boolean().default(false),
});

// Challenge Creation Schema
export const createChallengeSchema = z.object({
  name: z.string().min(1, 'Challenge name is required').max(100),
  description: z.string().min(1, 'Challenge description is required').max(500),
  category: challengeCategorySchema,
  difficulty: challengeDifficultySchema,
  duration: z
    .number()
    .min(1, 'Duration must be at least 1 day')
    .max(365, 'Duration cannot exceed 365 days'),
  requirements: z
    .array(z.string())
    .min(1, 'At least one requirement is needed')
    .max(10),
  isPublic: z.boolean().default(true),
  tags: z.array(z.string()).max(10).default([]),
});

// Challenge Join Schema
export const joinChallengeSchema = z.object({
  challengeId: z.string(),
  startDate: z.date().optional(),
  isPrivate: z.boolean().default(false),
  personalGoal: z.string().optional(),
});

// Inferred Types
export type ChallengeCategoryInfer = z.infer<typeof challengeCategorySchema>;
export type ChallengeDifficultyInfer = z.infer<
  typeof challengeDifficultySchema
>;
export type ChallengeProgressInfer = z.infer<typeof challengeProgressSchema>;
export type ChallengeInfer = z.infer<typeof challengeSchema>;
export type UserChallengeInfer = z.infer<typeof userChallengeSchema>;
export type CreateChallengeInfer = z.infer<typeof createChallengeSchema>;
export type JoinChallengeInfer = z.infer<typeof joinChallengeSchema>;
