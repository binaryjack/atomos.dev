import { Flex } from './flex'

export type InfoBoxVariant = 'info' | 'warning' | 'success' | 'error'

export interface InfoBoxProps {
  variant?: InfoBoxVariant
  title?: string
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<InfoBoxVariant, { container: string; icon: string }> = {
  info: {
    container: 'border-blue-800 bg-blue-900/20',
    icon: 'text-blue-400',
  },
  warning: {
    container: 'border-yellow-600 bg-yellow-900/20',
    icon: 'text-yellow-400',
  },
  success: {
    container: 'border-green-800 bg-green-900/20',
    icon: 'text-green-400',
  },
  error: {
    container: 'border-red-800 bg-red-900/20',
    icon: 'text-red-400',
  },
}

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={`h-5 w-5 ${className}`} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
)

/**
 * InfoBox Atom
 * Displays informational messages with icon and optional title
 * Used across pages for tips, coming soon notices, and contextual help
 */
export const InfoBox = ({ variant = 'info', title, children, className = '' }: InfoBoxProps) => {
  const styles = variantStyles[variant]

  return (
    <div className={`rounded-lg border p-4 ${styles.container} ${className}`}>
      <Flex gap="sm" align="start">
        <div className="shrink-0">
          <InfoIcon className={styles.icon} />
        </div>
        <div className="flex-1">
          <div className={`text-sm ${styles.icon.replace('text-', 'text-').replace('400', '300')}`}>
            {title && <strong className="block mb-1">{title}</strong>}
            <div>{children}</div>
          </div>
        </div>
      </Flex>
    </div>
  )
}
