interface StatusBadgeProps {
  status: string | number
  statusMap?: Record<string | number, string>
  colorMap?: Record<string | number, string>
  title?: string
}

const DEFAULT_STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-900/20 text-blue-400 border-blue-800',
  Pending: 'bg-yellow-900/20 text-yellow-400 border-yellow-800',
  InProgress: 'bg-yellow-900/20 text-yellow-400 border-yellow-800',
  Approved: 'bg-green-900/20 text-green-400 border-green-800',
  Resolved: 'bg-green-900/20 text-green-400 border-green-800',
  Rejected: 'bg-red-900/20 text-red-400 border-red-800',
  Closed: 'bg-gray-900/20 text-gray-400 border-gray-800',
  Contacted: 'bg-blue-900/20 text-blue-400 border-blue-800',
  WontFix: 'bg-red-900/20 text-red-400 border-red-800',
}

/**
 * StatusBadge Atom
 * Displays status with color-coded styling
 */
export const StatusBadge = ({ status, statusMap, colorMap, title }: StatusBadgeProps) => {
  const statusKey = typeof status === 'number' && statusMap ? statusMap[status] : status
  const displayText = typeof statusKey === 'string' ? statusKey : String(status)
  const colorClass =
    colorMap?.[status] || DEFAULT_STATUS_COLORS[displayText] || 'bg-gray-800 text-gray-400'

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded border ${colorClass}`}
      title={title || `Status: ${displayText}`}
    >
      {displayText}
    </span>
  )
}
