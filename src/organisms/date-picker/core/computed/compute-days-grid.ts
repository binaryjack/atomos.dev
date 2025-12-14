import { getCurrentMonthDays } from '../getters/get-current-month-days'
import { getNextMonthDays } from '../getters/get-next-month-days'
import { getPreviousMonthDays } from '../getters/get-previous-month-days'
import { IDatePickerRow } from '../models/date-picker.models'
import { newCellsRow } from '../models/date-picker.models.constructors'

/**
 * Computes a grid of days for a date picker, organized into rows of weeks.
 * The grid includes days from the previous month, the current month, and the next month
 * to ensure all weeks are fully populated.
 *
 * @param dte - The date for which the days grid is computed. The month and year of this date
 *              determine the current month in the grid.
 * @returns An array of rows, where each row represents a week and contains the days
 *          (including previous and next month's days) as part of the grid.
 */
export const computeDaysGrid = (dte: Date): IDatePickerRow[] => {
    const year = dte.getFullYear()
    const currentMonth = dte.getMonth()
    const daysArray = [1, 2, 3, 4, 5, 6, 0]

    const firstDay = new Date(year, currentMonth, 1).getDay()
    const nextMonthFirstDay = new Date(year, currentMonth + 1, 1).getDay()
    const output: IDatePickerRow[] = []

    // let's find out how many days previews the first day to complete a weekrow with previous month
    const previousDaysRemaining = daysArray.indexOf(firstDay)
    // let's find out how many days remains the last day to complete a weekrow with next months
    const nextMonthDaysRemaining = Math.abs(daysArray.indexOf(nextMonthFirstDay) - daysArray.length)
    // gets the previous month's days
    const previousDays = getPreviousMonthDays(previousDaysRemaining, currentMonth, year)
    // gets the month's days
    const currentDays = getCurrentMonthDays(currentMonth, year)
    // gets the next month's days
    const nextMonthDays = getNextMonthDays(nextMonthDaysRemaining, currentMonth, year)
    // build full grid data combining the three above collections
    const fullGridData = [...previousDays, ...currentDays, ...nextMonthDays]
    // split week rows
    for (let row = 1; row < 7; row++) {
        const weekDays = fullGridData.splice(0, 7)
        const newRow = newCellsRow(row, weekDays)
        output.push(newRow)
    }

    return output
}
