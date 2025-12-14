import { Payload, StepperState } from '../models'

/** TODO: OCCURS When we presubmit the final form entries. */
export const setData = (state: StepperState, payload: Payload): StepperState | undefined => {
    if (!payload.value) return
    const valueAsString = payload.value as string

    return {
        ...state,
        data: valueAsString
    } as StepperState
}
