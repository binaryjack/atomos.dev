/**
 * Design System - Button Variants
 * Centralized button styling variants for Atomos UI
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'ghost'
  | 'outline'
  | 'link'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:text-white',
  secondary:
    'bg-gray-700 text-gray-100 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500',
  success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300 disabled:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 disabled:text-white',
  warning:
    'bg-yellow-600 text-white hover:bg-yellow-700 disabled:bg-yellow-300 disabled:text-white',
  ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 disabled:text-gray-600',
  outline:
    'bg-transparent border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800 disabled:border-gray-700 disabled:text-gray-600',
  link: 'bg-transparent text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline disabled:text-blue-600 disabled:no-underline',
}

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
}

export const BUTTON_BASE_STYLES =
  'rounded-md font-medium transition-colors disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'

/**
 * Helper to combine button styles
 */
export const getButtonStyles = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  fullWidth: boolean = false
): string => {
  return `${BUTTON_BASE_STYLES} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${fullWidth ? 'w-full' : ''}`
}
