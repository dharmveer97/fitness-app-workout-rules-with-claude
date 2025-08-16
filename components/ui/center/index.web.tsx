import React from 'react'

import { centerStyle } from './styles'

type ICenterProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof centerStyle>

const Center = React.forwardRef<HTMLDivElement, ICenterProps>(
  ({ className, ...props }, ref) => (
    <div className={centerStyle({ class: className })} {...props} ref={ref} />
  ),
)

Center.displayName = 'Center'

export { Center }
