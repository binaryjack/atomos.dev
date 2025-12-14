/**
 * Local implementation of DateObject to replace formular.dev.lib dependency
 */

export interface IDateObject {
  day: number
  month: number
  year: number
  key: string
  toDate: () => Date
  toString: () => string
}

export class DateObject implements IDateObject {
  day: number
  month: number
  year: number
  key: string

  constructor(date: Date, key: string) {
    this.day = date.getDate()
    this.month = date.getMonth()
    this.year = date.getFullYear()
    this.key = key
  }

  toDate(): Date {
    return new Date(this.year, this.month, this.day)
  }

  toString(): string {
    return `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`
  }
}

/**
 * Get timestamp from a date (set to midnight UTC)
 */
export const getTs = (date: Date): number => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return d.getTime()
}
