/**
 * Table Atoms
 * Semantic table components with consistent styling
 */

export interface ITableProps {
  children: React.ReactNode
  className?: string
}

export const Table = ({ children, className = '' }: ITableProps) => {
  return <table className={`w-full ${className}`}>{children}</table>
}

export interface ITableHeaderProps {
  children: React.ReactNode
  className?: string
}

export const TableHeader = ({ children, className = '' }: ITableHeaderProps) => {
  return <thead className={`bg-gray-800 ${className}`}>{children}</thead>
}

export interface ITableBodyProps {
  children: React.ReactNode
  className?: string
}

export const TableBody = ({ children, className = '' }: ITableBodyProps) => {
  return <tbody className={`divide-y divide-gray-800 ${className}`}>{children}</tbody>
}

export interface ITableRowProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const TableRow = ({ children, onClick, className = '' }: ITableRowProps) => {
  const interactiveClass = onClick ? 'cursor-pointer' : ''
  return (
    <tr onClick={onClick} className={`hover:bg-gray-800 ${interactiveClass} ${className}`}>
      {children}
    </tr>
  )
}

export interface ITableHeadProps {
  children: React.ReactNode
  sortable?: boolean
  onSort?: () => void
  className?: string
}

export const TableHead = ({
  children,
  sortable = false,
  onSort,
  className = '',
}: ITableHeadProps) => {
  const sortableClass = sortable ? 'cursor-pointer hover:text-gray-200' : ''
  return (
    <th
      onClick={sortable ? onSort : undefined}
      className={`px-2 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ${sortableClass} ${className}`}
    >
      {children}
    </th>
  )
}

export interface ITableCellProps {
  children: React.ReactNode
  className?: string
}

export const TableCell = ({ children, className = '' }: ITableCellProps) => {
  return (
    <td className={`px-2 py-2 sm:px-4 sm:py-3 text-sm text-gray-100 ${className}`}>{children}</td>
  )
}
