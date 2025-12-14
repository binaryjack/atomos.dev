import { forwardRef } from 'react'
import { getInputStyles, InputSize, InputVariant } from '../design-system'

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant
  inputSize?: InputSize
  fullWidth?: boolean
  error?: boolean
  testId?: string
}

/**
 * Textarea Atom
 * Multi-line text input with consistent styling from design system
 */
export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  (
    {
      variant = 'default',
      inputSize = 'md',
      fullWidth = false,
      error = false,
      className = '',
      disabled,
      rows = 4,
      testId,
      ...props
    },
    ref
  ) => {
    // Override variant if error or disabled
    const effectiveVariant = disabled ? 'disabled' : error ? 'error' : variant

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        rows={rows}
        className={`${getInputStyles(effectiveVariant, inputSize, fullWidth)} resize-y ${className}`}
        data-testid={testId}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
