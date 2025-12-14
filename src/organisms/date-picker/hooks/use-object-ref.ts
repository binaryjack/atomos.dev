import { useRef } from 'react'

/**
 * useObjectRef is a React hook that simplifies working with DOM refs by providing a typed ref object and a casted reference to its current value.
 *
 * @template T - The type of HTMLElement to reference.
 * @returns {{ mainRef: React.RefObject<T>, castedRefObject: T | null }}
 *
 * @example
 * const { mainRef, castedRefObject } = useObjectRef<HTMLDivElement>()
 * <div ref={mainRef} />
 * // castedRefObject will be the div element after mount, or null before mount
 */
export const useObjectRef = <T extends HTMLElement>() => {
    const mainRef = useRef<T>(null)
    const castedRefObject = mainRef.current as T | null
    return { mainRef, castedRefObject }
}
