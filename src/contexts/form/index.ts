/**
 * Form Context Module
 * Exports all form-related types, components, and hooks
 */

export { FormContext, FormProvider } from './form-context'
export { formReducer, initialFormState } from './form-reducer'
export {
  FormActionType,
  type FormAction,
  type FormContextValue,
  type FormField,
  type FormProviderProps,
  type FormProviderRef,
  type FormState,
  type FormSubmitCallback,
  type FormSubmitHelpers,
  type ValidationRule,
} from './form-types'
export { isFieldValid, validateAllFields, validateField } from './form-validator'
export { useFormContext } from './use-form-context'
