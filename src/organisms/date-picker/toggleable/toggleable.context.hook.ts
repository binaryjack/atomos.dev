import { useContext } from 'react'
import {
    IToggleableContextType,
    toggleableContext,
    toggleableContextTypeDefault
} from './toggleable.context'

export const useToggleableContext = (): IToggleableContextType => {
    const context = useContext(toggleableContext)
    if (!context) {
        console.warn('useToggleableContext must be used within a Toggleable provider')
        return toggleableContextTypeDefault
    }
    return context
}
