import { createCell } from '../constructors/create-cell'
import { IDatePickerCell } from '../models/date-picker.models'

/**
 * Generates an array of date picker cells representing the days of the next month.
 *
 * @param remainingDays - The number of days remaining to fill in the current month's calendar view.
 * @param currentMonth - The current month (0-based, where 0 = January, 11 = December).
 * @param year - The year for which the next month's days are being calculated.
 * @returns An array of `IDatePickerCell` objects representing the days of the next month.
 */
export const getNextMonthDays = (remainingDays: number, currentMonth: number, year: number) => {
    const output: IDatePickerCell[] = []
    for (let i = 1; i <= remainingDays + 14; i++) {
        const cell = createCell(i, currentMonth + 1, year, {
            isNextScope: true
        })
        output.push(cell)
        // const cDate = new Date(year, nextMonth, i)
        // output.push(newCell(i, `${nextMonth + 1}-${i}`, cDate.getDay(), null))
    }
    return output
}
