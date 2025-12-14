import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TimePicker } from './time-picker'

const meta: Meta<typeof TimePicker> = {
  title: 'Organisms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'select',
      options: ['24h', '12h'],
      description: 'Time format',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
}

export default meta
type Story = StoryObj<typeof TimePicker>

export const Default: Story = {
  render: () => {
    const [time, setTime] = useState({ hours: 14, minutes: 30 })
    return (
      <div className="w-64">
        <TimePicker value={time} onChange={(hours, minutes) => setTime({ hours, minutes })} />
        <p className="mt-4 text-sm text-gray-400">
          Selected: {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}
        </p>
      </div>
    )
  },
}

export const Empty: Story = {
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number } | undefined>()
    return (
      <div className="w-64">
        <TimePicker
          value={time}
          onChange={(hours, minutes) => setTime({ hours, minutes })}
          placeholder="Select time"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: { hours: 10, minutes: 30 },
  },
}
