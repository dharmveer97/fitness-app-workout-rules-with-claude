/**
 * Professional Fitness App Color System Demo
 *
 * This component demonstrates the new professional fitness color scheme
 * with electric blue primary colors and energetic accents.
 */

import React from 'react'

import { View, Text, Pressable, ScrollView } from 'react-native'

import { useColorScheme } from 'nativewind'

import { lightTheme, darkTheme } from '../theme/tokens'

export function FitnessColorDemo() {
  const { colorScheme } = useColorScheme()
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme

  const fitnessActivities = [
    { name: 'Strength', color: theme.fitness.strength },
    { name: 'Cardio', color: theme.fitness.cardio },
    { name: 'Yoga', color: theme.fitness.yoga },
    { name: 'HIIT', color: theme.fitness.hiit },
    { name: 'Running', color: theme.fitness.running },
    { name: 'Cycling', color: theme.fitness.cycling },
  ]

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.surface.primary,
        padding: 20,
      }}
      className='bg-surface-primary'
    >
      {/* Header */}
      <Text
        style={{ color: theme.text.primary }}
        className='mb-6 text-2xl font-bold text-text-primary'
      >
        Professional Fitness Color System
      </Text>

      {/* Primary Actions */}
      <View className='mb-8'>
        <Text
          style={{ color: theme.text.secondary }}
          className='mb-4 text-lg font-semibold text-text-secondary'
        >
          Primary Actions
        </Text>

        {/* Primary Button */}
        <Pressable
          className='mb-3 rounded-lg bg-interactive-primary-default p-4 active:bg-interactive-primary-active'
          style={{ backgroundColor: theme.interactive.primary.default }}
        >
          <Text className='text-center font-semibold text-white'>
            Start Workout - Electric Blue Primary
          </Text>
        </Pressable>

        {/* Accent Button */}
        <Pressable
          className='bg-interactive-accent-default active:bg-interactive-accent-active mb-3 rounded-lg p-4'
          style={{ backgroundColor: theme.interactive.accent.default }}
        >
          <Text className='text-center font-semibold text-white'>
            Track Progress - Coral Accent
          </Text>
        </Pressable>

        {/* Secondary Button */}
        <Pressable
          className='rounded-lg border border-border-primary bg-interactive-secondary-default p-4 active:bg-interactive-secondary-active'
          style={{
            backgroundColor: theme.interactive.secondary.default,
            borderColor: theme.border.primary,
          }}
        >
          <Text
            className='text-center font-semibold'
            style={{ color: theme.text.primary }}
          >
            View History
          </Text>
        </Pressable>
      </View>

      {/* Semantic States */}
      <View className='mb-8'>
        <Text
          style={{ color: theme.text.secondary }}
          className='mb-4 text-lg font-semibold text-text-secondary'
        >
          Semantic States
        </Text>

        {/* Success */}
        <View
          className='mb-2 rounded-lg border-l-4 p-3'
          style={{
            backgroundColor: theme.semantic.success.light,
            borderLeftColor: theme.semantic.success.default,
          }}
        >
          <Text style={{ color: theme.semantic.success.dark }}>
            ✓ Goal achieved! Great job on your workout streak.
          </Text>
        </View>

        {/* Warning */}
        <View
          className='mb-2 rounded-lg border-l-4 p-3'
          style={{
            backgroundColor: theme.semantic.warning.light,
            borderLeftColor: theme.semantic.warning.default,
          }}
        >
          <Text style={{ color: theme.semantic.warning.dark }}>
            ⚠ You're close to missing your daily goal.
          </Text>
        </View>

        {/* Error */}
        <View
          className='mb-2 rounded-lg border-l-4 p-3'
          style={{
            backgroundColor: theme.semantic.error.light,
            borderLeftColor: theme.semantic.error.default,
          }}
        >
          <Text style={{ color: theme.semantic.error.dark }}>
            ✗ Workout session failed to sync.
          </Text>
        </View>
      </View>

      {/* Fitness Activities */}
      <View className='mb-8'>
        <Text
          style={{ color: theme.text.secondary }}
          className='mb-4 text-lg font-semibold text-text-secondary'
        >
          Fitness Activities
        </Text>

        <View className='flex-row flex-wrap gap-3'>
          {fitnessActivities.map((activity, index) => (
            <View
              key={index}
              className='rounded-full border-2 px-4 py-2'
              style={{
                backgroundColor: `${activity.color}20`, // 20% opacity
                borderColor: activity.color,
              }}
            >
              <Text style={{ color: activity.color }}>{activity.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Cards */}
      <View className='mb-8'>
        <Text
          style={{ color: theme.text.secondary }}
          className='mb-4 text-lg font-semibold text-text-secondary'
        >
          Cards & Surfaces
        </Text>

        <View
          className='mb-3 rounded-lg border p-4'
          style={{
            backgroundColor: theme.surface.elevated,
            borderColor: theme.border.primary,
          }}
        >
          <Text
            className='mb-2 font-semibold'
            style={{ color: theme.text.primary }}
          >
            Today's Progress
          </Text>
          <Text style={{ color: theme.text.secondary }}>
            Steps: 8,245 / 10,000
          </Text>
          <Text style={{ color: theme.text.tertiary }}>
            Calories burned: 312
          </Text>
        </View>

        <View
          className='rounded-lg p-4'
          style={{ backgroundColor: theme.surface.accent }}
        >
          <Text
            className='mb-2 font-semibold'
            style={{ color: theme.text.brand }}
          >
            Featured Workout
          </Text>
          <Text style={{ color: theme.text.secondary }}>
            High-intensity interval training
          </Text>
        </View>
      </View>

      {/* Color Palette Reference */}
      <View className='mb-8'>
        <Text
          style={{ color: theme.text.secondary }}
          className='mb-4 text-lg font-semibold text-text-secondary'
        >
          Color Palette
        </Text>

        <View className='flex-row flex-wrap gap-2'>
          <View className='items-center'>
            <View
              className='mb-1 h-12 w-12 rounded-lg'
              style={{ backgroundColor: theme.interactive.primary.default }}
            />
            <Text
              className='text-center text-xs'
              style={{ color: theme.text.tertiary }}
            >
              Primary
            </Text>
          </View>

          <View className='items-center'>
            <View
              className='mb-1 h-12 w-12 rounded-lg'
              style={{ backgroundColor: theme.interactive.accent.default }}
            />
            <Text
              className='text-center text-xs'
              style={{ color: theme.text.tertiary }}
            >
              Accent
            </Text>
          </View>

          <View className='items-center'>
            <View
              className='mb-1 h-12 w-12 rounded-lg'
              style={{ backgroundColor: theme.semantic.success.default }}
            />
            <Text
              className='text-center text-xs'
              style={{ color: theme.text.tertiary }}
            >
              Success
            </Text>
          </View>

          <View className='items-center'>
            <View
              className='mb-1 h-12 w-12 rounded-lg'
              style={{ backgroundColor: theme.semantic.warning.default }}
            />
            <Text
              className='text-center text-xs'
              style={{ color: theme.text.tertiary }}
            >
              Warning
            </Text>
          </View>

          <View className='items-center'>
            <View
              className='mb-1 h-12 w-12 rounded-lg'
              style={{ backgroundColor: theme.semantic.error.default }}
            />
            <Text
              className='text-center text-xs'
              style={{ color: theme.text.tertiary }}
            >
              Error
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
