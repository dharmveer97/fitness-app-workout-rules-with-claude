import React, { useState, useEffect } from 'react'

import { TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'

import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils/cn'

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'select' | 'home' | 'settings'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ThemeToggle({
  variant = 'icon',
  size = 'md',
  showLabel = false,
  className = '',
}: ThemeToggleProps) {
  const { setColorScheme, colorScheme } = useColorScheme()
  const [selectedScheme, setSelectedScheme] = useState<
    'light' | 'dark' | 'system'
  >('system')

  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24
  const buttonSize =
    size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12'

  // Initialize selected scheme based on current color scheme
  useEffect(() => {
    if (colorScheme) {
      setSelectedScheme(colorScheme === 'dark' ? 'dark' : 'light')
    }
  }, [colorScheme])

  const handleThemeChange = (scheme: 'light' | 'dark' | 'system') => {
    console.log('Setting color scheme to:', scheme)
    setSelectedScheme(scheme)
    setColorScheme(scheme)
  }

  const handleThemeToggle = React.useCallback(() => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark'
    handleThemeChange(newTheme)
  }, [colorScheme])

  if (variant === 'switch') {
    return (
      <Box className={cn('flex-row items-center space-x-3', className)}>
        {showLabel && (
          <Text className='text-secondary text-sm font-medium'>
            {colorScheme === 'dark' ? 'Dark' : 'Light'} Mode
          </Text>
        )}
        <TouchableOpacity
          onPress={handleThemeToggle}
          activeOpacity={0.7}
          className='relative'
        >
          <Box
            className='border-primary h-6 w-12 rounded-full border'
            style={{
              backgroundColor: colorScheme === 'dark' ? '#10B981' : '#E2E8F0',
            }}
          />
          <Box
            className='surface-primary absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm'
            style={{
              transform: [{ translateX: colorScheme === 'dark' ? 26 : 2 }],
            }}
          >
            <Box className='flex-1 items-center justify-center'>
              <Ionicons
                name={colorScheme === 'dark' ? 'moon' : 'sunny'}
                size={12}
                color={colorScheme === 'dark' ? '#64748B' : '#F59E0B'}
              />
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    )
  }

  // Settings variant - optimized for profile/settings screens
  if (variant === 'settings' || variant === 'select') {
    return (
      <Box
        className={cn(
          'flex-row rounded-lg bg-surface-secondary p-1',
          className,
        )}
      >
        {(['light', 'system', 'dark'] as const).map((themeOption) => (
          <TouchableOpacity
            key={themeOption}
            onPress={() => handleThemeChange(themeOption)}
            className={cn(
              'min-h-[44px] flex-1 justify-center rounded-md px-3 py-2',
              selectedScheme === themeOption && 'bg-surface-primary shadow-sm',
            )}
            activeOpacity={0.7}
          >
            <Box className='flex-row items-center justify-center space-x-2'>
              <Ionicons
                name={
                  themeOption === 'light'
                    ? 'sunny'
                    : themeOption === 'dark'
                      ? 'moon'
                      : 'phone-portrait'
                }
                size={18}
                color={selectedScheme === themeOption ? '#10B981' : '#64748B'}
              />
              <Text
                className={cn(
                  'text-sm font-medium capitalize',
                  selectedScheme === themeOption
                    ? 'text-brand'
                    : 'text-tertiary',
                )}
              >
                {themeOption}
              </Text>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    )
  }

  // Home variant - simple icon toggle for home screen
  if (variant === 'home') {
    return (
      <TouchableOpacity
        onPress={handleThemeToggle}
        className={cn(
          'border-primary items-center justify-center rounded-full border bg-surface-secondary',
          buttonSize,
          className,
        )}
        activeOpacity={0.8}
      >
        <Ionicons
          name={colorScheme === 'dark' ? 'moon' : 'sunny'}
          size={iconSize}
          color={colorScheme === 'dark' ? '#64748B' : '#F59E0B'}
        />
      </TouchableOpacity>
    )
  }

  // Default icon variant
  return (
    <TouchableOpacity
      onPress={handleThemeToggle}
      className={cn(
        'border-primary items-center justify-center rounded-full border bg-surface-secondary',
        buttonSize,
        className,
      )}
      activeOpacity={0.8}
    >
      <Ionicons
        name={colorScheme === 'dark' ? 'moon' : 'sunny'}
        size={iconSize}
        color={colorScheme === 'dark' ? '#64748B' : '#F59E0B'}
      />
    </TouchableOpacity>
  )
}

// Preset theme toggle buttons for common use cases
export function HeaderThemeToggle() {
  return <ThemeToggle variant='home' size='md' />
}

export function SettingsThemeToggle() {
  return <ThemeToggle variant='settings' className='w-full' />
}

export function QuickThemeSwitch() {
  return <ThemeToggle variant='switch' showLabel size='sm' />
}
