import { ReactNode } from 'react'
import { getTextStyles, TextColor } from '../design-system'

export interface LabelProps {
  htmlFor: string
  children: ReactNode
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: TextColor
  className?: string
}

/**
 * Label Atom
 * Semantic form label with consistent styling and required indicator
 */
export const Label = ({
  htmlFor,
  children,
  required = false,
  size = 'md',
  color = 'primary',
  className = '',
}: LabelProps) => {
  const sizeStyles = {
    sm: 'mb-1 text-xs',
    md: 'mb-2 text-sm',
    lg: 'mb-2 text-base',
  }

  const baseStyles = 'block font-medium'

  return (
    <label
      htmlFor={htmlFor}
      className={`${baseStyles} ${sizeStyles[size]} ${getTextStyles('label', color)} ${className}`}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500" aria-label="required">
          *
        </span>
      )}
    </label>
  )
}
