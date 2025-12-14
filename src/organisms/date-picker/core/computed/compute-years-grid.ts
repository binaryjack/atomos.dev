import { createCell } from '../constructors/create-cell'
import { IDatePickerCell, IDatePickerRow } from '../models/date-picker.models'
import { newCellsRow } from '../models/date-picker.models.constructors'

/**
 * Computes a grid of years centered around the given date's year.
 * The grid includes the current year, a range of previous years, and a range of next years.
 * The years are organized into rows, each containing a fixed number of columns.
 *
 * @param date - The reference date used to determine the current year.
 * @returns An array of rows, where each row contains cells representing years.
 *          Each cell includes metadata indicating whether the year belongs to the
 *          previous, current, or next scope.
 */
export const computeYearsGrid = (date: Date) => {
    let previousYears: number[] = []
    let nextYears: number[] = []

    const currentMonth = date.getMonth()
    const currentDay = date.getDate()
    const currentYear = date.getFullYear()
    for (let p = currentYear - 1; p > currentYear - 13; p--) {
        previousYears.push(p)
    }
    for (let n = currentYear + 1; n < currentYear + 13; n++) {
        nextYears.push(n)
    }

    previousYears = previousYears.sort((a, b) => a - b)
    nextYears = nextYears.sort((a, b) => a - b)

    const allYears = [...previousYears, currentYear, ...nextYears].sort((a, b) => a - b)

    const output: IDatePickerRow[] = []
    let rowData: IDatePickerCell[] = []
    let colNumber: number = 0
    let rowNumber: number = 0
    for (const y of allYears) {
        colNumber++
        const cell = createCell(currentDay, currentMonth, y, {
            isPreviousScope: previousYears[0] === y,
            isCurrentScope: y === currentYear,
            isNextScope: nextYears[nextYears.length - 1] === y
        })
        rowData.push(cell)
        if (colNumber === 5) {
            rowNumber++
            colNumber = 0
            const newRow = newCellsRow(rowNumber, rowData)
            rowData = []
            output.push(newRow)
        }
    }

    return output
}
