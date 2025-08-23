import React, { forwardRef } from 'react'

import { View, TouchableOpacity, type TextInput } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { Badge } from '@/components/ui/badge'
import { Input, InputField } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { cn } from '@/utils/cn'

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
          <HStack className='mb-2 items-center justify-between'>
            <HStack className='flex-1 items-center'>
              {label && (
                <Text size='sm' className='font-medium text-text-secondary'>
                  {label}
                </Text>
              )}
              {required && (
                <Text className='ml-1 text-semantic-error-default'>*</Text>
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
            </HStack>
            {badge && (
              <Badge variant='solid' size='sm'>
                <Text size='xs' className='text-white'>
                  {badge}
                </Text>
              </Badge>
            )}
          </HStack>
        )}

        {isTooltipVisible && tooltip && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            className='mb-2 rounded-lg border border-border-primary bg-surface-secondary p-3'
          >
            <Text size='sm' className='text-text-tertiary'>
              {tooltip}
            </Text>
          </Animated.View>
        )}

        <Input variant='outline' isInvalid={!!error}>
          <InputField 
            {...(({ type, leftIcon, rightIcon, ...props }) => props)(inputProps)}
            keyboardType={
              inputProps.type === 'number' ? 'numeric' :
              inputProps.type === 'email' ? 'email-address' :
              inputProps.type === 'phone' ? 'phone-pad' : 'default'
            }
          />
        </Input>

        {success && !error && (
          <HStack className='mt-2 items-center'>
            <Ionicons name='checkmark-circle' size={14} color='#10B981' />
            <Text size='sm' className='ml-1 text-semantic-success-default'>
              {success}
            </Text>
          </HStack>
        )}

        {hint && !error && !success && (
          <Text size='sm' className='mt-2 text-text-tertiary'>
            {hint}
          </Text>
        )}

        {error && (
          <HStack className='mt-2 items-center'>
            <Ionicons name='alert-circle' size={14} color='#EF4444' />
            <Text size='sm' className='ml-1 text-semantic-error-default'>
              {error}
            </Text>
          </HStack>
        )}
      </FieldWrapper>
    )
  },
)

FormField.displayName = 'FormField'

export default FormField
