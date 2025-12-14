/* eslint-disable sonarjs/cognitive-complexity */
import { newError } from '../../components/StepperTab'
import { FormCommon, Payload, StepItem, StepperError, StepperState } from '../models'

/** OCCURS: When form state (errors, touched, dirty) changes */
export const updateFormCommon = (
    state: StepperState,
    payload: Payload
): StepperState | undefined => {
    if (!state || !state.steps || state.steps.length === 0) return undefined

    const newSteps = [...state.steps]

    const commonData = payload.value as FormCommon

    // stepper errors collection
    const errorsOutput: StepperError[] = []

    // loop each RHF Error object childs
    Object.entries(commonData.errors).forEach((error) => {
        // get field name
        const fieldName = error[0]
        // define the error type
        const errorType = error[1] ? (error[1]['type'] as string) : ''

        let currentRelativeStepId = -1

        newSteps.forEach((step: StepItem) => {
            // skip errors on steps having no fields (not possible !) and which is not visible (available) N/A or not applicable.
            if (!step.fields || !step.isVisible) return

            if (step.fields.map((o) => o.name).includes(fieldName)) {
                currentRelativeStepId = step.id
            }
        })

        if (currentRelativeStepId === -1) return
        // skip same errors
        if (
            state.errors.find(
                (o) => o.fieldName === fieldName && o.stepId === currentRelativeStepId
            )
        )
            return
        errorsOutput.push(
            newError(currentRelativeStepId, fieldName, `Field: ${fieldName}`, errorType)
        )
    })

    const newDirtyFields: string[] = []
    // loop each RHF Error object childs
    Object.entries(commonData.dirtyFields).forEach((field) => {
        newDirtyFields.push(field[0])
    })

    const newTouchedFields: string[] = []
    // loop each RHF Error object childs
    Object.entries(commonData.touchedFields).forEach((field) => {
        newTouchedFields.push(field[0])
    })

    // set step Is Dirty
    newSteps.forEach((step: StepItem) => {
        // skip errors on steps having no fields (not possible !) and which is not visible (available) N/A or not applicable.

        if (!step.fields) {
            step.isDirty = false
            step.isTouched = false
            return
        }
        step.isDirty = step.fields.some((o) => newDirtyFields.includes(o.name))
        step.isTouched = step.fields.some((o) => newTouchedFields.includes(o.name))
    })

    return {
        ...state,
        errors: [...state.errors, ...errorsOutput],
        dirtyFields: newDirtyFields,
        touchedFields: newTouchedFields,
        steps: newSteps
    } as StepperState
}
