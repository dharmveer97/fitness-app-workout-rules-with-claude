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
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
  white: 'text-white',
  dark: 'text-dark-900',
  gray: 'text-dark-400',
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
  color = 'white',
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
