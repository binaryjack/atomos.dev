import { createContext } from 'react'

export type ToggleableStateType = 'idle' | 'open' | 'closed'

export interface IToggleableContextType {
    toggleState: ToggleableStateType
    setToggleState: (commandId?: string) => void
}

export const toggleableContextTypeDefault: IToggleableContextType = {
    toggleState: 'idle',
    setToggleState: () => {
        return
    }
}

export const toggleableContext = createContext<IToggleableContextType>(toggleableContextTypeDefault)
