/* eslint-disable sonarjs/no-identical-functions */
import './stepper.css'

import React, { createContext, useEffect } from 'react'

import {
    formatDate,
    isDateFormatValidDDMMYYYY,
    isDateLongFormatValid
} from 'core/helpers/DateFormatHelper'

import StepperDebug from './components/StepperDebug'
import StepperFooter from './components/StepperFooter'
import StepperHeader from './components/StepperHeader'
import { StepperActionsKind } from './core/actions'
import { FormAdapter } from './core/formAdapter'
import { getAllowedIds, newStepAction } from './core/helpers'
import {
    Action,
    CustomValidation,
    FormCommon,
    IStepAvailabilityTriggeredBy,
    StepField,
    StepItem,
    StepperDefaultValue,
    StepperError,
    StepperOptions,
    StepperSibling,
    StepperState,
    StepsVisibility,
    Summary,
    ValidationMode
} from './core/models'
import { INITIAL_STEPPER_STATE, stepperStateReducer } from './core/state'

export interface StepperContext {
    currentState: () => StepperState
    watchSiblings: () => StepperSibling | undefined
    stepWatch: (id?: number) => StepItem | StepItem[] | undefined
    setStepVisibility: (
        ids: number[],
        visible: boolean,
        shouldSkip?: IStepAvailabilityTriggeredBy[]
    ) => void
    registerField: (id: number, fields: string[]) => void
    setFieldDefaultValue: (id: number, fields: StepField) => void
    setStepperDefaultValue: (defaultValue: StepperDefaultValue) => void
    setCustomValidators: (customValidators: CustomValidation[]) => void
    goToStep: (id: number) => void
    goBack: () => void
    goNext: () => void
    resetForm: (id?: number) => void
    submit: () => void
    enableStep: (id: number) => void
    errors: (id?: number) => StepperError[]
    setError: (stepId: number, fieldName: string, message: string) => void
    unSetError: (stepId: number, fieldName: string) => void
    removeAllCustomErrors: (id?: number) => void
    /**
     * when field is selected: KEY MUST BE A STRING
     * when all is selected: KEY IS OMMITED
     * when step is selected: KEY MUST BE A NUMBER
     *  */
    validate: (mode: ValidationMode, key?: string | number) => void
    dispatch: React.Dispatch<Action>
    summary: () => Summary[]
    persistLocalData: (stepId: number) => void
    recoverLocalData: (stepId: number) => void
    /** Form adapter for accessing form library methods */
    formAdapter: FormAdapter
}
// the fields Context CONTEXT definition
const StepperCtx = createContext<StepperContext>({
    currentState: () => ({} as StepperState),
    watchSiblings: () => ({} as StepperSibling),
    stepWatch: (): StepItem | StepItem[] | undefined =>
        (({} as StepItem | []) as StepItem[] | undefined),
    setStepVisibility: () => ({}),
    registerField: () => ({}),
    setFieldDefaultValue: () => ({}),
    setStepperDefaultValue: () => ({}),
    setCustomValidators: () => ({}),
    goToStep: () => ({}),
    goBack: () => ({}),
    goNext: () => ({}),
    resetForm: () => ({}),
    submit: () => ({}),
    enableStep: () => ({}),
    errors: (): StepperError[] => ({} as StepperError[]),
    setError: () => ({}),
    unSetError: () => ({}),
    removeAllCustomErrors: () => ({}),
    validate: () => ({}),
    dispatch: {} as React.Dispatch<Action>,
    summary: () => [] as Summary[],
    persistLocalData: () => ({}),
    recoverLocalData: () => ({}),
    formAdapter: {} as FormAdapter
})

/**
 * Stepper description:
 * Steps context that's manage multi steps using RHF as form provider
 * Declaration: It MUST be wrapped into a RHF Form provider
 *
 * Process :
 *
 * 1) Init: form with the defaults values => go to step 0
 *
 * 2) Navigation:
 *          1) we must request for a step (by clicking on goNext goBack goto) this will keep the navigation type (next, back, goto) and the In of the requested target step.
 *          2) then we need to calculate the siblings:  this will evaluate from the current navigation stepID the previous available step, the next available step, in order to be able to navigate after
 *          3) We can decide here if we want to Execute Navigation OR Validate.
 *              Validation: this will first get all the steps fields,
 *                          - then do a RHF.trigger (fields Collection) => will make a React Hook Forms Excplicit Validation for the given fields.
 *                          - this will force RHF to update RHF.errors Collection that's used in the useEffect ... [errors, ...] below
 *                          - in the useEffect we will store all the RHF metadata we need to compute the stepper state. => we dispatch those to the internal stepper store.
 *                          - when RHF is validating it sets it's property isValidating to true. this is also triggering the previous useEffect in order to keep RHF stuffs in one go.
 *                          - at this point in this useEffect we ONLY execute validation sequence if isValidating is true
 *                          - the validation process will evaluate if the step is applicable, compare fields with the one from RHF and decide if the step is valid or not.
 *                          - Here we should compute the sibling !
 *
 *              Navigation schema;
 *
 *                                                                                                                      - the current step is invalid and the target step comes after.
 *                                                                                                                      - the target step is locked / not applicable
 *
 *                                                                                                                         ===> [Cannot Navigate] ===> X
 *                                                                                                                     //
 *                                                                                                                    ||
 *                                                                                                                    /\
 *                                                                                ===========>  [GoTo Step] =======> <  >
 *                                                                              /                                     \/
 *                                                                             /                                      ||
 * from Init ===> [Navigation Request] =================> [Compute Sibling] ==                                         \\
 *                              ||                              /\                                                      \\ ===> [Execute Navigation] ===> [Compute Sibling] ===> X
 *                              \/                              ||
 * on validation RHF ==>      [Update RHF Common] =======> [Validation]
 *
 *
 * on click: GoNext/GoBack/GoTo ===> [Navigation Request]
 *                              ===> [Clear Errors]
 *                              ===> [Trigger RHF Validation] (will trigger async:[Update RHF Common])
 *
 *             Navigation key points:
 *
 *                          - when a navigation request is set (above => #1) the process stores the navigation type and if (goto) the targeted stepId
 *                          - if everthing is correct the navigation ca be executed otherwise the page remains the same.
 *                          - the cases when the validation cannot be executed are mainly on forward (next and goto)
 *                               - when targeted step is not applicable
 *                               - or the current is not valid
 *                               - or if the current is valid BUT the one before the targeted step is not valid. (in another words it stops if current is not valid or navigate to the very next invalid step if applicable)
 *                          - backwards (goto / back) navigation are still possible only for applicable steps even if current and or the previous are valid or not.
 *                           - Here we should compute the sibling !
 *
 *
 *             Submit process:
 *                          - when the last step is reached the process wll display (send / submit button) instead of next.
 *                          - On submit button the Stepper will validate the entire form within a promise, then if form is valid the pèromise is succeeded.
 *                              - if success the passed handle submit function is invoked with the resule of the values.
 *                              - as the stepper is agnostic, the stepper consumer component will take care of the submission process.
 *
 *                              - if rejected then the process stops. The previous validation result that are already displaying errors on the steps.
 *
 * Inputs :
 *
 *      Default Values: the RHF default values that's also used by the reset process
 *      options: some configuration options
 *      submit form function which takes an object as parameter
 *
 * Outputs: Context methods that can be used by sub custom forms.
 *
 *
 */

export interface StepperProps {
    /** Form adapter - wraps any form library (RHF, Formik, etc.) */
    formAdapter: FormAdapter
    id: number
    name: string
    options: StepperOptions
    children: React.ReactNode | React.ReactNode[]
    submitMethod: CallableFunction
}

const Stepper = ({
    id,
    formAdapter,
    children,
    options = { debug: false, enableFooterNavigation: false },
    submitMethod
}: StepperProps): JSX.Element => {
    const [stepperState, dispatch] = React.useReducer(stepperStateReducer, INITIAL_STEPPER_STATE)
    const formState = formAdapter.getFormState()
    const { errors, touchedFields, dirtyFields, isValidating, defaultValues } = formState

    // This is used by the local storage process in order to refresh steps automatically on reloading,
    // this is not used at the moment and will be enabled when localStorge will be reactivated.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const expectedSteps =
        children &&
        React.Children.toArray(children).filter((child) => React.isValidElement(child)).length

    /** first action, position the stepper at the first step. */
    useEffect(() => {
        // first make a navigation request
        dispatch(newStepAction(StepperActionsKind.NAVIGATION_REQUEST, 0, 'goto'))
        dispatch(newStepAction(StepperActionsKind.COMPUTE_SIBLING, 0, undefined))
    }, [])

    const localKey = 'accidentReportData'

    /** Persist data */
    const persistLocalData = (stepId: number) => {
        if (!stepperState || !stepperState.steps || stepperState.steps.length === 0) return
        // local storage key
        const localStepKey = `${localKey}-${stepId}`

        const step = stepperState.steps.find((o) => o.id === stepId)
        if (!step) return

        let dataBackupModel = {}
        step.fields.forEach((field) => {
            const fieldValue = formAdapter.getValues(field.name)
            dataBackupModel = { ...dataBackupModel, [field.name]: fieldValue }
        })
        const stringified = JSON.stringify(dataBackupModel)
        if (localStorage.getItem(localStepKey)) localStorage.removeItem(localStepKey)
        localStorage.setItem(localStepKey, stringified)
    }

    /** recover persisted data */
    const recoverLocalData = (stepId: number): string[] => {
        if (!stepperState || !stepperState.steps || stepperState.steps.length === 0) return []
        // local storage key
        const localStepKey = `${localKey}-${stepId}`

        const step = stepperState.steps.find((o) => o.id === stepId)
        if (!step) return []

        try {
            if (!localStorage.getItem(localStepKey)) return []
            const localData = localStorage.getItem(localStepKey)
            if (!localData) return []
            const parsedModel = JSON.parse(localData)
            if (!parsedModel) return []

            Object.entries(parsedModel).forEach((field) => {
                const localValue = field[1]
                const dateValue = isDateLongFormatValid(field[1] as string)

                if (localValue && dateValue) {
                    formAdapter.setValue(field[0], new Date(localValue as string), {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true
                    })
                } else {
                    formAdapter.setValue(field[0], localValue, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true
                    })
                }
            })

            return Object.entries(parsedModel).map((o) => o[0]) as string[]
            // localStorage.removeItem(localKey)
        } catch (e) {
            console.error(
                `ACCIDENT REPORT: Error when trying to recover data from local storage ${e} `
            )
            return []
        }
    }

    /** While validating do the following actions */
    useEffect(() => {
        dispatch(
            newStepAction(StepperActionsKind.UPDATE_RHF_COMMON, 0, {
                errors,
                touchedFields,
                dirtyFields
            } as FormCommon)
        )
        // if the process is in validation mode then
        if (isValidating) {
            dispatch(newStepAction(StepperActionsKind.COMPUTE_VALIDATION, 0, undefined))
            dispatch(newStepAction(StepperActionsKind.COMPUTE_SIBLING, 0, undefined))
        } else {
            dispatch(newStepAction(StepperActionsKind.GO_TO_STEP, 0, undefined))
            dispatch(newStepAction(StepperActionsKind.COMPUTE_SIBLING, 0, undefined))
        }
    }, [isValidating, errors])

    /** Returns the step state by it's Id or all steps if nothing is provided */
    const stepWatch = (id?: number): StepItem | StepItem[] | undefined => {
        if (!stepperState || !stepperState.steps || stepperState.steps.length === 0)
            return undefined
        // use explicitely undefined because !id can also catch 0 be we need to have 0 as first ID
        if (id === undefined) return stepperState.steps
        return stepperState.steps.find((o) => o.id === id)
    }

    /** Returns the step state by it's Id or all steps if nothing is provided */
    const getErrors = (id?: number): StepperError[] => {
        if (!stepperState || !stepperState.errors || stepperState.errors.length === 0) return []
        // use explicitely undefined because !id can also catch 0 be we need to have 0 as first ID
        if (id === undefined) return stepperState.errors
        return stepperState.errors.filter((o) => o.stepId === id)
    }

    /** Register a fieds that should be tracked by the stepper as well it is tracked by RHF in the stepper collection
     * As you may think that we could use the fields collection from RHF, RHF is not aware of what field is contained in which step.
     * This methods does it that way.
     */
    const registerField = (stepId: number, fields: string[]) => {
        dispatch(newStepAction(StepperActionsKind.SET_FIELDS, stepId, fields))
    }

    const setStepVisibility = (
        ids: number[],
        visible: boolean,
        shouldSkip?: IStepAvailabilityTriggeredBy[]
    ) => {
        if (!stepperState.steps.find((o) => ids.includes(o.id))) return

        const idsToCompute =
            shouldSkip && shouldSkip.length > 0
                ? [...getAllowedIds(ids, stepperState.dirtyFields, shouldSkip, formAdapter.getValues)]
                : [...ids]

        const stepsVisibility: StepsVisibility = { ids: idsToCompute, visible: visible }
        dispatch(newStepAction(StepperActionsKind.SET_VISIBLE, id, stepsVisibility))
    }

    /** This will intent a RHF Validation and stepper validation aswell then combine both. */
    // eslint-disable-next-line sonarjs/cognitive-complexity
    const validate = async (mode: ValidationMode, key?: string | number) => {
        let fields: string[] = []

        const currentStepId =
            stepperState && stepperState.currentStepId ? stepperState?.currentStepId : 0

        // SELECT FIELDS TO VALIDATE
        if (mode === 'all') {
            fields = stepperState?.steps
                // eslint-disable-next-line sonarjs/no-identical-functions
                .reduce<string[]>((acc: string[], current: StepItem) => {
                    const outputCollection =
                        current && current.fields ? current?.fields?.map((o) => o.name) : []
                    return [...acc, ...outputCollection] as string[]
                }, [])
        }

        // SELECT FIELDS TO VALIDATE
        if (mode === 'default') {
            fields = stepperState?.steps
                ?.filter((o) => o.id === currentStepId)
                // eslint-disable-next-line sonarjs/no-identical-functions
                .reduce<string[]>((acc: string[], current: StepItem) => {
                    const outputCollection =
                        current && current.fields ? current?.fields?.map((o) => o.name) : []
                    return [...acc, ...outputCollection] as string[]
                }, [])
        }

        if (mode === 'step' && key && typeof key === 'number') {
            const step = stepperState?.steps?.find((o) => o.id === key)
            if (step && step.fields) fields = step?.fields?.map((o) => o.name) as string[]
        }

        if (fields && fields.length > 0) {
            dispatch(newStepAction(StepperActionsKind.CLEAR_ALL_ERRORS, -1, 0))
            //await formAdapter.clearErrors([...fields])
            runCustomValidatiors(currentStepId)

            await formAdapter.trigger(fields)
        } else {
            await formAdapter.trigger()
        }
    }

    /** Sets the default falue */
    const setFieldDefaultValue = async (id: number, field: StepField) => {
        if (!stepperState || !stepperState.steps) return

        dispatch(newStepAction(StepperActionsKind.SET_FIELD_DEFAULT_VALUE, id, field))
        await validate('default')
    }

    /**  */
    const setStepperDefaultValue = (defaultValue: StepperDefaultValue): void => {
        dispatch(newStepAction(StepperActionsKind.SET_STEPPER_DEFAULT_VALUE, id, defaultValue))
    }

    /** Intent to go to the step by the provided id */
    const goToStep = async (id: number) => {
        // this is a non sense to move toward the current step from the current step. So we skip it, avoid unusefully validation.
        if (!stepperState || !stepperState.steps || stepperState.currentStepId === id) return

        dispatch(newStepAction(StepperActionsKind.NAVIGATION_REQUEST, id, 'goto'))
        await validate('default')
    }

    /** Navigate backward of 1 step.
     * If the boundary is hit, then it will stay where it is.
     */
    const goBack = async () => {
        dispatch(newStepAction(StepperActionsKind.NAVIGATION_REQUEST, 0, 'back'))
        await validate('default')
    }

    /** Navigate forward of 1 step
     *  If the boundary is hit, then it will stay where it is.
     */
    const goNext = async () => {
        dispatch(newStepAction(StepperActionsKind.NAVIGATION_REQUEST, 0, 'next'))
        await validate('default')
    }

    /** Navigate forward of 1 step
     * adds a custom error to the stepper context
     */
    const setError = (stepId: number, fieldName: string, message: string) => {
        const stepperError: StepperError = {
            stepId,
            fieldName,
            error: { name: fieldName, message: message } as Error
        }
        dispatch(newStepAction(StepperActionsKind.ADD_ERROR, id, stepperError))
    }

    /** Navigate forward of 1 step
     * reset a custom error to the stepper context
     */
    const unSetError = (stepId: number, fieldName: string) => {
        dispatch(newStepAction(StepperActionsKind.REMOVE_ERROR, id, fieldName))
    }

    /** Navigate forward of 1 step
     * reset all custom error from  the stepper context
     * if an ID is provided, only related errors will be removed
     */
    const removeAllCustomErrors = (id?: number) => {
        if (!stepperState || !stepperState.steps || !stepperState.steps.find((o) => o.id === id))
            return
        const targetStep = stepperState.steps.find((o) => o.id === id) as StepItem
        dispatch(
            newStepAction(
                StepperActionsKind.CLEAR_ALL_ERRORS,
                targetStep ? targetStep.id : -1,
                undefined
            )
        )
    }

    useEffect(() => {
        // will not submit if the form is not valid
        if (!stepperState.submitRequest || !stepperState.isValid) return
        const values = formAdapter.getValues()
        submitMethod(values)
    }, [stepperState.isValid, stepperState.submitRequest])

    /** Intent a validation before submit. */
    const submitForm = async () => {
        await validate('default')
        // toggle submit request and remove it rightAfter
        dispatch(newStepAction(StepperActionsKind.SUBMIT_REQUEST, id, true))
        setTimeout(() => {
            dispatch(newStepAction(StepperActionsKind.SUBMIT_REQUEST, id, false))
        }, 5)
    }

    /** Will intent to reset the entire form */
    const resetForm = async (id?: number) => {
        if (id === undefined) {
            dispatch(newStepAction(StepperActionsKind.RESET, 0, ''))
            formAdapter.reset(defaultValues)
            return
        }

        const step = stepperState.steps.find((o) => o.id === id)
        if (!step || step.fields === undefined || step.fields.length === 0) return

        const fields = step.fields.map((o) => o.name)
        fields.forEach((o) => {
            formAdapter.resetField(o)
            formAdapter.clearErrors(o)
        })

        dispatch(newStepAction(StepperActionsKind.REMOVE_ERROR, id, {}))
        await formAdapter.trigger(fields)
        // dispatch(newStepAction(StepperActionsKind.COMPUTE_VALIDATION, id, undefined))
        // dispatch(newStepAction(StepperActionsKind.COMPUTE_SIBLING, id, undefined))
    }
    /** Enable a specific step and trigger validation */
    const enableStep = async (id: number) => {
        const step = stepperState.steps.find((o) => o.id === id)
        if (!step || step.fields === undefined || step.fields.length === 0) return
        const fields = step.fields.map((o) => o.name)
        await formAdapter.trigger(fields)
        dispatch(newStepAction(StepperActionsKind.COMPUTE_VALIDATION, id, undefined))
        dispatch(newStepAction(StepperActionsKind.COMPUTE_SIBLING, id, undefined))
    }

    const getBooleanString = (val: boolean) => (val ? 'true' : 'false')

    /** Returns the summary of all user input data */
    const getSummary = (): Summary[] => {
        const values = formAdapter.getValues()
        if (!values) return []
        const output: Summary[] = []
        Object.entries(values).forEach((val) => {
            try {
                let value = ''
                if (typeof val[1] === 'boolean') {
                    value = val[1] ? getBooleanString(val[1]) : 'bool undefined'
                } else if (
                    val[1] instanceof Date &&
                    isDateFormatValidDDMMYYYY(formatDate(val[1]))
                ) {
                    value = formatDate(val[1])
                } else {
                    value = val[1] as string
                }
                output.push({ name: val[0], value } as Summary)
            } catch (e) {
                //TODO Error ?
            }
        })
        return output
    }

    /** custom validators are used when there is association within many fields which has no direct correlation known by RHF
     * in these case we cannot set many times a validation in rules even more if we need to compare many values from many sources.
     */
    const setCustomValidators = (customValidators: CustomValidation[]) => {
        dispatch(newStepAction(StepperActionsKind.ADD_CUSTOM_VALIDATORS, id, customValidators))
    }
    /** This will run all setted custom validations */
    const runCustomValidatiors = (currentStepId: number) => {
        if (
            !stepperState ||
            !stepperState.customValidators ||
            stepperState.customValidators.length === 0
        )
            return
        stepperState.customValidators
            .filter((o) => o.stepId === currentStepId)
            .forEach((o) => {
                o.method()
            })
    }

    /** Returns the context's methods  */
    const exposeContext = {
        currentState: () => stepperState, // The current internal stepper reducer instance
        watchSiblings: () => stepperState?.sibling, // The step sibling states (which are current step, next, previous, can go, etc... use this to access the step instance)
        stepWatch, // This will watch one step if id is provided or all steps if nothing. Same result as stepperState.steps(o => o.id === ...) or just stepperState.steps
        registerField, // This is required only once at the stepper builds. This method will let the stepper aware of the step itself if it's a part of the collection.
        setFieldDefaultValue, // This is valuable when using components requiring an external managed default value. reference: @StepField
        setCustomValidators, // Will add custom validators to the collection
        setStepVisibility, // Will set the visibility true or false of a given step id
        goToStep, // This will intent the navigation to a step.
        goBack, // This will intent the navigation backward of 1, if the boundary is hit, then it will stay where it is.
        goNext, // This will intent the navigation forsward of 1, if the boundary is hit, then it will stay where it is.
        resetForm, // This will intent the complete form reset
        enableStep, // Enable specific step
        errors: getErrors, // This will provide the current error state collection.
        setError, // This will add a custom error
        submit: submitForm, // This will submit the form
        unSetError, // This will remove a specific custom error
        removeAllCustomErrors, // remove all custom errors
        validate, // This will trigger a validaton. The mode targets the to target
        dispatch, // STEPPER REDUCER: dispatch directly to the internal stepper reducer
        summary: getSummary, // returns Summary of all inputs values
        setStepperDefaultValue, // This can store default values to be (re)used
        persistLocalData, // persist data into local storage
        recoverLocalData, // recover data from local storage
        formAdapter // Form adapter for accessing form library methods
    } as StepperContext

    return (
        <StepperCtx.Provider value={exposeContext}>
            <div className={'stepper-frame'}>
                <StepperHeader debug={options.debug} />

                <div className={'stepper-content'}>
                    <div className="stepper-content-steps">{children}</div>
                </div>

                {options && options.enableFooterNavigation && <StepperFooter />}

                {options && options.debug && <StepperDebug />}
            </div>
        </StepperCtx.Provider>
    )
}

export const useStepperContext = (): StepperContext => {
    return React.useContext(StepperCtx)
}

export default Stepper
