/**
 * DatePicker v3 - Main Export
 *
 * Standalone DatePicker component without FORMULAR dependencies.
 */

export { default as DatePickerV3, default } from './date-picker'

// Export types and enums
export type { DatePickerGridModeType, DatePickerSelectionModeType } from './core/date-picker.types'
export type { DatePickerProps } from './date-picker'
export { DateFormatsEnum } from './utils/date-utils'

// Export utilities (if needed)
export { cx, ifClass, newIFClass } from './utils/class-utils'
export { formatDate, fromINDate, parseDate, toINDate } from './utils/date-utils'

// Export hooks (if needed)
export { default as useKeyBindings } from './hooks/use-key-bindings'
export { useObjectRef } from './hooks/use-object-ref'

// Export Toggleable (if needed separately)
export { Toggleable } from './toggleable/toggleable'
export { useToggleableContext } from './toggleable/toggleable.context.hook'
