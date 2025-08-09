import { z } from 'zod';

// User Authentication Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().url().optional(),
  goals: z.object({
    dailyWater: z.number().min(0).max(20),
    dailySteps: z.number().min(0),
    sleepHours: z.number().min(0).max(24),
    weight: z.number().min(0).optional(),
    height: z.number().min(0).optional(),
  }),
});

// Journal Entry Schema
export const journalSchema = z.object({
  mood: z.object({
    type: z.enum(['happy', 'sad', 'neutral', 'excited', 'anxious']),
    intensity: z.number().min(1).max(5),
  }),
  water: z.number().min(0).max(20),
  movement: z.number().min(0),
  todos: z.array(
    z.object({
      text: z.string().min(1),
      completed: z.boolean(),
    }),
  ),
  notes: z.string().optional(),
  images: z.array(z.string().url()).optional(),
});

// Food Entry Schema
export const foodEntrySchema = z.object({
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  items: z.array(
    z.object({
      name: z.string().min(1),
      quantity: z.string().min(1),
      calories: z.number().min(0),
      protein: z.number().min(0).optional(),
      carbs: z.number().min(0).optional(),
      fat: z.number().min(0).optional(),
    }),
  ),
  totalCalories: z.number().min(0),
});

// Challenge Schema
export const challengeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['fasting', 'prayer', 'food', 'detox', 'mindfulness']),
  completed: z.boolean().default(false),
  streak: z.number().min(0).default(0),
});

// API Response Schema
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});
