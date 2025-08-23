import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import {
  Button,
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
} from '@/components/ui/button'

export default function AuthButton({
  title,
  loading = false,
  variant = 'primary',
  size = 'large',
  leftIcon,
  rightIcon,
  fullWidth = true,
  disabled,
  onPress,
  ...touchableOpacityProps
}: AuthButtonProps) {
  // Map AuthButton variants to GlueStack Button props
  const getGluestackVariant = () => {
    switch (variant) {
      case 'primary':
        return 'solid'
      case 'secondary':
        return 'outline'
      case 'outline':
        return 'outline'
      default:
        return 'solid'
    }
  }

  const getGluestackAction = () => {
    switch (variant) {
      case 'primary':
        return 'primary'
      case 'secondary':
        return 'secondary'
      default:
        return 'primary'
    }
  }

  const getGluestackSize = () => {
    switch (size) {
      case 'small':
        return 'sm'
      case 'medium':
        return 'md'
      case 'large':
        return 'lg'
      default:
        return 'lg'
    }
  }

  return (
    <Button
      variant={getGluestackVariant()}
      action={getGluestackAction()}
      size={getGluestackSize()}
      onPress={onPress}
      isDisabled={disabled || loading}
      className={fullWidth ? 'w-full' : ''}
      {...touchableOpacityProps}
    >
      {loading && <ButtonSpinner />}

      {leftIcon && !loading && (
        <ButtonIcon className='mr-2'>
          <Ionicons name={leftIcon} />
        </ButtonIcon>
      )}

      <ButtonText>{loading ? 'Loading...' : title}</ButtonText>

      {rightIcon && !loading && (
        <ButtonIcon className='ml-2'>
          <Ionicons name={rightIcon} />
        </ButtonIcon>
      )}
    </Button>
  )
}
