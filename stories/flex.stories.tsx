import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '../src/atoms/flex'
import { Card } from '../src/atoms/card'

const meta = {
  title: 'Atoms/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexbox layout component with consistent alignment, spacing, and direction control.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded bg-purple-600 px-4 py-2 text-white ${className}`}>{children}</div>
)

export const Default: Story = {
  render: () => (
    <Flex>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
}

export const Directions: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div>
        <p className="text-sm text-gray-400 mb-2">Row (horizontal)</p>
        <Flex direction="row" gap="sm">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Column (vertical)</p>
        <Flex direction="col" gap="sm">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
    </div>
  ),
}

export const Gaps: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-400 mb-2">None (gap-0)</p>
        <Flex gap="none">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Small (gap-2)</p>
        <Flex gap="sm">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Medium (gap-4)</p>
        <Flex gap="md">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Large (gap-6)</p>
        <Flex gap="lg">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
    </div>
  ),
}

export const Alignment: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <p className="text-sm text-gray-400 mb-2">Align Start</p>
        <Flex align="start" gap="sm" className="h-24 bg-gray-800 rounded p-2">
          <Box>A</Box>
          <Box className="py-6">B (tall)</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Align Center</p>
        <Flex align="center" gap="sm" className="h-24 bg-gray-800 rounded p-2">
          <Box>A</Box>
          <Box className="py-6">B (tall)</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Align End</p>
        <Flex align="end" gap="sm" className="h-24 bg-gray-800 rounded p-2">
          <Box>A</Box>
          <Box className="py-6">B (tall)</Box>
          <Box>C</Box>
        </Flex>
      </div>
    </div>
  ),
}

export const Justification: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <p className="text-sm text-gray-400 mb-2">Justify Start</p>
        <Flex justify="start" gap="sm" className="bg-gray-800 rounded p-2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Justify Center</p>
        <Flex justify="center" gap="sm" className="bg-gray-800 rounded p-2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Justify Between</p>
        <Flex justify="between" gap="sm" className="bg-gray-800 rounded p-2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Justify Around</p>
        <Flex justify="around" gap="sm" className="bg-gray-800 rounded p-2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
    </div>
  ),
}

export const Wrapping: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <p className="text-sm text-gray-400 mb-2">No Wrap (default)</p>
        <Flex gap="sm" className="bg-gray-800 rounded p-2">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
          <Box>Item 4</Box>
          <Box>Item 5</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">With Wrap</p>
        <Flex wrap gap="sm" className="bg-gray-800 rounded p-2">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
          <Box>Item 4</Box>
          <Box>Item 5</Box>
        </Flex>
      </div>
    </div>
  ),
}

export const PracticalExample: Story = {
  render: () => (
    <Card className="w-96">
      <Flex direction="col" gap="md">
        <Flex justify="between" align="center">
          <h3 className="text-lg font-semibold text-white">User Profile</h3>
          <Box className="text-xs">Active</Box>
        </Flex>
        <Flex direction="col" gap="sm">
          <Flex justify="between">
            <span className="text-gray-400">Name:</span>
            <span className="text-white">John Doe</span>
          </Flex>
          <Flex justify="between">
            <span className="text-gray-400">Email:</span>
            <span className="text-white">john@example.com</span>
          </Flex>
          <Flex justify="between">
            <span className="text-gray-400">Role:</span>
            <span className="text-white">Administrator</span>
          </Flex>
        </Flex>
        <Flex gap="sm" justify="end">
          <button className="rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600">
            Cancel
          </button>
          <button className="rounded bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700">
            Save Changes
          </button>
        </Flex>
      </Flex>
    </Card>
  ),
}
