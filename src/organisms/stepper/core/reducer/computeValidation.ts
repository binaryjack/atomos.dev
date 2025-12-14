/* eslint-disable sonarjs/cognitive-complexity */
import { StepItem, StepperState } from '../models'

/** OCCURS When we recompute the validation */
export const computeValidation = (state: StepperState): StepperState | undefined => {
    if (!state || state.currentStepId === undefined || !state.steps) return state

    // siblings state
    const newStepsVersion: StepItem[] = [...state.steps]

    const currentStepId = state.currentStepId
    if (currentStepId === undefined) return state

    const currentStep = newStepsVersion.find((o) => o.id === currentStepId)
    if (currentStep === undefined) return state

    let requestedStepId = state.navigationRequestGoto

    currentStep.isValid =
        currentStep.isTouched &&
        currentStep.isDirty &&
        state.errors.filter((o) => o.stepId === currentStepId).length === 0
            ? true
            : false

    if (
        requestedStepId !== undefined &&
        (currentStep.id < requestedStepId || currentStep.id > requestedStepId)
    ) {
        currentStep.hasBeenValidated = true
    }

    // do validation
    newStepsVersion.forEach((s: StepItem) => {
        const touched = s.isTouched
        const dirty = s.isDirty
        // if requested navigation is located after any step having issues or not filled then set navigation ID to this one instead
        if (
            s.isVisible &&
            requestedStepId !== undefined &&
            s.id < requestedStepId &&
            !(dirty && touched)
        ) {
            // should take care of this step before moving forward
            requestedStepId = s.id
        }
    })

    const formIsValid = newStepsVersion.filter((o) => o.isVisible).every((o) => o.isValid === true)
    const sortedNewStepsVersion = [...newStepsVersion].sort((a, b) =>
        a && b ? a.id - b.id : 1 + 2
    )

    return {
        ...state,
        navigationRequestGoto: requestedStepId,
        steps: sortedNewStepsVersion,
        isValid: formIsValid,
        submitRequest: state.submitRequest ? formIsValid : false
    } as StepperState
}
