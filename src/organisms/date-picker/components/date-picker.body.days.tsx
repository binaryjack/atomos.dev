import { computeRange } from '../core/computed/compute-range'
import { IDatePickerCell, IDatePickerRow } from '../core/models/date-picker.models'
import { Button } from '../internal-components/button'
import { ArrowLeftIcon, ArrowRightIcon } from '../internal-components/icons'
import { Portal } from '../internal-components/portal'
import DatePickerCell from './date-picker.cell'
import { useDatePickerContext } from './date-picker.context'

interface IDatePickerBodyDaysProps {
  id: string
}

const DatePickerBodyDays = ({ id }: IDatePickerBodyDaysProps) => {
  const {
    gridData,
    updateSelectedCells,
    selectedCells,
    selectionMode,
    internalDate,
    updateInternalDate,
    next,
    previous,
    close,
  } = useDatePickerContext()

  const handleDisplayInfos = (cell: IDatePickerCell) => {}

  const handleMovePrevious = () => previous('MONTH')

  const handleMoveNext = () => next('MONTH')

  const onSelectedCell = (cell: IDatePickerCell) => {
    if (cell.item?.isNextScope) {
      if (!internalDate) return
      next('MONTH')
      return
    }
    if (cell.item?.isPreviousScope) {
      if (!internalDate) return
      previous('MONTH')
      return
    }

    if (selectionMode === 'single' || selectedCells.length > 1) {
      updateSelectedCells([cell])
      if (cell.item?.date) {
        const newDate = new Date(
          internalDate.getFullYear(),
          internalDate.getMonth(),
          cell.item.date.day
        )
        updateInternalDate(newDate)
      }
      // Close drawer after single selection
      if (selectionMode === 'single') {
        close()
      }
      return
    }

    let newSelection: IDatePickerCell[] = []
    newSelection = [...selectedCells, cell].sort((a, b) => a.ts - b.ts)
    newSelection.push(...computeRange(newSelection))
    updateSelectedCells(newSelection.sort((a, b) => a.ts - b.ts))
  }

  return (
    <div className="date-picker-body-container">
      <div className="date-picker-body-wrapper">
        {gridData.map((dateRow: IDatePickerRow) => (
          <div key={dateRow.id} className="date-picker-body-row">
            {dateRow.cells.map((dateCell) => (
              <DatePickerCell
                key={dateCell.code}
                gridDisplayMode="DAY"
                selectedCells={selectedCells}
                onMouseEnter={handleDisplayInfos}
                onSelected={onSelectedCell}
                item={dateCell}
              />
            ))}
          </div>
        ))}
      </div>
      <Portal id={id} slotName="previous">
        <Button id="dp-previous" title="previous (<=)" onClick={handleMovePrevious}>
          <ArrowLeftIcon />
        </Button>
      </Portal>
      <Portal id={id} slotName="next">
        <Button id="dp-next" title="next (=>)" onClick={handleMoveNext}>
          <ArrowRightIcon />
        </Button>
      </Portal>
    </div>
  )
}

export default DatePickerBodyDays
