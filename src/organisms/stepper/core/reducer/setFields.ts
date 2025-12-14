import { Payload, StepField, StepperState } from '../models'

/** OCCURS When we add a field  */
export const setFields = (state: StepperState, payload: Payload): StepperState | undefined => {
    // Get the payload field
    const payloadFields = payload.value as string[]
    if (!payloadFields || payloadFields.length === 0) return state as StepperState

    // get the target step
    const targetStep = state.steps.find((o) => o.id === payload.stepId)
    if (!targetStep) return state as StepperState

    const newFields: StepField[] = []

    payloadFields.forEach((fieldName) => {
        if (
            targetStep.fields === undefined ||
            !targetStep.fields.find((o) => o.name === fieldName)
        ) {
            newFields.push({ name: fieldName, defaultValue: undefined })
        }
    })
    // define current new step version
    const newStepVersion = {
        ...targetStep,
        fields: [...targetStep.fields, ...newFields]
    }
    // define new step collection
    const newStepsVersion = [
        ...state.steps.filter((o) => o.id !== payload.stepId),
        newStepVersion
    ].sort((a, b) => (a && b ? a.id - b.id : 0))

    const isReady = newStepsVersion.every((o) => o.fields.length > 0)

    return {
        ...state,
        steps: newStepsVersion,
        ready: isReady
    } as StepperState
}
