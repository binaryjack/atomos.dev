import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import DatePickerV3, { DateFormatsEnum } from '../src/organisms/date-picker'

const meta = {
  title: 'Organisms/DatePicker',
  component: DatePickerV3,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## DatePicker Component

A comprehensive, framework-agnostic date picker component with:
- **Day, Month, and Year views** - Navigate through dates with different granularities
- **Single or Range selection** - Select individual dates or date ranges
- **Customizable formats** - Display and data formats with custom separators
- **Keyboard navigation** - Full keyboard support with arrow keys and shortcuts
- **Toggleable drawer** - Clean dropdown interface
- **No dependencies** - Pure React component, no form integration required

The component is fully self-contained with all utilities and hooks included.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePickerV3>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic DatePicker
 * Simple date selection with default settings
 */
export const Basic: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()

    return (
      <div className="w-[400px] p-8 bg-gray-900 rounded-lg">
        <h3 className="text-white mb-4">Select a Date</h3>
        <DatePickerV3
          id="basic-date-picker"
          placeholder="Choose a date..."
          onChange={(selectedDate) => {
            setDate(selectedDate)
            console.log('Selected date:', selectedDate)
          }}
        />
        {date && (
          <p className="mt-4 text-sm text-gray-400">Selected: {date.toLocaleDateString()}</p>
        )}
      </div>
    )
  },
}

/**
 * With Custom Format
 * Different display and data formats
 */
export const CustomFormats: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()

    return (
      <div className="w-[400px] p-8 bg-gray-900 rounded-lg">
        <h3 className="text-white mb-4">US Date Format (MM/DD/YYYY)</h3>
        <DatePickerV3
          id="format-date-picker"
          displayFormat={DateFormatsEnum.MM_DD_YYYY}
          dataFormat={DateFormatsEnum.YYYY_MM_DD}
          separator="/"
          placeholder="MM/DD/YYYY"
          onChange={(selectedDate) => {
            setDate(selectedDate)
            console.log('Selected date (YYYY-MM-DD):', selectedDate)
          }}
        />
        {date && (
          <div className="mt-4 text-sm text-gray-400">
            <p>Display: {date.toLocaleDateString('en-US')}</p>
            <p>Data: {date.toISOString().split('T')[0]}</p>
          </div>
        )}
      </div>
    )
  },
}

/**
 * Range Selection
 * Select a date range instead of a single date
 */
export const RangeSelection: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    return (
      <div className="w-[400px] p-8 bg-gray-900 rounded-lg">
        <h3 className="text-white mb-4">Select Date Range</h3>
        <DatePickerV3
          id="range-date-picker"
          defaultSelectionMode="range"
          placeholder="Select start and end dates..."
          onChange={(start, end) => {
            setStartDate(start)
            setEndDate(end)
            console.log('Range:', { start, end })
          }}
        />
        {startDate && endDate && (
          <div className="mt-4 text-sm text-gray-400">
            <p>From: {startDate.toLocaleDateString()}</p>
            <p>To: {endDate.toLocaleDateString()}</p>
            <p className="mt-2 font-semibold">
              Duration:{' '}
              {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
        )}
      </div>
    )
  },
}

/**
 * Controlled Component
 * Programmatically control the selected date
 */
export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date())

    const setToday = () => setDate(new Date())
    const setNextWeek = () => {
      const next = new Date()
      next.setDate(next.getDate() + 7)
      setDate(next)
    }
    const setNextMonth = () => {
      const next = new Date()
      next.setMonth(next.getMonth() + 1)
      setDate(next)
    }

    return (
      <div className="w-[400px] p-8 bg-gray-900 rounded-lg">
        <h3 className="text-white mb-4">Controlled DatePicker</h3>
        <DatePickerV3
          id="controlled-date-picker"
          value={date}
          onChange={(selectedDate) => {
            if (selectedDate) setDate(selectedDate)
          }}
        />
        <div className="mt-4 flex gap-2">
          <button
            onClick={setToday}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Today
          </button>
          <button
            onClick={setNextWeek}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            +1 Week
          </button>
          <button
            onClick={setNextMonth}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            +1 Month
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">Selected: {date.toLocaleDateString()}</p>
      </div>
    )
  },
}

/**
 * With Custom Drawer Size
 * Adjust the size of the date picker dropdown
 */
export const CustomSize: Story = {
  render: () => {
    return (
      <div className="w-[500px] p-8 bg-gray-900 rounded-lg">
        <h3 className="text-white mb-4">Large DatePicker</h3>
        <DatePickerV3
          id="large-date-picker"
          drawerWidth="400px"
          drawerHeight="450px"
          placeholder="Select a date..."
          showFooter={true}
        />
      </div>
    )
  },
}

/**
 * With Clear Button
 * Allow users to clear the selected date
 */
export const WithClearButton: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()
    const [cleared, setCleared] = useState(false)

    return (
      <div className="w-[400px] p-8 bg-gray-900 rounded-lg">
        <h3 className="text-white mb-4">DatePicker with Clear</h3>
        <DatePickerV3
          id="clearable-date-picker"
          value={date}
          onChange={(selectedDate) => {
            setDate(selectedDate)
            setCleared(false)
          }}
          onClear={() => {
            setDate(undefined)
            setCleared(true)
            console.log('Date cleared')
          }}
        />
        {cleared && <p className="mt-4 text-sm text-yellow-400">Date was cleared!</p>}
        {date && !cleared && (
          <p className="mt-4 text-sm text-gray-400">Selected: {date.toLocaleDateString()}</p>
        )}
      </div>
    )
  },
}
