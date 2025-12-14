import { StepperState } from '../models'

/** TODO: implemented if we need it or cleaned */
export const setSubmittedTimes = (state: StepperState): StepperState | undefined => {
    return {
        ...state,
        submissionTimes: state.submissionTimes + 1
    } as StepperState
}
