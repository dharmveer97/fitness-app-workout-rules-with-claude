import React, { forwardRef } from 'react'

import type { TextInput, ViewProps } from 'react-native'
import { View } from 'react-native'

import { cn } from '@/utils/cn'

import { Badge } from '../atoms/Badge'
import { Input, type InputProps } from '../atoms/Input'
import { Text } from '../atoms/Text'

export interface InputGroupProps extends ViewProps {
  label?: string
  required?: boolean
  error?: string
  hint?: string
  badge?: string
  inputs?: InputProps[]
  orientation?: 'vertical' | 'horizontal'
  gap?: 'sm' | 'md' | 'lg'
  containerClassName?: string
  children?: React.ReactNode
}

const gapStyles = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
}

export const InputGroup = forwardRef<TextInput, InputGroupProps>(
  (
    {
      label,
      required,
      error,
      hint,
      badge,
      inputs,
      orientation = 'vertical',
      gap = 'md',
      containerClassName = '',
      children,
      ...props
    },
    ref,
  ) => {
    const containerClass = cn(
      'w-full',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      gapStyles[gap],
      containerClassName,
    )

    return (
      <View className='w-full' {...props}>
        {(label || badge) && (
          <View className='mb-2 flex-row items-center justify-between'>
            {label && (
              <View className='flex-row items-center'>
                <Text variant='label' color='gray'>
                  {label}
                </Text>
                {required && (
                  <Text color='error' className='ml-1'>
                    *
                  </Text>
                )}
              </View>
            )}
            {badge && (
              <Badge variant='primary' size='sm'>
                {badge}
              </Badge>
            )}
          </View>
        )}

        <View className={containerClass}>
          {inputs
            ? inputs.map((inputProps, index) => (
                <View
                  key={index}
                  className={orientation === 'horizontal' ? 'flex-1' : 'w-full'}
                >
                  <Input
                    ref={index === 0 ? ref : undefined}
                    {...inputProps}
                    error={index === 0 ? error : inputProps.error}
                  />
                </View>
              ))
            : children}
        </View>

        {hint && !error && (
          <Text variant='caption' color='gray' className='mt-2'>
            {hint}
          </Text>
        )}

        {error && (
          <Text variant='caption' color='error' className='mt-2'>
            {error}
          </Text>
        )}
      </View>
    )
  },
)

InputGroup.displayName = 'InputGroup'

export default InputGroup
