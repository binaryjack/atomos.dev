import { useEffect } from 'react'

import { DatePickerSelectionModeType } from '../core/date-picker.types'
import { useObjectRef } from '../hooks/use-object-ref'
import {
  CalendarDateIcon,
  CalendarEventIcon,
  CalendarIcon,
  CalendarRangeIcon,
  WorldIcon,
} from '../internal-components/icons'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import DatePickerBodyDays from './date-picker.body.days'
import DatePickerBodyMonths from './date-picker.body.months'
import DatePickerBodyYears from './date-picker.body.years'
import DatePickerDrawerHeader from './date-picker.header'
import DatePickerSwitch from './date-picker.switch'

interface IDatePickerDrawerProps {
  id: string
  defaultSelectionMode?: DatePickerSelectionModeType
  showFooter?: boolean
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  width?: string
  height?: string
}

/**
 * A functional component that renders a customizable DatePicker drawer UI.
 */
const DatePickerDrawerUI = ({
  id,
  showFooter,
  defaultSelectionMode = 'single',
  handleKeyDown,
  onClick,
  width,
  height,
}: IDatePickerDrawerProps) => {
  const { mainRef, castedRefObject } = useObjectRef<HTMLDivElement>()
  const { toggleState } = useToggleableContext()

  useEffect(() => {
    if (!castedRefObject || toggleState === 'closed') return
    castedRefObject?.focus()
  }, [toggleState])

  return (
    <div
      ref={mainRef}
      tabIndex={0}
      className="date-picker-container overflow-hidden"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{ width: width, height: height }}
    >
      <DatePickerDrawerHeader id={id} />

      <div className="date-picker-body">
        <DatePickerSwitch
          day={<DatePickerBodyDays id={id} />}
          year={<DatePickerBodyYears id={id} />}
          month={<DatePickerBodyMonths id={id} />}
        />
      </div>

      {showFooter && (
        <div className="date-picker-footer">
          <div className="grid-mode">
            <div>grid mode: </div>
            <div>
              <DatePickerSwitch
                day={<CalendarDateIcon />}
                month={<CalendarIcon />}
                year={<WorldIcon />}
              />
            </div>
          </div>

          <div className="grid-mode">
            <div>selection mode: </div>
            <div>
              {defaultSelectionMode === 'range' ? <CalendarRangeIcon /> : <CalendarEventIcon />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePickerDrawerUI
