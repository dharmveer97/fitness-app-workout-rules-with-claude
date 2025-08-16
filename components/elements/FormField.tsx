import React, { forwardRef } from 'react'

import { View, TouchableOpacity, type TextInput } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { cn } from '@/utils/cn'

import { Badge } from '../atoms/Badge'
import { Input } from '../atoms/Input'
import { Text } from '../atoms/Text'

export const FormField = forwardRef<TextInput, FormFieldProps>(
  (
    {
      label,
      required,
      error,
      success,
      hint,
      badge,
      tooltip,
      showTooltip = false,
      onTooltipPress,
      containerClassName = '',
      animated = true,
      ...inputProps
    },
    ref,
  ) => {
    const [isTooltipVisible, setIsTooltipVisible] = React.useState(showTooltip)

    const handleTooltipPress = () => {
      setIsTooltipVisible(!isTooltipVisible)
      onTooltipPress?.()
    }

    const FieldWrapper = animated ? Animated.View : View
    const animationProps = animated
      ? { entering: FadeIn.duration(300), exiting: FadeOut.duration(300) }
      : {}

    return (
      <FieldWrapper
        className={cn('w-full', containerClassName)}
        {...animationProps}
      >
        {(label ?? badge ?? tooltip) && (
          <View className='mb-2 flex-row items-center justify-between'>
            <View className='flex-1 flex-row items-center'>
              {label && (
                <Text variant='label' color='gray'>
                  {label}
                </Text>
              )}
              {required && (
                <Text color='error' className='ml-1'>
                  *
                </Text>
              )}
              {tooltip && (
                <TouchableOpacity onPress={handleTooltipPress} className='ml-2'>
                  <Ionicons
                    name='information-circle-outline'
                    size={16}
                    color='#9CA3AF'
                  />
                </TouchableOpacity>
              )}
            </View>
            {badge && (
              <Badge variant='primary' size='sm'>
                {badge}
              </Badge>
            )}
          </View>
        )}

        {isTooltipVisible && tooltip && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            className='border-dark-600 bg-dark-700 mb-2 rounded-lg border p-3'
          >
            <Text variant='caption' color='gray'>
              {tooltip}
            </Text>
          </Animated.View>
        )}

        <Input ref={ref} error={error} {...inputProps} />

        {success && !error && (
          <View className='mt-2 flex-row items-center'>
            <Ionicons name='checkmark-circle' size={14} color='#10B981' />
            <Text variant='caption' color='success' className='ml-1'>
              {success}
            </Text>
          </View>
        )}

        {hint && !error && !success && (
          <Text variant='caption' color='gray' className='mt-2'>
            {hint}
          </Text>
        )}

        {error && (
          <View className='mt-2 flex-row items-center'>
            <Ionicons name='alert-circle' size={14} color='#EF4444' />
            <Text variant='caption' color='error' className='ml-1'>
              {error}
            </Text>
          </View>
        )}
      </FieldWrapper>
    )
  },
)

FormField.displayName = 'FormField'

export default FormField
