/**
 * Form Context Provider
 * Independent Context API for form state management with validation
 */

import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
} from 'react'
import { Button } from '../../atoms/button'
import { formReducer, initialFormState } from './form-reducer'
import { FormActionType, FormContextValue, FormProviderProps, FormProviderRef } from './form-types'

/**
 * Form Context
 */
export const FormContext = createContext<FormContextValue | undefined>(undefined)

/**
 * Form Commands Component
 * Renders submit and optional reset buttons
 */
interface FormCommandsProps {
  isLoading: boolean
  submitLabel: string
  showReset: boolean
  resetLabel: string
  onReset: () => void
}

const FormCommands = ({
  isLoading,
  submitLabel,
  showReset,
  resetLabel,
  onReset,
}: FormCommandsProps) => {
  return (
    <div className="flex gap-4">
      <Button type="submit" variant="primary" size="md" isLoading={isLoading} fullWidth>
        {isLoading ? 'Submitting...' : submitLabel}
      </Button>
      {showReset && (
        <Button type="button" variant="secondary" size="md" onClick={onReset} disabled={isLoading}>
          {resetLabel}
        </Button>
      )}
    </div>
  )
}

/**
 * Form Provider Component
 * Wraps children with <form>, manages state, handles validation and submission
 *
 * @example
 * ```tsx
 * const fields = [
 *   { name: 'email', value: '', label: 'Email', validation: { required: true }, isValid: false },
 *   { name: 'password', value: '', label: 'Password', validation: { required: true, minLength: 8 }, isValid: false }
 * ]
 *
 * <FormProvider
 *   initialFields={fields}
 *   onSubmit={(fields, helpers) => {
 *     console.log('Submitting:', fields)
 *     helpers.setLoading(false)
 *   }}
 *   onSuccess={(msg) => console.log(msg)}
 *   onError={(err) => console.error(err)}
 * >
 *   <FormInput id="email" />
 *   <FormInput id="password" type="password" />
 * </FormProvider>
 * ```
 */
export const FormProvider = forwardRef<FormProviderRef, FormProviderProps>(
  (
    {
      children,
      initialFields,
      onSubmit,
      onSuccess,
      onError,
      submitLabel = 'Submit',
      showReset = false,
      resetLabel = 'Reset',
      className = '',
      testId,
    },
    ref
  ) => {
    const [state, dispatch] = useReducer(formReducer, {
      ...initialFormState,
      originalData: initialFields,
      data: initialFields,
    })

    // Initialize form with validation on mount
    useEffect(() => {
      dispatch({
        type: FormActionType.INITIALIZE,
        payload: initialFields,
      })
    }, []) // Only run on mount

    /**
     * Get field value by name
     */
    const getFieldValue = useCallback(
      (name: string): string | number | boolean | null => {
        const field = state.data.find((f) => f.name === name)
        return field ? field.value : null
      },
      [state.data]
    )

    /**
     * Get field error by name
     */
    const getFieldError = useCallback(
      (name: string): string | undefined => {
        const field = state.data.find((f) => f.name === name)
        return field?.validation.error || undefined
      },
      [state.data]
    )

    /**
     * Set field value programmatically (without marking as touched)
     * Use this for pre-populating form fields in edit mode
     */
    const setFieldValue = useCallback((name: string, value: string | number | boolean | null) => {
      dispatch({
        type: FormActionType.SET_FIELD_VALUE,
        payload: { name, value },
      })
    }, [])

    /**
     * Set field error manually
     */
    const setFieldError = useCallback((name: string, error: string) => {
      dispatch({
        type: FormActionType.SET_ERROR,
        payload: { name, error },
      })
    }, [])

    /**
     * Validate a single field
     * @returns True if field is valid
     */
    const validateField = useCallback(
      (name: string): boolean => {
        dispatch({
          type: FormActionType.VALIDATE_FIELD,
          payload: { name },
        })

        // Get updated field validity
        const field = state.data.find((f) => f.name === name)
        return field?.isValid ?? false
      },
      [state.data]
    )

    /**
     * Validate all fields
     * @returns True if all fields are valid
     */
    const validateAll = useCallback((): boolean => {
      dispatch({ type: FormActionType.VALIDATE_ALL })

      // Check if all fields will be valid after validation
      const allValid = state.data.every((field) => {
        // Re-validate each field to get current state
        const validatedField = state.data.find((f) => f.name === field.name)
        return validatedField?.isValid ?? false
      })

      return allValid
    }, [state.data])

    /**
     * Handle field blur event
     * Validates field and updates state
     */
    const handleBlur = useCallback((name: string) => {
      dispatch({
        type: FormActionType.VALIDATE_FIELD,
        payload: { name },
      })
    }, [])

    /**
     * Handle field change event
     * Updates field value and optionally validates
     */
    const handleChange = useCallback((name: string, value: string | number | boolean | null) => {
      dispatch({
        type: FormActionType.UPDATE_FIELD,
        payload: { name, value },
      })
    }, [])

    /**
     * Reset form to original state
     */
    const reset = useCallback(() => {
      dispatch({ type: FormActionType.RESET })
    }, [])

    /**
     * Set loading state
     */
    const setLoading = useCallback((loading: boolean) => {
      dispatch({
        type: FormActionType.SET_LOADING,
        payload: loading,
      })
    }, [])

    /**
     * Generate errors object for easy access
     */
    const errors = useMemo(() => {
      return state.data.reduce(
        (acc, field) => {
          if (field.validation.error) {
            acc[field.name] = field.validation.error
          }
          return acc
        },
        {} as Record<string, string>
      )
    }, [state.data])

    /**
     * Handle form submission
     */
    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        dispatch({ type: FormActionType.VALIDATE_ALL })

        // Check if all fields are valid
        const hasErrors = state.data.some((field) => !field.isValid)
        if (hasErrors) {
          onError?.('Please fix the errors in the form')
          return
        }

        // Call onSubmit with fields and helpers
        try {
          setLoading(true)
          await onSubmit(state.data, { setLoading, setError: setFieldError, reset })
          onSuccess?.('Form submitted successfully')
        } catch (error) {
          console.error('Form submission error:', error)
          const errorMessage =
            error instanceof Error ? error.message : 'An error occurred while submitting the form'
          onError?.(errorMessage)
          setLoading(false)
        }
      },
      [state.data, onSubmit, onSuccess, onError, setLoading, setFieldError, reset]
    )

    /**
     * Expose methods via ref for external access
     */
    useImperativeHandle(ref, () => ({
      setFieldValue,
      getFieldValue,
      setFieldError,
      validateAll,
      reset,
      setLoading,
    }))

    /**
     * Context value
     */
    const value = useMemo<FormContextValue>(
      () => ({
        state,
        fields: state.data,
        errors,
        isValid: state.isValid,
        isLoading: state.isLoading,
        getFieldValue,
        getFieldError,
        setFieldValue,
        setFieldError,
        validateField,
        validateAll,
        handleBlur,
        handleChange,
        reset,
        setLoading,
      }),
      [
        state,
        errors,
        getFieldValue,
        getFieldError,
        setFieldValue,
        setFieldError,
        validateField,
        validateAll,
        handleBlur,
        handleChange,
        reset,
        setLoading,
      ]
    )

    return (
      <FormContext.Provider value={value}>
        <form onSubmit={handleSubmit} className={`space-y-6 ${className}`} data-testid={testId}>
          <div className="space-y-4">{children}</div>
          <div>
            <FormCommands
              isLoading={state.isLoading}
              submitLabel={submitLabel}
              showReset={showReset}
              resetLabel={resetLabel}
              onReset={reset}
            />
          </div>
        </form>
      </FormContext.Provider>
    )
  }
)

FormProvider.displayName = 'FormProvider'
