/**
 * Interface for specifying key event callbacks for useKeyBindings hook.
 * Each callback receives the React KeyboardEvent for the target element.
 */
export interface IKeyBindings<T> {
    /** Called on any key event, before specific key callbacks. */
    onKeyCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the Enter key is pressed. */
    onEnterCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the Spacebar key is pressed. */
    onSpacebarCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the Escape key is pressed. */
    onEscapeCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the ArrowDown key is pressed. */
    onArrowDownCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the ArrowUp key is pressed. */
    onArrowUpCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the ArrowLeft key is pressed. */
    onArrowLeftCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the ArrowRight key is pressed. */
    onArrowRightCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the Delete key is pressed. */
    onDeleteCallback?: (e: React.KeyboardEvent<T>) => void
}

/**
 * React hook for handling keyboard events with customizable callbacks.
 *
 * @param options - Partial set of key event callbacks to handle.
 * @returns An object containing the handleKeyDown function to be used as an event handler.
 *
 * @example
 * const { handleKeyDown } = useKeyBindings<HTMLInputElement>({
 *   onEnterCallback: (e) => { ... },
 *   onEscapeCallback: (e) => { ... },
 * });
 * <input onKeyDown={handleKeyDown} />
 */
const useKeyBindings = <T>(options: Partial<IKeyBindings<T>>) => {
    const handleKeyDown = (e: React.KeyboardEvent<T>) => {
        if (options.onKeyCallback) {
            options.onKeyCallback(e)
        }
        if (options.onEnterCallback && e.key === 'Enter') {
            options.onEnterCallback(e)
        }
        if (options.onEscapeCallback && e.key === 'Escape') {
            options.onEscapeCallback(e)
        }
        if (options.onArrowDownCallback && e.key === 'ArrowDown') {
            options.onArrowDownCallback(e)
        }
        if (options.onArrowUpCallback && e.key === 'ArrowUp') {
            options.onArrowUpCallback(e)
        }
        if (options.onDeleteCallback && e.key === 'Delete') {
            options.onDeleteCallback(e)
        }
        if (options.onArrowLeftCallback && e.key === 'ArrowLeft') {
            options.onArrowLeftCallback(e)
        }
        if (options.onArrowRightCallback && e.key === 'ArrowRight') {
            options.onArrowRightCallback(e)
        }
        if (options.onSpacebarCallback && e.key === ' ') {
            options.onSpacebarCallback(e)
        }
    }

    return {
        handleKeyDown
    }
}

export default useKeyBindings
