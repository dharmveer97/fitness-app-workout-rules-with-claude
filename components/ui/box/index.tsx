import React from 'react'

import { View } from 'react-native'

import { boxStyle } from './styles'

type IBoxProps = ViewProps &
  VariantProps<typeof boxStyle> & { className?: string }

const Box = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} {...props} className={boxStyle({ class: className })} />
  ),
)

Box.displayName = 'Box'
export { Box }
