import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface PortalContextType {
  slots: Record<string, ReactNode>
  setSlot: (name: string, content: ReactNode) => void
}

const PortalContext = createContext<PortalContextType | null>(null)

export const PortalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<Record<string, ReactNode>>({})

  const setSlot = useCallback((name: string, content: ReactNode) => {
    setSlots((prev) => ({ ...prev, [name]: content }))
  }, [])

  return <PortalContext.Provider value={{ slots, setSlot }}>{children}</PortalContext.Provider>
}

export const usePortal = () => {
  const context = useContext(PortalContext)
  if (!context) {
    throw new Error('usePortal must be used within PortalProvider')
  }
  return context
}

interface PortalProps {
  id: string
  slotName: string
  children: ReactNode
}

export const Portal: React.FC<PortalProps> = ({ slotName, children }) => {
  const { setSlot } = usePortal()
  const prevChildrenRef = React.useRef<ReactNode>(children)

  // Only update when content changes - use ref to track previous value
  if (prevChildrenRef.current !== children) {
    prevChildrenRef.current = children
    // Call setSlot during render (not in effect) to avoid re-render loops
    // This is safe because we're updating a parent context
    queueMicrotask(() => setSlot(slotName, children))
  }

  // Cleanup on unmount
  React.useEffect(() => {
    return () => setSlot(slotName, null)
  }, [slotName, setSlot])

  return null
}

interface PortalSlotProps {
  slotName: string
  className?: string
}

export const PortalSlot: React.FC<PortalSlotProps> = ({ slotName, className }) => {
  const { slots } = usePortal()
  return <div className={className}>{slots[slotName]}</div>
}
