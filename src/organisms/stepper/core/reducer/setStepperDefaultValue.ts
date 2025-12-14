import { Payload, StepperDefaultValue, StepperState } from '../models'

/** OCCURS When we update a stepper common default value property.
 *  this concerns @StepperDefaultValue {...  defaultValue: ###}
 */
export const setStepperDefaultValue = (
    state: StepperState,
    payload: Payload
): StepperState | undefined => {
    // gets the concerned step
    // retrieve the stepField payload
    const stepperDefaultValue = payload.value as StepperDefaultValue

    if (
        state.defaultValue &&
        state.defaultValue.length > 0 &&
        state.defaultValue.find((o) => o.name === stepperDefaultValue.name)?.value ===
            stepperDefaultValue.value
    )
        return state as StepperState

    const newDefaultValues = [
        ...state.defaultValue.filter(
            (o) => o.name !== (stepperDefaultValue as StepperDefaultValue).name
        ),
        stepperDefaultValue
    ]

    return {
        ...state,
        defaultValue: newDefaultValues
    } as StepperState
}
