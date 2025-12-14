/* eslint-disable prefer-const */
/* eslint-disable sonarjs/cognitive-complexity */
import { newError } from '../../components/StepperTab'
import { StepItem, StepperError, StepperState } from '../models'

/** OCCURS When we JUMP TO a step  */
export const goToStep = (state: StepperState): StepperState | undefined => {
    if (
        !state.sibling ||
        !state.steps ||
        state.steps.length === 0 ||
        state.navigationRequest === 'unset'
    )
        return state

    const siblings = state.sibling

    let targetStep: StepItem | undefined
    let canGo = false
    let navigationRequestGoto = state.navigationRequestGoto
    // get the first stepId which has errors in order to compare with the navigation request
    // get all stepIDs having issues
    const stepsIdHavingIssues = [
        ...new Set(state.errors.map((o) => o.stepId).sort((a, b) => a - b))
    ]

    if (state.navigationRequest === 'back') {
        targetStep = siblings.previousStep
        canGo =
            siblings.previousStep && siblings.currentStep
                ? siblings.previousStep.id < siblings.currentStep.id &&
                  siblings.previousStep.isVisible
                : false
    }

    if (state.navigationRequest === 'next') {
        targetStep = siblings.nextStep
        canGo =
            !(siblings?.currentStep && stepsIdHavingIssues.includes(siblings.currentStep?.id)) &&
            siblings.canGoNext
    }

    if (state.navigationRequest === 'goto' && navigationRequestGoto !== undefined) {
        // get first (that must/can be accessed) so we avoid to lock it ???
        const firstErrorId = stepsIdHavingIssues[0]

        if (
            siblings.canGoNext &&
            siblings.nextStep &&
            siblings.nextStep.id < navigationRequestGoto &&
            siblings.nextStep.isValid === undefined
        ) {
            navigationRequestGoto = siblings.nextStep.id
        } else if (
            firstErrorId !== undefined &&
            firstErrorId !== state.navigationRequestGoto &&
            Number(state.navigationRequestGoto) > firstErrorId
        ) {
            navigationRequestGoto = firstErrorId
        }

        targetStep = state.steps.find((o) => o.id === navigationRequestGoto)
        canGo =
            (targetStep &&
                siblings &&
                siblings?.currentStep &&
                targetStep.id < siblings.currentStep.id &&
                targetStep?.isVisible) ||
            (targetStep?.isVisible && !targetStep.isLocked)
                ? true
                : false
    }

    if (!canGo || !targetStep) {
        return {
            ...state,
            navigationRequest: 'unset',
            navigationRequestGoto: undefined
        } as StepperState
    }

    const errors: StepperError[] = []

    if (targetStep.isLocked) {
        // check if targetstep is valid or not
        errors.push(
            newError(
                targetStep.id,
                'step',
                'step locked',
                `unable to reach step ${targetStep.id} it is locked`
            )
        )
    }
    // check if current step is valid or not
    if (
        siblings?.currentStep &&
        targetStep.id > siblings?.currentStep?.id &&
        siblings?.currentStep?.isValid !== undefined &&
        !siblings?.currentStep?.isValid
    ) {
        errors.push(
            newError(
                targetStep.id,
                'step',
                'step invalid',
                `current step requires your attention it is not valid`
            )
        )
    }

    if (errors && errors.length > 0) {
        return {
            ...state,
            navigationRequest: 'unset',
            navigationRequestGoto: undefined
        } as StepperState
    }

    const resetSelection = [
        ...state.steps
            .filter((o) => targetStep?.id !== o.id)
            .map((_o: StepItem) => {
                return {
                    ..._o,
                    isActive: false
                }
            })
    ] as StepItem[]

    targetStep.isActive = true

    const finalSteps = [...resetSelection, targetStep].sort((a, b) => a.id - b.id)

    return {
        ...state,
        previousStepId: state.currentStepId,
        currentStepId: targetStep?.id,
        navigationRequest: 'unset',
        navigationRequestGoto: undefined,
        steps: finalSteps
    } as StepperState
}
