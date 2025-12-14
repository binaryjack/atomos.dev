/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Stepper helpers
 */
import { StepperActionsKind } from './actions'
import { FormAdapter } from './formAdapter'
import {
    Action,
    CustomValidation,
    IStepAvailabilityTriggeredBy,
    ITrigger,
    Payload,
    PayloadValueTypes,
    SiblingFinderResult,
    StepperState
} from './models'

/** tobe used with dispatch from useReducer in order to provide a payload for the action */
export const newStepAction = (
    action: StepperActionsKind,
    id: number | number[],
    value: PayloadValueTypes
): Action => {
    return {
        type: action,
        payload: {
            stepId: id,
            value: value
        } as Payload
    } as Action
}

/** To be implemented later */
export const newCustomValidation = (
    stepId: number,
    name: string,
    method: () => void
): CustomValidation => {
    return {
        stepId,
        name,
        method
    }
}

// abstractes IStepAvailabilityTriggeredBy object creation
export const newVisibilitySkipPattern = (id: number, triggeredBy: ITrigger[]) => {
    return {
        id: id,
        triggeredBy: triggeredBy
    } as IStepAvailabilityTriggeredBy
}

//  gets the ids list of steps that can be processed.
// if shouldSkip is found in association with altered fields and expected (to be skip) values then the id is skiped
export const getAllowedIds = (
    ids: number[],
    dirtyFields: string[],
    shouldSkip: IStepAvailabilityTriggeredBy[],
    getValues: FormAdapter['getValues']
    // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
    if (dirtyFields.length === 0 || shouldSkip.length === 0) return ids

    const output: number[] = []

    for (const _id of ids) {
        // find the patterns matching to ID
        const _patterns = shouldSkip.filter((o) => o.id === _id)
        if (_patterns.length === 0) {
            output.push(_id)
            continue
        }
        // verify if some dirty fields were found for
        for (const _pt of _patterns) {
            const outValue = []
            // check if any triggered field has any value
            for (const triggerField of _pt.triggeredBy) {
                const value = getValues(triggerField.name)
                if (
                    /// if value is has a value and skipIfValues is not waiting 'undefined'
                    (!value && triggerField.skipIfValue !== undefined) ||
                    value === triggerField.skipIfValue
                )
                    continue
                // if the value matches the skipIfValue and is not null or undefined
                outValue.push(value)
            }

            if (outValue.length < _pt.triggeredBy.length) {
                continue
            }

            if (!output?.includes(_id)) {
                output.push(_id)
            }
        }
    }

    return output
}

/**  extracts the error object to an ErrorCollection array */
export const errorToList = (errorObject: { [s: string]: unknown | any }): Error[] => {
    const errorFields: Error[] = []

    // loop each RHF Error object childs
    Object.entries(errorObject).forEach((error) => {
        // get the field name
        errorFields.push({ name: error[0], message: error[1] ? (error[1]['type'] as string) : '' })
    })

    return errorFields
}

/**
 * It's used by the computeSiblings
 * this helps to figureout the next available step that should satisfy some rules:
 * the next step must be available (visible)
 * the next step must be reachable (not locked)
 * the current step must be valid in order to move
 * if not it offsets to the next reachable step which meets the expectations.
 * @param state the current state
 * @param fromId the starting point ID
 * @returns the computed sibling
 */
export const findNextAvailableSibling = (
    state: StepperState,
    fromId: number
): SiblingFinderResult | undefined => {
    if (!state || !state.steps || state.steps.length === 0) return undefined

    const output: SiblingFinderResult = {
        // define starting point
        stepId: fromId,
        step: state.steps.find((o) => o.id === fromId + 1),
        // navigate from currentState
        canGo: fromId + 1 <= state.steps.length,
        // currentState
        isFirst: false,
        // currentState
        isLast: fromId + 1 > state.steps.length
    }
    // return last if from id + 1 overflows collection length
    if (!output.canGo) return output

    // reset cango status so it can be recalculated
    output.canGo = false

    while (!output.canGo) {
        output.stepId = output.stepId + 1
        output.step = state.steps.find((o) => o.id === output.stepId)
        output.canGo =
            output.stepId <= state.steps.length &&
            output.step !== undefined &&
            !output.step.isLocked &&
            output.step.isVisible
        output.isLast = output.stepId > state.steps.length

        // should never happend
        if (output.stepId > state.steps.length) return output
    }

    return output
}

/**
 * It's used by the computeSiblings
 * this helps to figureout the previous available step that should satisfy some rules:
 * the previous step must be available (visible)
 * the previous step must be reachable (not locked)
 * the current step must be valid in order to move
 * if not it offsets to the previous reachable step which meets the expectations.
 * @param state the current state
 * @param fromId the starting point ID
 * @returns the computed sibling
 */
export const findPreviousAvailableSibling = (
    state: StepperState,
    fromId: number
): SiblingFinderResult | undefined => {
    if (!state || !state.steps || state.steps.length === 0) return undefined

    const output: SiblingFinderResult = {
        // define starting point
        stepId: fromId,
        step: state.steps.find((o) => o.id === fromId - 1),
        // navigate from currentState
        canGo: fromId - 1 >= 0,
        // currentState
        isLast: false,
        // currentState
        isFirst: fromId - 1 < 0
    }
    // return last if from id + 1 overflows collection length
    if (!output.canGo) return output

    // reset cango status so it can be recalculated
    output.canGo = false

    while (!output.canGo) {
        output.stepId = output.stepId - 1
        output.step = state.steps.find((o) => o.id === output.stepId)
        output.canGo =
            output.stepId >= 0 &&
            output.step !== undefined &&
            !output.step.isLocked &&
            output.step.isVisible
        output.isFirst = output.stepId < 0

        // should never happend
        if (output.stepId < 0) return output
    }

    return output
}
