import React from 'react'

import { boxStyle } from './styles'

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'

type IBoxProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof boxStyle> & { className?: string }

const Box = React.forwardRef<HTMLDivElement, IBoxProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={boxStyle({ class: className })} {...props} />
  ),
)

Box.displayName = 'Box'
export { Box }
