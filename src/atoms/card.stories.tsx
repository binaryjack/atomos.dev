import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'interactive'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding size',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Card Title</h3>
        <p className="text-gray-400">This is a default card with medium padding.</p>
      </div>
    ),
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Elevated Card</h3>
        <p className="text-gray-400">This card has a shadow for emphasis.</p>
      </div>
    ),
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    padding: 'md',
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Outlined Card</h3>
        <p className="text-gray-400">Transparent background with border.</p>
      </div>
    ),
  },
}

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    padding: 'md',
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Interactive Card</h3>
        <p className="text-gray-400">Click me to see interaction!</p>
      </div>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-4xl">
      <Card variant="default" padding="md">
        <h3 className="font-semibold mb-2">Default</h3>
        <p className="text-sm text-gray-400">Standard card style</p>
      </Card>
      <Card variant="elevated" padding="md">
        <h3 className="font-semibold mb-2">Elevated</h3>
        <p className="text-sm text-gray-400">With shadow</p>
      </Card>
      <Card variant="outlined" padding="md">
        <h3 className="font-semibold mb-2">Outlined</h3>
        <p className="text-sm text-gray-400">Transparent background</p>
      </Card>
      <Card variant="interactive" padding="md">
        <h3 className="font-semibold mb-2">Interactive</h3>
        <p className="text-sm text-gray-400">Hover effect</p>
      </Card>
    </div>
  ),
}
