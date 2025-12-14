import { createCell } from '../constructors/create-cell'
import { IDatePickerCell, IDatePickerRow } from '../models/date-picker.models'
import { newCellsRow } from '../models/date-picker.models.constructors'

/**
 * Computes a grid of months for a date picker, organizing months into rows of three.
 *
 * @param date - The reference date used to determine the year and day for the grid.
 * @returns An array of rows, where each row contains cells representing months.
 *
 * Each cell in the grid represents a month and includes metadata such as whether
 * it belongs to the current scope (year). The grid is structured into 4 rows, with
 * each row containing 3 months (total 12 months):
 * Row 1: 1, 2, 3
 * Row 2: 4, 5, 6
 * Row 3: 7, 8, 9
 * Row 4: 10, 11, 12
 */
export const computeMonthsGrid = (date: Date) => {
  const output: IDatePickerRow[] = []
  let rowData: IDatePickerCell[] = []

  const currentYear = date.getFullYear()
  const currentDay = date.getDate()

  let rowNumber: number = 1
  for (let month = 0; month < 12; month++) {
    const cell = createCell(currentDay, month, currentYear, {
      isCurrentScope: true,
    })
    rowData.push(cell)

    // Push row every 3 months (or at the end)
    if ((month + 1) % 3 === 0 || month === 11) {
      const newRow = newCellsRow(rowNumber, rowData)
      output.push(newRow)
      rowData = []
      rowNumber++
    }
  }

  return output
}
