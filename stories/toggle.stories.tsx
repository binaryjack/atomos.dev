import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Toggle } from '../src/atoms/toggle'

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A switch/toggle component for boolean values with customizable size and label position.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the toggle',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Toggle
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Enable notifications"
      />
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(false)
    const [medium, setMedium] = useState(true)
    const [large, setLarge] = useState(false)

    return (
      <div className="flex flex-col gap-4">
        <Toggle
          size="sm"
          checked={small}
          onChange={(e) => setSmall(e.target.checked)}
          label="Small toggle"
        />
        <Toggle
          size="md"
          checked={medium}
          onChange={(e) => setMedium(e.target.checked)}
          label="Medium toggle (default)"
        />
        <Toggle
          size="lg"
          checked={large}
          onChange={(e) => setLarge(e.target.checked)}
          label="Large toggle"
        />
      </div>
    )
  },
}

export const LabelPositions: Story = {
  render: () => {
    const [left, setLeft] = useState(true)
    const [right, setRight] = useState(true)

    return (
      <div className="flex flex-col gap-4">
        <Toggle
          labelPosition="left"
          checked={left}
          onChange={(e) => setLeft(e.target.checked)}
          label="Label on left"
        />
        <Toggle
          labelPosition="right"
          checked={right}
          onChange={(e) => setRight(e.target.checked)}
          label="Label on right"
        />
      </div>
    )
  },
}

export const States: Story = {
  render: () => {
    const [normal, setNormal] = useState(true)
    const [error, setError] = useState(true)

    return (
      <div className="flex flex-col gap-4">
        <Toggle
          checked={normal}
          onChange={(e) => setNormal(e.target.checked)}
          label="Normal state"
        />
        <Toggle
          checked={error}
          error
          onChange={(e) => setError(e.target.checked)}
          label="Error state"
        />
        <Toggle checked disabled label="Disabled (checked)" />
        <Toggle checked={false} disabled label="Disabled (unchecked)" />
      </div>
    )
  },
}

export const WithoutLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return <Toggle checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  },
}
