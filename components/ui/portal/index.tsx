'use client'
import React from 'react'

import { Overlay } from '@gluestack-ui/core/overlay/creator'
import { cssInterop } from 'nativewind'

cssInterop(Overlay, { className: 'style' })

const Portal = React.forwardRef<
  React.ComponentRef<typeof Overlay>,
  React.ComponentProps<typeof Overlay>
>(({ ...props }, ref) => <Overlay {...props} ref={ref} />)

Portal.displayName = 'Portal'

export { Portal }
