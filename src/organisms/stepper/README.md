# Stepper Component

A powerful, **form-library agnostic** multi-step form management component for React applications.

## ✨ Features

- 🔄 **Form Library Agnostic** - Works with React Hook Form, Formik, or any form library
- 📋 **Smart Validation** - Step-by-step validation with navigation control
- 🎯 **Conditional Steps** - Show/hide steps based on form data
- ✅ **Custom Validators** - Add complex validation logic
- 🔒 **Step Locking** - Control step accessibility
- 📊 **Progress Tracking** - Visual step indicators
- ♿ **Accessible** - WCAG compliant
- 📱 **Responsive** - Mobile-first design
- 🎨 **Customizable** - Flexible styling options

## 📦 Installation

```bash
npm install @atomos/ui
# or
pnpm add @atomos/ui
```

## 🚀 Quick Start

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form'
import { Stepper, Step, createRHFAdapter } from '@atomos/ui'

function MyForm() {
  const form = useForm()
  const formAdapter = createRHFAdapter(form)

  const handleSubmit = (data) => {
    console.log('Form submitted:', data)
  }

  return (
    <FormProvider {...form}>
      <Stepper
        formAdapter={formAdapter}
        id={1}
        name="registration"
        options={{ debug: false }}
        submitMethod={handleSubmit}
      >
        <Step id={0} label="Personal Info">
          {/* Your form fields */}
        </Step>

        <Step id={1} label="Contact Details">
          {/* Your form fields */}
        </Step>

        <Step id={2} label="Review">
          {/* Summary */}
        </Step>
      </Stepper>
    </FormProvider>
  )
}
```

### With Other Form Libraries

Create a custom adapter:

```tsx
import { FormAdapter } from '@atomos/ui'

const createMyFormAdapter = (formInstance): FormAdapter => ({
  getFormState: () => ({
    errors: formInstance.errors,
    touchedFields: formInstance.touched,
    dirtyFields: formInstance.dirty,
    isValidating: formInstance.isValidating,
    defaultValues: formInstance.initialValues
  }),
  trigger: async (fields) => formInstance.validate(fields),
  getValues: (name) => formInstance.getFieldValue(name),
  setValue: (name, value) => formInstance.setFieldValue(name, value),
  resetField: (name) => formInstance.resetField(name),
  clearErrors: (name) => formInstance.clearErrors(name),
  reset: () => formInstance.reset()
})
```

## 📖 API Reference

### `<Stepper>`

Main stepper component that manages multi-step form flow.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `formAdapter` | `FormAdapter` | ✅ | Form library adapter |
| `id` | `number` | ✅ | Unique stepper ID |
| `name` | `string` | ✅ | Stepper name |
| `options` | `StepperOptions` | ✅ | Configuration options |
| `submitMethod` | `CallableFunction` | ✅ | Submit handler |
| `children` | `React.ReactNode` | ✅ | Step components |

**Options:**

```typescript
interface StepperOptions {
  enableFooterNavigation?: boolean  // Show footer navigation buttons
  debug?: boolean                   // Enable debug mode
}
```

### `<Step>`

Individual step wrapper component.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `number` | ✅ | Unique step ID (zero-based) |
| `label` | `string` | ✅ | Step label for navigation |
| `children` | `React.ReactNode` | ✅ | Step content |

### `useStepperContext()`

Hook to access stepper context and methods.

**Returns:**

```typescript
interface StepperContext {
  // State
  currentState: () => StepperState
  watchSiblings: () => StepperSibling | undefined
  stepWatch: (id?: number) => StepItem | StepItem[] | undefined
  
  // Navigation
  goToStep: (id: number) => void
  goBack: () => void
  goNext: () => void
  
  // Validation
  validate: (mode: ValidationMode, key?: string | number) => void
  
  // Error Management
  errors: (id?: number) => StepperError[]
  setError: (stepId: number, fieldName: string, message: string) => void
  unSetError: (stepId: number, fieldName: string) => void
  removeAllCustomErrors: (id?: number) => void
  
  // Step Management
  setStepVisibility: (ids: number[], visible: boolean) => void
  registerField: (id: number, fields: string[]) => void
  setFieldDefaultValue: (id: number, fields: StepField) => void
  enableStep: (id: number) => void
  
  // Form
  resetForm: (id?: number) => void
  submit: () => void
  summary: () => Summary[]
  
  // Custom Validators
  setCustomValidators: (validators: CustomValidation[]) => void
  
  // Form Adapter Access
  formAdapter: FormAdapter
}
```

## 🎯 Advanced Usage

### Conditional Step Visibility

```tsx
import { useStepperContext } from '@atomos/ui'

function MyForm() {
  const { setStepVisibility } = useStepperContext()
  
  useEffect(() => {
    // Hide/show step based on form data
    const hasVehicle = watch('hasVehicle')
    setStepVisibility([2], hasVehicle) // Show step 2 if has vehicle
  }, [watch('hasVehicle')])
  
  return (
    <Step id={0} label="Basic Info">...</Step>
    <Step id={1} label="Contact">...</Step>
    <Step id={2} label="Vehicle Details">...</Step> {/* Conditional */}
  )
}
```

### Custom Validation

```tsx
function MyForm() {
  const { setCustomValidators, setError } = useStepperContext()
  
  useEffect(() => {
    setCustomValidators([{
      stepId: 1,
      name: 'checkEmailMatch',
      method: () => {
        if (email !== confirmEmail) {
          setError(1, 'confirmEmail', 'Emails must match')
        }
      }
    }])
  }, [])
}
```

### Step Summary

```tsx
import { StepperSummary } from '@atomos/ui'

<Step id={3} label="Review">
  <StepperSummary />
</Step>
```

### Access Form Adapter

```tsx
function MyCustomComponent() {
  const { formAdapter } = useStepperContext()
  
  const handleCustomAction = () => {
    const allValues = formAdapter.getValues()
    console.log('Current form values:', allValues)
  }
}
```

## 🎨 Styling

The Stepper uses CSS classes that can be customized:

```css
.stepper-frame { /* Main container */ }
.stepper-header { /* Header with tabs */ }
.stepper-content { /* Content area */ }
.stepper-footer { /* Footer navigation */ }
.stepper-tab { /* Individual tab */ }
.stepper-tab.active { /* Active tab */ }
.stepper-tab.valid { /* Valid step */ }
.stepper-tab.locked { /* Locked step */ }
```

Or convert to Tailwind classes for modern styling.

## 🔧 Form Adapter Interface

To create your own adapter, implement the `FormAdapter` interface:

```typescript
interface FormAdapter {
  getFormState: () => FormState
  trigger: (fields?: string[]) => Promise<boolean>
  getValues: (name?: string | string[]) => any
  setValue: (name: string, value: any, options?: SetValueOptions) => void
  resetField: (name: string) => void
  clearErrors: (name?: string | string[]) => void
  reset: (values?: any) => void
  setFocus?: (name: string) => void  // Optional
}
```

## 📚 Examples

Check out the [Storybook documentation](https://atomos.dev) for interactive examples.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md).

## 📄 License

MIT © [binaryjack](https://github.com/binaryjack)

## 🔗 Links

- [Documentation](https://atomos.dev)
- [GitHub](https://github.com/binaryjack/atomos.dev)
- [npm Package](https://www.npmjs.com/package/@atomos/ui)
- [Issues](https://github.com/binaryjack/atomos.dev/issues)
