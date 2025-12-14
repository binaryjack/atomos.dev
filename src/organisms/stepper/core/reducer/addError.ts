import { Payload, StepperError, StepperState } from '../models'

/** OCCURS When we add errors to the stepper */
export const addError = (state: StepperState, payload: Payload): StepperState | undefined => {
    const newError = payload.value as StepperError
    return { ...state, errors: [
        ...state.errors.filter(o => 
            o.stepId !== newError.stepId && 
            o.fieldName !== newError.fieldName), newError] } as StepperState
}
