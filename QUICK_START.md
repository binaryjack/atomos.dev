# Atomos UI - Quick Start

## ✅ Setup Complete!

The Atomos UI library has been successfully created in your Kompartido monorepo at `packages/atomos`.

## 📦 What Was Created

### Package Structure

```
packages/atomos/
├── src/
│   ├── design-system/     # Tailwind variant utilities
│   │   ├── button-variants.ts
│   │   ├── card-variants.ts
│   │   ├── input-variants.ts
│   │   ├── link-variants.ts
│   │   ├── text-variants.ts
│   │   └── index.ts
│   ├── atoms/             # Fundamental UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── spinner.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   ├── *.stories.tsx  # Storybook stories
│   │   └── index.ts
│   ├── molecules/         # Composite components
│   │   ├── modal-shell.tsx
│   │   └── index.ts
│   ├── organisms/         # Complex components
│   │   ├── time-picker.tsx
│   │   └── index.ts
│   ├── styles.css         # Global Tailwind CSS
│   └── index.ts           # Main export
├── .storybook/            # Storybook configuration
│   ├── main.ts
│   └── preview.ts
├── dist/                  # Built files (generated)
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── README.md
└── GIT_SUBTREE_GUIDE.md
```

## 🚀 Next Steps

### 1. Run Storybook Locally

```bash
cd packages/atomos
pnpm storybook
```

This will open Storybook at http://localhost:6006 where you can explore all components interactively.

### 2. Build the Library

```bash
cd packages/atomos
pnpm build
```

Generates:

- `dist/index.js` (CommonJS)
- `dist/index.mjs` (ES Module)
- `dist/index.d.ts` (TypeScript definitions)

### 3. Setup Git Subtree (Optional)

To sync with https://github.com/binaryjack/atomos.dev:

```bash
# Add remote
git remote add atomos-origin https://github.com/binaryjack/atomos.dev.git

# Initial push
git subtree push --prefix=packages/atomos atomos-origin main
```

See `GIT_SUBTREE_GUIDE.md` for detailed instructions.

## 💡 Usage in Kompartido

### Option A: Use from Local Workspace

Add to `frontend/package.json`:

```json
{
  "dependencies": {
    "@atomos/ui": "workspace:*"
  }
}
```

Then install:

```bash
cd frontend
pnpm install
```

### Option B: Direct Import (During Development)

```typescript
// Import from workspace path
import { Button, Card } from '../../../packages/atomos/src'
```

### Example Usage

```tsx
import { Button, Card, Input, Spinner } from '@atomos/ui'

function MyComponent() {
  return (
    <Card variant="elevated" padding="lg">
      <h2>Welcome to Atomos</h2>
      <Input placeholder="Enter email" />
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Card>
  )
}
```

## 📚 Documentation

- **README.md** - Full library documentation
- **GIT_SUBTREE_GUIDE.md** - Git sync instructions
- **Storybook** - Interactive component playground (run `pnpm storybook`)

## 🔄 Development Workflow

1. **Develop** in `packages/atomos`
2. **Test** locally with Storybook
3. **Build** to validate
4. **Use** in Kompartido frontend
5. **Sync** to atomos.dev when ready

## ✨ Components Included

### Atoms

- ✅ Button (8 variants, 5 sizes)
- ✅ Card (4 variants, 5 padding sizes)
- ✅ Input (4 states, 3 sizes)
- ✅ Select
- ✅ Textarea
- ✅ Checkbox
- ✅ Badge
- ✅ Spinner
- ✅ Table components

### Molecules

- ✅ ModalShell (accessible, responsive)

### Organisms

- ✅ TimePicker (no external deps)

### Design System

- ✅ All styling variants
- ✅ Centralized design tokens
- ✅ Tailwind utilities

## 🛡️ Zero Breaking Changes

✅ **No changes** to existing Kompartido code
✅ **All original components** remain untouched
✅ **Workspace** configured properly
✅ **Build** successful with type definitions

You can safely continue working on Kompartido while gradually migrating to use Atomos components.

## 🎨 Customization

### Tailwind Theme

Edit `packages/atomos/tailwind.config.ts` to customize colors, spacing, etc.

### Component Variants

Edit files in `src/design-system/` to add new variants or modify existing ones.

## 📦 Publishing (Future)

When ready to publish to npm from atomos.dev:

```bash
# In atomos.dev repo (after git subtree sync)
npm version patch  # or minor/major
npm publish
```

## 🎯 Current Status

- ✅ Package structure created
- ✅ Components migrated (9 atoms, 1 molecule, 1 organism)
- ✅ Storybook configured
- ✅ Build successful
- ✅ TypeScript definitions generated
- ✅ Workspace integrated
- ✅ Documentation complete

## 🙏 Support

- Issues: https://github.com/binaryjack/atomos.dev/issues
- Kompartido: https://github.com/binaryjack/kompartido

---

**Happy coding! 🚀**
