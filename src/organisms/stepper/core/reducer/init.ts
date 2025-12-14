import { Payload, StepperState } from '../models'

/** OCCURS when the stepper is initialized */
export const init = (state: StepperState, payload: Payload): StepperState | undefined => {
    const initState = payload.value as StepperState
    return { ...state, ...initState } as StepperState
}
