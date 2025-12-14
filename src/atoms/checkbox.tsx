import { forwardRef } from 'react'

export interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  testId?: string
}

/**
 * Checkbox Atom
 * Form checkbox with consistent styling
 */
export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ error = false, className = '', disabled, testId, ...props }, ref) => {
    const baseStyles =
      'h-4 w-4 rounded border text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900'
    const variantStyles = disabled
      ? 'border-gray-700 bg-gray-900 cursor-not-allowed'
      : error
        ? 'border-red-500 bg-gray-800'
        : 'border-gray-600 bg-gray-800'

    return (
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className={`${baseStyles} ${variantStyles} ${className}`}
        data-testid={testId}
        {...props}
      />
    )
  }
)

Checkbox.displayName = 'Checkbox'
