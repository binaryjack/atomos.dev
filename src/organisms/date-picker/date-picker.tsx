import { memo, useCallback, useRef, useState, type CSSProperties } from 'react'
import { useDrawerPosition } from '../../hooks/use-drawer-position'
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
    drawerWidth = '280px',
    drawerHeight = '300px',
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

    const drawerStyle = useDrawerPosition({
      containerRef,
      isOpen: toggleState === 'open',
      desiredWidth: drawerWidth,
      desiredHeight: drawerHeight,
    })

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
