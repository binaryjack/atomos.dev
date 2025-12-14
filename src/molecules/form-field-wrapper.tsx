import { ReactNode } from 'react'
import { ErrorMessage } from '../atoms/error-message'
import { FieldSet } from '../atoms/fieldset'
import { HelpText } from '../atoms/help-text'
import { Label } from '../atoms/label'

/**
 * Form Field Wrapper Component
 * Eliminates duplicate wrapper code in FormInput, FormSelect, FormTextarea, etc.
 * Provides consistent layout for all form fields:
 * - Label with required indicator
 * - Field content (passed as children)
 * - Error message or help text
 */

export interface FormFieldWrapperProps {
  /** Unique field identifier */
  id: string
  /** Field label text */
  label: string
  /** Whether the field is required */
  required?: boolean
  /** Current validation error */
  error?: string
  /** Helper text shown when no error */
  helpText?: string
  /** Additional CSS classes */
  className?: string
  /** The form input/select/textarea element */
  children: ReactNode
  /** Field layout variant */
  layout?: 'vertical' | 'horizontal' | 'inline'
  /** Label size */
  labelSize?: 'sm' | 'md' | 'lg'
}

export const FormFieldWrapper = ({
  id,
  label,
  required = false,
  error,
  helpText,
  className,
  children,
  layout = 'vertical',
  labelSize = 'md',
}: FormFieldWrapperProps) => {
  const layoutClasses = {
    vertical: '',
    horizontal: 'sm:flex sm:items-start sm:gap-4',
    inline: 'flex items-center gap-2',
  }

  const labelLayoutClasses = {
    vertical: '',
    horizontal: 'sm:w-1/3 sm:pt-2',
    inline: 'shrink-0',
  }

  const fieldLayoutClasses = {
    vertical: '',
    horizontal: 'sm:flex-1',
    inline: 'flex-1',
  }

  return (
    <FieldSet spacing="md" className={`${layoutClasses[layout]} ${className || ''}`}>
      <div className={labelLayoutClasses[layout]}>
        <Label htmlFor={id} required={required} size={labelSize} color="primary">
          {label}
        </Label>
      </div>

      <div className={fieldLayoutClasses[layout]}>
        {children}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!error && helpText && <HelpText>{helpText}</HelpText>}
      </div>
    </FieldSet>
  )
}
