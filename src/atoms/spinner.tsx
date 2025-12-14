/**
 * Spinner Component
 *
 * A consistent loading spinner used across applications.
 * Supports multiple sizes for different contexts.
 *
 * @example
 * // Small spinner for buttons
 * <Spinner size="sm" />
 *
 * // Medium spinner for inline loading
 * <Spinner size="md" />
 *
 * // Large spinner for page/section loading
 * <Spinner size="lg" />
 *
 * // Extra large spinner for full-page overlays
 * <Spinner size="xl" />
 *
 * // With custom label
 * <Spinner size="lg" label="Loading data..." />
 *
 * // Full-page overlay
 * <Spinner size="xl" label="Loading..." fullPage />
 */

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ISpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize
  /** Optional loading text to display below the spinner */
  label?: string
  /** Show as full-page overlay with backdrop */
  fullPage?: boolean
  /** Additional CSS classes */
  className?: string
}

const sizeClasses: Record<SpinnerSize, { spinner: string; pulse: string; text: string }> = {
  xs: {
    spinner: 'h-3 w-3 border-2',
    pulse: 'h-1.5 w-1.5',
    text: 'text-xs',
  },
  sm: {
    spinner: 'h-4 w-4 border-2',
    pulse: 'h-2 w-2',
    text: 'text-xs',
  },
  md: {
    spinner: 'h-8 w-8 border-4',
    pulse: 'h-4 w-4',
    text: 'text-sm',
  },
  lg: {
    spinner: 'h-12 w-12 border-4',
    pulse: 'h-6 w-6',
    text: 'text-sm',
  },
  xl: {
    spinner: 'h-16 w-16 border-4',
    pulse: 'h-8 w-8',
    text: 'text-sm',
  },
}

export const Spinner = ({
  size = 'md',
  label,
  fullPage = false,
  className = '',
}: ISpinnerProps) => {
  const classes = sizeClasses[size]

  const spinnerContent = (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Spinner with inner pulse effect */}
      <div className="relative">
        <div
          className={`animate-spin rounded-full border-gray-700 border-t-purple-500 ${classes.spinner}`}
        />
        {/* Inner pulse - only show for md size and above */}
        {size !== 'xs' && size !== 'sm' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`animate-pulse rounded-full bg-purple-500/20 ${classes.pulse}`} />
          </div>
        )}
      </div>
      {/* Loading text */}
      {label && <p className={`animate-pulse text-gray-400 ${classes.text}`}>{label}</p>}
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950/95 backdrop-blur-sm transition-opacity duration-200">
        {spinnerContent}
      </div>
    )
  }

  return spinnerContent
}

/**
 * Inline Spinner
 *
 * A simple inline spinner for use in buttons or inline contexts.
 * Uses current text color for consistency.
 */
export const InlineSpinner = ({ className = '' }: { className?: string }) => (
  <div
    className={`h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
  />
)
