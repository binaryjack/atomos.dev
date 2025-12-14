import { createCell } from '../constructors/create-cell'
import { IDatePickerCell } from '../models/date-picker.models'

/**
 * Generates an array of date picker cells representing the remaining days
 * from the previous month to fill a calendar grid.
 *
 * @param remainingDays - The number of days needed from the previous month.
 * @param currentMonth - The current month (1-based, where January is 1 and December is 12).
 * @param year - The year of the current month.
 * @returns An array of `IDatePickerCell` objects representing the days from the previous month.
 *
 * The function calculates the last day of the previous month and iterates backward
 * to create date picker cells. It stops once the required number of days (`remainingDays`)
 * is reached. The resulting array is sorted by the `id` property of the cells in ascending order.
 */
export const getPreviousMonthDays = (remainingDays: number, currentMonth: number, year: number) => {
    const lastDay = new Date(year, currentMonth, 0).getDate()
    const output: IDatePickerCell[] = []
    if (remainingDays === 0) return output
    for (let i = lastDay; i > 0; i--) {
        const cell = createCell(i, currentMonth, year, {
            isPreviousScope: true
        })

        output.push(cell)
        if (output.length === remainingDays) {
            break
        }
    }
    return output.sort((a, b) => a.id - b.id)
}
