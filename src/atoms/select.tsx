import { forwardRef } from 'react'
import { getInputStyles, InputSize, InputVariant } from '../design-system'

export interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: InputVariant
  inputSize?: InputSize
  fullWidth?: boolean
  error?: boolean
  testId?: string
  label?: string
}

/**
 * Select Atom
 * Form select dropdown with consistent styling from design system
 */
export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  (
    {
      variant = 'default',
      inputSize = 'md',
      fullWidth = false,
      error = false,
      className = '',
      disabled,
      children,
      title,
      label,
      testId,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    // Override variant if error or disabled
    const effectiveVariant = disabled ? 'disabled' : error ? 'error' : variant

    // Use label, aria-label, aria-labelledby, or title for accessibility (in order of preference)
    const accessibleName = label || ariaLabel || title || 'Select an option'

    return (
      <select
        ref={ref}
        disabled={disabled}
        aria-label={ariaLabelledBy ? undefined : accessibleName}
        aria-labelledby={ariaLabelledBy}
        title={title}
        className={`${getInputStyles(effectiveVariant, inputSize, fullWidth)} ${className}`}
        data-testid={testId}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'
