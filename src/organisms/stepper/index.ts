/**
 * Stepper Component - Multi-Step Form Management
 * Form-library agnostic component for complex form flows
 */

// Main Components
export { default as Step } from './Step'
export { default as Stepper, useStepperContext } from './Stepper'
export type { StepperContext, StepperProps } from './Stepper'
export { default as StepperSummary } from './StepperSummary'

// Core Types & Interfaces
export type {
    CustomValidation,
    FormCommon, StepField, StepItem, StepperDefaultValue, StepperError, StepperOptions, StepperSibling, StepperState, ValidationMode
} from './core/models'

// Form Adapter
export type { FormAdapter, FormState, SetValueOptions } from './core/formAdapter'

// Adapters
export { createRHFAdapter } from './adapters/rhfAdapter'

// Utilities
export { newStepAction, newVisibilitySkipPattern } from './core/helpers'
export type { IStepAvailabilityTriggeredBy, ITrigger } from './core/models'

