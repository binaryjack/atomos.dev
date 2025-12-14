import { FormLabel } from '../atoms/form-label'

interface FormSelectGroupProps {
  label: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Array<{ value: string | number; label: string }>
  required?: boolean
  helperText?: string
  error?: string
  className?: string
  disabled?: boolean
  title?: string
}

/**
 * @deprecated Use FormSelect with FormContext instead.
 * This component will be removed in a future version.
 *
 * Migration example:
 * ```tsx
 * // Before:
 * <FormSelectGroup label="Country" name="country" value={country} onChange={handleChange} options={options} />
 *
 * // After:
 * <FormProvider initialFields={fields} onSubmit={handleSubmit}>
 *   <FormSelect id="country">
 *     <option value="">Select country</option>
 *     {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
 *   </FormSelect>
 * </FormProvider>
 * ```
 */
export const FormSelectGroup = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  helperText,
  error,
  className = '',
  disabled = false,
  title,
}: FormSelectGroupProps) => {
  // Log deprecation warning in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `[DEPRECATED] FormSelectGroup is deprecated. Use FormSelect with FormContext instead. Field: "${name}"`
    )
  }

  return (
    <div className={className}>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        title={title || label}
        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100 focus:border-purple-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {options.map((option, index) => (
          <option key={`${name}-${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
