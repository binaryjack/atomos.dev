import React, { ReactNode, useState } from 'react'

import { ToggleableStateType, toggleableContext } from './toggleable.context'

interface ToggleableProviderProps {
    children: ReactNode
    initialState?: ToggleableStateType
    id?: string
}

export const Toggleable: React.FC<ToggleableProviderProps> = ({ children, id, initialState }) => {
    const [toggleState, setToggleState] = useState<ToggleableStateType>(initialState ?? 'idle')

    const handleToggleState = (commandId?: string) => {
        if (id && commandId && id !== commandId) return
        setToggleState((prevState) => (prevState === 'open' ? 'closed' : 'open'))
    }

    return (
        <toggleableContext.Provider value={{ toggleState, setToggleState: handleToggleState }}>
            {children}
        </toggleableContext.Provider>
    )
}
