import React from 'react'

import { vstackStyle } from './styles'

type IVStackProps = React.ComponentProps<'div'> &
  VariantProps<typeof vstackStyle>

const VStack = React.forwardRef<React.ComponentRef<'div'>, IVStackProps>(
  ({ className, space, reversed, ...props }, ref) => (
    <div
      className={vstackStyle({
        space: space as any,
        reversed: reversed as boolean,
        class: className,
      })}
      {...props}
      ref={ref}
    />
  ),
)

VStack.displayName = 'VStack'

export { VStack }
