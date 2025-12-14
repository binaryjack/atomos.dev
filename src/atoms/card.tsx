import { CardPadding, CardVariant, getCardStyles } from '../design-system'

export interface ICardProps {
  variant?: CardVariant
  padding?: CardPadding
  children: React.ReactNode
  className?: string
  onClick?: () => void
  testId?: string
}

/**
 * Card Atom
 * Container component with consistent styling variants
 * Uses centralized card-variants.ts design system
 */
export const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick,
  testId,
}: ICardProps) => {
  const styles = getCardStyles(variant, padding)

  return (
    <div className={`${styles} ${className}`} onClick={onClick} data-testid={testId}>
      {children}
    </div>
  )
}
