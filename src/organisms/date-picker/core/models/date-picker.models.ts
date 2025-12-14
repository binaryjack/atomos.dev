import { IDateObject } from '../../utils/date-object'
import { DatePickerDisplayType } from '../date-picker.types'

export interface ICursorPosition {
  currentID: number
  x: number
  y: number
}

export interface IDatePickerItem {
  id: string
  date: IDateObject
  selected: boolean
  active: boolean
  isNextScope: boolean
  isPreviousScope: boolean
  isCurrentScope: boolean
  isRangeDays: boolean
  isWeekEnd: boolean
  isNow: boolean
  displayType: DatePickerDisplayType
}

export interface IDatePickerOptions {
  selected: boolean
  active: boolean
  isNextScope: boolean
  isPreviousScope: boolean
  isCurrentScope: boolean
  isRangeDays: boolean
  isWeekEnd: boolean
  isNow: boolean
  displayType: DatePickerDisplayType
}

export interface IDatePickerCell {
  id: number
  code: string | undefined
  ts: number
  item: IDatePickerItem | null
}

export interface IDatePickerRow {
  id: number
  cells: IDatePickerCell[]
}
