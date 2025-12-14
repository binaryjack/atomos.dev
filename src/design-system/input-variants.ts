/**
 * Design System - Input Variants
 * Centralized input styling variants for Atomos UI
 */

export type InputVariant = 'default' | 'error' | 'success' | 'disabled'
export type InputSize = 'sm' | 'md' | 'lg'

export const INPUT_VARIANTS: Record<InputVariant, string> = {
  default: 'border-gray-600 bg-gray-800 text-gray-100 focus:border-blue-500 focus:ring-blue-500',
  error: 'border-red-500 bg-gray-800 text-gray-100 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-500 bg-gray-800 text-gray-100 focus:border-green-500 focus:ring-green-500',
  disabled: 'border-gray-700 bg-gray-900 text-gray-500 cursor-not-allowed',
}

export const INPUT_SIZES: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
}

export const INPUT_BASE_STYLES =
  'rounded-md border transition-colors focus:outline-none focus:ring-2 placeholder:text-gray-500'

export const getInputStyles = (
  variant: InputVariant = 'default',
  size: InputSize = 'md',
  fullWidth: boolean = false
): string => {
  return `${INPUT_BASE_STYLES} ${INPUT_VARIANTS[variant]} ${INPUT_SIZES[size]} ${fullWidth ? 'w-full' : ''}`
}
