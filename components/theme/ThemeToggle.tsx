import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { Pressable } from '@/components/ui/pressable'
import { Switch } from '@/components/ui/switch'
import { Text } from '@/components/ui/text'
import { useColorScheme } from '@/components/useColorScheme'
import { usePreferencesStore } from '@/stores'

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'select' | 'settings'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ThemeToggle({
  variant = 'icon',
  size = 'md',
  showLabel = false,
}: ThemeToggleProps) {
  const colorScheme = useColorScheme()
  const { theme, setTheme } = usePreferencesStore()

  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
  }

  const handleToggle = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark'
    handleThemeChange(newTheme)
  }

  if (variant === 'switch') {
    return (
      <HStack space='md' className='items-center'>
        {showLabel && (
          <Text size='sm' className='text-typography-secondary'>
            {colorScheme === 'dark' ? 'Dark' : 'Light'} Mode
          </Text>
        )}
        <Switch
          value={colorScheme === 'dark'}
          onValueChange={(value: boolean) => {
            handleThemeChange(value ? 'dark' : 'light')
          }}
          size={size}
        />
      </HStack>
    )
  }

  if (variant === 'settings') {
    return (
      <Box className='bg-background-50 rounded-lg p-1'>
        <HStack space='xs'>
          {(['light', 'system', 'dark'] as const).map((themeOption) => (
            <Pressable
              key={themeOption}
              onPress={() => handleThemeChange(themeOption)}
              className={
                theme === themeOption
                  ? 'bg-background-0 min-h-[44] flex-1 rounded-md px-3 py-2 shadow-sm'
                  : 'min-h-[44] flex-1 rounded-md px-3 py-2'
              }
            >
              <HStack space='sm' className='items-center justify-center'>
                <Ionicons
                  name={
                    themeOption === 'light'
                      ? 'sunny'
                      : themeOption === 'dark'
                        ? 'moon'
                        : 'phone-portrait'
                  }
                  size={18}
                  color={theme === themeOption ? '#0070F0' : '#64748B'}
                />
                <Text
                  size='sm'
                  className={
                    theme === themeOption
                      ? 'font-medium capitalize text-primary-600'
                      : 'text-typography-700 capitalize'
                  }
                >
                  {themeOption}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </HStack>
      </Box>
    )
  }

  // Default icon variant
  return (
    <Pressable
      onPress={handleToggle}
      className={
        size === 'sm'
          ? 'bg-background-50 border-outline-200 h-8 w-8 items-center justify-center rounded-full border'
          : size === 'lg'
            ? 'bg-background-50 border-outline-200 h-12 w-12 items-center justify-center rounded-full border'
            : 'bg-background-50 border-outline-200 h-10 w-10 items-center justify-center rounded-full border'
      }
    >
      <Ionicons
        name={colorScheme === 'dark' ? 'moon' : 'sunny'}
        size={iconSize}
        color={colorScheme === 'dark' ? '#64748B' : '#F59E0B'}
      />
    </Pressable>
  )
}

// Preset theme toggle buttons for common use cases
export function HeaderThemeToggle() {
  return <ThemeToggle variant='icon' size='md' />
}

export function SettingsThemeToggle() {
  return <ThemeToggle variant='settings' />
}

export function QuickThemeSwitch() {
  return <ThemeToggle variant='switch' showLabel size='sm' />
}
