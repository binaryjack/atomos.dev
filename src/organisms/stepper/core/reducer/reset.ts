import { StepItem, StepperState } from '../models'
import { computeSiblingStatus } from './computeSiblingStatus'

export const reset = (state: StepperState): StepperState | undefined => {
    const clearedSteps = state.steps?.map((o) => {
        return {
            fields: o.fields,
            isActive: o.id === 0,
            isLocked: false,
            isVisible: true,
            isValid: undefined,
            id: o.id,
            label: o.label,
            order: o.id,
            isDirty: false,
            isTouched: false,
            hasBeenValidated: false
        } as StepItem
    })

    const resetData: StepperState = {
        steps: clearedSteps,
        errors: [],
        sibling: undefined,
        data: '',
        submissionTimes: 0,
        previousStepId: undefined,
        currentStepId: 0,
        navigationRequest: 'unset',
        navigationRequestGoto: undefined,
        customValidators: undefined,
        touchedFields: [],
        dirtyFields: [],
        loaded: false,
        isValid: false,
        defaultValue: [],
        submitRequest: false,
        ready: false
    }

    const computedState = computeSiblingStatus(resetData)

    return computedState as StepperState
}
