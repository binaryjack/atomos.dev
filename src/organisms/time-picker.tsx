'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export interface TimePickerProps {
  /** Current time value (controlled) */
  value?: { hours: number; minutes: number }
  /** Callback when time changes */
  onChange?: (hours: number, minutes: number) => void
  /** Disabled state */
  disabled?: boolean
  /** Show seconds picker */
  showSeconds?: boolean
  /** 24-hour format (default) or 12-hour with AM/PM */
  format?: '24h' | '12h'
  /** Custom className */
  className?: string
  /** Placeholder */
  placeholder?: string
}

/**
 * Standalone TimePicker Component
 *
 * Simple, reliable time input with dropdown selectors.
 * No external dependencies, no timezone issues.
 */
export const TimePicker = ({
  value,
  onChange,
  disabled = false,
  showSeconds: _showSeconds = false, // Reserved for future use
  format = '24h',
  className = '',
  placeholder = 'HH:MM',
}: TimePickerProps) => {
  const [hours, setHours] = useState(value?.hours ?? 0)
  const [minutes, setMinutes] = useState(value?.minutes ?? 0)
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  // Sync with controlled value
  useEffect(() => {
    if (value) {
      setHours(value.hours)
      setMinutes(value.minutes)
    }
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleHoursChange = useCallback(
    (newHours: number) => {
      const clamped = Math.max(0, Math.min(format === '24h' ? 23 : 12, newHours))
      setHours(clamped)
      onChange?.(clamped, minutes)
    },
    [minutes, onChange, format]
  )

  const handleMinutesChange = useCallback(
    (newMinutes: number) => {
      const clamped = Math.max(0, Math.min(59, newMinutes))
      setMinutes(clamped)
      onChange?.(hours, clamped)
    },
    [hours, onChange]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'hours' | 'minutes') => {
    const value = e.target.value
    if (value === '') return

    const num = parseInt(value, 10)
    if (isNaN(num)) return

    if (type === 'hours') {
      handleHoursChange(num)
    } else {
      handleMinutesChange(num)
    }
  }

  const formatNumber = (num: number) => String(num).padStart(2, '0')

  const displayValue = `${formatNumber(hours)}:${formatNumber(minutes)}`

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Input Display */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-left
          bg-gray-800 border border-gray-700 rounded-lg
          text-gray-200 text-sm font-mono
          hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        `}
      >
        {displayValue || placeholder}
      </button>

      {/* Dropdown Panel */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 p-4 min-w-[200px]">
          <div className="flex gap-3 items-center justify-center">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-2">Hours</label>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleHoursChange(hours + 1)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-xs"
                >
                  ▲
                </button>
                <input
                  ref={hoursRef}
                  type="number"
                  min={0}
                  max={format === '24h' ? 23 : 12}
                  value={formatNumber(hours)}
                  onChange={(e) => handleInputChange(e, 'hours')}
                  aria-label="Hours"
                  className="w-14 px-2 py-2 bg-gray-900 border border-gray-700 rounded text-center text-gray-200 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleHoursChange(hours - 1)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-xs"
                >
                  ▼
                </button>
              </div>
            </div>

            <span className="text-2xl text-gray-400 mt-6">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-2">Minutes</label>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleMinutesChange(minutes + 1)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-xs"
                >
                  ▲
                </button>
                <input
                  ref={minutesRef}
                  type="number"
                  min={0}
                  max={59}
                  value={formatNumber(minutes)}
                  onChange={(e) => handleInputChange(e, 'minutes')}
                  aria-label="Minutes"
                  className="w-14 px-2 py-2 bg-gray-900 border border-gray-700 rounded text-center text-gray-200 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleMinutesChange(minutes - 1)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-xs"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-3 pt-3 border-t border-gray-700 flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => {
                const now = new Date()
                handleHoursChange(now.getHours())
                handleMinutesChange(now.getMinutes())
              }}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs"
            >
              Now
            </button>
            <button
              type="button"
              onClick={() => {
                handleHoursChange(0)
                handleMinutesChange(0)
              }}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-xs"
            >
              00:00
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
