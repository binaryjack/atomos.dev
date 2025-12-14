import { forwardRef } from 'react'
import { Checkbox } from '../atoms/checkbox'
import { ErrorMessage } from '../atoms/error-message'
import { FieldSet } from '../atoms/fieldset'
import { HelpText } from '../atoms/help-text'
import { Label } from '../atoms/label'
import { useFormContext } from '../contexts/form'

export interface FormCheckboxProps {
  id: string
  className?: string
  helpText?: string
  disabled?: boolean
}

/**
 * FormCheckbox Molecule
 * Self-managed checkbox field that connects to FormContext by id
 * Note: Uses inline layout (label next to checkbox) instead of FormFieldWrapper
 *
 * @example
 * ```tsx
 * <FormProvider initialFields={fields} onSubmit={handleSubmit}>
 *   <FormCheckbox id="terms" helpText="You must agree to continue" />
 *   <FormCheckbox id="newsletter" helpText="Receive weekly updates" />
 * </FormProvider>
 * ```
 */
export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ id, className, helpText, disabled = false }, ref) => {
    const { fields, errors, handleChange, handleBlur } = useFormContext()

    // Find field by id
    const field = fields.find((f) => f.name === id)

    // Warn in dev if field not found
    if (!field && process.env.NODE_ENV === 'development') {
      console.warn(`FormCheckbox: No field found with id "${id}" in FormContext`)
      return null
    }

    if (!field) return null

    // Only show error if field has been touched
    const error = field.touched ? errors[id] : undefined
    const checked = Boolean(field.value)
    const label = field.label

    // Checkbox uses inline layout (different from other form fields)
    return (
      <FieldSet spacing="md" className={className}>
        <div className="flex items-center gap-2">
          <Checkbox
            ref={ref}
            id={id}
            name={id}
            checked={checked}
            error={!!error}
            disabled={disabled}
            onChange={(e) => handleChange(id, e.target.checked)}
            onBlur={() => handleBlur(id)}
            aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
            aria-invalid={!!error}
          />
          <Label htmlFor={id} className="mb-0 cursor-pointer">
            {label}
          </Label>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!error && helpText && <HelpText>{helpText}</HelpText>}
      </FieldSet>
    )
  }
)

FormCheckbox.displayName = 'FormCheckbox'
