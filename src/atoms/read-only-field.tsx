import { FormLabel } from './form-label'

export interface ReadOnlyFieldProps {
  label: string
  value: React.ReactNode
  className?: string
  valueClassName?: string
  testId?: string
}

/**
 * ReadOnlyField Atom
 * Displays a label with a read-only value below it.
 * Commonly used in profile pages, detail views, and summary sections.
 *
 * @example
 * <ReadOnlyField label="Email" value={user.email} />
 * <ReadOnlyField label="Status" value={<Badge variant="success">Active</Badge>} />
 */
export const ReadOnlyField = ({
  label,
  value,
  className = '',
  valueClassName = '',
  testId,
}: ReadOnlyFieldProps) => {
  return (
    <div className={className} data-testid={testId}>
      <FormLabel>{label}</FormLabel>
      <p className={`mt-1 text-base text-gray-100 ${valueClassName}`}>{value}</p>
    </div>
  )
}
