import React, { useState } from 'react';
import { View, TouchableOpacity, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { Text } from '../atoms/Text';
import { Badge } from '../atoms/Badge';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export interface SelectOption<T = string> {
  value: T;
  label: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  badge?: string;
  disabled?: boolean;
}

export interface SelectGroupProps<T = string> extends ViewProps {
  label?: string;
  options: SelectOption<T>[];
  value?: T[];
  onChange?: (values: T[]) => void;
  multiple?: boolean;
  max?: number;
  min?: number;
  variant?: 'default' | 'chips' | 'cards';
  error?: string;
  hint?: string;
  containerClassName?: string;
}

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
  const [selectedValues, setSelectedValues] = useState<T[]>(value);

  const handleSelect = (optionValue: T) => {
    let newValues: T[];

    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        // Deselect if already selected and above minimum
        if (selectedValues.length > min) {
          newValues = selectedValues.filter(v => v !== optionValue);
        } else {
          return; // Don't deselect if at minimum
        }
      } else {
        // Select if not at maximum
        if (!max || selectedValues.length < max) {
          newValues = [...selectedValues, optionValue];
        } else {
          return; // Don't select if at maximum
        }
      }
    } else {
      // Single selection mode
      newValues = [optionValue];
    }

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const isSelected = (optionValue: T) => selectedValues.includes(optionValue);

  const renderChip = (option: SelectOption<T>) => {
    const selected = isSelected(option.value);
    const disabled = option.disabled || 
      (!selected && max !== undefined && selectedValues.length >= max);

    return (
      <TouchableOpacity
        key={String(option.value)}
        onPress={() => !disabled && handleSelect(option.value)}
        disabled={disabled}
        className={cn(
          'px-4 py-2 rounded-full border mr-2 mb-2',
          selected
            ? 'bg-primary-500 border-primary-500'
            : 'bg-dark-800 border-dark-700',
          disabled && 'opacity-50'
        )}
      >
        <View className="flex-row items-center">
          {option.icon && (
            <Ionicons
              name={option.icon}
              size={16}
              color={selected ? '#FFFFFF' : '#9CA3AF'}
              style={{ marginRight: 6 }}
            />
          )}
          <Text
            variant="caption"
            weight="medium"
            color={selected ? 'white' : 'gray'}
          >
            {option.label}
          </Text>
          {selected && multiple && (
            <Ionicons
              name="close"
              size={16}
              color="#FFFFFF"
              style={{ marginLeft: 6 }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCard = (option: SelectOption<T>) => {
    const selected = isSelected(option.value);
    const disabled = option.disabled || 
      (!selected && max !== undefined && selectedValues.length >= max);

    return (
      <TouchableOpacity
        key={String(option.value)}
        onPress={() => !disabled && handleSelect(option.value)}
        disabled={disabled}
        className={cn(
          'p-4 rounded-xl border mb-3',
          selected
            ? 'bg-primary-500/20 border-primary-500'
            : 'bg-dark-800 border-dark-700',
          disabled && 'opacity-50'
        )}
      >
        <View className="flex-row items-start">
          <View
            className={cn(
              'w-12 h-12 rounded-lg items-center justify-center mr-3',
              selected ? 'bg-primary-500' : 'bg-dark-700'
            )}
          >
            {option.icon && (
              <Ionicons
                name={option.icon}
                size={24}
                color={selected ? '#FFFFFF' : '#9CA3AF'}
              />
            )}
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <Text
                variant="body"
                weight={selected ? 'semibold' : 'medium'}
                color={selected ? 'white' : 'gray'}
              >
                {option.label}
              </Text>
              {option.badge && (
                <Badge variant={selected ? 'primary' : 'default'} size="sm">
                  {option.badge}
                </Badge>
              )}
            </View>
            {option.description && (
              <Text variant="caption" color="gray" className="mt-1">
                {option.description}
              </Text>
            )}
          </View>
          {selected && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#10B981"
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderDefault = (option: SelectOption<T>) => {
    const selected = isSelected(option.value);
    const disabled = option.disabled || 
      (!selected && max !== undefined && selectedValues.length >= max);

    return (
      <TouchableOpacity
        key={String(option.value)}
        onPress={() => !disabled && handleSelect(option.value)}
        disabled={disabled}
        className={cn(
          'flex-row items-center py-3',
          disabled && 'opacity-50'
        )}
      >
        <View
          className={cn(
            'w-5 h-5 rounded border-2 items-center justify-center mr-3',
            selected
              ? 'bg-primary-500 border-primary-500'
              : 'border-dark-600',
            multiple ? 'rounded' : 'rounded-full'
          )}
        >
          {selected && (
            <Ionicons
              name="checkmark"
              size={12}
              color="#FFFFFF"
            />
          )}
        </View>
        <Text
          variant="body"
          color={selected ? 'white' : 'gray'}
        >
          {option.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderOptions = () => {
    switch (variant) {
      case 'chips':
        return (
          <View className="flex-row flex-wrap">
            {options.map(renderChip)}
          </View>
        );
      case 'cards':
        return options.map(renderCard);
      default:
        return options.map(renderDefault);
    }
  };

  return (
    <View className={cn('w-full', containerClassName)} {...props}>
      {label && (
        <Text variant="label" color="gray" className="mb-3">
          {label}
        </Text>
      )}

      {hint && (
        <Text variant="caption" color="gray" className="mb-2">
          {hint}
        </Text>
      )}

      {(min > 0 || max) && (
        <View className="flex-row items-center mb-2">
          {min > 0 && (
            <Badge variant="info" size="sm" className="mr-2">
              Min: {min}
            </Badge>
          )}
          {max && (
            <Badge variant="info" size="sm">
              Max: {max}
            </Badge>
          )}
          <Text variant="caption" color="gray" className="ml-auto">
            Selected: {selectedValues.length}
          </Text>
        </View>
      )}

      <Animated.View entering={FadeIn.duration(300)}>
        {renderOptions()}
      </Animated.View>

      {error && (
        <Text variant="caption" color="error" className="mt-2">
          {error}
        </Text>
      )}
    </View>
  );
}

export default SelectGroup;