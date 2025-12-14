/**
 * Design System - Card Variants
 * Centralized card styling variants for Atomos UI
 */

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export const CARD_VARIANTS: Record<CardVariant, string> = {
  default: 'bg-gray-900 border border-gray-800',
  elevated: 'bg-gray-900 border border-gray-700 shadow-lg',
  outlined: 'bg-transparent border-2 border-gray-700',
  interactive:
    'bg-gray-900 border border-gray-800 hover:border-blue-600 hover:bg-gray-800 transition-colors cursor-pointer',
}

export const CARD_PADDING: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-2 sm:p-3',
  md: 'p-3 sm:p-4',
  lg: 'p-3 sm:p-6',
  xl: 'p-4 sm:p-8',
}

export const CARD_BASE_STYLES = 'rounded-lg'

export const getCardStyles = (
  variant: CardVariant = 'default',
  padding: CardPadding = 'md'
): string => {
  return `${CARD_BASE_STYLES} ${CARD_VARIANTS[variant]} ${CARD_PADDING[padding]}`
}
