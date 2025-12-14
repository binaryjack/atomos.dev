import { Payload, StepField, StepItem, StepperState } from '../models'

/** OCCURS When we update a step's field default value property.
 *  this concerns @StepField {...  defaultValue: ###}
 */
export const setFieldDefaultValue = (
    state: StepperState,
    payload: Payload
): StepperState | undefined => {
    // gets the concerned step
    const stepState = state.steps.find((o) => o.id === payload.stepId) as StepItem
    if (!stepState) return state as StepperState

    // retrieve the stepField payload
    const stepField = payload.value as StepField

    // if no payload field's name  matches any of the steps's fields then leave process
    if (
        !stepField ||
        !stepState.fields ||
        !stepState.fields.find((o) => o.name === (stepField as StepField).name)
    )
        return state as StepperState

    const newStepState = {
        ...stepState,
        fields: [
            ...stepState.fields.filter((o) => o.name !== (stepField as StepField).name),
            stepField
        ]
    } as StepItem

    return {
        ...state,
        steps: [...state.steps.filter((o) => o.id !== newStepState.id), newStepState].sort(
            (a, b) => a.id - b.id
        )
    } as StepperState
}
