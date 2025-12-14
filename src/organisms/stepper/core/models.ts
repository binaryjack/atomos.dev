/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepperActionsKind } from './actions'

/** the stepper base configuration options */
export interface StepperOptions {
    enableFooterNavigation?: boolean
    debug?: boolean
}

/**
 * Generic form state metadata
 * Replaces RHFCommon - now form library agnostic
 */
export interface FormCommon {
    errors: { [x: string]: any }
    touchedFields: { [x: string]: any }
    dirtyFields: { [x: string]: any }
}

/**
 * when default is selected it will validate only from first step to the current one.
 * when field is selected: KEY MUST BE A STRING
 * when all is selected: KEY IS OMMITED
 * when step is selected: KEY MUST BE A NUMBER
 *  */
export type ValidationMode = 'default' | 'field' | 'all' | 'step'

export type StepperNavigationRequest = 'back' | 'next' | 'goto' | 'unset'

/** the possible payload values types */
export type PayloadValueTypes =
    | string
    | number
    | number
    | boolean
    | undefined
    | Error[]
    | { [x: string]: any }
    | StepperDefaultValue
    | FormCommon
    | StepperNavigationRequest
    | StepperError
    | StepperError[]
    | StepperState
    | StepperSibling
    | StepItem
    | StepItem[]
    | StepBulkUpdate
    | StepField
    | StepField[]
    | CustomValidation
    | CustomValidation[]
    | StepsVisibility

/** the Stepper sibling
 * this is used as navigation cursor metadata.
 * it tells stepper about state of sibling steps.
 * whith it the stepper can let move forward /backward or jump to a step
 */
export interface StepperSibling {
    previousStep?: StepItem
    currentStep?: StepItem
    nextStep?: StepItem
    canGoBack: boolean
    canGoNext: boolean
    isLast: boolean
    isFirst: boolean
    // to be implemented later
    direction: 'forward' | 'backward'
}

/** wrapper error object
 * with this item we can define in which step the error occurs.
 */
export interface StepperError {
    stepId: number
    fieldName: string
    error: Error
}

/** this is the model to encapsulate all steps that should be set visible or not  */
export interface StepsVisibility {
    ids: number[]
    visible: boolean
}

/** this is the core stepper state */
export interface StepperState {
    // the steps should be registered only once when the form is rendered. this is handled by the Step.tsx component
    steps: StepItem[]
    // the current sibling states. Is computed each navigation / validation / jump
    sibling?: StepperSibling
    // to be implemented later (can be needed to combine fields)
    customValidators?: CustomValidation[]
    // stepper errors (combines validtion and navigation issues)
    errors: StepperError[]
    // to be implemented when Backend API will be ready. This will be the output data as is defined by the Bckend Api Contract
    data: string
    // count how many times the stepper has been submitted. <=> RHF feature
    submissionTimes: number
    // keeps the previous navigated step.
    previousStepId?: number
    // this is the current CURSOR navigation ID (StepId)
    currentStepId?: number
    // this is RHF Touched Fields
    touchedFields: string[]
    // this is RHF Dirty Fields
    dirtyFields: string[]
    // the navigation Request next => previous <= goto (number navigationRequestGoto Step Id)
    navigationRequest: StepperNavigationRequest
    // if the navigation request is set to goto then this property must be set
    navigationRequestGoto?: number
    // tells if the stepper has been loaded (to be implemented if needed itherwise will be removed)
    loaded: boolean
    // tells if the stepper is in valid state, this is a deductive notion from validation and Errors
    isValid: boolean
    // default commonm value
    defaultValue: StepperDefaultValue[]
    // tells if the submit button has been pushed
    submitRequest: boolean
    // tells if the stepper is ready (steps and fields available)
    ready: boolean
}

/** the Step FIELD artifact will register all the fields that's belong to a step (handled by the person who implements the final form in the custom FORM it self) */
export interface StepField {
    name: string
    // Only when it's needed! This is used when we want to force a component to use a User Friendly Clear Value (i.e. Label than the ID)
    // please ensure you can set a defaultValue to the targeted component.
    // In general components uses their default display value and manages their ID's internally.
    // Be carefull, do not use it as common default value storage. this is for special cases only
    defaultValue?: string
}

export interface StepperDefaultValue {
    name: string
    value: any
}

/** The step core state item */
export interface StepItem {
    // the UNIQUE id that's must be provided in the Stepper Form definition and also provided to the Custom sub Form       =>   <Step id={YourUniqueID} ><YourCustomForm id={YourUniqueID} ...
    id: number
    // this is the Lokalized Step label. Will be used for the breadcrumb step tab AND gathered by the sub Custom form as form TITLE !
    label: string
    // tells if the step is valid (computed by validation process)
    isValid?: boolean
    // tells if the step is applicable or NOT APPLICABLE at TIME "T" whit the current set of provided data. display a  cross icon if N/A.
    //  In other words that means that the step has not relevant inpus for the sense of user input data.
    isVisible: boolean
    // tells if the step is REACHABLE or not REACHABLE
    isLocked: boolean
    // tells tha's the CURRENT DISPLAYED STEP ON SCREEN
    isActive: boolean
    // any field has got the focus (RHF)
    isTouched: boolean
    // any field has been filled (RHF)
    isDirty: boolean
    // the step has been visited at least once and validated (the stepper process needs this in order to know if the fields of the current step should be shown not validated at first sight.)
    hasBeenValidated: boolean
    // the fields collection
    fields: StepField[]
}

/** the reducer action payload structure */
export interface Payload {
    stepId: number | number[]
    value?: PayloadValueTypes
}

/** upload data for a STEP that's nearly the same that the step structure with a few more flexibility */
export interface StepBulkUpdate {
    id?: number
    label?: string
    isValid?: boolean
    isVisible?: boolean
    isLocked?: boolean
    isActive?: boolean
    fields: StepField[]
}

/** the action structure */
export interface Action {
    type: StepperActionsKind
    payload: Payload
}

/** the summary data structure */
export interface Summary {
    name: string
    value: string
}

/** to be implemented if needed
 * this will heps to centralize complex validation instead to let user do this in the custom forms itself (can be aborted if not needed.)
 */
export interface CustomValidation {
    stepId: number
    name: string
    method: () => void
}

/** used by the computeSibling process. this is the structure of findNext or findPrevious step... */
export interface SiblingFinderResult {
    step?: StepItem
    isLast: boolean
    isFirst: boolean
    canGo: boolean
    stepId: number
}

export interface ITrigger {
    name: string
    skipIfValue: any
}

export interface IStepAvailabilityTriggeredBy {
    id: number
    triggeredBy: ITrigger[]
}
