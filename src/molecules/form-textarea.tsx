import { forwardRef } from 'react'
import { Textarea } from '../atoms/textarea'
import { useFormContext } from '../contexts/form'
import { FormFieldWrapper } from './form-field-wrapper'

export interface FormTextareaProps {
  id: string
  className?: string
  placeholder?: string
  rows?: number
  helpText?: string
  disabled?: boolean
}

/**
 * FormTextarea Molecule
 * Self-managed textarea field that connects to FormContext by id
 *
 * @example
 * ```tsx
 * <FormProvider initialFields={fields} onSubmit={handleSubmit}>
 *   <FormTextarea id="description" rows={6} placeholder="Describe in detail" />
 * </FormProvider>
 * ```
 */
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ id, className, placeholder, rows = 4, helpText, disabled = false }, ref) => {
    const { fields, errors, handleChange, handleBlur } = useFormContext()

    // Find field by id
    const field = fields.find((f) => f.name === id)

    // Warn in dev if field not found
    if (!field && process.env.NODE_ENV === 'development') {
      console.warn(`FormTextarea: No field found with id "${id}" in FormContext`)
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
        <Textarea
          ref={ref}
          id={id}
          name={id}
          value={value}
          error={!!error}
          inputSize="md"
          fullWidth
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id)}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          aria-invalid={!!error}
        />
      </FormFieldWrapper>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
