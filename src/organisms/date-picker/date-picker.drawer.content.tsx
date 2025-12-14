import { useCallback, useEffect, useState } from 'react'

import { DatePickerContext, IDatePickerContext } from './components/date-picker.context'
import DatePickerDrawerUI from './components/date-picker.drawer.content.ui'
import { computeDaysGrid } from './core/computed/compute-days-grid'
import { computeMonthsGrid } from './core/computed/compute-months-grid'
import { computeYearsGrid } from './core/computed/compute-years-grid'
import { createCell } from './core/constructors/create-cell'
import { DatePickerGridModeType, DatePickerSelectionModeType } from './core/date-picker.types'
import { getNextDate } from './core/getters/get-next-date'
import { getPreviousDate } from './core/getters/get-previous-date'
import { IDatePickerCell, IDatePickerRow } from './core/models/date-picker.models'
import useKeyBindings from './hooks/use-key-bindings'
import { useToggleableContext } from './toggleable/toggleable.context.hook'
import { DateFormatsEnum, parseDate } from './utils/date-utils'

interface IDatePickerDrawerProps {
  id: string
  separator?: string
  defaultDate?: Date | string
  dataFormat?: DateFormatsEnum
  displayFormat?: DateFormatsEnum
  onSelectDate: (startDate?: Date, endDate?: Date) => void
  onClearField?: () => void
  defaultSelectionMode?: DatePickerSelectionModeType
  defaultGridMode?: DatePickerGridModeType
  showFooter?: boolean
  width?: string
  height?: string
}

/**
 * The `DatePickerContentDrawer` component provides a date picker interface.
 * It allows users to select dates, navigate through different grid modes (day, month, year),
 * and manage date selections.
 */
const DatePickerContentDrawer = ({
  id,
  defaultDate,
  onSelectDate,
  onClearField,
  showFooter,
  separator = '-',
  dataFormat = DateFormatsEnum.YYYY_MM_DD,
  displayFormat = DateFormatsEnum.DD_MM_YYYY,
  defaultSelectionMode = 'single',
  defaultGridMode = 'DAY',
  width = '100%',
  height = '100%',
}: IDatePickerDrawerProps) => {
  const [gridMode, setGridMode] = useState<DatePickerGridModeType>(defaultGridMode)
  const [gridData, setGridData] = useState<IDatePickerRow[]>([])
  const [selection, setSelection] = useState<IDatePickerCell[]>([])
  const [internalDate, setInternalDate] = useState<Date>()

  const { setToggleState } = useToggleableContext()

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const jumpToNow = () => {
    setInternalDate(new Date())
  }

  const jumpToSelection = () => {
    if (selection.length === 0) return
    const selectedDate = selection[0].item?.date
    if (selectedDate) {
      setInternalDate(new Date(selectedDate.year, selectedDate.month, selectedDate.day))
    }
  }

  const moveNextGetDate = (forceGridMode?: DatePickerGridModeType): Date =>
    getNextDate(forceGridMode ?? gridMode, internalDate ?? new Date())

  const moveNext = (forceGridMode?: DatePickerGridModeType) => {
    setInternalDate(moveNextGetDate(forceGridMode))
  }

  const movePreviousGetDate = (forceGridMode?: DatePickerGridModeType) =>
    getPreviousDate(forceGridMode ?? gridMode, internalDate ?? new Date())

  const movePrevious = (forceGridMode?: DatePickerGridModeType) => {
    setInternalDate(movePreviousGetDate(forceGridMode))
  }

  const setSelectedCellFromDate = useCallback((date?: Date) => {
    if (!date) return
    const cell = createCell(date.getDate(), date.getMonth(), date.getFullYear(), {
      selected: true,
    })
    setSelection([cell])
  }, [])

  const handleSelectionChange = useCallback(
    (cells: IDatePickerCell[]) => {
      setSelection(cells)

      // Call onSelectDate SYNCHRONOUSLY when selection changes (before component might unmount)
      if (cells.length > 0) {
        const startDate = cells[0].item?.date
        const endDate = cells.length > 1 ? cells[cells.length - 1].item?.date : undefined

        const startDateObj = startDate
          ? new Date(startDate.year, startDate.month, startDate.day)
          : undefined
        const endDateObj = endDate ? new Date(endDate.year, endDate.month, endDate.day) : undefined

        // MUST call synchronously - if we close() the drawer, component unmounts and callback is lost
        onSelectDate(startDateObj, endDateObj)
      }
    },
    [onSelectDate]
  )

  const updateGrid = useCallback(() => {
    if (!internalDate) return

    switch (gridMode) {
      case 'MONTH':
        setGridData(computeMonthsGrid(internalDate))
        break
      case 'YEAR':
        setGridData(computeYearsGrid(internalDate))
        break
      case 'DAY':
      default:
        setGridData(computeDaysGrid(internalDate))
        break
    }
  }, [internalDate, gridMode])

  // Initialize internal date ONCE on mount
  useEffect(() => {
    let defaultDateTemp: Date | null = null

    if (!defaultDate) {
      defaultDateTemp = new Date()
    } else if (defaultDate instanceof Date) {
      defaultDateTemp = defaultDate
    } else if (typeof defaultDate === 'string') {
      defaultDateTemp = parseDate(defaultDate, displayFormat)
      if (!defaultDateTemp) {
        console.error('Provided default date is not suitable')
        defaultDateTemp = new Date()
      }
    }

    if (defaultDateTemp) {
      setInternalDate(defaultDateTemp)
      setSelectedCellFromDate(defaultDateTemp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run ONLY on mount

  useEffect(() => {
    updateGrid()
  }, [internalDate, gridMode, updateGrid])

  // Note: onSelectDate is now called synchronously in handleSelectionChange
  // to avoid issues with unmounting before the effect runs

  const { handleKeyDown } = useKeyBindings({
    onEscapeCallback: () => {
      setToggleState('closed')
    },
    onArrowLeftCallback: () => {
      const dteTemp = movePreviousGetDate()
      setInternalDate(dteTemp)
      setSelectedCellFromDate(dteTemp)
    },
    onArrowRightCallback: () => {
      const dteTemp = moveNextGetDate()
      setInternalDate(dteTemp)
      setSelectedCellFromDate(dteTemp)
    },
    onKeyCallback(e) {
      if (e.ctrlKey && e.key === 'Enter') {
        setToggleState('closed')
      }
      if (['y', 'Y'].includes(e.key)) {
        setGridMode('YEAR')
      }
      if (['m', 'M'].includes(e.key)) {
        setGridMode('MONTH')
      }
      if (['d', 'D'].includes(e.key)) {
        setGridMode('DAY')
      }
      if (['n', 'N'].includes(e.key)) {
        jumpToNow()
      }
      if (['s', 'S'].includes(e.key)) {
        jumpToSelection()
      }
    },
  })

  const datePickerContextDefault: IDatePickerContext = {
    selectionMode: defaultSelectionMode,
    gridMode: gridMode,
    internalDate: internalDate ?? new Date(),
    gridData: gridData,
    selectedCells: selection,
    next: moveNext,
    previous: movePrevious,
    jumpToNow: jumpToNow,
    jumpToSelection: jumpToSelection,
    updateInternalDate: (newDate: Date) => setInternalDate(newDate),
    updateSelectedCells: (cells: IDatePickerCell[]) => handleSelectionChange(cells),
    updateGridMode: (gridMode: DatePickerGridModeType) => setGridMode(gridMode),
    clear: () => {
      setSelection([])
      onClearField?.()
    },
    close: () => {
      setToggleState('closed')
    },
  }

  return (
    <DatePickerContext.Provider value={datePickerContextDefault}>
      <DatePickerDrawerUI
        id={id}
        defaultSelectionMode={defaultSelectionMode}
        showFooter={showFooter}
        onClick={handleOnClick}
        width={width}
        height={height}
        handleKeyDown={handleKeyDown}
      />
    </DatePickerContext.Provider>
  )
}

export default DatePickerContentDrawer
