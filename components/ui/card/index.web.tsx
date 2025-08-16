import React from 'react'

import { cardStyle } from './styles'

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'

type ICardProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardStyle>

const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ className, size = 'md', variant = 'elevated', ...props }, ref) => (
    <div
      className={cardStyle({ size, variant, class: className })}
      {...props}
      ref={ref}
    />
  ),
)

Card.displayName = 'Card'

export { Card }
