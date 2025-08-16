import React from 'react'

import { View } from 'react-native'

import { hstackStyle } from './styles'

type IHStackProps = ViewProps & VariantProps<typeof hstackStyle>

const HStack = React.forwardRef<React.ComponentRef<typeof View>, IHStackProps>(
  ({ className, space, reversed, ...props }, ref) => (
    <View
      className={hstackStyle({
        space: space as any,
        reversed: reversed as boolean,
        class: className,
      })}
      {...props}
      ref={ref}
    />
  ),
)

HStack.displayName = 'HStack'

export { HStack }
