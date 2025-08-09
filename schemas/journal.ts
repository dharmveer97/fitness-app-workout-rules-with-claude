import { z } from 'zod'

// Mood Schema
export const moodSchema = z.object({
  type: z.enum([
    'happy',
    'sad',
    'neutral',
    'excited',
    'anxious',
    'angry',
    'peaceful',
    'stressed',
  ]),
  intensity: z.number().min(1).max(5),
  notes: z.string().optional(),
})

// Todo Item Schema
export const todoItemSchema = z.object({
  id: z.string(),
  text: z
    .string()
    .min(1, 'Todo text is required')
    .max(200, 'Todo text must be less than 200 characters'),
  completed: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  category: z.string().optional(),
})

// Sleep Schema
export const sleepSchema = z.object({
  hours: z.number().min(0).max(24),
  quality: z.number().min(1).max(5),
  bedTime: z.string().optional(),
  wakeTime: z.string().optional(),
  notes: z.string().optional(),
})

// Water Intake Schema
export const waterIntakeSchema = z.object({
  glasses: z.number().min(0).max(20),
  goal: z.number().min(1).max(20).default(8),
  reminders: z.boolean().default(true),
})

// Movement Schema
export const movementSchema = z.object({
  steps: z.number().min(0).max(100000),
  distance: z.number().min(0).optional(),
  calories: z.number().min(0).optional(),
  activeMinutes: z.number().min(0).optional(),
  workoutType: z.string().optional(),
  workoutDuration: z.number().min(0).optional(),
})

// Journal Entry Schema
export const journalEntrySchema = z.object({
  date: z.date(),
  mood: moodSchema,
  water: waterIntakeSchema,
  movement: movementSchema,
  sleep: sleepSchema.optional(),
  todos: z.array(todoItemSchema).default([]),
  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),
  images: z.array(z.string()).max(5, 'Maximum 5 images allowed').default([]),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').default([]),
  weather: z
    .object({
      temperature: z.number(),
      condition: z.string(),
      humidity: z.number().min(0).max(100),
    })
    .optional(),
  location: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
      address: z.string().optional(),
    })
    .optional(),
  aiPrompt: z.string().optional(),
  aiResponse: z.string().optional(),
  isPrivate: z.boolean().default(false),
})

// Quick Journal Entry Schema (for minimal entries)
export const quickJournalSchema = z.object({
  mood: moodSchema,
  water: z.number().min(0).max(20).default(0),
  notes: z.string().max(500).optional(),
})

// Inferred Types
export type MoodInfer = z.infer<typeof moodSchema>
export type TodoItemInfer = z.infer<typeof todoItemSchema>
export type SleepInfer = z.infer<typeof sleepSchema>
export type WaterIntakeInfer = z.infer<typeof waterIntakeSchema>
export type MovementInfer = z.infer<typeof movementSchema>
export type JournalEntryInfer = z.infer<typeof journalEntrySchema>
export type QuickJournalInfer = z.infer<typeof quickJournalSchema>
