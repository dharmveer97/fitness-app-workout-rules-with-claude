import React, { forwardRef } from 'react'

import { View } from 'react-native'

import { Badge } from '@/components/ui/badge'
import { HStack } from '@/components/ui/hstack'
import { Input, InputField } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { cn } from '@/utils/cn'

const gapStyles = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
}

export const InputGroup = forwardRef<any, CustomInputGroupProps>(
  ({
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
  }) => {
    const ContainerComponent = orientation === 'horizontal' ? HStack : VStack

    return (
      <VStack className='w-full' {...props}>
        {(label || badge) && (
          <HStack className='mb-2 items-center justify-between'>
            {label && (
              <HStack className='items-center'>
                <Text size='sm' className='font-medium text-text-secondary'>
                  {label}
                </Text>
                {required && (
                  <Text className='ml-1 text-semantic-error-default'>*</Text>
                )}
              </HStack>
            )}
            {badge && (
              <Badge variant='solid' size='sm'>
                <Text size='xs' className='text-white'>
                  {badge}
                </Text>
              </Badge>
            )}
          </HStack>
        )}

        <ContainerComponent className={cn(gapStyles[gap], containerClassName)}>
          {inputs
            ? inputs.map((inputProps, index) => (
                <View
                  key={index}
                  className={orientation === 'horizontal' ? 'flex-1' : 'w-full'}
                >
                  <Input
                    variant='outline'
                    isInvalid={!!(index === 0 ? error : inputProps.error)}
                  >
                    <InputField
                      {...(({ type, leftIcon, rightIcon, ...restProps }) =>
                        restProps)(inputProps)}
                      keyboardType={
                        inputProps.type === 'number'
                          ? 'numeric'
                          : inputProps.type === 'email'
                            ? 'email-address'
                            : inputProps.type === 'phone'
                              ? 'phone-pad'
                              : 'default'
                      }
                    />
                  </Input>
                </View>
              ))
            : children}
        </ContainerComponent>

        {hint && !error && (
          <Text size='sm' className='mt-2 text-text-tertiary'>
            {hint}
          </Text>
        )}

        {error && (
          <Text size='sm' className='mt-2 text-semantic-error-default'>
            {error}
          </Text>
        )}
      </VStack>
    )
  },
)

InputGroup.displayName = 'InputGroup'

export default InputGroup
