import { getTs } from '../../utils/date-object'
import { createCell } from '../constructors/create-cell'
import { IDatePickerCell } from '../models/date-picker.models'

/**
 * Computes a range of date picker cells between two selected dates.
 *
 * @param selection - An array of `IDatePickerCell` objects representing the selected dates.
 *                     The array should contain at least two elements: the start date and the end date.
 * @returns An array of `IDatePickerCell` objects representing the range of dates between the start and end dates.
 *          If the selection is invalid or the dates cannot be computed, an empty array is returned.
 */
export const computeRange = (selection: IDatePickerCell[]): IDatePickerCell[] => {
  const output: IDatePickerCell[] = []
  if (selection.length < 2) return output

  const startDateObject = selection[0]
  const endDateObject = selection[1]

  const _sd = startDateObject.item?.date.toDate?.()
  const _ed = endDateObject.item?.date.toDate?.()

  if (!_sd || !_ed) return output

  let newDate = new Date(_sd.getFullYear(), _sd.getMonth(), _sd.getDate())

  while (getTs(newDate) !== getTs(_ed)) {
    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1)
    const cell = createCell(newDate.getDate(), newDate.getMonth(), newDate.getFullYear(), {
      isRangeDays: true,
    })
    output.push(cell)
  }

  return output
}
