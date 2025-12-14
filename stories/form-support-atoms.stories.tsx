import type { Meta, StoryObj } from '@storybook/react'
import { ErrorMessage } from '../src/atoms/error-message'
import { FieldSet } from '../src/atoms/fieldset'
import { HelpText } from '../src/atoms/help-text'
import { Label } from '../src/atoms/label'

const meta = {
  title: 'Atoms/Form Support Atoms',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Form Support Atoms

These atoms provide the building blocks for form layouts:
- **Label**: Semantic labels with required indicators
- **ErrorMessage**: Validation error display with ARIA support  
- **HelpText**: Helper text for form fields
- **FieldSet**: Spacing container for form groups
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

/**
 * Label Examples
 */
export const LabelVariants: StoryObj = {
  render: () => (
    <div className="space-y-4 p-8 bg-gray-900 rounded-lg">
      <Label htmlFor="field1" size="sm">
        Small Label
      </Label>
      <Label htmlFor="field2" size="md">
        Medium Label (Default)
      </Label>
      <Label htmlFor="field3" size="lg">
        Large Label
      </Label>
      <Label htmlFor="field4" required>
        Required Field
      </Label>
      <Label htmlFor="field5" color="secondary">
        Secondary Color
      </Label>
    </div>
  ),
}

/**
 * Error Message Examples
 */
export const ErrorMessages: StoryObj = {
  render: () => (
    <div className="space-y-4 p-8 bg-gray-900 rounded-lg">
      <ErrorMessage size="sm">This field is required</ErrorMessage>
      <ErrorMessage size="md">Please enter a valid email address</ErrorMessage>
      <ErrorMessage>Password must be at least 8 characters</ErrorMessage>
    </div>
  ),
}

/**
 * Help Text Examples
 */
export const HelpTexts: StoryObj = {
  render: () => (
    <div className="space-y-4 p-8 bg-gray-900 rounded-lg">
      <HelpText size="sm">Small help text</HelpText>
      <HelpText size="md">Medium help text</HelpText>
      <HelpText>Your password must be at least 8 characters long</HelpText>
    </div>
  ),
}

/**
 * FieldSet Spacing
 */
export const FieldSetSpacing: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-900 rounded-lg">
      <FieldSet spacing="sm">
        <Label htmlFor="f1">Small Spacing</Label>
        <div className="w-64 h-8 bg-gray-700 rounded"></div>
      </FieldSet>
      <FieldSet spacing="md">
        <Label htmlFor="f2">Medium Spacing (Default)</Label>
        <div className="w-64 h-8 bg-gray-700 rounded"></div>
      </FieldSet>
      <FieldSet spacing="lg">
        <Label htmlFor="f3">Large Spacing</Label>
        <div className="w-64 h-8 bg-gray-700 rounded"></div>
      </FieldSet>
    </div>
  ),
}

/**
 * Complete Field Example
 */
export const CompleteFieldLayout: StoryObj = {
  render: () => (
    <div className="w-96 p-8 bg-gray-900 rounded-lg">
      <FieldSet spacing="md">
        <Label htmlFor="email" required>
          Email Address
        </Label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
          placeholder="you@example.com"
        />
        <HelpText>We'll never share your email with anyone</HelpText>
      </FieldSet>

      <FieldSet spacing="md">
        <Label htmlFor="password" required>
          Password
        </Label>
        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 bg-gray-800 border border-red-500 rounded-md text-white"
          placeholder="••••••••"
        />
        <ErrorMessage>Password must be at least 8 characters</ErrorMessage>
      </FieldSet>
    </div>
  ),
}
