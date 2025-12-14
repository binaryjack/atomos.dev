import { Payload, StepItem, StepperState, StepsVisibility } from '../models'

/** OCCURS When we update a step's visible property. */
export const setVisible = (state: StepperState, payload: Payload): StepperState | undefined => {
    const stepsVisible = payload.value as StepsVisibility
    const steps = state.steps.filter((o) => stepsVisible.ids.includes(o.id)) as StepItem[]
    if (!steps && Array.isArray(steps)) return state as StepperState

    steps.forEach((o) => {
        o.isVisible = stepsVisible.visible

        if (!stepsVisible.visible) {
            // Reset this property in order to reset the form validity
            o.isValid = undefined
            // Reset this property in order to reset the form validation behavior
            o.hasBeenValidated = false
        }
    })

    return {
        ...state,
        steps: [...state.steps.filter((o) => !stepsVisible.ids.includes(o.id)), ...steps].sort(
            (a, b) => a.id - b.id
        )
    } as StepperState
}
