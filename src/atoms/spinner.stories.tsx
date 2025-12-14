import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spinner size',
    },
    label: {
      control: 'text',
      description: 'Loading label text',
    },
    fullPage: {
      control: 'boolean',
      description: 'Full page overlay',
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    size: 'md',
  },
}

export const WithLabel: Story = {
  args: {
    size: 'lg',
    label: 'Loading data...',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <div className="flex gap-8">
      <Spinner size="md" label="Loading..." />
      <Spinner size="lg" label="Processing..." />
    </div>
  ),
}
