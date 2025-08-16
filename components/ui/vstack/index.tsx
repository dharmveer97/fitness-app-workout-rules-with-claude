import React from 'react'

import { View } from 'react-native'

import { vstackStyle } from './styles'

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'

type IVStackProps = React.ComponentProps<typeof View> &
  VariantProps<typeof vstackStyle>

const VStack = React.forwardRef<React.ComponentRef<typeof View>, IVStackProps>(
  ({ className, space, reversed, ...props }, ref) => (
    <View
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
