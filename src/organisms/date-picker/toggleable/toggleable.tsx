import React, { ReactNode, useState } from 'react'

import { ToggleableStateType, toggleableContext } from './toggleable.context'

interface ToggleableProviderProps {
  children: ReactNode
  initialState?: ToggleableStateType
  id?: string
}

export const Toggleable: React.FC<ToggleableProviderProps> = ({ children, id, initialState }) => {
  const [toggleState, setToggleState] = useState<ToggleableStateType>(initialState ?? 'idle')

  const handleToggleState = (newStateOrCommandId?: string | ToggleableStateType) => {
    // If it's a valid state, set it directly
    if (
      newStateOrCommandId === 'open' ||
      newStateOrCommandId === 'closed' ||
      newStateOrCommandId === 'idle'
    ) {
      setToggleState(newStateOrCommandId)
      return
    }

    // Otherwise, treat it as a commandId and toggle
    if (id && newStateOrCommandId && id !== newStateOrCommandId) return
    setToggleState((prevState) => (prevState === 'open' ? 'closed' : 'open'))
  }

  return (
    <toggleableContext.Provider value={{ toggleState, setToggleState: handleToggleState }}>
      {children}
    </toggleableContext.Provider>
  )
}
