import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from '../src/atoms/icon-button'

// Example icons
const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button with icon only, accessible with aria-label. Perfect for toolbars and action menus.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: EditIcon,
    label: 'Edit item',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton icon={EditIcon} label="Edit" variant="default" />
      <IconButton icon={TrashIcon} label="Delete" variant="danger" />
    </div>
  ),
}

export const WithCallbacks: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton
        icon={PlusIcon}
        label="Add item"
        onClick={() => alert('Add clicked')}
      />
      <IconButton
        icon={EditIcon}
        label="Edit item"
        onClick={() => alert('Edit clicked')}
      />
      <IconButton
        icon={TrashIcon}
        label="Delete item"
        variant="danger"
        onClick={() => alert('Delete clicked')}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton icon={EditIcon} label="Edit" disabled />
      <IconButton icon={TrashIcon} label="Delete" variant="danger" disabled />
    </div>
  ),
}
