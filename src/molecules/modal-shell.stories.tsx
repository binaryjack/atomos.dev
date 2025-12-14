import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../atoms/button'
import { ModalShell } from './modal-shell'

const meta: Meta<typeof ModalShell> = {
  title: 'Molecules/ModalShell',
  component: ModalShell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '4xl', '5xl'],
      description: 'Modal size',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close when clicking backdrop',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close with ESC key',
    },
  },
}

export default meta
type Story = StoryObj<typeof ModalShell>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <ModalShell
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
          subtitle="This is a subtitle"
        >
          <p className="text-gray-300">This is the modal content.</p>
        </ModalShell>
      </>
    )
  },
}

export const WithIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Icon</Button>
        <ModalShell
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Settings"
          subtitle="Configure your preferences"
          icon="⚙️"
        >
          <div className="space-y-4">
            <p className="text-gray-300">Modal content goes here.</p>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </div>
        </ModalShell>
      </>
    )
  },
}

export const LargeModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <ModalShell
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Content"
          size="4xl"
        >
          <div className="space-y-4">
            <p className="text-gray-300">This modal has a lot of content and uses the 4xl size.</p>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraph {i + 1}
              </p>
            ))}
          </div>
        </ModalShell>
      </>
    )
  },
}

export const NoBackdropClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal (No Backdrop Close)</Button>
        <ModalShell
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Persistent Modal"
          closeOnBackdrop={false}
        >
          <p className="text-gray-300">
            You cannot close this modal by clicking outside. Use the X button or ESC key.
          </p>
        </ModalShell>
      </>
    )
  },
}
