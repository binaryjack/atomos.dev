import { StepperActionsKind } from './actions'
import { Action, StepperState } from './models'
import { addCustomValidators } from './reducer/addCustomValidators'
import { addError } from './reducer/addError'
import { addStep } from './reducer/addStep'
import { computeSiblingStatus } from './reducer/computeSiblingStatus'
import { computeValidation } from './reducer/computeValidation'
import { goToStep } from './reducer/goToStep'
import { init } from './reducer/init'
import { navigationRequest } from './reducer/navigationRequest'
import { removeAllErrors } from './reducer/removeAllErrors'
import { removeError } from './reducer/removeError'
import { reset } from './reducer/reset'
import { setData } from './reducer/setData'
import { setFieldDefaultValue } from './reducer/setFieldDefaultValue'
import { setFields } from './reducer/setFields'
import { setStepperDefaultValue } from './reducer/setStepperDefaultValue'
import { setSubmittedTimes } from './reducer/setSubmittedTimes'
import { setVisible } from './reducer/setVisible'
import { submitRequest } from './reducer/submitRequest'
import { updateFormCommon } from './reducer/updateFormCommon'

export function stepperStateReducer(state: StepperState, action: Action) {
    const { type, payload } = action

    switch (type) {
        case StepperActionsKind.NAVIGATION_REQUEST:
            return navigationRequest(state, payload) as StepperState

        case StepperActionsKind.UPDATE_RHF_COMMON:
            return updateFormCommon(state, payload) as StepperState

        case StepperActionsKind.COMPUTE_VALIDATION:
            return computeValidation(state) as StepperState

        case StepperActionsKind.COMPUTE_SIBLING:
            return computeSiblingStatus(state) as StepperState

        case StepperActionsKind.INIT:
            return init(state, payload) as StepperState

        case StepperActionsKind.RESET:
            return reset(state) as StepperState

        case StepperActionsKind.ADD_STEP:
            return addStep(state, payload) as StepperState

        case StepperActionsKind.SET_FIELDS:
            return setFields(state, payload) as StepperState

        case StepperActionsKind.GO_TO_STEP:
            return goToStep(state) as StepperState

        case StepperActionsKind.SET_DATA:
            return setData(state, payload) as StepperState

        case StepperActionsKind.ADD_ERROR:
            return addError(state, payload) as StepperState

        case StepperActionsKind.REMOVE_ERROR:
            return removeError(state, payload) as StepperState

        case StepperActionsKind.SET_SUBMITTED_TIMES:
            return setSubmittedTimes(state) as StepperState

        case StepperActionsKind.SET_VISIBLE:
            return setVisible(state, payload) as StepperState

        case StepperActionsKind.CLEAR_ALL_ERRORS:
            return removeAllErrors(state, payload) as StepperState

        case StepperActionsKind.SET_FIELD_DEFAULT_VALUE:
            return setFieldDefaultValue(state, payload) as StepperState

        case StepperActionsKind.SET_STEPPER_DEFAULT_VALUE:
            return setStepperDefaultValue(state, payload) as StepperState

        case StepperActionsKind.ADD_CUSTOM_VALIDATORS:
            return addCustomValidators(state, payload) as StepperState

        case StepperActionsKind.SUBMIT_REQUEST:
            return submitRequest(state, payload) as StepperState
        default:
            return state as StepperState
    }
}

export const INITIAL_STEPPER_STATE: StepperState = {
    steps: [],
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
