import { Payload, StepperNavigationRequest, StepperState } from '../models'

/** OCCURS When we request a navigation */
export const navigationRequest = (
    state: StepperState,
    payload: Payload
): StepperState | undefined => {
    if (!payload.value) return state as StepperState
    const navRequestType = payload.value as StepperNavigationRequest
    if (!navRequestType) return state as StepperState
    return {
        ...state,
        navigationRequest: navRequestType,
        navigationRequestGoto: navRequestType === 'unset' ? undefined : payload.stepId
    } as StepperState
}
