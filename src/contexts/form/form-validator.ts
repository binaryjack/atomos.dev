/**
 * Form Validation Engine
 * Validates fields against their validation rules
 */

import { FormField } from './form-types'

/**
 * Validates a single field against its validation rules
 * @param field - The field to validate
 * @returns Updated field with isValid flag and error message
 */
export const validateField = (field: FormField): FormField => {
  const { value, validation } = field
  const errors: string[] = []

  // Required validation
  if (validation.required) {
    if (value === null || value === undefined || value === '') {
      errors.push(validation.error || 'This field is required')
      return { ...field, isValid: false, validation: { ...validation, error: errors[0] } }
    }
  }

  // If field is empty and not required, skip other validations
  if (value === null || value === undefined || value === '') {
    return { ...field, isValid: true, validation: { ...validation, error: '' } }
  }

  // String-based validations
  if (typeof value === 'string') {
    // minLength validation
    if (validation.minLength !== null && validation.minLength !== undefined) {
      if (value.length < validation.minLength) {
        errors.push(validation.error || `Minimum length is ${validation.minLength}`)
      }
    }

    // maxLength validation
    if (validation.maxLength !== null && validation.maxLength !== undefined) {
      if (value.length > validation.maxLength) {
        errors.push(validation.error || `Maximum length is ${validation.maxLength}`)
      }
    }

    // pattern validation (regex)
    if (validation.pattern) {
      if (!validation.pattern.test(value)) {
        errors.push(validation.error || 'Invalid format')
      }
    }
  }

  // Number-based validations
  if (typeof value === 'number') {
    // min validation
    if (validation.min !== null && validation.min !== undefined) {
      if (value < validation.min) {
        errors.push(validation.error || `Minimum value is ${validation.min}`)
      }
    }

    // max validation
    if (validation.max !== null && validation.max !== undefined) {
      if (value > validation.max) {
        errors.push(validation.error || `Maximum value is ${validation.max}`)
      }
    }
  }

  // If we have errors, return first error
  if (errors.length > 0) {
    return {
      ...field,
      isValid: false,
      validation: { ...validation, error: errors[0] },
    }
  }

  // Field is valid
  return {
    ...field,
    isValid: true,
    validation: { ...validation, error: '' },
  }
}

/**
 * Validates all fields in a form
 * @param fields - Array of fields to validate
 * @returns Tuple of [validated fields array, overall form validity]
 */
export const validateAllFields = (fields: FormField[]): [FormField[], boolean] => {
  const validatedFields = fields.map(validateField)
  const isValid = validatedFields.every((field) => field.isValid)
  return [validatedFields, isValid]
}

/**
 * Checks if a field passes validation without mutating
 * @param field - The field to check
 * @returns True if field is valid
 */
export const isFieldValid = (field: FormField): boolean => {
  const validatedField = validateField(field)
  return validatedField.isValid
}
