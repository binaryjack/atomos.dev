import { memo, useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { DatePickerSelectionModeType } from './core/date-picker.types'
import './date-picker.css'
import DatePickerContentDrawer from './date-picker.drawer.content'
import useKeyBindings from './hooks/use-key-bindings'
import { Toggleable } from './toggleable/toggleable'
import { useToggleableContext } from './toggleable/toggleable.context.hook'
import { cx } from './utils/class-utils'
import { DateFormatsEnum, formatDate } from './utils/date-utils'

/**
 * Props for the standalone DatePicker component (v3).
 */
interface DatePickerProps {
  /** Unique identifier for the component */
  id?: string
  /** The separator used in the date format (default: '-') */
  separator?: string
  /** The format for storing the date data */
  dataFormat?: DateFormatsEnum
  /** The format for displaying the date to users */
  displayFormat?: DateFormatsEnum
  /** Selection mode: single date or date range */
  defaultSelectionMode?: DatePickerSelectionModeType
  /** Current date value (controlled) */
  value?: Date | string
  /** Default date value (uncontrolled) */
  defaultValue?: Date | string
  /** Callback when date changes */
  onChange?: (startDate?: Date, endDate?: Date) => void
  /** Callback when clear button is clicked */
  onClear?: () => void
  /** Show footer with mode indicators */
  showFooter?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Custom className */
  className?: string
  /** Disabled state */
  disabled?: boolean
  /** Width of the drawer */
  drawerWidth?: string
  /** Height of the drawer */
  drawerHeight?: string
}

/**
 * **DatePicker v3 - Standalone Component**
 *
 * A comprehensive date picker component that works independently without FORMULAR form integration.
 *
 * Features:
 * - Interactive calendar interface with day, month, and year views
 * - Customizable date formats for storage and display
 * - Keyboard navigation support (arrow keys, shortcuts)
 * - Range selection support (single date or date ranges)
 * - Toggleable drawer interface
 * - No external form dependencies
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [date, setDate] = useState<Date>()
 * <DatePicker onChange={(date) => setDate(date)} />
 * ```
 *
 * @example
 * ```tsx
 * // With custom formats
 * <DatePicker
 *   displayFormat={DateFormatsEnum.MM_DD_YYYY}
 *   dataFormat={DateFormatsEnum.YYYY_MM_DD}
 *   separator="/"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Range selection
 * <DatePicker
 *   defaultSelectionMode="range"
 *   onChange={(start, end) => console.log(start, end)}
 * />
 * ```
 */
const DatePickerV3 = memo(
  ({
    id = 'date-picker',
    separator,
    dataFormat = DateFormatsEnum.YYYY_MM_DD,
    displayFormat = DateFormatsEnum.DD_MM_YYYY,
    defaultSelectionMode = 'single',
    value,
    defaultValue,
    onChange,
    onClear,
    showFooter,
    placeholder = 'Select date...',
    className = '',
    disabled = false,
    drawerWidth = '300px',
    drawerHeight = '350px',
  }: DatePickerProps) => {
    const [internalValue, setInternalValue] = useState<Date | undefined>(() => {
      if (defaultValue) {
        return typeof defaultValue === 'string' ? new Date(defaultValue) : defaultValue
      }
      return undefined
    })

    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Use controlled value if provided, otherwise use internal state
    const currentValue =
      value !== undefined ? (typeof value === 'string' ? new Date(value) : value) : internalValue

    const handleSelectDate = useCallback(
      (startDate?: Date, endDate?: Date) => {
        if (!startDate) return

        setInternalValue(startDate)
        onChange?.(startDate, endDate)
      },
      [onChange]
    )

    const handleClear = useCallback(() => {
      setInternalValue(undefined)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      onClear?.()
    }, [onClear])

    const displayValue = currentValue ? formatDate(currentValue, displayFormat, separator) : ''

    return (
      <Toggleable initialState="closed">
        <DatePickerInput
          id={id}
          inputRef={inputRef}
          containerRef={containerRef}
          displayValue={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          onClear={handleClear}
          separator={separator}
          dataFormat={dataFormat}
          displayFormat={displayFormat}
          defaultValue={currentValue}
          onSelectDate={handleSelectDate}
          onClearField={handleClear}
          defaultSelectionMode={defaultSelectionMode}
          showFooter={showFooter}
          drawerWidth={drawerWidth}
          drawerHeight={drawerHeight}
        />
      </Toggleable>
    )
  }
)

interface DatePickerInputProps {
  id: string
  inputRef: React.RefObject<HTMLInputElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  displayValue: string
  placeholder: string
  disabled: boolean
  className: string
  onClear: () => void
  separator?: string
  dataFormat: DateFormatsEnum
  displayFormat: DateFormatsEnum
  defaultValue?: Date
  onSelectDate: (startDate?: Date, endDate?: Date) => void
  onClearField: () => void
  defaultSelectionMode: DatePickerSelectionModeType
  showFooter?: boolean
  drawerWidth: string
  drawerHeight: string
}

const DatePickerInput = memo(
  ({
    id,
    inputRef,
    containerRef,
    displayValue,
    placeholder,
    disabled,
    className,
    onClear,
    separator,
    dataFormat,
    displayFormat,
    defaultValue,
    onSelectDate,
    onClearField,
    defaultSelectionMode,
    showFooter,
    drawerWidth,
    drawerHeight,
  }: DatePickerInputProps) => {
    const { toggleState, setToggleState } = useToggleableContext()
    const [drawerStyle, setDrawerStyle] = useState<CSSProperties>({})

    const { handleKeyDown } = useKeyBindings({
      onArrowDownCallback: () => {
        setToggleState('open')
      },
      onEnterCallback: (e) => {
        e.stopPropagation()
        e.preventDefault()
        setToggleState('open')
      },
      onDeleteCallback: () => {
        onClear()
      },
      onEscapeCallback: () => {
        setToggleState('closed')
      },
    })

    const handleInputClick = () => {
      if (!disabled) {
        setToggleState('open')
      }
    }

    const parseSize = (value: string, fallback: number) => {
      const parsed = Number.parseFloat(value)
      return Number.isFinite(parsed) ? parsed : fallback
    }

    const updateDrawerPosition = useCallback(() => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const margin = 8 // minimal gutter to avoid touching the viewport edges

      // On small screens, occupy the full viewport to avoid overflow
      if (viewportWidth <= 640) {
        setDrawerStyle({
          position: 'fixed',
          top: 0,
          left: 0,
          width: viewportWidth,
          height: viewportHeight,
          maxWidth: viewportWidth,
          maxHeight: viewportHeight,
        })
        return
      }

      const desiredWidth = parseSize(drawerWidth, 300)
      const desiredHeight = parseSize(drawerHeight, 350)

      const width = Math.min(desiredWidth, viewportWidth - margin * 2)
      const height = Math.min(desiredHeight, viewportHeight - margin * 2)

      // Choose vertical placement based on available space
      const spaceBelow = viewportHeight - rect.bottom - margin
      const spaceAbove = rect.top - margin

      let top = rect.bottom + margin
      let finalHeight = height

      if (spaceBelow >= height) {
        top = rect.bottom + margin
        finalHeight = height
      } else if (spaceAbove >= height) {
        top = rect.top - height - margin
        finalHeight = height
      } else if (spaceBelow >= spaceAbove) {
        finalHeight = Math.max(Math.min(height, spaceBelow), 200)
        top = rect.bottom + margin
      } else {
        finalHeight = Math.max(Math.min(height, spaceAbove), 200)
        top = rect.top - finalHeight - margin
      }

      const left = Math.min(
        Math.max(rect.left, margin),
        Math.max(margin, viewportWidth - width - margin)
      )

      setDrawerStyle({
        position: 'fixed',
        top,
        left,
        width,
        height: finalHeight,
        maxHeight: viewportHeight - margin * 2,
        maxWidth: viewportWidth - margin * 2,
      })
    }, [containerRef, drawerHeight, drawerWidth])

    useEffect(() => {
      if (toggleState !== 'open') return

      updateDrawerPosition()
      const onResize = () => updateDrawerPosition()
      const onScroll = () => updateDrawerPosition()

      window.addEventListener('resize', onResize)
      window.addEventListener('scroll', onScroll, true)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('scroll', onScroll, true)
      }
    }, [toggleState, updateDrawerPosition])

    return (
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className={cx('dp-wrapper', className)}
      >
        <div className="dp-input-container">
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={id}
            type="text"
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            className="dp-input"
            data-testid="date-picker-input"
            data-separator={separator}
            data-format={dataFormat}
            data-display-format={displayFormat}
          />
          {displayValue && !disabled && (
            <button
              type="button"
              className="dp-clear-btn"
              onClick={(e) => {
                e.stopPropagation()
                onClear()
              }}
              title="Clear"
              data-testid="date-picker-clear-btn"
            >
              ×
            </button>
          )}
        </div>

        {toggleState === 'open' && (
          <div
            className="dp-drawer"
            data-testid="date-picker-drawer"
            style={
              {
                '--dp-drawer-width': drawerWidth,
                '--dp-drawer-height': drawerHeight,
                ...drawerStyle,
              } as CSSProperties
            }
          >
            <DatePickerContentDrawer
              id={id}
              separator={separator}
              dataFormat={dataFormat}
              displayFormat={displayFormat}
              defaultDate={defaultValue}
              onSelectDate={onSelectDate}
              onClearField={onClearField}
              defaultSelectionMode={defaultSelectionMode}
              showFooter={showFooter}
              width={drawerWidth}
              height={drawerHeight}
            />
          </div>
        )}
      </div>
    )
  }
)

export default DatePickerV3
export { DateFormatsEnum, type DatePickerProps }
