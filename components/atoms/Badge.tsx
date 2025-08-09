import React from 'react'

import { View, type ViewProps } from 'react-native'

import { cn } from '@/utils/cn'

import Text from './Text'

export interface BadgeProps extends ViewProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  children?: React.ReactNode
  className?: string
  textClassName?: string
}

const variantStyles = {
  default: 'bg-dark-700',
  primary: 'bg-primary-500/20 border border-primary-500/50',
  success: 'bg-green-500/20 border border-green-500/50',
  warning: 'bg-yellow-500/20 border border-yellow-500/50',
  error: 'bg-red-500/20 border border-red-500/50',
  info: 'bg-blue-500/20 border border-blue-500/50',
}

const sizeStyles = {
  sm: 'px-2 py-0.5',
  md: 'px-3 py-1',
  lg: 'px-4 py-2',
}

const textColors = {
  default: 'gray' as const,
  primary: 'primary' as const,
  success: 'success' as const,
  warning: 'warning' as const,
  error: 'error' as const,
  info: 'primary' as const,
}

const textSizes = {
  sm: 'tiny' as const,
  md: 'caption' as const,
  lg: 'body' as const,
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  rounded = true,
  children,
  className = '',
  textClassName = '',
  ...props
}) => {
  const badgeClass = cn(
    'inline-flex items-center justify-center',
    variantStyles[variant],
    sizeStyles[size],
    rounded ? 'rounded-full' : 'rounded',
    className,
  )

  return (
    <View className={badgeClass} {...props}>
      {typeof children === 'string' ? (
        <Text
          variant={textSizes[size]}
          color={textColors[variant]}
          weight='semibold'
          className={textClassName}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}

export default Badge
