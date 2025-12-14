interface SeverityBadgeProps {
  severity: number
  label?: string
  title?: string
}

const SEVERITY_MAP: Record<number, string> = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Critical',
}

const SEVERITY_COLORS: Record<number, string> = {
  1: 'bg-gray-900/20 text-gray-400 border-gray-800',
  2: 'bg-yellow-900/20 text-yellow-400 border-yellow-800',
  3: 'bg-orange-900/20 text-orange-400 border-orange-800',
  4: 'bg-red-900/20 text-red-400 border-red-800',
}

/**
 * SeverityBadge Atom
 * Displays severity level with color-coded styling
 */
export const SeverityBadge = ({ severity, label, title }: SeverityBadgeProps) => {
  const displayText = label || SEVERITY_MAP[severity] || 'Unknown'
  const colorClass = SEVERITY_COLORS[severity] || 'bg-gray-800 text-gray-400'

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded border ${colorClass}`}
      title={title || `Severity: ${displayText}`}
    >
      {displayText}
    </span>
  )
}
