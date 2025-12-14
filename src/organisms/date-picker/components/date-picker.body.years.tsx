import { IDatePickerCell, IDatePickerRow } from '../core/models/date-picker.models'
import { Button } from '../internal-components/button'
import { ArrowLeftIcon, ArrowRightIcon } from '../internal-components/icons'
import { Portal } from '../internal-components/portal'
import DatePickerCell from './date-picker.cell'
import { useDatePickerContext } from './date-picker.context'

interface IDatePickerBodyYearsProps {
  id: string
}

const DatePickerBodyYears = ({ id }: IDatePickerBodyYearsProps) => {
  const {
    gridData,
    updateSelectedCells,
    selectedCells,
    internalDate,
    updateInternalDate,
    updateGridMode,
    next,
    previous,
  } = useDatePickerContext()

  const handleDisplayInfos = (cell: IDatePickerCell) => {}

  const handleMovePrevious = () => previous()

  const handleMoveNext = () => next()

  const onSelectedCell = (cell: IDatePickerCell) => {
    if (cell.item?.isNextScope) {
      if (!internalDate) return
      next()
      return
    }
    if (cell.item?.isPreviousScope) {
      if (!internalDate) return
      previous()
      return
    }
    updateSelectedCells([cell])
    if (cell.item?.date) {
      const newDate = new Date(cell.item.date.year, internalDate.getMonth(), internalDate.getDate())
      updateInternalDate(newDate)
      // Switch to month view after selecting year
      updateGridMode('MONTH')
    }
  }

  return (
    <div className="date-picker-body-container">
      <div className="date-picker-body-wrapper">
        {gridData.map((dateRow: IDatePickerRow) => (
          <div key={dateRow.id} className="date-picker-body-row">
            {dateRow.cells.map((dateCell) => (
              <DatePickerCell
                key={dateCell.code}
                gridDisplayMode="YEAR"
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

export default DatePickerBodyYears
