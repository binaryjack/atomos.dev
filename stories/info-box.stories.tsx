import type { Meta, StoryObj } from '@storybook/react'
import { InfoBox } from '../src/atoms/info-box'

const meta = {
  title: 'Atoms/InfoBox',
  component: InfoBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays informational messages with icon and optional title. Perfect for tips, warnings, and contextual help.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error'],
      description: 'Visual variant of the info box',
    },
  },
} satisfies Meta<typeof InfoBox>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Did you know?',
    children: 'This feature is currently in beta. We appreciate your feedback!',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    children: 'Changes to this setting will affect all users in your organization.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Unable to process your request. Please try again later.',
  },
}

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'This is a simple info message without a title.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <InfoBox variant="info" title="Info">
        This is an informational message to help you understand the feature.
      </InfoBox>
      <InfoBox variant="warning" title="Warning">
        Please review your settings carefully before proceeding.
      </InfoBox>
      <InfoBox variant="success" title="Success">
        Your operation completed successfully!
      </InfoBox>
      <InfoBox variant="error" title="Error">
        Something went wrong. Please contact support if the problem persists.
      </InfoBox>
    </div>
  ),
}

export const WithComplexContent: Story = {
  render: () => (
    <div className="w-96">
      <InfoBox variant="info" title="Getting Started">
        <>
          Follow these steps to set up your account:
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li>Complete your profile</li>
            <li>Verify your email address</li>
            <li>Connect your payment method</li>
          </ul>
        </>
      </InfoBox>
    </div>
  ),
}
