import { z } from 'zod'

// Meal Type Schema
export const mealTypeSchema = z.enum([
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'drink',
])

// Food Item Schema
export const foodItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Food name is required'),
  brand: z.string().optional(),
  barcode: z.string().optional(),
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
  calories: z.number().min(0),
  macros: z.object({
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    fiber: z.number().min(0).optional(),
    sugar: z.number().min(0).optional(),
    sodium: z.number().min(0).optional(),
  }),
  micronutrients: z
    .object({
      vitaminA: z.number().min(0).optional(),
      vitaminC: z.number().min(0).optional(),
      vitaminD: z.number().min(0).optional(),
      calcium: z.number().min(0).optional(),
      iron: z.number().min(0).optional(),
    })
    .optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

// Food Entry Schema
export const foodEntrySchema = z.object({
  id: z.string(),
  date: z.date(),
  mealType: mealTypeSchema,
  items: z.array(foodItemSchema).min(1, 'At least one food item is required'),
  totalCalories: z.number().min(0),
  totalMacros: z.object({
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    fiber: z.number().min(0),
  }),
  images: z.array(z.string()).max(5, 'Maximum 5 images allowed').default([]),
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
  location: z.string().optional(),
  restaurant: z.string().optional(),
  recipe: z.string().optional(),
  aiAnalysis: z
    .object({
      confidence: z.number().min(0).max(100),
      suggestions: z.array(z.string()).default([]),
      healthScore: z.number().min(0).max(100).optional(),
      warnings: z.array(z.string()).default([]),
    })
    .optional(),
  isHomemade: z.boolean().default(false),
  rating: z.number().min(1).max(5).optional(),
})

// Daily Nutrition Schema
export const dailyNutritionSchema = z.object({
  date: z.date(),
  totalCalories: z.number().min(0),
  calorieGoal: z.number().min(0),
  totalMacros: z.object({
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    fiber: z.number().min(0),
  }),
  macroGoals: z.object({
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    fiber: z.number().min(0),
  }),
  meals: z.array(foodEntrySchema).default([]),
  waterIntake: z.number().min(0).default(0),
  waterGoal: z.number().min(0).default(8),
  supplements: z
    .array(
      z.object({
        name: z.string(),
        dosage: z.string(),
        time: z.string(),
      }),
    )
    .default([]),
})

// Recipe Schema
export const recipeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Recipe name is required'),
  description: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        item: z.string(),
        quantity: z.string(),
        unit: z.string(),
      }),
    )
    .min(1, 'At least one ingredient is required'),
  instructions: z
    .array(z.string())
    .min(1, 'At least one instruction is required'),
  prepTime: z.number().min(0), // in minutes
  cookTime: z.number().min(0), // in minutes
  servings: z.number().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  nutrition: z.object({
    calories: z.number().min(0),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
  }),
  images: z.array(z.string()).default([]),
  rating: z.number().min(1).max(5).optional(),
  isPublic: z.boolean().default(false),
  createdBy: z.string(),
})

// Food Search Schema
export const foodSearchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.string().optional(),
  brand: z.string().optional(),
  barcode: z.string().optional(),
  limit: z.number().min(1).max(50).default(20),
})

// Inferred Types
export type MealTypeInfer = z.infer<typeof mealTypeSchema>
export type FoodItemInfer = z.infer<typeof foodItemSchema>
export type FoodEntryInfer = z.infer<typeof foodEntrySchema>
export type DailyNutritionInfer = z.infer<typeof dailyNutritionSchema>
export type RecipeInfer = z.infer<typeof recipeSchema>
export type FoodSearchInfer = z.infer<typeof foodSearchSchema>
