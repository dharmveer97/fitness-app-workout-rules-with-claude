import React from 'react'

import type { ViewProps } from 'react-native'
import { View } from 'react-native'

import { centerStyle } from './styles'

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'

type ICenterProps = ViewProps & VariantProps<typeof centerStyle>

const Center = React.forwardRef<React.ComponentRef<typeof View>, ICenterProps>(
  ({ className, ...props }, ref) => (
    <View className={centerStyle({ class: className })} {...props} ref={ref} />
  ),
)

Center.displayName = 'Center'

export { Center }
