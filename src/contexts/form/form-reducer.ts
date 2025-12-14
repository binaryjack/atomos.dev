/**
 * Form State Reducer
 * Manages form state transitions using useReducer pattern
 */

import { FormAction, FormActionType, FormState } from './form-types'
import { validateAllFields, validateField } from './form-validator'

/**
 * Initial form state
 */
export const initialFormState: FormState = {
  originalData: [],
  data: [],
  isValid: true, // Start as valid (pristine) - validation happens after user interaction
  isLoading: false,
}

/**
 * Form reducer - handles all form state transitions
 */
export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case FormActionType.INITIALIZE: {
      // Initialize fields with validation to set correct disabled state
      // But keep them as pristine (untouched) so errors don't show until interaction
      const initializedFields = action.payload.map((field) => {
        const validated = validateField(field)
        return {
          ...validated,
          touched: false, // Mark as pristine - errors won't display until user interacts
        }
      })

      // Determine if form is valid (for button disabled state)
      const isFormValid = initializedFields.every((field) => field.isValid)

      return {
        ...state,
        originalData: initializedFields,
        data: initializedFields,
        isValid: isFormValid, // Form validity reflects actual field validation
        isLoading: false,
      }
    }

    case FormActionType.SET_FIELD_VALUE: {
      // Set field value WITHOUT marking as touched (for programmatic updates like edit mode)
      const { name, value } = action.payload

      const updatedData = state.data.map((field) => {
        if (field.name === name) {
          const updated = { ...field, value }
          // Validate but don't mark as touched
          const validated = validateField(updated)
          return { ...validated, touched: false }
        }
        return field
      })

      // Recalculate form validity
      const isValid = updatedData.every((field) => field.isValid)

      return {
        ...state,
        data: updatedData,
        isValid,
      }
    }

    case FormActionType.UPDATE_FIELD: {
      const { name, value } = action.payload
      const fieldToUpdate = state.data.find((f) => f.name === name)

      // Update value, mark as touched, but only validate if already touched before
      const updatedData = state.data.map((field) => {
        if (field.name === name) {
          const updated = { ...field, value, touched: true }
          // Only validate if field was already touched (user has interacted before)
          return fieldToUpdate?.touched ? validateField(updated) : updated
        }
        return field
      })

      // Recalculate form validity based on touched fields only
      const isValid = updatedData.every((field) => !field.touched || field.isValid)

      return {
        ...state,
        data: updatedData,
        isValid,
      }
    }

    case FormActionType.VALIDATE_FIELD: {
      const { name } = action.payload
      const fieldToValidate = state.data.find((f) => f.name === name)

      if (!fieldToValidate) {
        return state
      }

      // Validate the specific field and mark as touched
      const updatedData = state.data.map((field) => {
        if (field.name === name) {
          const validated = validateField(field)
          return { ...validated, touched: true }
        }
        return field
      })

      // Recalculate form validity
      const isValid = updatedData.every((field) => field.isValid)

      return {
        ...state,
        data: updatedData,
        isValid,
      }
    }

    case FormActionType.VALIDATE_ALL: {
      const [validatedFields, isFormValid] = validateAllFields(state.data)

      // Mark all fields as touched to show errors
      const touchedFields = validatedFields.map((field) => ({ ...field, touched: true }))

      return {
        ...state,
        data: touchedFields,
        isValid: isFormValid,
      }
    }

    case FormActionType.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      }
    }

    case FormActionType.RESET: {
      return {
        ...state,
        data: state.originalData.map((field) => ({ ...field, touched: false })),
        isValid: state.originalData.every((field) => field.isValid),
        isLoading: false,
      }
    }

    case FormActionType.SET_ERROR: {
      const { name, error } = action.payload

      const updatedData = state.data.map((field) => {
        if (field.name === name) {
          return {
            ...field,
            isValid: false,
            touched: true,
            validation: { ...field.validation, error },
          }
        }
        return field
      })

      // Recalculate form validity
      const isValid = updatedData.every((field) => field.isValid)

      return {
        ...state,
        data: updatedData,
        isValid,
      }
    }

    default:
      return state
  }
}
