import { forwardRef, useId } from 'react'

export type ToggleSize = 'sm' | 'md' | 'lg'

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed next to the toggle */
  label?: string
  /** Position of the label */
  labelPosition?: 'left' | 'right'
  /** Size variant of the toggle */
  size?: ToggleSize
  /** Error state */
  error?: boolean
  /** Test ID for testing */
  testId?: string
}

const sizeStyles: Record<ToggleSize, { track: string; thumb: string; translate: string }> = {
  sm: {
    track: 'h-4 w-7',
    thumb: 'h-3 w-3',
    translate: 'translate-x-3',
  },
  md: {
    track: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4',
  },
  lg: {
    track: 'h-6 w-11',
    thumb: 'h-5 w-5',
    translate: 'translate-x-5',
  },
}

/**
 * Toggle Atom
 * A switch/toggle component for boolean values
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      labelPosition = 'right',
      size = 'md',
      error = false,
      disabled,
      checked,
      className = '',
      testId,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const styles = sizeStyles[size]

    const trackStyles = disabled
      ? 'bg-gray-700 cursor-not-allowed'
      : checked
        ? error
          ? 'bg-red-600'
          : 'bg-blue-600'
        : 'bg-gray-600 hover:bg-gray-500'

    const thumbStyles = disabled ? 'bg-gray-400' : 'bg-white'

    const labelStyles = disabled ? 'text-gray-500 cursor-not-allowed' : 'text-gray-200'

    const isChecked = !!checked

    const toggle = (
      <span
        className={`
          relative inline-flex shrink-0 cursor-pointer items-center rounded-full
          transition-colors duration-200 ease-in-out
          ${styles.track} ${trackStyles}
          ${disabled ? 'cursor-not-allowed' : ''}
        `}
        data-testid={testId}
      >
        <span
          className={`
            pointer-events-none inline-block transform rounded-full shadow ring-0
            transition duration-200 ease-in-out
            ${styles.thumb} ${thumbStyles}
            ${isChecked ? styles.translate : 'translate-x-0.5'}
          `}
        />
      </span>
    )

    // Accessible checkbox-based toggle
    // Note: Use tabIndex={-1} on the hidden input to prevent focus scroll issues
    // The sr-only input can cause scroll jumping when focused via label click
    const toggleInput = (
      <input
        ref={ref}
        type="checkbox"
        id={inputId}
        checked={isChecked}
        disabled={disabled}
        onChange={props.onChange}
        className="sr-only peer"
        tabIndex={-1}
        aria-checked={isChecked ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        {...props}
      />
    )

    // Handle click directly to avoid label-induced focus scroll
    const handleToggleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      if (disabled) return
      // Trigger onChange by simulating a change event
      const syntheticEvent = {
        target: { checked: !isChecked },
        currentTarget: { checked: !isChecked },
      } as React.ChangeEvent<HTMLInputElement>
      props.onChange?.(syntheticEvent)
    }

    if (!label) {
      return (
        <div
          className={`inline-flex cursor-pointer items-center ${className} ${disabled ? 'cursor-not-allowed' : ''}`}
          onClick={handleToggleClick}
          role="switch"
          aria-checked={isChecked ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : 'false'}
        >
          {toggleInput}
          {toggle}
        </div>
      )
    }

    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {toggleInput}
        {labelPosition === 'left' && (
          <label
            id={`${inputId}-label`}
            htmlFor={inputId}
            className={`text-sm font-medium ${labelStyles} cursor-pointer`}
          >
            {label}
          </label>
        )}
        <label htmlFor={inputId} className="cursor-pointer">
          {toggle}
        </label>
        {labelPosition === 'right' && (
          <label
            id={`${inputId}-label`}
            htmlFor={inputId}
            className={`text-sm font-medium ${labelStyles} cursor-pointer`}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'
