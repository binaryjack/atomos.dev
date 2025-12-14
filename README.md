# Atomos UI

> Framework-agnostic React component library with Atomic Design principles

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## 🚀 Features

- **Framework Agnostic** - Pure React components, no Next.js or routing dependencies
- **Atomic Design** - Organized atoms, molecules, and organisms
- **TypeScript First** - Full type safety and IntelliSense support
- **Tailwind CSS** - Utility-first styling with customizable design tokens
- **Storybook** - Interactive component documentation
- **Tree-shakeable** - Import only what you need
- **Accessible** - WCAG compliant components

## 📦 Installation

```bash
# npm
npm install @atomos/ui

# pnpm
pnpm add @atomos/ui

# yarn
yarn add @atomos/ui
```

### Peer Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

## 🎨 Usage

### Basic Components

```tsx
import { Button, Card, Input, Spinner } from '@atomos/ui'

function App() {
  return (
    <Card variant="elevated" padding="lg">
      <h2>Welcome to Atomos UI</h2>
      <Input placeholder="Enter your email" />
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Card>
  )
}
```

### Complete Form Example

```tsx
import { FormProvider, FormInput, FormSelect, FormTextarea, FormCheckbox, FormField } from '@atomos/ui'

function ContactForm() {
  const fields: FormField[] = [
    {
      name: 'name',
      value: '',
      label: 'Full Name',
      validation: { required: true, minLength: 2 },
      isValid: false,
    },
    {
      name: 'email',
      value: '',
      label: 'Email',
      validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      isValid: false,
    },
    {
      name: 'message',
      value: '',
      label: 'Message',
      validation: { required: true, minLength: 10 },
      isValid: false,
    },
    {
      name: 'subscribe',
      value: false,
      label: 'Subscribe to newsletter',
      validation: {},
      isValid: true,
    },
  ]

  const handleSubmit = (fields: FormField[]) => {
    console.log('Form submitted:', fields)
  }

  return (
    <FormProvider
      initialFields={fields}
      onSubmit={handleSubmit}
      onSuccess={(msg) => alert(msg)}
      onError={(err) => console.error(err)}
      submitLabel="Send Message"
    >
      <FormInput id="name" placeholder="John Doe" />
      <FormInput id="email" type="email" placeholder="john@example.com" />
      <FormTextarea id="message" rows={5} placeholder="Your message..." />
      <FormCheckbox id="subscribe" helpText="Get updates about new features" />
    </FormProvider>
  )
}
```

### With Design System Utilities

```tsx
import { getButtonStyles, ButtonVariant } from '@atomos/ui'

const customButton = getButtonStyles('primary', 'lg', true)
```

## 🧱 Component Categories

### Atoms (Fundamental UI Primitives)

**Inputs & Controls:**
- `Button` - Versatile button with variants and states
- `Input` - Form input with validation states
- `Select` - Dropdown select component
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox input

**Layout & Structure:**
- `Card` - Container component with styling variants
- `FieldSet` - Form field spacing container
- `Table` - Semantic table components

**Feedback & Status:**
- `Badge` - Status and label badges
- `Spinner` - Loading indicators
- `ErrorMessage` - Validation error display
- `HelpText` - Helper text for forms
- `Label` - Semantic form labels
- `CheckIcon` - Success indicator icon

### Molecules (Composite Components)

**Form Components:**
- `FormInput` - Self-managed input with FormContext integration
- `FormSelect` - Self-managed select with FormContext integration
- `FormTextarea` - Self-managed textarea with FormContext integration
- `FormCheckbox` - Self-managed checkbox with FormContext integration
- `FormFileUpload` - File upload with preview and validation
- `FormFieldWrapper` - Reusable field layout wrapper

**UI Patterns:**
- `ModalShell` - Accessible modal dialog

### Organisms (Complex Components)

- `TimePicker` - Standalone time selection component

### Contexts (State Management)

**Form System:**
- `FormProvider` - Context-based form state management
- `useFormContext` - Hook to access form state
- Validation engine with built-in rules
- Type-safe field definitions

### Design System

- Button variants (primary, secondary, success, danger, etc.)
- Card variants (default, elevated, outlined, interactive)
- Input variants (default, error, success, disabled)
- Size utilities (xs, sm, md, lg, xl)
- Typography variants
- Color schemes

## 🎨 Tailwind Configuration

Atomos UI uses Tailwind CSS. Add the library to your Tailwind content paths:

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@atomos/ui/dist/**/*.{js,mjs}'],
  // ... rest of config
}
```

## 📚 Storybook

Explore the components interactively:

```bash
cd packages/atomos
pnpm storybook
```

Visit [Atomos UI Storybook](https://atomos.dev) for live documentation.

## 🛠️ Development

This library is maintained within the [Kompartido monorepo](https://github.com/binaryjack/kompartido) and synced to the standalone [atomos.dev repository](https://github.com/binaryjack/atomos.dev).

### Build

```bash
pnpm build
```

### Watch Mode

```bash
pnpm dev
```

### Type Check

```bash
pnpm type-check
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines.

## 📄 License

MIT © [binaryjack](https://github.com/binaryjack)

## 🔗 Links

- [GitHub Repository](https://github.com/binaryjack/atomos.dev)
- [Storybook Documentation](https://atomos.dev)
- [npm Package](https://www.npmjs.com/package/@atomos/ui)
- [Issues & Feature Requests](https://github.com/binaryjack/atomos.dev/issues)

---

Built with ❤️ by [binaryjack](https://github.com/binaryjack)
