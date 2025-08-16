import React from 'react'

import { View, Text, ScrollView } from 'react-native'

import { Button } from '@/components/atoms'
import { useTheme, useThemeColors } from '@/components/theme'
import {
  SettingsThemeToggle,
  HeaderThemeToggle,
  QuickThemeSwitch,
} from '@/components/theme/ThemeToggle'

export function ThemeTestScreen() {
  const { theme, resolvedTheme, isDark, isLight } = useTheme()
  const colors = useThemeColors()

  return (
    <ScrollView className='bg-surface-primary flex-1 p-6'>
      <View className='space-y-6'>
        {/* Theme Status */}
        <View className='border-primary bg-surface-secondary rounded-2xl border p-4'>
          <Text className='text-primary mb-4 text-xl font-bold'>
            Theme Status
          </Text>
          <Text className='text-secondary'>Current Theme: {theme}</Text>
          <Text className='text-secondary'>
            Resolved Theme: {resolvedTheme}
          </Text>
          <Text className='text-secondary'>
            Is Dark: {isDark ? 'Yes' : 'No'}
          </Text>
          <Text className='text-secondary'>
            Is Light: {isLight ? 'Yes' : 'No'}
          </Text>
        </View>

        {/* Theme Toggles */}
        <View className='border-primary bg-surface-secondary rounded-2xl border p-4'>
          <Text className='text-primary mb-4 text-xl font-bold'>
            Theme Controls
          </Text>

          <View className='space-y-4'>
            <View>
              <Text className='text-secondary mb-2'>Header Toggle:</Text>
              <HeaderThemeToggle />
            </View>

            <View>
              <Text className='text-secondary mb-2'>Quick Switch:</Text>
              <QuickThemeSwitch />
            </View>

            <View>
              <Text className='text-secondary mb-2'>Settings Toggle:</Text>
              <SettingsThemeToggle />
            </View>
          </View>
        </View>

        {/* Color Showcase */}
        <View className='border-primary bg-surface-secondary rounded-2xl border p-4'>
          <Text className='text-primary mb-4 text-xl font-bold'>
            Semantic Colors
          </Text>

          <View className='space-y-3'>
            <View className='bg-surface-tertiary flex-row items-center justify-between rounded-lg p-3'>
              <Text className='text-primary'>Primary Text</Text>
              <View
                className='h-6 w-6 rounded'
                style={{ backgroundColor: colors.textPrimary }}
              />
            </View>

            <View className='bg-surface-tertiary flex-row items-center justify-between rounded-lg p-3'>
              <Text className='text-secondary'>Secondary Text</Text>
              <View
                className='h-6 w-6 rounded'
                style={{ backgroundColor: colors.textSecondary }}
              />
            </View>

            <View className='bg-surface-tertiary flex-row items-center justify-between rounded-lg p-3'>
              <Text className='text-brand'>Brand Text</Text>
              <View
                className='h-6 w-6 rounded'
                style={{ backgroundColor: colors.textBrand }}
              />
            </View>
          </View>
        </View>

        {/* Interactive Elements */}
        <View className='border-primary bg-surface-secondary rounded-2xl border p-4'>
          <Text className='text-primary mb-4 text-xl font-bold'>
            Interactive Elements
          </Text>

          <View className='space-y-3'>
            <Button variant='primary'>Primary Button</Button>
            <Button variant='secondary'>Secondary Button</Button>
            <Button variant='outline'>Outline Button</Button>
            <Button variant='ghost'>Ghost Button</Button>
            <Button variant='danger'>Danger Button</Button>
          </View>
        </View>

        {/* Surface Colors */}
        <View className='border-primary bg-surface-secondary rounded-2xl border p-4'>
          <Text className='text-primary mb-4 text-xl font-bold'>
            Surface Colors
          </Text>

          <View className='space-y-3'>
            <View className='border-secondary bg-surface-primary rounded-lg border p-4'>
              <Text className='text-primary'>Surface Primary</Text>
            </View>

            <View className='border-secondary bg-surface-secondary rounded-lg border p-4'>
              <Text className='text-primary'>Surface Secondary</Text>
            </View>

            <View className='border-secondary bg-surface-tertiary rounded-lg border p-4'>
              <Text className='text-primary'>Surface Tertiary</Text>
            </View>
          </View>
        </View>

        {/* Semantic States */}
        <View className='border-primary bg-surface-secondary rounded-2xl border p-4'>
          <Text className='text-primary mb-4 text-xl font-bold'>
            Semantic States
          </Text>

          <View className='grid grid-cols-2 gap-3'>
            <View className='bg-semantic-success-bg border-secondary rounded-lg border p-3'>
              <Text className='text-semantic-success font-semibold'>
                Success
              </Text>
            </View>

            <View className='bg-semantic-warning-bg border-secondary rounded-lg border p-3'>
              <Text className='text-semantic-warning font-semibold'>
                Warning
              </Text>
            </View>

            <View className='bg-semantic-error-bg border-secondary rounded-lg border p-3'>
              <Text className='text-semantic-error font-semibold'>Error</Text>
            </View>

            <View className='bg-semantic-info-bg border-secondary rounded-lg border p-3'>
              <Text className='text-semantic-info font-semibold'>Info</Text>
            </View>
          </View>
        </View>

        {/* Fitness Activity Colors */}
        <View className='border-primary bg-surface-secondary rounded-2xl border p-4'>
          <Text className='text-primary mb-4 text-xl font-bold'>
            Fitness Activity Colors
          </Text>

          <View className='grid grid-cols-2 gap-3'>
            <View
              className='border-secondary rounded-lg border p-3'
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            >
              <Text className='font-semibold' style={{ color: '#EF4444' }}>
                Strength
              </Text>
            </View>

            <View
              className='border-secondary rounded-lg border p-3'
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            >
              <Text className='font-semibold' style={{ color: '#3B82F6' }}>
                Cardio
              </Text>
            </View>

            <View
              className='border-secondary rounded-lg border p-3'
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
            >
              <Text className='font-semibold' style={{ color: '#10B981' }}>
                Running
              </Text>
            </View>

            <View
              className='border-secondary rounded-lg border p-3'
              style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
            >
              <Text className='font-semibold' style={{ color: '#8B5CF6' }}>
                Yoga
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
