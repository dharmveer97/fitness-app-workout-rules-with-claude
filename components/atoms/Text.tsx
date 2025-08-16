import React from 'react'

import { Text as RNText } from 'react-native'

import { cn } from '@/utils/cn'

const variantStyles = {
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-semibold',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-medium',
  body: 'text-base',
  caption: 'text-sm',
  label: 'text-sm font-medium',
  tiny: 'text-xs',
}

const weightStyles = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorStyles = {
  // New semantic design tokens
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  inverse: 'text-inverse',
  brand: 'text-brand',

  // Semantic states
  success: 'text-semantic-success',
  warning: 'text-semantic-warning',
  error: 'text-semantic-error',
  info: 'text-semantic-info',

  // Legacy support
  white: 'text-white',
  dark: 'text-gray-900',
  gray: 'text-gray-400',
}

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

export const Text: React.FC<CustomTextComponentProps> = ({
  variant = 'body',
  weight,
  color = 'primary',
  align = 'left',
  className = '',
  children,
  ...props
}) => {
  const textClass = cn(
    variantStyles[variant],
    weight && weightStyles[weight],
    colorStyles[color],
    alignStyles[align],
    className,
  )

  return (
    <RNText className={textClass} {...props}>
      {children}
    </RNText>
  )
}

export default Text
