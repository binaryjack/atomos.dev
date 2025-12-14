/**
 * Design System - Link Variants
 * Centralized link styling variants for Atomos UI
 */

export type LinkVariant = 'default' | 'nav' | 'footer' | 'inline' | 'cta'
export type LinkSize = 'sm' | 'md' | 'lg'

export const LINK_VARIANTS: Record<LinkVariant, string> = {
  default: 'text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline',
  nav: 'text-gray-300 hover:text-white transition-colors',
  footer: 'text-gray-400 hover:text-purple-400 transition-colors',
  inline: 'text-purple-400 hover:text-purple-300 underline-offset-2 underline',
  cta: 'text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 font-medium transition-colors',
}

export const LINK_SIZES: Record<LinkSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

export const LINK_BASE_STYLES =
  'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'

export const getLinkStyles = (variant: LinkVariant = 'default', size: LinkSize = 'md'): string => {
  return `${LINK_BASE_STYLES} ${LINK_VARIANTS[variant]} ${LINK_SIZES[size]}`
}
