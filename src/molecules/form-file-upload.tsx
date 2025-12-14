import { forwardRef, useState } from 'react'
import { CheckIcon } from '../atoms/check-icon'
import { ErrorMessage } from '../atoms/error-message'
import { FieldSet } from '../atoms/fieldset'
import { HelpText } from '../atoms/help-text'
import { Label } from '../atoms/label'
import { useFormContext } from '../contexts/form'

export interface FormFileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string
  className?: string
  helpText?: string
  showFileList?: boolean
  onFileChange?: (files: File[]) => void
  onValidate?: (files: File[]) => string | null // Custom validation, returns error message or null
}

/**
 * FormFileUpload Molecule
 * Self-managed file upload field that connects to FormContext by id
 * Note: Files are managed locally (not in form state) but field metadata comes from context
 *
 * @example
 * ```tsx
 * <FormProvider initialFields={fields} onSubmit={handleSubmit}>
 *   <FormFileUpload
 *     id="attachments"
 *     multiple
 *     accept="image/*"
 *     helpText="Max 5 files, 5MB each"
 *     showFileList
 *   />
 * </FormProvider>
 * ```
 */
export const FormFileUpload = forwardRef<HTMLInputElement, FormFileUploadProps>(
  (
    { id, className, helpText, showFileList = true, onFileChange, onValidate, ...inputProps },
    ref
  ) => {
    const { fields, errors, setFieldError, handleBlur } = useFormContext()
    const [files, setFiles] = useState<File[]>([])

    // Find field by id
    const field = fields.find((f) => f.name === id)

    // Warn in dev if field not found
    if (!field && process.env.NODE_ENV === 'development') {
      console.warn(`FormFileUpload: No field found with id "${id}" in FormContext`)
      return null
    }

    if (!field) return null

    // Only show error if field has been touched
    const error = field.touched ? errors[id] : undefined
    const label = field.label
    const required = field.validation.required ?? false

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files)
        setFiles(newFiles)

        // Custom validation
        if (onValidate) {
          const validationError = onValidate(newFiles)
          if (validationError) {
            setFieldError(id, validationError)
          }
        }

        // Callback
        if (onFileChange) {
          onFileChange(newFiles)
        }
      }
      inputProps.onChange?.(e)
    }

    return (
      <FieldSet spacing="md" className={className}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>

        <input
          ref={ref}
          id={id}
          name={id}
          type="file"
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer"
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          {...(error ? { 'aria-invalid': true } : {})}
          onChange={handleChange}
          onBlur={() => handleBlur(id)}
          {...inputProps}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!error && helpText && <HelpText>{helpText}</HelpText>}

        {showFileList && files.length > 0 && (
          <div className="mt-2 space-y-1">
            {files.map((file, index) => (
              <div key={index} className="text-xs text-gray-300 flex items-center gap-1">
                <CheckIcon size={14} color="#10b981" /> {file.name} ({(file.size / 1024).toFixed(1)}{' '}
                KB)
              </div>
            ))}
          </div>
        )}
      </FieldSet>
    )
  }
)

FormFileUpload.displayName = 'FormFileUpload'
