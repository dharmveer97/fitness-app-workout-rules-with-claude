// Home screen component type definitions

interface StatsCardData {
  title: string
  value: number
  unit: string
  change: number
  changeLabel: string
  icon: string
  color: string
  trend: 'up' | 'down' | 'neutral'
}

interface ProgressRingData {
  value: number
  maxValue: number
  color: string
  label: string
  unit?: string
  icon: string
}

interface QuickActionData {
  id: string
  title: string
  icon: string
  color: string
  action: () => void
}

interface ActivityItemData {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  icon: string
  color: string
  value?: number
  unit?: string
}

interface WeeklyChartData {
  day: string
  value: number
  color: string
}
