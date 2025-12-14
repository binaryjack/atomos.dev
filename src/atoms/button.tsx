import { ButtonSize, ButtonVariant, getButtonStyles } from '../design-system'

interface IButtonAsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
  href?: never
  as?: never
  testId?: string
}

interface IButtonAsLink extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
  href: string
  disabled?: boolean
  as?: 'a'
  testId?: string
}

type IButtonProps = IButtonAsButton | IButtonAsLink

/**
 * Button Component
 *
 * Framework-agnostic button component.
 * Can render as <button> or <a> tag depending on presence of href.
 * For framework-specific routing (Next.js Link, React Router Link),
 * wrap this component or pass a custom 'as' component.
 *
 * @example
 * // As button
 * <Button onClick={handleClick}>Click me</Button>
 *
 * // As anchor link
 * <Button href="https://example.com">External Link</Button>
 *
 * // Loading state
 * <Button isLoading>Submitting...</Button>
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  testId,
  ...props
}: IButtonProps) => {
  const styles = getButtonStyles(variant, size, fullWidth)
  const combinedClassName = `${styles} ${className}`

  const content = isLoading ? (
    <div className="flex items-center justify-center gap-2">
      <InlineSpinner />
      <span>{children}</span>
    </div>
  ) : (
    children
  )

  // Render as anchor if href is provided
  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        className={`inline-block text-center ${combinedClassName} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        data-testid={testId}
        {...(props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}
      >
        {content}
      </a>
    )
  }

  // Render as button
  return (
    <button
      type="button"
      className={combinedClassName}
      disabled={disabled || isLoading}
      data-testid={testId}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}

/**
 * Inline Spinner for Button loading state
 */
export const InlineSpinner = ({ className = '' }: { className?: string }) => (
  <div
    className={`h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
  />
)
