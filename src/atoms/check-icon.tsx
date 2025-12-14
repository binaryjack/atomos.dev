export interface CheckIconProps {
  className?: string
  size?: number
  color?: string
  title?: string
}

/**
 * CheckIcon Atom
 * Simple checkmark icon for success states
 * Used in file upload lists and success indicators
 */
export const CheckIcon = ({
  className = '',
  size = 24,
  color = '#10b981',
  title,
}: CheckIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role="img"
    aria-label={title || 'Check'}
  >
    {title && <title>{title}</title>}
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
