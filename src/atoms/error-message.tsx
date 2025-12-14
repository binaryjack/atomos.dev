import { ReactNode } from 'react'

export interface ErrorMessageProps {
  children: ReactNode
  size?: 'sm' | 'md'
  className?: string
}

/**
 * ErrorMessage Atom
 * Displays validation/error messages for form fields
 * Includes proper ARIA attributes for accessibility
 */
export const ErrorMessage = ({ children, size = 'sm', className = '' }: ErrorMessageProps) => {
  if (!children) return null

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
  }

  const baseStyles = 'mt-1 text-red-400'

  return (
    <div role="alert" className={`${baseStyles} ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  )
}
