import { forwardRef } from 'react'
import { getInputStyles, InputSize, InputVariant } from '../design-system'

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  inputSize?: InputSize
  fullWidth?: boolean
  error?: boolean
  testId?: string
}

/**
 * Input Atom
 * Form input with consistent styling from design system
 */
export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      variant = 'default',
      inputSize = 'md',
      fullWidth = false,
      error = false,
      className = '',
      disabled,
      testId,
      ...props
    },
    ref
  ) => {
    // Override variant if error or disabled
    const effectiveVariant = disabled ? 'disabled' : error ? 'error' : variant

    return (
      <input
        ref={ref}
        disabled={disabled}
        className={`${getInputStyles(effectiveVariant, inputSize, fullWidth)} ${className}`}
        data-testid={testId}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
