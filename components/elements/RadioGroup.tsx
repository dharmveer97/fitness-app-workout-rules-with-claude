import React, { useState } from 'react'

import { View, TouchableOpacity } from 'react-native'

import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

import { cn } from '@/utils/cn'

import { Card } from '../atoms/Card'
import { Text } from '../atoms/Text'

export interface RadioOption<T = string> {
  value: T
  label: string
  description?: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface RadioGroupProps<T = string> extends ViewProps {
  label?: string
  options: RadioOption<T>[]
  value?: T
  onChange?: (value: T) => void
  orientation?: 'vertical' | 'horizontal'
  variant?: 'default' | 'card' | 'button'
  error?: string
  containerClassName?: string
}

export function RadioGroup<T = string>({
  label,
  options,
  value,
  onChange,
  orientation = 'vertical',
  variant = 'default',
  error,
  containerClassName = '',
  ...props
}: RadioGroupProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(value)

  // Create individual animated styles to avoid hook rule violations (support up to 10 options)
  const radioStyle0 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[0]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[0]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle1 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[1]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[1]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle2 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[2]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[2]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle3 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[3]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[3]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle4 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[4]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[4]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle5 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[5]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[5]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle6 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[6]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[6]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle7 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[7]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[7]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle8 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[8]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[8]?.value ? '#10B981' : 'transparent',
    ),
  }))
  const radioStyle9 = useAnimatedStyle(() => ({
    borderColor: withSpring(
      selectedValue === options[9]?.value ? '#10B981' : '#4B5563',
    ),
    backgroundColor: withSpring(
      selectedValue === options[9]?.value ? '#10B981' : 'transparent',
    ),
  }))

  const radioButtonStyles = [
    radioStyle0,
    radioStyle1,
    radioStyle2,
    radioStyle3,
    radioStyle4,
    radioStyle5,
    radioStyle6,
    radioStyle7,
    radioStyle8,
    radioStyle9,
  ]

  const handleSelect = (optionValue: T) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
  }

  const containerClass = cn(
    orientation === 'horizontal' ? 'flex-row flex-wrap' : 'space-y-3',
    containerClassName,
  )

  const renderRadioButton = (
    option: RadioOption<T>,
    isSelected: boolean,
    index: number,
  ) => (
    <Animated.View
      style={radioButtonStyles[index]}
      className='h-5 w-5 items-center justify-center rounded-full border-2'
    >
      {isSelected && <View className='h-2 w-2 rounded-full bg-white' />}
    </Animated.View>
  )

  const renderOption = (option: RadioOption<T>, index: number) => {
    const isSelected = selectedValue === option.value
    const isDisabled = option.disabled

    if (variant === 'card') {
      return (
        <TouchableOpacity
          key={String(option.value)}
          onPress={() => !isDisabled && handleSelect(option.value)}
          disabled={isDisabled}
          className={cn(
            orientation === 'horizontal' ? 'mx-1 flex-1' : 'w-full',
            isDisabled && 'opacity-50',
          )}
        >
          <Card
            variant={isSelected ? 'default' : 'outlined'}
            className={cn(
              'p-4',
              isSelected && 'border-primary-500 bg-primary-500/10',
            )}
          >
            <View className='flex-row items-start'>
              {renderRadioButton(option, isSelected, index)}
              <View className='ml-3 flex-1'>
                {option.icon && <View className='mb-2'>{option.icon}</View>}
                <Text
                  variant='body'
                  weight={isSelected ? 'semibold' : 'regular'}
                  color={isSelected ? 'white' : 'gray'}
                >
                  {option.label}
                </Text>
                {option.description && (
                  <Text variant='caption' color='gray' className='mt-1'>
                    {option.description}
                  </Text>
                )}
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      )
    }

    if (variant === 'button') {
      return (
        <TouchableOpacity
          key={String(option.value)}
          onPress={() => !isDisabled && handleSelect(option.value)}
          disabled={isDisabled}
          className={cn(
            'rounded-xl border px-4 py-3',
            orientation === 'horizontal' ? 'mx-1 flex-1' : 'w-full',
            isSelected
              ? 'border-primary-500 bg-primary-500'
              : 'border-dark-700 bg-dark-800',
            isDisabled && 'opacity-50',
          )}
        >
          <Text
            variant='body'
            weight='medium'
            color={isSelected ? 'white' : 'gray'}
            align='center'
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      )
    }

    // Default variant
    return (
      <TouchableOpacity
        key={String(option.value)}
        onPress={() => !isDisabled && handleSelect(option.value)}
        disabled={isDisabled}
        className={cn(
          'flex-row items-center',
          orientation === 'horizontal' ? 'mr-6' : '',
          isDisabled && 'opacity-50',
        )}
      >
        {renderRadioButton(option, isSelected, index)}
        <View className='ml-3'>
          <Text variant='body' color={isSelected ? 'white' : 'gray'}>
            {option.label}
          </Text>
          {option.description && (
            <Text variant='caption' color='gray'>
              {option.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View className='w-full' {...props}>
      {label && (
        <Text variant='label' color='gray' className='mb-3'>
          {label}
        </Text>
      )}

      <View className={containerClass}>
        {options.map((option, index) => renderOption(option, index))}
      </View>

      {error && (
        <Text variant='caption' color='error' className='mt-2'>
          {error}
        </Text>
      )}
    </View>
  )
}

export default RadioGroup
