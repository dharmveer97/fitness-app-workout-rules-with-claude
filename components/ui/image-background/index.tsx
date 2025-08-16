'use client'
import React from 'react'

import { ImageBackground as RNImageBackground } from 'react-native'

import { tva } from '@gluestack-ui/utils/nativewind-utils'

const imageBackgroundStyle = tva({})

const ImageBackground = React.forwardRef<
  React.ComponentRef<typeof RNImageBackground>,
  React.ComponentProps<typeof RNImageBackground>
>(({ className, ...props }, ref) => (
  <RNImageBackground
    className={imageBackgroundStyle({
      class: className,
    })}
    {...props}
    ref={ref}
  />
))

ImageBackground.displayName = 'ImageBackground'

export { ImageBackground }
