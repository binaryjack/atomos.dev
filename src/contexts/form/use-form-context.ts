/**
 * Form Context Hook
 * Provides access to form context value
 */

import { useContext } from 'react'
import { FormContext } from './form-context'
import { FormContextValue } from './form-types'

/**
 * Hook to access form context
 * @throws Error if used outside of FormProvider
 */
export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }

  return context
}
