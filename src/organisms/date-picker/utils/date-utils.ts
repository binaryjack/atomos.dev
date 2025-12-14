/**
 * Date utilities for DatePicker_v3.
 * Simplified date formatting and parsing.
 */

export enum DateFormatsEnum {
  DD_MM_YYYY = 'dd/MM/yyyy',
  MM_DD_YYYY = 'MM/dd/yyyy',
  YYYY_MM_DD = 'yyyy/MM/dd',
  DD_MM_YYYY_DASH = 'dd-MM-yyyy',
  MM_DD_YYYY_DASH = 'MM-dd-yyyy',
  YYYY_MM_DD_DASH = 'yyyy-MM-dd',
}

export interface INDate {
  day: number
  month: number
  year: number
}

export const formatDate = (
  date: Date | INDate | undefined,
  format: DateFormatsEnum | string = DateFormatsEnum.DD_MM_YYYY,
  separator?: string
): string => {
  if (!date) return ''

  let day: number, month: number, year: number

  if (date instanceof Date) {
    // Check for invalid date
    if (isNaN(date.getTime())) return ''

    day = date.getDate()
    month = date.getMonth() + 1
    year = date.getFullYear()
  } else if ('day' in date && 'month' in date && 'year' in date) {
    day = date.day
    month = date.month + 1
    year = date.year
  } else {
    return ''
  }

  // Check for NaN values
  if (isNaN(day) || isNaN(month) || isNaN(year)) return ''

  const dd = day.toString().padStart(2, '0')
  const MM = month.toString().padStart(2, '0')
  const yyyy = year.toString()

  // Replace format placeholders
  let result = format
    .replace('dd', dd)
    .replace('DD', dd)
    .replace('MM', MM)
    .replace('yyyy', yyyy)
    .replace('YYYY', yyyy)

  // Only apply custom separator if explicitly provided
  if (separator !== undefined) {
    const formatHasSlash = format.includes('/')
    const formatHasDash = format.includes('-')

    if (formatHasSlash) {
      result = result.replace(/\//g, separator)
    } else if (formatHasDash) {
      result = result.replace(/-/g, separator)
    }
  }

  return result
}

export const parseDate = (
  dateString: string,
  format: DateFormatsEnum | string = DateFormatsEnum.DD_MM_YYYY
): Date | null => {
  if (!dateString) return null

  const separator = format.includes('/') ? '/' : format.includes('-') ? '-' : ' '
  const parts = dateString.split(separator)
  const formatParts = format.split(separator)

  if (parts.length !== formatParts.length) return null

  let day = 1,
    month = 0,
    year = new Date().getFullYear()

  formatParts.forEach((part, index) => {
    const value = parseInt(parts[index], 10)
    if (isNaN(value)) return

    if (part.toLowerCase().includes('d')) day = value
    else if (part.toLowerCase().includes('m')) month = value - 1
    else if (part.toLowerCase().includes('y')) year = value
  })

  const date = new Date(year, month, day)
  return isNaN(date.getTime()) ? null : date
}

export const toINDate = (date: Date): INDate => ({
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
})

export const fromINDate = (inDate: INDate): Date => {
  return new Date(inDate.year, inDate.month, inDate.day)
}
