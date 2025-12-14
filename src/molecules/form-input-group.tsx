import { FormLabel } from '../atoms/form-label'

interface FormInputGroupProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'number' | 'password' | 'time' | 'url'
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
  helperText?: string
  error?: string
  className?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  title?: string
}

/**
 * @deprecated Use FormInput with FormContext instead.
 * This component will be removed in a future version.
 *
 * Migration example:
 * ```tsx
 * // Before:
 * <FormInputGroup label="Email" name="email" value={email} onChange={handleChange} />
 *
 * // After:
 * <FormProvider initialFields={fields} onSubmit={handleSubmit}>
 *   <FormInput id="email" placeholder="Enter email" />
 * </FormProvider>
 * ```
 */
export const FormInputGroup = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  helperText,
  error,
  className = '',
  min,
  max,
  step,
  disabled = false,
  title,
}: FormInputGroupProps) => {
  // Log deprecation warning in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `[DEPRECATED] FormInputGroup is deprecated. Use FormInput with FormContext instead. Field: "${name}"`
    )
  }

  return (
    <div className={className}>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        title={title || label}
        className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
