import { ReactNode } from 'react'

export interface HelpTextProps {
  children: ReactNode
  size?: 'sm' | 'md'
  className?: string
}

/**
 * HelpText Atom
 * Displays helper/hint text for form fields
 * Shown when field has no validation error
 */
export const HelpText = ({ children, size = 'sm', className = '' }: HelpTextProps) => {
  if (!children) return null

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
  }

  const baseStyles = 'mt-2 text-gray-400'

  return <p className={`${baseStyles} ${sizeStyles[size]} ${className}`}>{children}</p>
}
