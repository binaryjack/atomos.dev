# Stepper Integration Guide for Atomos

## 📦 Integration Steps

### 1. Copy to Atomos Repository

Copy the entire Stepper folder structure to your Atomos repository:

```bash
# From your current project
cd e:\Sources\e-b-svs\e-b-svs\src\modules\services\components\Stepper

# Copy to atomos.dev repository
# Assuming atomos.dev is cloned at your preferred location
# Recommended location: src/organisms/stepper/
```

Recommended structure in atomos.dev:
```
atomos.dev/
  src/
    organisms/
      stepper/
        Step.tsx
        Stepper.tsx
        StepperSummary.tsx
        index.ts
        README.md
        stepper.stories.tsx
        adapters/
          atomosFormAdapter.ts
          rhfAdapter.ts
          index.ts
        components/
          StepperContent.tsx
          StepperDebug.tsx
          StepperFooter.tsx
          StepperHeader.tsx
        core/
          actions.ts
          formAdapter.ts
          helpers.ts
          models.ts
          state.ts
          reducer/
            *.ts
```

### 2. Update Imports

After copying to Atomos, update imports to use Atomos aliases:

```typescript
// Change all @atomos/ui references in stories to actual Atomos components
import { FormProvider, FormInput, FormSelect } from '@/atoms/form'
import { useFormContext } from '@/contexts/form'
```

### 3. Add to Atomos Exports

In `atomos.dev/src/organisms/index.ts`:

```typescript
export {
  Stepper,
  Step,
  StepperSummary,
  useStepperContext,
  createRHFAdapter,
  createAtomosFormAdapter
} from './stepper'

export type {
  StepperProps,
  StepperContext,
  StepperOptions,
  FormAdapter,
  FormState
} from './stepper'
```

### 4. Create Example Page

Create `atomos.dev/examples/forms/multi-step-form.tsx`:

```typescript
import { Stepper, Step, createAtomosFormAdapter } from '@atomos/ui'
import { FormProvider, FormInput, FormSelect } from '@atomos/ui'

export function MultiStepFormExample() {
  // Example implementation using Atomos FormProvider
}
```

### 5. Update package.json

In `atomos.dev/package.json`, ensure proper exports:

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./organisms/stepper": {
      "import": "./dist/organisms/stepper/index.js",
      "require": "./dist/organisms/stepper/index.cjs"
    }
  }
}
```

### 6. Build and Test

```bash
cd atomos.dev
pnpm install
pnpm build
pnpm dev  # Test in dev mode

# Test Storybook
pnpm storybook
```

### 7. Publish

```bash
# Increment version
pnpm version minor  # or patch

# Publish to npm
pnpm publish --access public

# Tag release on GitHub
git tag -a v1.x.0 -m "Add Stepper organism"
git push origin v1.x.0
```

## 🎨 Styling Adjustments

The Stepper uses CSS classes. You may want to convert to Tailwind:

### Before (CSS):
```css
.stepper-frame { /* ... */ }
```

### After (Tailwind):
```tsx
<div className="flex flex-col gap-4 p-6 bg-gray-900 rounded-lg">
```

Review these files for styling updates:
- [StepperHeader.tsx](../components/StepperHeader.tsx)
- [StepperFooter.tsx](../components/StepperFooter.tsx)
- [StepperContent.tsx](../components/StepperContent.tsx)

## ✅ Testing Checklist

- [ ] Copy all files to atomos.dev
- [ ] Update imports to use Atomos components
- [ ] Add exports to main index
- [ ] Convert CSS to Tailwind classes
- [ ] Test with Atomos FormProvider
- [ ] Test with React Hook Form
- [ ] Build successfully
- [ ] Storybook stories work
- [ ] Write unit tests
- [ ] Update main documentation
- [ ] Publish to npm
- [ ] Test installation in external project

## 📚 Documentation Updates

Update these files in atomos.dev:
1. `README.md` - Add Stepper to main features
2. `docs/organisms/stepper.md` - Detailed component docs
3. `CHANGELOG.md` - Document the addition
4. Storybook stories - Already created in `stepper.stories.tsx`

## 🔗 Dependencies

Ensure these are in `atomos.dev/package.json`:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-hook-form": "^7.0.0"  // Optional - only if using RHF adapter
  }
}
```

## 🚀 Usage in Projects

Once published, users can install and use:

```bash
npm install @atomos/ui
```

```tsx
import { Stepper, Step, createAtomosFormAdapter } from '@atomos/ui'

// Use with Atomos FormProvider or React Hook Form
```

## 📝 Notes

- The Stepper is **100% form-library agnostic**
- Includes adapters for both RHF and Atomos FormProvider
- Easy to add more adapters (Formik, etc.)
- Fully typed with TypeScript
- Follows Atomic Design principles
- Ready for tree-shaking via tsup build

## 🤝 Contributing

After integration, contributors can:
1. Add more form library adapters
2. Enhance validation logic
3. Add more UI themes
4. Improve accessibility
5. Add more example stories
