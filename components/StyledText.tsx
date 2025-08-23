/**
 * Styled Text Components for Daily Deposits Fitness App
 * Professional typography components with consistent theming
 */

import {
  Text,
  SemanticText,
  type ThemedTextProps,
  type SemanticTextProps,
} from './Themed'

/**
 * Monospace text component using SpaceMono font
 * Perfect for code, numbers, or data display
 */
export function MonoText(props: ThemedTextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />
}

/**
 * Brand text component with primary brand color
 */
export function BrandText(props: Omit<SemanticTextProps, 'variant'>) {
  return <SemanticText variant='brand' {...props} />
}

/**
 * Accent text component with accent color
 */
export function AccentText(props: Omit<SemanticTextProps, 'variant'>) {
  return <SemanticText variant='accent' {...props} />
}

/**
 * Success text component with success color
 */
export function SuccessText(props: Omit<SemanticTextProps, 'variant'>) {
  return <SemanticText variant='success' {...props} />
}

/**
 * Error text component with error color
 */
export function ErrorText(props: Omit<SemanticTextProps, 'variant'>) {
  return <SemanticText variant='error' {...props} />
}

/**
 * Warning text component with warning color
 */
export function WarningText(props: Omit<SemanticTextProps, 'variant'>) {
  return <SemanticText variant='warning' {...props} />
}

/**
 * Info text component with info color
 */
export function InfoText(props: Omit<SemanticTextProps, 'variant'>) {
  return <SemanticText variant='info' {...props} />
}
