import type { Meta, StoryObj } from '@storybook/react'
import { SeverityBadge, StatusBadge } from '../src/atoms'

const meta = {
  title: 'Atoms/Badges',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Status and Severity badges for displaying labeled information with color-coded styling.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="New" />
      <StatusBadge status="Pending" />
      <StatusBadge status="InProgress" />
      <StatusBadge status="Approved" />
      <StatusBadge status="Resolved" />
      <StatusBadge status="Rejected" />
      <StatusBadge status="Closed" />
      <StatusBadge status="Contacted" />
      <StatusBadge status="WontFix" />
    </div>
  ),
}

export const StatusWithMapping: Story = {
  render: () => {
    const statusMap = {
      1: 'Draft',
      2: 'Published',
      3: 'Archived',
    }

    return (
      <div className="flex gap-3">
        <StatusBadge status={1} statusMap={statusMap} />
        <StatusBadge status={2} statusMap={statusMap} />
        <StatusBadge status={3} statusMap={statusMap} />
      </div>
    )
  },
}

export const CustomColors: Story = {
  render: () => {
    const colorMap = {
      Premium: 'bg-purple-900/20 text-purple-400 border-purple-800',
      Basic: 'bg-gray-900/20 text-gray-400 border-gray-800',
      Trial: 'bg-cyan-900/20 text-cyan-400 border-cyan-800',
    }

    return (
      <div className="flex gap-3">
        <StatusBadge status="Premium" colorMap={colorMap} />
        <StatusBadge status="Basic" colorMap={colorMap} />
        <StatusBadge status="Trial" colorMap={colorMap} />
      </div>
    )
  },
}

export const SeverityBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <SeverityBadge severity={1} />
        <span className="text-sm text-gray-400">Low severity</span>
      </div>
      <div className="flex items-center gap-3">
        <SeverityBadge severity={2} />
        <span className="text-sm text-gray-400">Medium severity</span>
      </div>
      <div className="flex items-center gap-3">
        <SeverityBadge severity={3} />
        <span className="text-sm text-gray-400">High severity</span>
      </div>
      <div className="flex items-center gap-3">
        <SeverityBadge severity={4} />
        <span className="text-sm text-gray-400">Critical severity</span>
      </div>
    </div>
  ),
}

export const SeverityWithCustomLabels: Story = {
  render: () => (
    <div className="flex gap-3">
      <SeverityBadge severity={1} label="P4" />
      <SeverityBadge severity={2} label="P3" />
      <SeverityBadge severity={3} label="P2" />
      <SeverityBadge severity={4} label="P1" />
    </div>
  ),
}
