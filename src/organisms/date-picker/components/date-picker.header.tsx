import { Button } from '../internal-components/button'
import {
    CalendarCancelIcon,
    CalendarIcon,
    CalendarSearchIcon,
    ClearIcon
} from '../internal-components/icons'
import { PortalSlot } from '../internal-components/portal'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { useDatePickerContext } from './date-picker.context'
import DatePickerSwitch from './date-picker.switch'

interface IDatePickerDrawerHeaderProps {
    id: string
}

/**
 * The `DatePickerDrawerHeader` component renders the header section of a date picker drawer.
 */
const DatePickerDrawerHeader = ({ id }: IDatePickerDrawerHeaderProps) => {
    const {
        internalDate,
        updateGridMode,
        jumpToNow,
        jumpToSelection,
        selectedCells,
        clear,
        close
    } = useDatePickerContext()

    const { toggleState } = useToggleableContext()

    const yearSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        updateGridMode('YEAR')
    }

    const monthSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        updateGridMode('MONTH')
    }

    const daySelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        updateGridMode('DAY')
    }

    return (
        <div className="date-picker-header">
            <div className="date-picker-header-top">
                <div className="selected">
                    <Button
                        disabled={selectedCells.length === 0}
                        id="dp-selected"
                        title="go to selected (s)"
                        onClick={jumpToSelection}
                    >
                        <span className="mr-1">Selected</span>
                        <CalendarSearchIcon />
                    </Button>
                </div>

                <div className="ml-1 now">
                    <Button id="dp-now" title="go to now (n)" onClick={jumpToNow}>
                        <span className="mr-1">Now</span>
                        <CalendarIcon />
                    </Button>
                </div>
                <div className="ml-1 clear">
                    <Button
                        disabled={selectedCells.length === 0}
                        id="dp-clear"
                        title="clear selection (c)"
                        onClick={clear}
                    >
                        <CalendarCancelIcon />
                    </Button>
                </div>
                <div className="ml-1 close">
                    <Button id="dp-close" title="close (Escape)" onClick={close}>
                        <ClearIcon />
                    </Button>
                </div>
            </div>
            <div className="date-picker-header-separator" />
            <div className="date-picker-header-bottom">
                <PortalSlot slotName="previous" />

                <div className="date-picker-date-parts">
                    <div className="year">
                        <Button id="dp-year" title="year selection (y)" onClick={yearSelection}>
                            {internalDate?.getFullYear()}
                        </Button>
                    </div>
                    <div className="month mx-1">
                        <Button id="dp-month" title="month selection (m)" onClick={monthSelection}>
                            {(internalDate?.getMonth() || internalDate?.getMonth() === 0
                                ? internalDate?.getMonth() + 1
                                : 0
                            )
                                ?.toString()
                                ?.padStart(2, '0')}
                        </Button>
                    </div>
                    <div className="day">
                        <Button id="dp-day" title="day selection (d)" onClick={daySelection}>
                            {internalDate?.getDate?.()?.toString()?.padStart(2, '0')}
                        </Button>
                    </div>
                </div>
                <PortalSlot slotName="next" />
            </div>
            <div className="date-picker-header-grid-mode">
                <DatePickerSwitch
                    day={
                        <>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                            <div>Sun</div>
                        </>
                    }
                    month={<div>Month</div>}
                    year={<div>Years</div>}
                />
            </div>
        </div>
    )
}

export default DatePickerDrawerHeader
