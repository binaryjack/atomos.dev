/**
 * Utility functions for className management in DatePicker_v3.
 * Replaces formular.dev.lib utilities.
 */

export interface IFClass {
    className: string
    condition: boolean
}

export const newIFClass = (className: string, condition?: boolean): IFClass => ({
    className,
    condition: condition ?? false
})

export const ifClass = (conditions: IFClass[]): string => {
    return conditions
        .filter((c) => c.condition)
        .map((c) => c.className)
        .join(' ')
}

export const cx = (...classNames: (string | undefined | null | false)[]): string => {
    return classNames.filter(Boolean).join(' ')
}
