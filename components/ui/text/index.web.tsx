import React from 'react'

import { textStyle } from './styles'

type ITextProps = React.ComponentProps<'span'> & VariantProps<typeof textStyle>

const Text = React.forwardRef<React.ComponentRef<'span'>, ITextProps>(
  (
    {
      className,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      size = 'md',
      sub,
      italic,
      highlight,
      ...props
    }: { className?: string } & ITextProps,
    ref,
  ) => (
    <span
      className={textStyle({
        isTruncated: isTruncated as boolean,
        bold: bold as boolean,
        underline: underline as boolean,
        strikeThrough: strikeThrough as boolean,
        size: size as any,
        sub: sub as boolean,
        italic: italic as boolean,
        highlight: highlight as boolean,
        class: className,
      })}
      {...props}
      ref={ref}
    />
  ),
)

Text.displayName = 'Text'

export { Text }
