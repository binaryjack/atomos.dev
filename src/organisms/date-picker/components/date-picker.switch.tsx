import { DatePickerDisplayType } from '../core/date-picker.types'
import { useDatePickerContext } from './date-picker.context'

interface IDatePickerSwitch {
    day: React.ReactNode
    month: React.ReactNode
    year: React.ReactNode
    definedGridMode?: DatePickerDisplayType
}

/**
 * A functional component that renders different content based on the current grid mode.
 * The grid mode determines whether the day, month, or year is displayed.
 */
const DatePickerSwitch = ({ day, month, year, definedGridMode }: IDatePickerSwitch) => {
    const { gridMode } = useDatePickerContext()
    const _gridMode = definedGridMode ?? gridMode
    return (
        <>
            {_gridMode === 'DAY' && <>{day}</>}
            {_gridMode === 'YEAR' && <>{year}</>}
            {_gridMode === 'MONTH' && <>{month}</>}
        </>
    )
}

export default DatePickerSwitch
