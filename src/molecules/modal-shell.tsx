'use client'

import { useCallback, useEffect } from 'react'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl'

export interface IModalShellProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  icon?: string
  size?: ModalSize
  children: React.ReactNode
  showHeader?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  testId?: string
}

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
}

/**
 * ModalShell - Unified modal wrapper for all dialogs
 *
 * Features:
 * - Translucent blur overlay (70% opacity on desktop)
 * - Full screen on mobile, centered dialog on desktop
 * - Consistent styling across the application
 * - ESC key to close
 * - Click backdrop to close (optional)
 * - Prevents body scroll when open
 */
export const ModalShell = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  size = 'md',
  children,
  showHeader = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  testId,
}: IModalShellProps) => {
  // Handle ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose()
      }
    },
    [onClose, closeOnEscape]
  )

  // Lock body scroll and attach keyboard listener
  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      data-testid={testId}
    >
      {/* Modal Container */}
      <div
        className={`
          bg-gray-900 border-gray-800 shadow-xl
          w-full h-full
          sm:h-auto sm:max-h-[90vh] sm:border sm:rounded-lg
          flex flex-col overflow-hidden
          ${SIZE_CLASSES[size]}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {showHeader && title && (
          <div className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-start shrink-0">
            <div className="flex-1 min-w-0 pr-4">
              <h2
                id="modal-title"
                className="text-gray-100 text-lg sm:text-xl font-semibold truncate flex items-center gap-2"
              >
                {icon && <span>{icon}</span>}
                {title}
              </h2>
              {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-100 hover:bg-gray-800 p-1 rounded transition-colors shrink-0"
              aria-label="Close modal"
              data-testid={testId ? `${testId}-close-btn` : undefined}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
      </div>
    </div>
  )
}

ModalShell.displayName = 'ModalShell'
