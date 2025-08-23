import React, { useState } from 'react'

import { View, TouchableOpacity } from 'react-native'

import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { cn } from '@/utils/cn'

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
              <VStack className='ml-3 flex-1'>
                {option.icon && <View className='mb-2'>{option.icon}</View>}
                <Text
                  size='base'
                  className={cn(
                    isSelected
                      ? 'font-semibold text-white'
                      : 'font-normal text-text-secondary',
                  )}
                >
                  {option.label}
                </Text>
                {option.description && (
                  <Text size='sm' className='mt-1 text-text-tertiary'>
                    {option.description}
                  </Text>
                )}
              </VStack>
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
              ? 'border-brand-primary bg-brand-primary'
              : 'border-border-primary bg-surface-secondary',
            isDisabled && 'opacity-50',
          )}
        >
          <Text
            size='base'
            className={cn(
              'text-center font-medium',
              isSelected ? 'text-white' : 'text-text-secondary',
            )}
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
        <VStack className='ml-3'>
          <Text
            size='base'
            className={isSelected ? 'text-text-primary' : 'text-text-secondary'}
          >
            {option.label}
          </Text>
          {option.description && (
            <Text size='sm' className='text-text-tertiary'>
              {option.description}
            </Text>
          )}
        </VStack>
      </TouchableOpacity>
    )
  }

  return (
    <View className='w-full' {...props}>
      {label && (
        <Text size='sm' className='mb-3 font-medium text-text-secondary'>
          {label}
        </Text>
      )}

      <View className={containerClass}>
        {options.map((option, index) => renderOption(option, index))}
      </View>

      {error && (
        <Text size='sm' className='mt-2 text-semantic-error-default'>
          {error}
        </Text>
      )}
    </View>
  )
}

export default RadioGroup
