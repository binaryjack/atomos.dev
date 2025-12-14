# Atomos Hooks

Reusable React hooks for common UI patterns and behaviors.

## Available Hooks

### `useDrawerPosition`

Smart positioning hook for drawers, popovers, tooltips, and modals. Automatically adjusts placement to avoid viewport overflow and provides responsive mobile-first behavior.

**Features:**
- Auto-positions to avoid viewport edges
- Smart vertical placement (above/below trigger)
- Mobile: centered modal mode
- Desktop: smart-positioned relative to trigger
- Handles window resize and scroll events
- Fully customizable breakpoints and dimensions

**Usage:**

```tsx
import { useRef } from 'react'
import { useDrawerPosition } from '@atomos/ui'

function MyDropdown() {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const drawerStyle = useDrawerPosition({
    containerRef: triggerRef,
    isOpen,
    desiredWidth: '300px',
    desiredHeight: '400px',
  })

  return (
    <>
      <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        Open Menu
      </button>
      {isOpen && (
        <div style={drawerStyle} className="my-drawer">
          Drawer content here
        </div>
      )}
    </>
  )
}
```

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerRef` | `RefObject<HTMLElement>` | required | Reference to trigger element |
| `isOpen` | `boolean` | required | Whether drawer is open |
| `desiredWidth` | `string \| number` | `300` | Desired drawer width |
| `desiredHeight` | `string \| number` | `350` | Desired drawer height |
| `mobileBreakpoint` | `number` | `640` | Viewport width for mobile mode |
| `mobileWidthRatio` | `number` | `0.9` | Mobile width as % of viewport |
| `mobileHeightRatio` | `number` | `0.7` | Mobile height as % of viewport |
| `mobileMinWidth` | `number` | `280` | Minimum mobile width (px) |
| `mobileMaxWidth` | `number` | `340` | Maximum mobile width (px) |
| `mobileMinHeight` | `number` | `320` | Minimum mobile height (px) |
| `mobileMaxHeight` | `number` | `450` | Maximum mobile height (px) |
| `viewportMargin` | `number` | `8` | Minimum margin from viewport edges |

**Returns:**

`CSSProperties` object with positioning styles (`position`, `top`, `left`, `width`, `height`, etc.)

**Advanced Example:**

```tsx
// Custom dropdown with specific mobile behavior
const dropdownStyle = useDrawerPosition({
  containerRef: buttonRef,
  isOpen: showDropdown,
  desiredWidth: '250px',
  desiredHeight: '300px',
  mobileBreakpoint: 768, // iPad breakpoint
  mobileWidthRatio: 0.85,
  mobileHeightRatio: 0.6,
  viewportMargin: 16, // More breathing room
})

// Date picker with compact mobile modal
const datePickerStyle = useDrawerPosition({
  containerRef: inputRef,
  isOpen: isDatePickerOpen,
  desiredWidth: '280px',
  desiredHeight: '300px',
  mobileMinWidth: 280,
  mobileMaxWidth: 340,
})

// Full-size context menu on mobile
const contextMenuStyle = useDrawerPosition({
  containerRef: targetRef,
  isOpen: showContextMenu,
  desiredWidth: 'auto',
  desiredHeight: 'auto',
  mobileWidthRatio: 0.95,
  mobileHeightRatio: 0.9,
})
```

## Future Hooks

Planned additions:
- `useClickOutside` - Detect clicks outside element
- `useFocusTrap` - Trap focus within element
- `useMediaQuery` - Responsive breakpoint detection
- `useDebounce` - Debounce values and callbacks
- `useLocalStorage` - Persistent state in localStorage
