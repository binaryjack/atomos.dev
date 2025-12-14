import { createCell } from '../constructors/create-cell'
import { IDatePickerCell } from '../models/date-picker.models'

/**
 * Generates an array of date picker cells representing all the days in a given month and year.
 *
 * @param month - The zero-based month index (0 for January, 11 for December).
 * @param year - The full year (e.g., 2023).
 * @returns An array of `IDatePickerCell` objects, each representing a day in the specified month.
 *
 * @remarks
 * - The function calculates the number of days in the specified month and year.
 * - Each day is represented as an `IDatePickerCell` object created using the `createCell` function.
 * - The `isCurrentScope` property of each cell is set to `true`.
 */
export const getCurrentMonthDays = (month: number, year: number) => {
    //If you provide 0 as the dayValue in Date.setFullYear you get the last day of the previous month:
    const lastDay = new Date(year, month + 1, 0).getDate()
    const output: IDatePickerCell[] = []
    for (let i = 1; i < lastDay + 1; i++) {
        const cell = createCell(
            i,
            month,
            year,
            {
                isCurrentScope: true
            },
            true
        )
        output.push(cell)
        // const cDate = new Date(year, month, i)
        // output.push(newCell(i, `${month + 1}-${i}`, cDate.getDay(), null))
    }
    return output
}
