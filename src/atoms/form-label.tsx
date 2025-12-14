interface FormLabelProps {
  htmlFor?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * FormLabel Atom
 * Label for form fields with optional required indicator
 */
export const FormLabel = ({ htmlFor, required, children, className = '' }: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-300 mb-2 ${className}`}
    >
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  )
}
