/**
 * Form Context Types
 * Defines interfaces for form state management and validation
 */

/**
 * Validation rules for a form field
 */
export interface ValidationRule {
  max: number | null
  min: number | null
  minLength: number | null
  maxLength: number | null
  pattern: RegExp | null
  required: boolean | null
  error: string
}

/**
 * Form field definition with validation
 */
export interface FormField {
  name: string
  value: string | number | boolean | null
  label: string
  validation: Partial<ValidationRule>
  isValid: boolean
  touched?: boolean // Track if field has been interacted with
}

/**
 * Form state managed by useReducer
 */
export interface FormState {
  originalData: FormField[]
  data: FormField[]
  isValid: boolean
  isLoading: boolean
}

/**
 * Form reducer action types
 */
export enum FormActionType {
  INITIALIZE = 'INITIALIZE',
  UPDATE_FIELD = 'UPDATE_FIELD',
  SET_FIELD_VALUE = 'SET_FIELD_VALUE', // Set value without marking as touched
  VALIDATE_FIELD = 'VALIDATE_FIELD',
  VALIDATE_ALL = 'VALIDATE_ALL',
  SET_LOADING = 'SET_LOADING',
  RESET = 'RESET',
  SET_ERROR = 'SET_ERROR',
}

/**
 * Form reducer actions
 */
export type FormAction =
  | { type: FormActionType.INITIALIZE; payload: FormField[] }
  | {
      type: FormActionType.UPDATE_FIELD
      payload: { name: string; value: string | number | boolean | null }
    }
  | {
      type: FormActionType.SET_FIELD_VALUE
      payload: { name: string; value: string | number | boolean | null }
    }
  | { type: FormActionType.VALIDATE_FIELD; payload: { name: string } }
  | { type: FormActionType.VALIDATE_ALL }
  | { type: FormActionType.SET_LOADING; payload: boolean }
  | { type: FormActionType.RESET }
  | { type: FormActionType.SET_ERROR; payload: { name: string; error: string } }

/**
 * Form context value exposed to consumers
 */
export interface FormContextValue {
  state: FormState
  fields: FormField[]
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
 * Form submit helpers passed to submitCallback
 */
export interface FormSubmitHelpers {
  setLoading: (loading: boolean) => void
  setError: (field: string, error: string) => void
  reset: () => void
}

/**
 * Form submission callback type
 */
export type FormSubmitCallback = (
  fields: FormField[],
  helpers: FormSubmitHelpers
) => void | Promise<void>

/**
 * Form Provider Props
 */
export interface FormProviderProps {
  children: React.ReactNode
  initialFields: FormField[]
  onSubmit: FormSubmitCallback
  /** Optional callback when form submission succeeds */
  onSuccess?: (message?: string) => void
  /** Optional callback when form submission fails */
  onError?: (error: string) => void
  /** Submit button label (default: "Submit") */
  submitLabel?: string
  /** Show reset button (default: false) */
  showReset?: boolean
  /** Reset button label (default: "Reset") */
  resetLabel?: string
  /** Form className */
  className?: string
  /** Form testId */
  testId?: string
}

/**
 * Form Provider Ref - Allows parent to control form imperatively
 */
export interface FormProviderRef {
  reset: () => void
  validateAll: () => boolean
  setFieldValue: (name: string, value: string | number | boolean | null) => void
  setFieldError: (name: string, error: string) => void
  getFieldValue: (name: string) => string | number | boolean | null
  setLoading: (loading: boolean) => void
}
