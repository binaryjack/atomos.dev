/**
 * Flex Atom
 * Flexbox layout with consistent alignment and spacing
 */

export type FlexDirection = 'row' | 'col'
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface FlexProps {
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
  gap?: FlexGap
  wrap?: boolean
  children: React.ReactNode
  className?: string
}

export const Flex = ({
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap = 'none',
  wrap = false,
  children,
  className = '',
}: FlexProps) => {
  const directionMap: Record<FlexDirection, string> = {
    row: 'flex-row',
    col: 'flex-col',
  }

  const alignMap: Record<FlexAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  }

  const justifyMap: Record<FlexJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  const gapMap: Record<FlexGap, string> = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12',
  }

  const wrapClass = wrap ? 'flex-wrap' : ''

  return (
    <div
      className={`flex ${directionMap[direction]} ${alignMap[align]} ${justifyMap[justify]} ${gapMap[gap]} ${wrapClass} ${className}`}
    >
      {children}
    </div>
  )
}
