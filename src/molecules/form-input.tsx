import { forwardRef } from 'react'
import { Input } from '../atoms/input'
import { useFormContext } from '../contexts/form'
import { FormFieldWrapper } from './form-field-wrapper'

export interface FormInputProps {
  id: string
  className?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date'
  helpText?: string
  disabled?: boolean
  maxLength?: number
  testId?: string
  /** Optional callback when field loses focus (called after internal blur handling) */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

/**
 * FormInput Molecule
 * Self-managed form field that connects to FormContext by id
 * Automatically handles value, validation, errors, onChange, onBlur
 *
 * @example
 * ```tsx
 * <FormProvider initialFields={fields} onSubmit={handleSubmit}>
 *   <FormInput id="email" placeholder="Enter your email" />
 *   <FormInput id="password" type="password" />
 * </FormProvider>
 * ```
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      className,
      placeholder,
      type = 'text',
      helpText,
      disabled = false,
      maxLength,
      testId,
      onBlur: externalOnBlur,
    },
    ref
  ) => {
    const { fields, errors, handleChange, handleBlur } = useFormContext()

    // Find field by id
    const field = fields.find((f) => f.name === id)

    // Warn in dev if field not found
    if (!field && process.env.NODE_ENV === 'development') {
      console.warn(`FormInput: No field found with id "${id}" in FormContext`)
      return null
    }

    if (!field) return null

    // Only show error if field has been touched
    const error = field.touched ? errors[id] : undefined
    const value = String(field.value ?? '')
    const label = field.label
    const required = field.validation.required ?? false

    return (
      <FormFieldWrapper
        id={id}
        label={label}
        required={required}
        error={error}
        helpText={helpText}
        className={className}
      >
        <Input
          ref={ref}
          id={id}
          name={id}
          type={type}
          value={value}
          error={!!error}
          inputSize="md"
          fullWidth
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          testId={testId || `input-${id}`}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={(e) => {
            handleBlur(id)
            externalOnBlur?.(e)
          }}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          aria-invalid={!!error}
        />
      </FormFieldWrapper>
    )
  }
)

FormInput.displayName = 'FormInput'
