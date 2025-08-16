/**
 * NativeWind Theme Configuration
 * Connects our native theme tokens with NativeWind for proper dark mode support
 */

import { lightTheme, darkTheme } from './tokens'

export const nativeWindTheme = {
  light: {
    colors: {
      // Surface colors
      'surface-primary': lightTheme.surface.primary,
      'surface-secondary': lightTheme.surface.secondary,
      'surface-tertiary': lightTheme.surface.tertiary,
      'surface-quaternary': lightTheme.surface.quaternary,

      // Text colors
      'text-primary': lightTheme.text.primary,
      'text-secondary': lightTheme.text.secondary,
      'text-tertiary': lightTheme.text.tertiary,
      'text-brand': lightTheme.text.brand,
      'text-inverse': lightTheme.text.inverse,
      'text-muted': lightTheme.text.muted,
      'text-disabled': lightTheme.text.disabled,

      // Border colors
      'border-primary': lightTheme.border.primary,
      'border-secondary': lightTheme.border.secondary,
      'border-tertiary': lightTheme.border.tertiary,
      'border-focus': lightTheme.border.focus,
      'border-error': lightTheme.border.error,
      'border-disabled': lightTheme.border.disabled,

      // Interactive colors
      'interactive-primary-default': lightTheme.interactive.primary.default,
      'interactive-primary-hover': lightTheme.interactive.primary.hover,
      'interactive-primary-active': lightTheme.interactive.primary.active,
      'interactive-primary-disabled': lightTheme.interactive.primary.disabled,

      'interactive-secondary-default': lightTheme.interactive.secondary.default,
      'interactive-secondary-hover': lightTheme.interactive.secondary.hover,
      'interactive-secondary-active': lightTheme.interactive.secondary.active,
      'interactive-secondary-disabled':
        lightTheme.interactive.secondary.disabled,

      // Semantic colors
      'semantic-success': lightTheme.semantic.success.default,
      'semantic-success-light': lightTheme.semantic.success.light,
      'semantic-success-dark': lightTheme.semantic.success.dark,

      'semantic-warning': lightTheme.semantic.warning.default,
      'semantic-warning-light': lightTheme.semantic.warning.light,
      'semantic-warning-dark': lightTheme.semantic.warning.dark,

      'semantic-error': lightTheme.semantic.error.default,
      'semantic-error-light': lightTheme.semantic.error.light,
      'semantic-error-dark': lightTheme.semantic.error.dark,

      'semantic-info': lightTheme.semantic.info.default,
      'semantic-info-light': lightTheme.semantic.info.light,
      'semantic-info-dark': lightTheme.semantic.info.dark,

      // Fitness colors
      'fitness-strength': lightTheme.fitness.strength,
      'fitness-cardio': lightTheme.fitness.cardio,
      'fitness-yoga': lightTheme.fitness.yoga,
      'fitness-hiit': lightTheme.fitness.hiit,
      'fitness-running': lightTheme.fitness.running,
      'fitness-cycling': lightTheme.fitness.cycling,
      'fitness-swimming': lightTheme.fitness.swimming,
      'fitness-recovery': lightTheme.fitness.recovery,
    },
  },

  dark: {
    colors: {
      // Surface colors
      'surface-primary': darkTheme.surface.primary,
      'surface-secondary': darkTheme.surface.secondary,
      'surface-tertiary': darkTheme.surface.tertiary,
      'surface-quaternary': darkTheme.surface.quaternary,

      // Text colors
      'text-primary': darkTheme.text.primary,
      'text-secondary': darkTheme.text.secondary,
      'text-tertiary': darkTheme.text.tertiary,
      'text-brand': darkTheme.text.brand,
      'text-inverse': darkTheme.text.inverse,
      'text-muted': darkTheme.text.muted,
      'text-disabled': darkTheme.text.disabled,

      // Border colors
      'border-primary': darkTheme.border.primary,
      'border-secondary': darkTheme.border.secondary,
      'border-tertiary': darkTheme.border.tertiary,
      'border-focus': darkTheme.border.focus,
      'border-error': darkTheme.border.error,
      'border-disabled': darkTheme.border.disabled,

      // Interactive colors
      'interactive-primary-default': darkTheme.interactive.primary.default,
      'interactive-primary-hover': darkTheme.interactive.primary.hover,
      'interactive-primary-active': darkTheme.interactive.primary.active,
      'interactive-primary-disabled': darkTheme.interactive.primary.disabled,

      'interactive-secondary-default': darkTheme.interactive.secondary.default,
      'interactive-secondary-hover': darkTheme.interactive.secondary.hover,
      'interactive-secondary-active': darkTheme.interactive.secondary.active,
      'interactive-secondary-disabled':
        darkTheme.interactive.secondary.disabled,

      // Semantic colors
      'semantic-success': darkTheme.semantic.success.default,
      'semantic-success-light': darkTheme.semantic.success.light,
      'semantic-success-dark': darkTheme.semantic.success.dark,

      'semantic-warning': darkTheme.semantic.warning.default,
      'semantic-warning-light': darkTheme.semantic.warning.light,
      'semantic-warning-dark': darkTheme.semantic.warning.dark,

      'semantic-error': darkTheme.semantic.error.default,
      'semantic-error-light': darkTheme.semantic.error.light,
      'semantic-error-dark': darkTheme.semantic.error.dark,

      'semantic-info': darkTheme.semantic.info.default,
      'semantic-info-light': darkTheme.semantic.info.light,
      'semantic-info-dark': darkTheme.semantic.info.dark,

      // Fitness colors (darker theme variants)
      'fitness-strength': darkTheme.fitness.strength,
      'fitness-cardio': darkTheme.fitness.cardio,
      'fitness-yoga': darkTheme.fitness.yoga,
      'fitness-hiit': darkTheme.fitness.hiit,
      'fitness-running': darkTheme.fitness.running,
      'fitness-cycling': darkTheme.fitness.cycling,
      'fitness-swimming': darkTheme.fitness.swimming,
      'fitness-recovery': darkTheme.fitness.recovery,
    },
  },
}

export type NativeWindTheme = typeof nativeWindTheme
