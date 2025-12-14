import { useCallback, useEffect, useState, type CSSProperties, type RefObject } from 'react'

export interface UseDrawerPositionOptions {
  /** Reference to the trigger/container element */
  containerRef: RefObject<HTMLElement | null>
  /** Desired drawer width (CSS string like '300px' or number) */
  desiredWidth?: string | number
  /** Desired drawer height (CSS string like '350px' or number) */
  desiredHeight?: string | number
  /** Breakpoint for mobile mode (default: 640) */
  mobileBreakpoint?: number
  /** Whether drawer is currently open */
  isOpen: boolean
  /** Mobile modal width as percentage of viewport (default: 0.9) */
  mobileWidthRatio?: number
  /** Mobile modal height as percentage of viewport (default: 0.7) */
  mobileHeightRatio?: number
  /** Minimum mobile width in px (default: 280) */
  mobileMinWidth?: number
  /** Maximum mobile width in px (default: 340) */
  mobileMaxWidth?: number
  /** Minimum mobile height in px (default: 320) */
  mobileMinHeight?: number
  /** Maximum mobile height in px (default: 450) */
  mobileMaxHeight?: number
  /** Viewport margin/gutter in px (default: 8) */
  viewportMargin?: number
}

/**
 * Custom hook for smart drawer positioning that adapts to viewport constraints.
 * 
 * Features:
 * - Auto-positions drawer to avoid viewport overflow
 * - Centers as modal on mobile devices
 * - Adjusts placement based on available space (above/below)
 * - Handles window resize and scroll events
 * - Returns computed CSS styles for positioning
 * 
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * const drawerStyle = useDrawerPosition({
 *   containerRef,
 *   isOpen: isDrawerOpen,
 *   desiredWidth: '300px',
 *   desiredHeight: '400px'
 * })
 * 
 * return (
 *   <div ref={containerRef}>
 *     <button onClick={() => setIsDrawerOpen(true)}>Open</button>
 *     {isDrawerOpen && (
 *       <div style={drawerStyle}>Drawer content</div>
 *     )}
 *   </div>
 * )
 * ```
 */
export const useDrawerPosition = ({
  containerRef,
  desiredWidth = 300,
  desiredHeight = 350,
  mobileBreakpoint = 640,
  isOpen,
  mobileWidthRatio = 0.9,
  mobileHeightRatio = 0.7,
  mobileMinWidth = 280,
  mobileMaxWidth = 340,
  mobileMinHeight = 320,
  mobileMaxHeight = 450,
  viewportMargin = 8,
}: UseDrawerPositionOptions): CSSProperties => {
  const [drawerStyle, setDrawerStyle] = useState<CSSProperties>({})

  const parseSize = useCallback((value: string | number, fallback: number): number => {
    if (typeof value === 'number') return value
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }, [])

  const updateDrawerPosition = useCallback(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Mobile mode: centered modal
    if (viewportWidth <= mobileBreakpoint) {
      const modalWidth = Math.min(
        Math.max(viewportWidth * mobileWidthRatio, mobileMinWidth),
        mobileMaxWidth
      )
      const modalHeight = Math.min(
        Math.max(viewportHeight * mobileHeightRatio, mobileMinHeight),
        mobileMaxHeight
      )

      setDrawerStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: modalWidth,
        height: modalHeight,
        maxWidth: viewportWidth - viewportMargin * 2,
        maxHeight: viewportHeight - viewportMargin * 2,
      })
      return
    }

    // Desktop mode: smart positioning
    const width = Math.min(
      parseSize(desiredWidth, 300),
      viewportWidth - viewportMargin * 2
    )
    const height = Math.min(
      parseSize(desiredHeight, 350),
      viewportHeight - viewportMargin * 2
    )

    // Determine vertical placement based on available space
    const spaceBelow = viewportHeight - rect.bottom - viewportMargin
    const spaceAbove = rect.top - viewportMargin

    let top: number
    let finalHeight: number

    if (spaceBelow >= height) {
      // Enough space below
      top = rect.bottom + viewportMargin
      finalHeight = height
    } else if (spaceAbove >= height) {
      // Enough space above
      top = rect.top - height - viewportMargin
      finalHeight = height
    } else if (spaceBelow >= spaceAbove) {
      // More space below, but not enough - fit what we can
      finalHeight = Math.max(Math.min(height, spaceBelow), 200)
      top = rect.bottom + viewportMargin
    } else {
      // More space above, but not enough - fit what we can
      finalHeight = Math.max(Math.min(height, spaceAbove), 200)
      top = rect.top - finalHeight - viewportMargin
    }

    // Horizontal positioning: clamp to viewport
    const left = Math.min(
      Math.max(rect.left, viewportMargin),
      Math.max(viewportMargin, viewportWidth - width - viewportMargin)
    )

    setDrawerStyle({
      position: 'fixed',
      top,
      left,
      width,
      height: finalHeight,
      maxHeight: viewportHeight - viewportMargin * 2,
      maxWidth: viewportWidth - viewportMargin * 2,
    })
  }, [
    containerRef,
    desiredWidth,
    desiredHeight,
    mobileBreakpoint,
    mobileWidthRatio,
    mobileHeightRatio,
    mobileMinWidth,
    mobileMaxWidth,
    mobileMinHeight,
    mobileMaxHeight,
    viewportMargin,
    parseSize,
  ])

  useEffect(() => {
    if (!isOpen) return

    updateDrawerPosition()

    const onResize = () => updateDrawerPosition()
    const onScroll = () => updateDrawerPosition()

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, true)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [isOpen, updateDrawerPosition])

  return drawerStyle
}
