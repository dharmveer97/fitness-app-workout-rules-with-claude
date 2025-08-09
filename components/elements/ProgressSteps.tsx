import React from 'react'

import { View, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated'

import { cn } from '@/utils/cn'

import { Text } from '../atoms/Text'

export interface Step {
  id: string
  title: string
  description?: string
  icon?: keyof typeof Ionicons.glyphMap
  completed?: boolean
  active?: boolean
  disabled?: boolean
}

export interface ProgressStepsProps extends ViewProps {
  steps: Step[]
  currentStep: number
  onStepPress?: (index: number, step: Step) => void
  variant?: 'default' | 'compact' | 'detailed'
  orientation?: 'horizontal' | 'vertical'
  showConnector?: boolean
  containerClassName?: string
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  onStepPress,
  variant = 'default',
  orientation = 'horizontal',
  showConnector = true,
  containerClassName = '',
  ...props
}) => {
  const progress = (currentStep / (steps.length - 1)) * 100

  const renderStepIndicator = (step: Step, index: number) => {
    const isCompleted = index < currentStep
    const isActive = index === currentStep
    const isDisabled = step.disabled ?? index > currentStep

    const animatedStyle = useAnimatedStyle(() => {
      const scale = withSpring(isActive ? 1.2 : 1)
      return {
        transform: [{ scale }],
      }
    })

    return (
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          onPress={() => !isDisabled && onStepPress?.(index, step)}
          disabled={isDisabled}
          className={cn(
            'h-10 w-10 items-center justify-center rounded-full',
            isCompleted && 'bg-primary-500',
            isActive && 'border-2 border-primary-300 bg-primary-500',
            !isCompleted && !isActive && 'border-2 border-dark-600 bg-dark-700',
            isDisabled && 'opacity-50',
          )}
        >
          {isCompleted ? (
            <Ionicons name='checkmark' size={20} color='#FFFFFF' />
          ) : step.icon ? (
            <Ionicons
              name={step.icon}
              size={20}
              color={isActive ? '#FFFFFF' : '#9CA3AF'}
            />
          ) : (
            <Text
              variant='caption'
              weight='bold'
              color={isActive ? 'white' : 'gray'}
            >
              {index + 1}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  const renderConnector = (index: number) => {
    if (!showConnector || index === steps.length - 1) return null

    const isCompleted = index < currentStep
    const connectorProgress = interpolate(
      currentStep,
      [index, index + 1],
      [0, 100],
    )

    if (orientation === 'vertical') {
      return (
        <View className='w-10 items-center py-1'>
          <View className='h-12 w-0.5 overflow-hidden bg-dark-700'>
            <Animated.View
              className='w-full bg-primary-500'
              style={{
                height: `${Math.min(100, Math.max(0, connectorProgress))}%`,
              }}
            />
          </View>
        </View>
      )
    }

    return (
      <View className='mx-2 flex-1'>
        <View className='h-0.5 overflow-hidden bg-dark-700'>
          <Animated.View
            className='h-full bg-primary-500'
            style={{
              width: `${Math.min(100, Math.max(0, connectorProgress))}%`,
            }}
          />
        </View>
      </View>
    )
  }

  const renderStep = (step: Step, index: number) => {
    const isActive = index === currentStep
    const isCompleted = index < currentStep

    if (variant === 'compact') {
      return (
        <React.Fragment key={step.id}>
          {renderStepIndicator(step, index)}
          {renderConnector(index)}
        </React.Fragment>
      )
    }

    if (variant === 'detailed' && orientation === 'vertical') {
      return (
        <View key={step.id} className='flex-row'>
          <View className='items-center'>
            {renderStepIndicator(step, index)}
            {renderConnector(index)}
          </View>
          <View className='ml-4 flex-1 pb-8'>
            <Text
              variant='body'
              weight={isActive ? 'semibold' : 'medium'}
              color={isActive ? 'white' : isCompleted ? 'primary' : 'gray'}
            >
              {step.title}
            </Text>
            {step.description && (
              <Text variant='caption' color='gray' className='mt-1'>
                {step.description}
              </Text>
            )}
          </View>
        </View>
      )
    }

    // Default horizontal layout
    return (
      <View
        key={step.id}
        className={cn(
          'items-center',
          orientation === 'horizontal' ? 'flex-1' : '',
        )}
      >
        <View className='flex-row items-center'>
          {renderStepIndicator(step, index)}
          {orientation === 'horizontal' && renderConnector(index)}
        </View>
        {variant === 'detailed' && (
          <View className='mt-2 items-center'>
            <Text
              variant='caption'
              weight={isActive ? 'semibold' : 'regular'}
              color={isActive ? 'white' : 'gray'}
              align='center'
            >
              {step.title}
            </Text>
          </View>
        )}
      </View>
    )
  }

  const containerClass = cn(
    orientation === 'horizontal' ? 'flex-row items-center' : '',
    containerClassName,
  )

  return (
    <View className={containerClass} {...props}>
      {steps.map((step, index) => renderStep(step, index))}
    </View>
  )
}

export default ProgressSteps
