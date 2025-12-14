import { Payload, StepperState } from '../models'

/** OCCURS When we add errors to the stepper */
export const removeError = (state: StepperState, payload: Payload): StepperState | undefined => {
    const errorToRemove = payload.value as string
    return {
        ...state,
        errors: [
            ...state.errors.filter((o) => o.fieldName !== errorToRemove && o.stepId !== payload.stepId)
        ]
    } as StepperState
}
