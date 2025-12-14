/**
 * React Hook Form Adapter
 * Wraps React Hook Form to work with the generic FormAdapter interface
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'

import { FormAdapter, FormState, SetValueOptions } from '../core/formAdapter'

/**
 * Creates a FormAdapter from a React Hook Form instance
 * @param useForm - The useForm object from React Hook Form
 * @returns FormAdapter compatible with Stepper
 */
export const createRHFAdapter = (useForm: UseFormReturn<any, any>): FormAdapter => {
    return {
        getFormState: (): FormState => ({
            errors: useForm.formState.errors,
            touchedFields: useForm.formState.touchedFields,
            dirtyFields: useForm.formState.dirtyFields,
            isValidating: useForm.formState.isValidating,
            defaultValues: useForm.formState.defaultValues
        }),

        trigger: async (fields?: string[]): Promise<boolean> => {
            return await useForm.trigger(fields)
        },

        getValues: (name?: string | string[]): any => {
            return useForm.getValues(name as any)
        },

        setValue: (name: string, value: any, options?: SetValueOptions): void => {
            useForm.setValue(name, value, options)
        },

        resetField: (name: string): void => {
            useForm.resetField(name)
        },

        clearErrors: (name?: string | string[]): void => {
            useForm.clearErrors(name as any)
        },

        reset: (values?: any): void => {
            useForm.reset(values)
        },

        setFocus: (name: string): void => {
            useForm.setFocus(name)
        }
    }
}
