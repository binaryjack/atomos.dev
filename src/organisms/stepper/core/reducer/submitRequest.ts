import { Payload, StepperState } from '../models'

/** TODO: OCCURS When we presubmit the final form entries. */
export const submitRequest = (state: StepperState, payload: Payload): StepperState | undefined => {
    const request = payload.value as boolean
    if (!state.steps || state.steps.length === 0) return state as StepperState
    const lastStep = state.steps[state.steps.length - 1]
    // we do not want to recalculate sibling if current step is invalid
    if (!lastStep) return state as StepperState
    if (!request) lastStep.hasBeenValidated = true

    const newSteps = [...state.steps.filter((o) => o.id !== lastStep.id), lastStep]

    return {
        ...state,
        steps: newSteps.sort((a, b) => (a && b ? a.id - b.id : 1 + 2)),
        submitRequest: request
    } as StepperState
}
