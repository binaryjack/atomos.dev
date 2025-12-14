import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, FormField } from '../src/contexts/form'
import { FormInput, FormSelect, FormTextarea, FormCheckbox, FormFileUpload } from '../src/molecules'

const meta = {
  title: 'Forms/Complete Form Example',
  component: FormProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Complete Form System

The Atomos form system provides a comprehensive solution for building forms with:
- **FormProvider**: Context-based state management
- **Built-in validation**: Required, min/max, patterns, custom rules
- **Form molecules**: FormInput, FormSelect, FormTextarea, FormCheckbox, FormFileUpload
- **Smart error handling**: Errors show only after field interaction
- **Type-safe**: Full TypeScript support

All form components are framework-agnostic and can be used in any React project.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormProvider>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Contact Form Example
 * Demonstrates all form field types with validation
 */
export const ContactForm: Story = {
  render: () => {
    const fields: FormField[] = [
      {
        name: 'name',
        value: '',
        label: 'Full Name',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50,
          error: '',
          min: null,
          max: null,
          pattern: null,
        },
        isValid: false,
      },
      {
        name: 'email',
        value: '',
        label: 'Email Address',
        validation: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          error: 'Please enter a valid email',
          min: null,
          max: null,
          minLength: null,
          maxLength: null,
        },
        isValid: false,
      },
      {
        name: 'subject',
        value: '',
        label: 'Subject',
        validation: {
          required: true,
          error: '',
          min: null,
          max: null,
          minLength: null,
          maxLength: null,
          pattern: null,
        },
        isValid: false,
      },
      {
        name: 'message',
        value: '',
        label: 'Message',
        validation: {
          required: true,
          minLength: 10,
          maxLength: 500,
          error: '',
          min: null,
          max: null,
          pattern: null,
        },
        isValid: false,
      },
      {
        name: 'subscribe',
        value: false,
        label: 'Subscribe to newsletter',
        validation: {
          error: '',
          required: null,
          min: null,
          max: null,
          minLength: null,
          maxLength: null,
          pattern: null,
        },
        isValid: true,
      },
    ]

    const handleSubmit = (fields: FormField[]) => {
      console.log('Form submitted with:', fields)
      alert('Form submitted successfully! Check console for values.')
    }

    return (
      <div className="w-[500px] p-8 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
        <FormProvider
          initialFields={fields}
          onSubmit={handleSubmit}
          onSuccess={(msg) => console.log(msg)}
          onError={(err) => console.error(err)}
          submitLabel="Send Message"
          showReset={true}
          resetLabel="Clear Form"
        >
          <FormInput id="name" placeholder="John Doe" />
          <FormInput id="email" type="email" placeholder="john@example.com" />
          <FormSelect id="subject">
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </FormSelect>
          <FormTextarea
            id="message"
            rows={6}
            placeholder="Tell us how we can help..."
            helpText="Minimum 10 characters, maximum 500"
          />
          <FormCheckbox id="subscribe" helpText="Get updates about new features" />
        </FormProvider>
      </div>
    )
  },
}

/**
 * Registration Form
 * Shows password validation and file upload
 */
export const RegistrationForm: Story = {
  render: () => {
    const fields: FormField[] = [
      {
        name: 'username',
        value: '',
        label: 'Username',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 20,
          pattern: /^[a-zA-Z0-9_]+$/,
          error: 'Only letters, numbers, and underscores allowed',
          min: null,
          max: null,
        },
        isValid: false,
      },
      {
        name: 'email',
        value: '',
        label: 'Email',
        validation: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          error: 'Invalid email format',
          min: null,
          max: null,
          minLength: null,
          maxLength: null,
        },
        isValid: false,
      },
      {
        name: 'password',
        value: '',
        label: 'Password',
        validation: {
          required: true,
          minLength: 8,
          error: 'Password must be at least 8 characters',
          min: null,
          max: null,
          maxLength: null,
          pattern: null,
        },
        isValid: false,
      },
      {
        name: 'age',
        value: '',
        label: 'Age',
        validation: {
          required: true,
          min: 18,
          max: 120,
          error: 'Must be between 18 and 120',
          minLength: null,
          maxLength: null,
          pattern: null,
        },
        isValid: false,
      },
      {
        name: 'avatar',
        value: '',
        label: 'Profile Picture',
        validation: {
          required: false,
          error: '',
          min: null,
          max: null,
          minLength: null,
          maxLength: null,
          pattern: null,
        },
        isValid: true,
      },
      {
        name: 'terms',
        value: false,
        label: 'I agree to the Terms and Conditions',
        validation: {
          required: true,
          error: 'You must accept the terms',
          min: null,
          max: null,
          minLength: null,
          maxLength: null,
          pattern: null,
        },
        isValid: false,
      },
    ]

    const handleSubmit = (fields: FormField[]) => {
      console.log('Registration submitted:', fields)
      alert('Account created! Check console for details.')
    }

    return (
      <div className="w-[500px] p-8 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>
        <FormProvider
          initialFields={fields}
          onSubmit={handleSubmit}
          submitLabel="Create Account"
          showReset={false}
        >
          <FormInput id="username" placeholder="johndoe" helpText="3-20 characters, letters, numbers, and underscores only" />
          <FormInput id="email" type="email" placeholder="john@example.com" />
          <FormInput id="password" type="password" placeholder="Enter a strong password" helpText="At least 8 characters" />
          <FormInput id="age" type="number" placeholder="18" />
          <FormFileUpload id="avatar" accept="image/*" helpText="Optional profile picture (max 5MB)" showFileList />
          <FormCheckbox id="terms" />
        </FormProvider>
      </div>
    )
  },
}

/**
 * Simple Login Form
 * Minimal form with just email and password
 */
export const LoginForm: Story = {
  render: () => {
    const fields: FormField[] = [
      {
        name: 'email',
        value: '',
        label: 'Email',
        validation: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          error: 'Invalid email',
          min: null,
          max: null,
          minLength: null,
          maxLength: null,
        },
        isValid: false,
      },
      {
        name: 'password',
        value: '',
        label: 'Password',
        validation: {
          required: true,
          minLength: 6,
          error: '',
          min: null,
          max: null,
          maxLength: null,
          pattern: null,
        },
        isValid: false,
      },
      {
        name: 'remember',
        value: false,
        label: 'Remember me',
        validation: {
          error: '',
          required: null,
          min: null,
          max: null,
          minLength: null,
          maxLength: null,
          pattern: null,
        },
        isValid: true,
      },
    ]

    const handleSubmit = (fields: FormField[]) => {
      console.log('Login submitted:', fields)
      alert('Login successful!')
    }

    return (
      <div className="w-[400px] p-8 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>
        <FormProvider initialFields={fields} onSubmit={handleSubmit} submitLabel="Sign In" showReset={false}>
          <FormInput id="email" type="email" placeholder="your@email.com" />
          <FormInput id="password" type="password" placeholder="••••••••" />
          <FormCheckbox id="remember" />
        </FormProvider>
      </div>
    )
  },
}
