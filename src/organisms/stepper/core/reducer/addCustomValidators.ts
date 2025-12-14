import { CustomValidation, Payload, StepperState } from '../models'

/** OCCURS When we add errors to the stepper */
export const addCustomValidators = (
    state: StepperState,
    payload: Payload
): StepperState | undefined => {
    const newValidators = payload.value as CustomValidation[]

    return {
        ...state,
        customValidators: [...newValidators]
    } as StepperState
}
