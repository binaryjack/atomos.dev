/**
 * DatePicker v3 - Usage Examples
 *
 * This file demonstrates various usage patterns for the standalone DatePicker component.
 */

import React, { useState } from 'react'
import DatePickerV3, { DateFormatsEnum } from './date-picker'
import './date-picker.css'

// Example 1: Basic uncontrolled
export function BasicExample() {
    return (
        <div>
            <h3>Basic Date Picker</h3>
            <DatePickerV3 id="basic-picker" onChange={(date) => console.log('Selected:', date)} />
        </div>
    )
}

// Example 2: Controlled mode
export function ControlledExample() {
    const [selectedDate, setSelectedDate] = useState<Date>()

    return (
        <div>
            <h3>Controlled Date Picker</h3>
            <DatePickerV3
                id="controlled-picker"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholder="Pick a date"
            />
            {selectedDate && <p>Selected: {selectedDate.toLocaleDateString()}</p>}
        </div>
    )
}

// Example 3: Range selection
export function RangeExample() {
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    return (
        <div>
            <h3>Range Date Picker</h3>
            <DatePickerV3
                id="range-picker"
                defaultSelectionMode="range"
                onChange={(start, end) => {
                    setStartDate(start)
                    setEndDate(end)
                }}
                showFooter={true}
            />
            {startDate && (
                <p>
                    Range: {startDate.toLocaleDateString()}
                    {endDate && ` - ${endDate.toLocaleDateString()}`}
                </p>
            )}
        </div>
    )
}

// Example 4: Custom format (European)
export function EuropeanFormatExample() {
    return (
        <div>
            <h3>European Format (DD/MM/YYYY)</h3>
            <DatePickerV3
                id="european-picker"
                displayFormat={DateFormatsEnum.DD_MM_YYYY}
                dataFormat={DateFormatsEnum.YYYY_MM_DD}
                separator="/"
                onChange={(date) => console.log('Date:', date)}
            />
        </div>
    )
}

// Example 5: US Format
export function USFormatExample() {
    return (
        <div>
            <h3>US Format (MM/DD/YYYY)</h3>
            <DatePickerV3
                id="us-picker"
                displayFormat={DateFormatsEnum.MM_DD_YYYY}
                separator="/"
                onChange={(date) => console.log('Date:', date)}
            />
        </div>
    )
}

// Example 6: With default value
export function DefaultValueExample() {
    const today = new Date()

    return (
        <div>
            <h3>With Default Value (Today)</h3>
            <DatePickerV3
                id="default-picker"
                defaultValue={today}
                onChange={(date) => console.log('Changed to:', date)}
            />
        </div>
    )
}

// Example 7: Disabled
export function DisabledExample() {
    return (
        <div>
            <h3>Disabled Date Picker</h3>
            <DatePickerV3 id="disabled-picker" disabled={true} defaultValue={new Date()} />
        </div>
    )
}

// Example 8: Custom size
export function CustomSizeExample() {
    return (
        <div>
            <h3>Custom Drawer Size</h3>
            <DatePickerV3
                id="custom-size-picker"
                drawerWidth="400px"
                drawerHeight="450px"
                showFooter={true}
                onChange={(date) => console.log('Date:', date)}
            />
        </div>
    )
}

// Example 9: Form integration
export function FormExample() {
    const [formData, setFormData] = useState({
        startDate: undefined as Date | undefined,
        endDate: undefined as Date | undefined
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert(
            `Dates: ${formData.startDate?.toLocaleDateString()} - ${formData.endDate?.toLocaleDateString()}`
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Form Integration</h3>
            <div style={{ marginBottom: '1rem' }}>
                <label>Start Date:</label>
                <DatePickerV3
                    id="form-start-date"
                    value={formData.startDate}
                    onChange={(date) => setFormData({ ...formData, startDate: date })}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>End Date:</label>
                <DatePickerV3
                    id="form-end-date"
                    value={formData.endDate}
                    onChange={(date) => setFormData({ ...formData, endDate: date })}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

// All examples in one demo
export default function DatePickerExamples() {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px' }}>
            <h1>DatePicker v3 Examples</h1>

            <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
                <BasicExample />
                <ControlledExample />
                <RangeExample />
                <EuropeanFormatExample />
                <USFormatExample />
                <DefaultValueExample />
                <DisabledExample />
                <CustomSizeExample />
                <FormExample />
            </div>
        </div>
    )
}
