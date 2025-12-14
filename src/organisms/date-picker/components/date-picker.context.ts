import { createContext, useContext } from 'react'

import {
    DatePickerDisplayType,
    DatePickerGridModeType,
    DatePickerSelectionModeType
} from '../core/date-picker.types'
import { IDatePickerCell, IDatePickerRow } from '../core/models/date-picker.models'

export interface IDatePickerContext {
    selectionMode: DatePickerSelectionModeType
    gridMode: DatePickerDisplayType
    internalDate: Date
    gridData: IDatePickerRow[]
    selectedCells: IDatePickerCell[]
    updateInternalDate: (date: Date) => void
    updateSelectedCells: (cells: IDatePickerCell[]) => void
    updateGridMode: (gridMode: DatePickerGridModeType) => void
    next: (forceGridMode?: DatePickerGridModeType) => void
    previous: (forceGridMode?: DatePickerGridModeType) => void
    jumpToNow: () => void
    jumpToSelection: () => void
    clear: () => void
    close: () => void
}

export const datePickerContextDefault: IDatePickerContext = {
    selectionMode: 'single',
    gridMode: 'DAY',
    internalDate: new Date(),
    gridData: [],
    selectedCells: [],
    updateInternalDate: () => {},
    updateSelectedCells: () => {},
    updateGridMode: () => {},
    next: () => {},
    previous: () => {},
    jumpToNow: () => {},
    jumpToSelection: () => {},
    clear: () => {},
    close: () => {}
}

const DatePickerContext = createContext<IDatePickerContext>(datePickerContextDefault)

const useDatePickerContext = (): IDatePickerContext => {
    return useContext(DatePickerContext)
}

export { DatePickerContext, useDatePickerContext }
