// React types
type ReactNode = import('react').ReactNode
type Dispatch<T> = import('react').Dispatch<T>
type SetStateAction<T> = import('react').SetStateAction<T>

// Journal schema inferred types
type MoodType = import('../schemas/journal').MoodInfer
type TodoItemType = import('../schemas/journal').TodoItemInfer
type SleepType = import('../schemas/journal').SleepInfer
type WaterIntakeType = import('../schemas/journal').WaterIntakeInfer
type MovementType = import('../schemas/journal').MovementInfer
type JournalEntryType = import('../schemas/journal').JournalEntryInfer
type QuickJournalType = import('../schemas/journal').QuickJournalInfer

// Journal state types
interface JournalState {
  entries: JournalEntryType[]
  currentEntry: Partial<JournalEntryType> | null
  todayEntry: JournalEntryType | null
  isLoading: boolean
  error: string | null
  filters: JournalFilters
  searchQuery: string
}

interface JournalActions {
  createEntry: (entry: Partial<JournalEntryType>) => Promise<void>
  updateEntry: (id: string, updates: Partial<JournalEntryType>) => Promise<void>
  deleteEntry: (id: string) => Promise<void>
  getEntry: (id: string) => JournalEntryType | null
  getEntryByDate: (date: Date) => JournalEntryType | null
  getTodayEntry: () => JournalEntryType | null
  loadEntries: (filters?: JournalFilters) => Promise<void>
  searchEntries: (query: string) => Promise<void>
  setCurrentEntry: (entry: Partial<JournalEntryType> | null) => void
  clearError: () => void
  generateAIPrompt: (mood: MoodType) => Promise<string>
  analyzeEntry: (entry: JournalEntryType) => Promise<string>
}

// Journal context type
interface JournalContextType extends JournalState, JournalActions {}

// Journal hook return type
type UseJournalReturn = JournalContextType

// Journal filters type
interface JournalFilters {
  dateRange?: {
    start: Date
    end: Date
  }
  moodTypes?: MoodType['type'][]
  tags?: string[]
  hasImages?: boolean
  hasNotes?: boolean
  sortBy?: 'date' | 'mood' | 'created'
  sortOrder?: 'asc' | 'desc'
}

// Journal statistics type
interface JournalStats {
  totalEntries: number
  currentStreak: number
  longestStreak: number
  averageMood: number
  mostCommonMood: MoodType['type']
  totalWaterGlasses: number
  averageWater: number
  totalSteps: number
  averageSteps: number
  completedTodos: number
  totalTodos: number
}

// Journal insights type
interface JournalInsights {
  moodTrends: Array<{
    date: Date
    mood: MoodType
  }>
  habitPatterns: Array<{
    habit: string
    frequency: number
    trend: 'improving' | 'declining' | 'stable'
  }>
  recommendations: string[]
  achievements: string[]
}
