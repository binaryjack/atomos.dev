import { createCell } from '../constructors/create-cell'
import { IDatePickerCell, IDatePickerRow } from '../models/date-picker.models'
import { newCellsRow } from '../models/date-picker.models.constructors'

/**
 * Computes a grid of months for a date picker, organizing months into rows of four.
 *
 * @param date - The reference date used to determine the year and day for the grid.
 * @returns An array of rows, where each row contains cells representing months.
 *
 * Each cell in the grid represents a month and includes metadata such as whether
 * it belongs to the current scope (year). The grid is structured into rows, with
 * each row containing four months.
 */
export const computeMonthsGrid = (date: Date) => {
    const output: IDatePickerRow[] = []
    let rowData: IDatePickerCell[] = []

    const currentYear = date.getFullYear()
    const currentDay = date.getDate()

    let colNumber: number = 1
    let rowNumber: number = 1
    for (let month = 0; month < 12; month++) {
        const cell = createCell(currentDay, month, currentYear, {
            isCurrentScope: true
        })
        rowData.push(cell)
        if (colNumber === 4) {
            colNumber = 0
            const newRow = newCellsRow(rowNumber, rowData)
            rowData = []
            output.push(newRow)
            rowNumber++
        }
        colNumber++
    }
    return output
}
