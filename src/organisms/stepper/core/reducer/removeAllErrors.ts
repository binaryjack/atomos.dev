import { Payload, StepperState } from '../models'

/** OCCURS When we remove all errors out of the stepper */
export const removeAllErrors = (
    state: StepperState,
    payload: Payload
): StepperState | undefined => {
    const errors =
        payload.stepId === -1 ? [] : state.errors.filter((o) => o.stepId !== payload.stepId)

    const newSteps =
        payload.stepId === -1
            ? [...state.steps]
            : [...state.steps.filter((o) => o.id === payload.stepId)]

    const stepsOutput =
        payload.stepId === -1
            ? [...newSteps]
            : [...state.steps.filter((o) => o.id !== payload.stepId), ...newSteps]

    return {
        ...state,
        steps: stepsOutput.sort((a, b) => a.id - b.id),
        errors
    } as StepperState
}
