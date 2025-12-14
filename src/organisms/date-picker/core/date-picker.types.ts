import { DateFormatsEnum } from '../utils/date-utils'

// Utility type to extract values from enum
type ValueOfType<T> = T[keyof T]

/**
 * Explanation:
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        \2: Ensures the same separator is used.
        (\d{4}): Matches a 4-digit year.
 */
export const ddMMYYYYRegex = /^([0-2][0-9]|3[0-1])([-/])([0][1-9]|1[0-2])\2(\d{4})$/

/**Explanation:
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
        \2: Ensures the same separator is used.
        (\d{4}): Matches a 4-digit year.
 */
export const MMddYYYYRegex = /^([0][1-9]|1[0-2])([-/])([0-2][0-9]|3[0-1])\2(\d{4})$/

/**
 * Explanation:
        (\d{4}): Matches a 4-digit year.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        \2: Ensures the same separator is used.
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
 */
export const yyyyMMDDRegex = /^(\d{4})([-/])([0][1-9]|1[0-2])\2([0-2][0-9]|3[0-1])$/

export type DatePickerFormatType = ValueOfType<DateFormatsEnum>
export const DatePickerFormatArray: string[] = Object.values(DateFormatsEnum)
/** indicates  */
export type DatePickerGridModeType = 'YEAR' | 'MONTH' | 'DAY'
export type DatePickerDisplayType = 'DAY' | 'MONTH' | 'YEAR'

export type DatePickerSelectionModeType = 'range' | 'single'
