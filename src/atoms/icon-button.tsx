interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<{ className?: string }>
  label: string
  variant?: 'default' | 'danger'
  testId?: string
}

/**
 * IconButton Atom
 * Button with icon only, accessible with aria-label
 */
export const IconButton = ({
  icon: Icon,
  label,
  variant = 'default',
  testId,
  className = '',
  ...props
}: IconButtonProps) => {
  const variantStyles = {
    default: 'text-gray-400 hover:bg-gray-700 hover:text-white',
    danger: 'text-red-400 hover:bg-red-900/30 hover:text-red-300',
  }

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      data-testid={testId}
      className={`rounded p-2 transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
