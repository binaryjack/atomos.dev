import { IDatePickerCell, IDatePickerRow } from '../core/models/date-picker.models'
import { Button } from '../internal-components/button'
import { ArrowLeftIcon, ArrowRightIcon } from '../internal-components/icons'
import { Portal } from '../internal-components/portal'
import DatePickerCell from './date-picker.cell'
import { useDatePickerContext } from './date-picker.context'

interface IDatePickerBodyMonthsProps {
  id: string
}

const DatePickerBodyMonths = ({ id }: IDatePickerBodyMonthsProps) => {
  const {
    gridData,
    updateSelectedCells,
    selectedCells,
    internalDate,
    updateInternalDate,
    updateGridMode,
    previous,
    next,
  } = useDatePickerContext()

  const handleMovePrevious = () => previous('MONTH')

  const handleMoveNext = () => next('MONTH')

  const handleDisplayInfos = (cell: IDatePickerCell) => {}

  const onSelectedCell = (cell: IDatePickerCell) => {
    updateSelectedCells([cell])

    if (cell.item?.date) {
      const newDate = new Date(
        internalDate.getFullYear(),
        cell.item.date.month,
        internalDate.getDate()
      )
      updateInternalDate(newDate)
      // Switch to day view after selecting month
      updateGridMode('DAY')
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
                gridDisplayMode="MONTH"
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

export default DatePickerBodyMonths
