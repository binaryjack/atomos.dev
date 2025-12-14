/**
 * Design System - Text Variants
 * Centralized typography styling for Atomos UI
 */

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label'

export type TextColor = 'primary' | 'secondary' | 'muted' | 'success' | 'danger' | 'warning'

export const TEXT_VARIANTS: Record<TextVariant, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  body: 'text-base font-normal',
  bodySmall: 'text-sm font-normal',
  caption: 'text-xs font-normal',
  label: 'text-sm font-medium',
}

export const TEXT_COLORS: Record<TextColor, string> = {
  primary: 'text-gray-100',
  secondary: 'text-gray-300',
  muted: 'text-gray-500',
  success: 'text-green-500',
  danger: 'text-red-500',
  warning: 'text-yellow-500',
}

export const getTextStyles = (
  variant: TextVariant = 'body',
  color: TextColor = 'primary'
): string => {
  return `${TEXT_VARIANTS[variant]} ${TEXT_COLORS[color]}`
}
