import { Payload, StepItem, StepperState } from '../models'

/** OCCURS When we add a step  */
export const addStep = (state: StepperState, payload: Payload): StepperState | undefined => {
    const steps = [...state.steps.filter((o) => o.id !== payload.stepId), payload.value as StepItem]
    return { ...state, steps: steps } as StepperState
}
