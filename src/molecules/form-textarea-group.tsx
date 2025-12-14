import { FormLabel } from '../atoms/form-label'

interface FormTextareaGroupProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  placeholder?: string
  helperText?: string
  error?: string
  rows?: number
  className?: string
  disabled?: boolean
  title?: string
}

/**
 * @deprecated Use FormTextarea with FormContext instead.
 * This component will be removed in a future version.
 *
 * Migration example:
 * ```tsx
 * // Before:
 * <FormTextareaGroup label="Description" name="description" value={description} onChange={handleChange} />
 *
 * // After:
 * <FormProvider initialFields={fields} onSubmit={handleSubmit}>
 *   <FormTextarea id="description" rows={6} placeholder="Describe in detail" />
 * </FormProvider>
 * ```
 */
export const FormTextareaGroup = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  helperText,
  error,
  rows = 3,
  className = '',
  disabled = false,
  title,
}: FormTextareaGroupProps) => {
  // Log deprecation warning in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `[DEPRECATED] FormTextareaGroup is deprecated. Use FormTextarea with FormContext instead. Field: "${name}"`
    )
  }

  return (
    <div className={className}>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        title={title || label}
        className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
