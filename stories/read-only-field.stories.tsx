import type { Meta, StoryObj } from '@storybook/react'
import { ReadOnlyField } from '../src/atoms/read-only-field'
import { Badge } from '../src/atoms/badge'
import { Card } from '../src/atoms/card'

const meta = {
  title: 'Atoms/ReadOnlyField',
  component: ReadOnlyField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a label with a read-only value. Perfect for profile pages, detail views, and summary sections.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReadOnlyField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email Address',
    value: 'user@example.com',
  },
}

export const WithBadge: Story = {
  args: {
    label: 'Account Status',
    value: <Badge variant="success">Active</Badge>,
  },
}

export const MultipleFields: Story = {
  render: () => (
    <Card className="w-96 space-y-4">
      <ReadOnlyField label="Full Name" value="John Doe" />
      <ReadOnlyField label="Email" value="john.doe@example.com" />
      <ReadOnlyField label="Phone" value="+1 (555) 123-4567" />
      <ReadOnlyField
        label="Status"
        value={<Badge variant="success">Verified</Badge>}
      />
      <ReadOnlyField label="Member Since" value="January 15, 2024" />
    </Card>
  ),
}

export const WithCustomStyling: Story = {
  render: () => (
    <Card className="w-96 space-y-4">
      <ReadOnlyField
        label="Username"
        value="@johndoe"
        valueClassName="font-mono text-purple-400"
      />
      <ReadOnlyField
        label="API Key"
        value="sk_live_••••••••••••••••1234"
        valueClassName="font-mono text-sm text-gray-400"
      />
      <ReadOnlyField
        label="Balance"
        value="$1,234.56"
        valueClassName="text-2xl font-bold text-green-400"
      />
    </Card>
  ),
}

export const ProfileView: Story = {
  render: () => (
    <Card className="w-96">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">User Profile</h2>
          <div className="space-y-4">
            <ReadOnlyField label="Full Name" value="Jane Smith" />
            <ReadOnlyField label="Email" value="jane.smith@company.com" />
            <ReadOnlyField label="Department" value="Engineering" />
            <ReadOnlyField label="Title" value="Senior Software Engineer" />
            <ReadOnlyField
              label="Employment Status"
              value={<Badge variant="success">Active</Badge>}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <div className="space-y-4">
            <ReadOnlyField label="Phone" value="+1 (555) 987-6543" />
            <ReadOnlyField label="Office" value="Building A, Floor 3, Desk 42" />
            <ReadOnlyField label="Time Zone" value="PST (UTC-8)" />
          </div>
        </div>
      </div>
    </Card>
  ),
}
