// Food schema inferred types
type MealTypeType = import('../schemas/food').MealTypeInfer
type FoodItemType = import('../schemas/food').FoodItemInfer
type FoodEntryType = import('../schemas/food').FoodEntryInfer
type DailyNutritionType = import('../schemas/food').DailyNutritionInfer
type RecipeType = import('../schemas/food').RecipeInfer
type FoodSearchType = import('../schemas/food').FoodSearchInfer

// Food diary state types
interface FoodDiaryState {
  entries: FoodEntryType[]
  todayEntries: FoodEntryType[]
  dailyNutrition: DailyNutritionType | null
  recipes: RecipeType[]
  favoriteRecipes: RecipeType[]
  recentFoods: FoodItemType[]
  isLoading: boolean
  error: string | null
  searchResults: FoodItemType[]
  searchQuery: string
}

interface FoodDiaryActions {
  addFoodEntry: (entry: Partial<FoodEntryType>) => Promise<void>
  updateFoodEntry: (
    id: string,
    updates: Partial<FoodEntryType>,
  ) => Promise<void>
  deleteFoodEntry: (id: string) => Promise<void>
  loadTodayEntries: () => Promise<void>
  loadEntriesByDate: (date: Date) => Promise<void>
  searchFood: (query: string) => Promise<void>
  analyzeFoodImage: (imageUri: string) => Promise<FoodItemType[]>
  scanBarcode: (barcode: string) => Promise<FoodItemType | null>
  calculateNutrition: (items: FoodItemType[]) => NutritionSummary
  saveRecipe: (recipe: Partial<RecipeType>) => Promise<void>
  loadRecipes: () => Promise<void>
  addToFavorites: (recipeId: string) => Promise<void>
  removeFromFavorites: (recipeId: string) => Promise<void>
  clearError: () => void
}

// Food diary context type
interface FoodDiaryContextType extends FoodDiaryState, FoodDiaryActions {}

// Food diary hook return type
type UseFoodDiaryReturn = FoodDiaryContextType

// Nutrition summary type
interface NutritionSummary {
  totalCalories: number
  macros: {
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  percentages: {
    protein: number
    carbs: number
    fat: number
  }
  micronutrients?: {
    vitaminA?: number
    vitaminC?: number
    vitaminD?: number
    calcium?: number
    iron?: number
  }
}

// Nutrition goals type
interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  water: number
}

// Food diary filters type
interface FoodDiaryFilters {
  dateRange?: {
    start: Date
    end: Date
  }
  mealTypes?: MealTypeType[]
  categories?: string[]
  minCalories?: number
  maxCalories?: number
  sortBy?: 'date' | 'calories' | 'name'
  sortOrder?: 'asc' | 'desc'
}

// Food diary statistics type
interface FoodDiaryStats {
  totalEntries: number
  averageCalories: number
  averageMacros: {
    protein: number
    carbs: number
    fat: number
  }
  mostLoggedFoods: Array<{
    food: string
    count: number
  }>
  caloriesTrend: Array<{
    date: Date
    calories: number
  }>
  nutritionScore: number
}

// AI food analysis type
interface AIFoodAnalysis {
  confidence: number
  detectedFoods: Array<{
    name: string
    confidence: number
    nutrition: NutritionSummary
  }>
  suggestions: string[]
  healthScore: number
  warnings: string[]
}
