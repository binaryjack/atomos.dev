import { DateObject } from '../../utils/date-object'
import { IDatePickerCell, IDatePickerOptions } from '../models/date-picker.models'
import { newCell, newDatePickerItem } from '../models/date-picker.models.constructors'

/**
 * Creates a date picker cell with the specified parameters.
 *
 * @param day - The day of the month for the cell.
 * @param month - The month of the year for the cell (0-based, where 0 = January).
 * @param year - The year for the cell.
 * @param options - Partial options for configuring the date picker cell.
 * @param defineWeekEnds - Optional flag to determine if weekends should be identified.
 * @returns An object representing the date picker cell.
 */
export const createCell = (
  day: number,
  month: number,
  year: number,
  options: Partial<IDatePickerOptions>,
  defineWeekEnds?: boolean
): IDatePickerCell => {
  const key = `${month}${day}`
  const cDate = new Date(year, month, day)
  const isWeekEnd = defineWeekEnds ? [6, 0].includes(cDate.getDay()) : false
  const nowDate = new Date()?.toLocaleString(undefined, {
    dateStyle: 'short',
  })
  const currentCellDate = cDate.toLocaleDateString(undefined, {
    dateStyle: 'short',
  })

  const isNow = nowDate === currentCellDate

  const dateObjectInstance = new DateObject(cDate, key)
  const dpItem = newDatePickerItem(key, dateObjectInstance, { ...options, isWeekEnd, isNow })
  return newCell(day, dpItem)
}
