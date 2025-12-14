/**
 * Form Adapter Interface
 * Provides a generic abstraction layer for any form library (RHF, Formik, etc.)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Generic form state structure
 */
export interface FormState {
    /** Field errors keyed by field name */
    errors: { [x: string]: any }
    /** Fields that have been touched/interacted with */
    touchedFields: { [x: string]: any }
    /** Fields that have been modified from default values */
    dirtyFields: { [x: string]: any }
    /** Whether form is currently validating */
    isValidating: boolean
    /** Default/initial form values */
    defaultValues?: any
}

/**
 * Options for setValue operation
 */
export interface SetValueOptions {
    shouldDirty?: boolean
    shouldTouch?: boolean
    shouldValidate?: boolean
}

/**
 * Form Adapter Interface
 * Any form library must implement this interface to work with Stepper
 */
export interface FormAdapter {
    // State Access
    /** Get current form state (errors, touched, dirty, validating, defaults) */
    getFormState: () => FormState

    // Validation
    /** Trigger validation for specific fields or all fields */
    trigger: (fields?: string[]) => Promise<boolean>

    // Value Operations
    /** Get form values - all values, single field, or multiple fields */
    getValues: (name?: string | string[]) => any

    /** Set a field value with optional behavior flags */
    setValue: (name: string, value: any, options?: SetValueOptions) => void

    // Field Operations
    /** Reset a single field to its default value */
    resetField: (name: string) => void

    /** Clear errors for specific fields or all fields */
    clearErrors: (name?: string | string[]) => void

    // Form Operations
    /** Reset entire form to default values */
    reset: (values?: any) => void

    /** Set focus to a specific field (optional) */
    setFocus?: (name: string) => void
}
