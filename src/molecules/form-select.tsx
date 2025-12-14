import { forwardRef } from 'react'
import { Select } from '../atoms/select'
import { useFormContext } from '../contexts/form'
import { FormFieldWrapper } from './form-field-wrapper'

export interface FormSelectProps {
  id: string
  className?: string
  children: React.ReactNode
  helpText?: string
  disabled?: boolean
  testId?: string
}

/**
 * FormSelect Molecule
 * Self-managed select field that connects to FormContext by id
 *
 * @example
 * ```tsx
 * <FormProvider initialFields={fields} onSubmit={handleSubmit}>
 *   <FormSelect id="country">
 *     <option value="">Select country</option>
 *     <option value="us">United States</option>
 *     <option value="ca">Canada</option>
 *   </FormSelect>
 * </FormProvider>
 * ```
 */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ id, className, children, helpText, disabled = false, testId }, ref) => {
    const { fields, errors, handleChange, handleBlur } = useFormContext()

    // Find field by id
    const field = fields.find((f) => f.name === id)

    // Warn in dev if field not found
    if (!field && process.env.NODE_ENV === 'development') {
      console.warn(`FormSelect: No field found with id "${id}" in FormContext`)
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
        <Select
          ref={ref}
          id={id}
          name={id}
          value={value}
          error={!!error}
          inputSize="md"
          fullWidth
          disabled={disabled}
          testId={testId || `select-${id}`}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id)}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          aria-invalid={!!error}
        >
          {children}
        </Select>
      </FormFieldWrapper>
    )
  }
)

FormSelect.displayName = 'FormSelect'
