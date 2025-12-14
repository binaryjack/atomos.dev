import { findNextAvailableSibling, findPreviousAvailableSibling } from '../helpers'
import { StepperSibling, StepperState } from '../models'

/** OCCURS When we recompute the sibling status. */
export const computeSiblingStatus = (state: StepperState): StepperState | undefined => {
    if (!state || !state.steps || state.steps.length === 0) return state as StepperState
    const currentId = state.currentStepId !== undefined ? state.currentStepId : 0

    const currentStep = state.steps.find((o) => o.id === currentId)
    // we do not want to recalculate sibling if current step is invalid
    if (!currentStep) return state as StepperState
    // start point animation
    const pastId = state.sibling && state.sibling.currentStep ? state.sibling?.currentStep?.id : 0
    // animatio direction
    const upcommingId = currentStep ? currentStep.id : 0

    // find available previous and next
    const findPrevious = findPreviousAvailableSibling(state, currentId)
    const findNext = findNextAvailableSibling(state, currentId)

    const previousStep = findPrevious?.step
    const nextStep = findNext?.step

    const canGoBack = findPrevious?.canGo
    const canGoNext = findNext?.canGo

    const isFirst = findPrevious?.isFirst 
    const isLast = findNext?.isLast 

    const sibling = {
        canGoBack,
        canGoNext,
        currentStep,
        nextStep,
        previousStep,
        isLast,
        isFirst,
        direction: pastId < upcommingId ? 'forward' : 'backward'
    } as StepperSibling

    return {
        ...state,
        sibling: sibling
    } as StepperState
}
