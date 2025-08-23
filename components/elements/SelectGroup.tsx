import React, { useState } from 'react'

import { View, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn } from 'react-native-reanimated'

import { Badge } from '@/components/ui/badge'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { cn } from '@/utils/cn'

export function SelectGroup<T = string>({
  label,
  options,
  value = [],
  onChange,
  multiple = false,
  max,
  min = 0,
  variant = 'default',
  error,
  hint,
  containerClassName = '',
  ...props
}: SelectGroupProps<T>) {
  const [selectedValues, setSelectedValues] = useState<T[]>(value)

  const handleSelect = (optionValue: T) => {
    let newValues: T[]

    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        // Deselect if already selected and above minimum
        if (selectedValues.length > min) {
          newValues = selectedValues.filter((v) => v !== optionValue)
        } else {
          return // Don't deselect if at minimum
        }
      } else {
        // Select if not at maximum
        if (!max || selectedValues.length < max) {
          newValues = [...selectedValues, optionValue]
        } else {
          return // Don't select if at maximum
        }
      }
    } else {
      // Single selection mode
      newValues = [optionValue]
    }

    setSelectedValues(newValues)
    onChange?.(newValues)
  }

  const isSelected = (optionValue: T) => selectedValues.includes(optionValue)

  const renderChip = (option: SelectOption<T>) => {
    const selected = isSelected(option.value)
    const disabled =
      option.disabled ??
      (!selected && max !== undefined && selectedValues.length >= max)

    return (
      <TouchableOpacity
        key={String(option.value)}
        onPress={() => !disabled && handleSelect(option.value)}
        disabled={disabled}
        className={cn(
          'mb-2 mr-2 rounded-full border px-4 py-2',
          selected
            ? 'border-brand-primary bg-brand-primary'
            : 'border-border-primary bg-surface-secondary',
          disabled && 'opacity-50',
        )}
      >
        <HStack className='items-center'>
          {option.icon && (
            <Ionicons
              name={option.icon}
              size={16}
              color={selected ? '#FFFFFF' : '#677788'}
              style={{ marginRight: 6 }}
            />
          )}
          <Text
            size='sm'
            className={cn(
              'font-medium',
              selected ? 'text-white' : 'text-text-secondary',
            )}
          >
            {option.label}
          </Text>
          {selected && multiple && (
            <Ionicons
              name='close'
              size={16}
              color='#FFFFFF'
              style={{ marginLeft: 6 }}
            />
          )}
        </HStack>
      </TouchableOpacity>
    )
  }

  const renderCard = (option: SelectOption<T>) => {
    const selected = isSelected(option.value)
    const disabled =
      option.disabled ??
      (!selected && max !== undefined && selectedValues.length >= max)

    return (
      <TouchableOpacity
        key={String(option.value)}
        onPress={() => !disabled && handleSelect(option.value)}
        disabled={disabled}
        className={cn(
          'mb-3 rounded-xl border p-4',
          selected
            ? 'border-brand-primary bg-surface-accent'
            : 'border-border-primary bg-surface-secondary',
          disabled && 'opacity-50',
        )}
      >
        <HStack className='items-start'>
          <View
            className={cn(
              'mr-3 h-12 w-12 items-center justify-center rounded-lg',
              selected ? 'bg-brand-primary' : 'bg-surface-tertiary',
            )}
          >
            {option.icon && (
              <Ionicons
                name={option.icon}
                size={24}
                color={selected ? '#FFFFFF' : '#677788'}
              />
            )}
          </View>
          <VStack className='flex-1'>
            <HStack className='items-center justify-between'>
              <Text
                size='base'
                className={cn(
                  selected
                    ? 'font-semibold text-text-primary'
                    : 'font-medium text-text-secondary',
                )}
              >
                {option.label}
              </Text>
              {option.badge && (
                <Badge variant={selected ? 'solid' : 'outline'} size='sm'>
                  <Text
                    size='xs'
                    className={selected ? 'text-white' : 'text-text-secondary'}
                  >
                    {option.badge}
                  </Text>
                </Badge>
              )}
            </HStack>
            {option.description && (
              <Text size='sm' className='mt-1 text-text-tertiary'>
                {option.description}
              </Text>
            )}
          </VStack>
          {selected && (
            <Ionicons
              name='checkmark-circle'
              size={20}
              color='#06D6A0'
              style={{ marginLeft: 8 }}
            />
          )}
        </HStack>
      </TouchableOpacity>
    )
  }

  const renderDefault = (option: SelectOption<T>) => {
    const selected = isSelected(option.value)
    const disabled =
      option.disabled ??
      (!selected && max !== undefined && selectedValues.length >= max)

    return (
      <TouchableOpacity
        key={String(option.value)}
        onPress={() => !disabled && handleSelect(option.value)}
        disabled={disabled}
        className={cn('flex-row items-center py-3', disabled && 'opacity-50')}
      >
        <View
          className={cn(
            'mr-3 h-5 w-5 items-center justify-center rounded border-2',
            selected
              ? 'border-brand-primary bg-brand-primary'
              : 'border-border-primary',
            multiple ? 'rounded' : 'rounded-full',
          )}
        >
          {selected && <Ionicons name='checkmark' size={12} color='#FFFFFF' />}
        </View>
        <Text
          size='base'
          className={selected ? 'text-text-primary' : 'text-text-secondary'}
        >
          {option.label}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderOptions = () => {
    switch (variant) {
      case 'chips':
        return (
          <View className='flex-row flex-wrap'>{options.map(renderChip)}</View>
        )
      case 'cards':
        return options.map(renderCard)
      default:
        return options.map(renderDefault)
    }
  }

  return (
    <VStack className={cn('w-full', containerClassName)} {...props}>
      {label && (
        <Text size='sm' className='mb-3 font-medium text-text-secondary'>
          {label}
        </Text>
      )}

      {hint && (
        <Text size='sm' className='mb-2 text-text-tertiary'>
          {hint}
        </Text>
      )}

      {(min > 0 || max) && (
        <HStack className='mb-2 items-center'>
          {min > 0 && (
            <Badge variant='outline' size='sm' className='mr-2'>
              <Text size='xs'>Min: {min}</Text>
            </Badge>
          )}
          {max && (
            <Badge variant='outline' size='sm'>
              <Text size='xs'>Max: {max}</Text>
            </Badge>
          )}
          <Text size='sm' className='ml-auto text-text-tertiary'>
            Selected: {selectedValues.length}
          </Text>
        </HStack>
      )}

      <Animated.View entering={FadeIn.duration(300)}>
        {renderOptions()}
      </Animated.View>

      {error && (
        <Text size='sm' className='mt-2 text-semantic-error-default'>
          {error}
        </Text>
      )}
    </VStack>
  )
}

export default SelectGroup
