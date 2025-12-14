/**
 * Atomos FormProvider Adapter
 * Connects Atomos FormProvider to the generic Stepper FormAdapter interface
 */

import { FormAdapter, FormState } from '../core/formAdapter'

/**
 * Atomos FormContext interface (from @atomos/ui contexts/form)
 */
interface AtomosFormContext {
    state: {
        data: Array<{
            name: string
            value: string | number | boolean | null
            touched?: boolean
        }>
        originalData: Array<{
            name: string
            value: string | number | boolean | null
        }>
        isValid: boolean
        isLoading: boolean
    }
    fields: Array<{
        name: string
        value: string | number | boolean | null
        label: string
        isValid: boolean
        touched?: boolean
    }>
    errors: Record<string, string>
    isValid: boolean
    isLoading: boolean
    getFieldValue: (name: string) => string | number | boolean | null
    getFieldError: (name: string) => string | undefined
    setFieldValue: (name: string, value: string | number | boolean | null) => void
    setFieldError: (name: string, error: string) => void
    validateField: (name: string) => boolean
    validateAll: () => boolean
    handleBlur: (name: string) => void
    handleChange: (name: string, value: string | number | boolean | null) => void
    reset: () => void
    setLoading: (loading: boolean) => void
}

/**
 * Creates a FormAdapter for Atomos FormProvider
 * @param formContext - Atomos form context from useFormContext()
 * @returns FormAdapter compatible with Stepper
 */
export const createAtomosFormAdapter = (formContext: AtomosFormContext): FormAdapter => {
    return {
        getFormState: (): FormState => {
            // Build errors object from Atomos errors
            const errors: Record<string, any> = {}
            Object.entries(formContext.errors).forEach(([name, message]) => {
                if (message) {
                    errors[name] = { message, type: 'validation' }
                }
            })

            // Build touched fields object
            const touchedFields: Record<string, boolean> = {}
            formContext.fields.forEach(field => {
                if (field.touched) {
                    touchedFields[field.name] = true
                }
            })

            // Build dirty fields object (fields different from original)
            const dirtyFields: Record<string, boolean> = {}
            formContext.state.data.forEach(field => {
                const original = formContext.state.originalData.find(o => o.name === field.name)
                if (original && original.value !== field.value) {
                    dirtyFields[field.name] = true
                }
            })

            return {
                errors,
                touchedFields,
                dirtyFields,
                isValidating: formContext.isLoading,
                defaultValues: formContext.state.originalData.reduce((acc, field) => ({
                    ...acc,
                    [field.name]: field.value
                }), {})
            }
        },

        trigger: async (fields?: string[]): Promise<boolean> => {
            if (!fields || fields.length === 0) {
                // Validate all fields
                return formContext.validateAll()
            }
            
            // Validate specific fields
            let allValid = true
            for (const fieldName of fields) {
                const isValid = formContext.validateField(fieldName)
                if (!isValid) {
                    allValid = false
                }
            }
            return allValid
        },

        getValues: (name?: string | string[]): any => {
            if (!name) {
                // Return all values as object
                return formContext.fields.reduce((acc, field) => ({
                    ...acc,
                    [field.name]: field.value
                }), {})
            }
            
            if (Array.isArray(name)) {
                // Return multiple values as array
                return name.map(n => formContext.getFieldValue(n))
            }
            
            // Return single value
            return formContext.getFieldValue(name)
        },

        setValue: (name: string, value: any): void => {
            formContext.setFieldValue(name, value)
        },

        resetField: (name: string): void => {
            const original = formContext.state.originalData.find(f => f.name === name)
            if (original) {
                formContext.setFieldValue(name, original.value)
                formContext.setFieldError(name, '')
            }
        },

        clearErrors: (name?: string | string[]): void => {
            if (!name) {
                // Clear all errors - reset all field errors
                formContext.fields.forEach(field => {
                    formContext.setFieldError(field.name, '')
                })
                return
            }
            
            if (Array.isArray(name)) {
                // Clear multiple field errors
                name.forEach(n => formContext.setFieldError(n, ''))
            } else {
                // Clear single field error
                formContext.setFieldError(name, '')
            }
        },

        reset: (): void => {
            formContext.reset()
        }

        // Note: Atomos FormProvider doesn't have setFocus, so we omit it
    }
}
