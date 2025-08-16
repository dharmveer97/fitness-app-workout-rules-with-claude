// Settings and configuration types

// App settings
interface AppSettings {
  theme: ThemeMode
  language: string
  hapticFeedback: boolean
  soundEffects: boolean
  animations: boolean
  autoLock: boolean
  lockTimeout: number // in minutes
}

// Notification settings
interface NotificationSettings {
  enabled: boolean
  workoutReminders: boolean
  waterReminders: boolean
  sleepReminders: boolean
  goalAchievements: boolean
  weeklyReports: boolean
  challengeUpdates: boolean
  motivationalQuotes: boolean
  quietHours: {
    enabled: boolean
    startTime: string // HH:mm format
    endTime: string // HH:mm format
  }
}

// Privacy settings
interface PrivacySettings {
  shareStats: boolean
  shareWorkouts: boolean
  allowFriends: boolean
  profileVisibility: 'public' | 'friends' | 'private'
  dataExport: boolean
  analytics: boolean
}

// Unit preferences
interface UnitPreferences {
  system: UnitSystem
  weight: 'kg' | 'lbs'
  distance: 'km' | 'miles'
  temperature: 'celsius' | 'fahrenheit'
  time: '12h' | '24h'
}

// Goal settings
interface GoalSettings {
  weekStartsOn: 'sunday' | 'monday'
  defaultReminders: boolean
  progressVisibility: boolean
  streakCounting: boolean
  adaptiveGoals: boolean // Auto-adjust goals based on performance
}

// Data and sync settings
interface DataSyncSettings {
  autoSync: boolean
  syncFrequency: 'realtime' | 'hourly' | 'daily'
  wifiOnly: boolean
  cloudBackup: boolean
  lastSyncDate: Date
  conflictResolution: 'local' | 'server' | 'prompt'
}

// Security settings
interface SecuritySettings {
  biometricAuth: boolean
  pinCode: boolean
  autoLogout: boolean
  logoutTimeout: number // in minutes
  sessionManagement: boolean
  twoFactorAuth: boolean
}

// Combined user preferences
interface UserPreferences {
  app: AppSettings
  notifications: NotificationSettings
  privacy: PrivacySettings
  units: UnitPreferences
  goals: GoalSettings
  dataSync: DataSyncSettings
  security: SecuritySettings
}

// Settings section types
type SettingsSection =
  | 'app'
  | 'notifications'
  | 'privacy'
  | 'units'
  | 'goals'
  | 'dataSync'
  | 'security'
  | 'about'

// Settings item types
interface SettingsItem {
  id: string
  title: string
  description?: string
  icon?: string
  type: 'toggle' | 'select' | 'input' | 'button' | 'navigation'
  value?: any
  options?: { label: string; value: any }[]
  onPress?: () => void
  onChange?: (value: any) => void
  disabled?: boolean
  section: SettingsSection
}

// Settings group types
interface SettingsGroup {
  title: string
  items: SettingsItem[]
  description?: string
}

// Zustand Preferences Store Types
interface PreferencesState {
  theme: 'light' | 'dark' | 'system'
  metricUnits: boolean
  _hasHydrated: boolean
}

interface PreferencesActions {
  setTheme: (theme: PreferencesState['theme']) => void
  setMetricUnits: (metricUnits: boolean) => void
  setHasHydrated: (hydrated: boolean) => void
  reset: () => void
}

interface PreferencesStore extends PreferencesState, PreferencesActions {}
