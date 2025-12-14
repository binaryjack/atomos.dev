/**
 * Stepper Component - Storybook Stories
 * Demonstrates Stepper with different form libraries
 */

import { FormProvider as AtomosFormProvider, FormField, FormInput, FormTextarea } from '@atomos/ui'
import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    Step,
    Stepper,
    createAtomosFormAdapter,
    createRHFAdapter
} from '../index'

const meta: Meta<typeof Stepper> = {
  title: 'Organisms/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Multi-Step Form Stepper

A powerful, **form-library agnostic** component for managing complex multi-step forms.

### Key Features
- ✅ Works with any form library (RHF, Formik, Atomos FormProvider)
- ✅ Smart step validation and navigation
- ✅ Conditional step visibility
- ✅ Custom validators
- ✅ Progress tracking
- ✅ Accessible & responsive
        `
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stepper>

/**
 * Basic Example with React Hook Form
 */
export const WithReactHookForm: Story = {
  render: () => {
    const BasicForm = () => {
      const form = useForm({
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        mode: 'onChange'
      })

      const formAdapter = createRHFAdapter(form)

      const handleSubmit = (data: any) => {
        console.log('Form submitted:', data)
        alert('Form submitted! Check console.')
      }

      return (
        <FormProvider {...form}>
          <div className="w-[700px] p-8 bg-gray-900 rounded-lg">
            <Stepper
              formAdapter={formAdapter}
              id={1}
              name="basic-stepper"
              options={{ debug: false, enableFooterNavigation: true }}
              submitMethod={handleSubmit}
            >
              <Step id={0} label="Personal Info">
                <div className="space-y-4">
                  <div>
                    <label className="text-white">First Name *</label>
                    <input
                      {...form.register('firstName', { required: true })}
                      className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white">Last Name *</label>
                    <input
                      {...form.register('lastName', { required: true })}
                      className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
                    />
                  </div>
                </div>
              </Step>

              <Step id={1} label="Contact">
                <div className="space-y-4">
                  <div>
                    <label className="text-white">Email *</label>
                    <input
                      type="email"
                      {...form.register('email', { 
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                      })}
                      className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white">Phone</label>
                    <input
                      {...form.register('phone')}
                      className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
                    />
                  </div>
                </div>
              </Step>

              <Step id={2} label="Review">
                <div className="text-white space-y-2">
                  <h3 className="text-lg font-bold mb-4">Review Your Information</h3>
                  <p><strong>Name:</strong> {form.watch('firstName')} {form.watch('lastName')}</p>
                  <p><strong>Email:</strong> {form.watch('email')}</p>
                  <p><strong>Phone:</strong> {form.watch('phone') || 'Not provided'}</p>
                </div>
              </Step>
            </Stepper>
          </div>
        </FormProvider>
      )
    }

    return <BasicForm />
  }
}

/**
 * With Atomos FormProvider
 */
export const WithAtomosForm: Story = {
  render: () => {
    const AtomosStepperExample = () => {
      const fields: FormField[] = [
        {
          name: 'firstName',
          value: '',
          label: 'First Name',
          validation: { required: true },
          isValid: false
        },
        {
          name: 'lastName',
          value: '',
          label: 'Last Name',
          validation: { required: true },
          isValid: false
        },
        {
          name: 'email',
          value: '',
          label: 'Email',
          validation: { 
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          },
          isValid: false
        },
        {
          name: 'message',
          value: '',
          label: 'Message',
          validation: { required: true, minLength: 10 },
          isValid: false
        }
      ]

      const FormContent = () => {
        const formContext = useFormContext()
        const formAdapter = createAtomosFormAdapter(formContext)

        const handleSubmit = (data: any) => {
          console.log('Atomos form submitted:', data)
          alert('Form submitted! Check console.')
        }

        return (
          <div className="w-[700px]">
            <Stepper
              formAdapter={formAdapter}
              id={2}
              name="atomos-stepper"
              options={{ debug: false, enableFooterNavigation: true }}
              submitMethod={handleSubmit}
            >
              <Step id={0} label="Basic Info">
                <FormInput id="firstName" placeholder="John" />
                <FormInput id="lastName" placeholder="Doe" />
              </Step>

              <Step id={1} label="Contact">
                <FormInput 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                />
                <FormTextarea 
                  id="message" 
                  rows={4}
                  placeholder="Your message..."
                />
              </Step>

              <Step id={2} label="Review">
                <div className="text-white space-y-2">
                  <h3 className="text-lg font-bold mb-4">Review</h3>
                  <p><strong>Name:</strong> {formContext.getFieldValue('firstName')} {formContext.getFieldValue('lastName')}</p>
                  <p><strong>Email:</strong> {formContext.getFieldValue('email')}</p>
                  <p><strong>Message:</strong> {formContext.getFieldValue('message')}</p>
                </div>
              </Step>
            </Stepper>
          </div>
        )
      }

      return (
        <div className="p-8 bg-gray-900 rounded-lg">
          <AtomosFormProvider
            initialFields={fields}
            onSubmit={(fields) => console.log(fields)}
          >
            <FormContent />
          </AtomosFormProvider>
        </div>
      )
    }

    return <AtomosStepperExample />
  }
}

/**
 * Conditional Steps Example
 */
export const ConditionalSteps: Story = {
  render: () => {
    const ConditionalForm = () => {
      const form = useForm({
        defaultValues: {
          hasVehicle: false,
          vehicleType: '',
          vehicleMake: ''
        }
      })

      const formAdapter = createRHFAdapter(form)
      const hasVehicle = form.watch('hasVehicle')

      return (
        <FormProvider {...form}>
          <div className="w-[700px] p-8 bg-gray-900 rounded-lg">
            <Stepper
              formAdapter={formAdapter}
              id={3}
              name="conditional-stepper"
              options={{ enableFooterNavigation: true }}
              submitMethod={(data) => console.log(data)}
            >
              <Step id={0} label="Basic Question">
                <div className="space-y-4">
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      {...form.register('hasVehicle')}
                      className="mr-2"
                    />
                    Do you have a vehicle?
                  </label>
                </div>
              </Step>

              {hasVehicle && (
                <Step id={1} label="Vehicle Details">
                  <div className="space-y-4">
                    <div>
                      <label className="text-white">Vehicle Type *</label>
                      <select
                        {...form.register('vehicleType', { required: hasVehicle })}
                        className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
                      >
                        <option value="">Select type</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="motorcycle">Motorcycle</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white">Make *</label>
                      <input
                        {...form.register('vehicleMake', { required: hasVehicle })}
                        className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
                      />
                    </div>
                  </div>
                </Step>
              )}

              <Step id={2} label="Summary">
                <div className="text-white">
                  <h3 className="font-bold mb-2">Summary</h3>
                  <p>Has vehicle: {hasVehicle ? 'Yes' : 'No'}</p>
                  {hasVehicle && (
                    <>
                      <p>Type: {form.watch('vehicleType')}</p>
                      <p>Make: {form.watch('vehicleMake')}</p>
                    </>
                  )}
                </div>
              </Step>
            </Stepper>
          </div>
        </FormProvider>
      )
    }

    return <ConditionalForm />
  }
}
