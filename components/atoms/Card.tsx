import React from 'react'

import { View } from 'react-native'

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { cn } from '@/utils/cn'

const variantStyles = {
  default: 'bg-dark-800 border border-dark-700',
  elevated: 'bg-dark-800 shadow-lg shadow-black/50',
  outlined: 'bg-transparent border-2 border-dark-600',
  filled: 'bg-dark-700',
}

const paddingStyles = {
  none: '',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}

const roundedStyles = {
  none: '',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
}

export const Card: React.FC<CustomCardProps> = ({
  variant = 'default',
  padding = 'md',
  rounded = 'lg',
  animated = false,
  className = '',
  children,
  ...props
}) => {
  const cardClass = cn(
    variantStyles[variant],
    paddingStyles[padding],
    roundedStyles[rounded],
    className,
  )

  if (animated) {
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        className={cardClass}
        {...props}
      >
        {children}
      </Animated.View>
    )
  }

  return (
    <View className={cardClass} {...props}>
      {children}
    </View>
  )
}

export default Card
