import { ReactNode } from 'react'

export interface FieldSetProps {
  children: ReactNode
  spacing?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * FieldSet Atom
 * Container for form field (label + input + help text + error)
 * Provides consistent spacing between form fields
 */
export const FieldSet = ({ children, spacing = 'md', className = '' }: FieldSetProps) => {
  const spacingStyles = {
    sm: 'mb-3',
    md: 'mb-4',
    lg: 'mb-6',
  }

  return <div className={`${spacingStyles[spacing]} ${className}`}>{children}</div>
}
