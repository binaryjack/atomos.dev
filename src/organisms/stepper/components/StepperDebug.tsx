/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import './stepperDebug.css'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { FileWithPath } from 'react-dropzone'

import { defaultMockValues } from 'modules/services/accidentReport/mock/AccidentReportMock'

import { StepperActionsKind } from '../core/actions'
import { newStepAction } from '../core/helpers'
import { StepField, StepItem, StepperDefaultValue, StepperError } from '../core/models'
import { useStepperContext } from '../Stepper'

/**
 *StepperDebug description:
 */
const StepperDebug = (): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)
    const { currentState, goToStep, dispatch, validate, formAdapter } = useStepperContext()

    const stepperState = currentState()

    const fillUpHandleClick = () => {
        fillUpTo(8)
    }

    const handleClick = () => {
        setOpen((o) => (o = !o))
    }


    const goToField = (name: string) => {
        formAdapter?.setFocus?.(name)
        document.getElementById(`#${name}`)?.scroll()
    }








    const fillUpTo = async (stepId: number) => {


        const allValues = Object.entries(defaultMockValues).map((values) => {
            return { name: values[0], value: values[1] }
        })


        stepperState.steps.forEach((s) => {
            if (s.id > stepId) return

            setTimeout(() => {
                s.fields.forEach((o) => {
                    formAdapter?.setFocus?.(o.name)
                    document.getElementById(`#${o.name}`)?.scroll()

                    const val = allValues.find((el) => {
                        if (el.name === o.name) {
                            return el.value
                        }
                    })
                    if (val) formAdapter.setValue(val.name, val.value, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
                })
                setTimeout(() => {
                    dispatch(newStepAction(StepperActionsKind.NAVIGATION_REQUEST, s.id + 1, 'goto'))
                    validate('all')
                }, 100)
            }, 200)

        })
    }

    const fillAllValues = (fields: StepField[], stepId: number) => {
        formAdapter.clearErrors(fields.map((o) => o.name))
        dispatch(newStepAction(StepperActionsKind.CLEAR_ALL_ERRORS, stepId, undefined))
        fields.forEach((o) => setTimeout(() => fillValue(o.name, stepId, true), 1000))
    }

    const fillValue = (name: string, stepId: number, isMany: boolean) => {
        if (!isMany) formAdapter.clearErrors(name)

        if (
            stepperState &&
            stepperState.steps &&
            stepperState.steps.find((o) => o.id === stepId)?.isVisible === false
        )
            return

        const val = Object.entries(defaultMockValues).find((element) => {
            if (element[0] === name) {
                return element[1]
            }
        })
        if (!val) return
        formAdapter.setValue(name, val[1], { shouldDirty: true, shouldTouch: true, shouldValidate: true })
        //trigger(name)
    }

    const resetStep = (fields: StepField[], stepId: number) => {
        formAdapter.clearErrors(fields.map((o) => o.name))
        fields.forEach((o) => {
            formAdapter.resetField(o.name)
        })
        dispatch(newStepAction(StepperActionsKind.CLEAR_ALL_ERRORS, stepId, undefined))
    }

    const parseValue = (fieldName: string) => {
        const val = formAdapter.getValues(fieldName)
        if (val && val instanceof Date) {
            return new Date(val).toLocaleDateString()
        } else if ((val && val === true) || val === false) {
            return (val as boolean) === true
                ? 'true'
                : (val as boolean) === false
                    ? 'false'
                    : 'undefined'
        } else if (val && (val as FileWithPath) && (val as FileWithPath).name !== undefined) {
            const file = val as FileWithPath
            return file.name
        } else {
            return val
        }
    }



    const customStepperDefaultValue = () =>
        stepperState.defaultValue &&
        stepperState.defaultValue.map((defaultValue: StepperDefaultValue, index: number) => {
            return (
                <div
                    key={`${defaultValue.name}-${index}`}
                    style={{
                        background: '#a3ff7e',
                        color: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                    }}
                >
                    <div
                        style={{
                            color: '#ffffff',
                            background: '#1d5e03',

                            display: 'flex',
                            alignItems: 'center',
                            justifySelf: 'flex-start',
                            marginRight: '20px'
                        }}
                    >
                        {defaultValue.name}
                    </div>
                    <div
                        style={{
                            color: '#000000',
                            display: 'flex',

                            alignItems: 'center',
                            justifySelf: 'flex-start',
                            marginRight: '20px'
                        }}
                    >
                        {typeof defaultValue.value === 'object'
                            ? JSON.stringify(defaultValue.value)
                            : defaultValue.value}
                    </div>
                </div>
            )
        })

    const errors = (id: number) =>
        stepperState.errors &&
        stepperState.errors
            .filter((o) => o.stepId === id)
            .map((error: StepperError, index: number) => {
                return (
                    <div
                        key={`${error.stepId}-${id}-${index}`}
                        style={{
                            background: '#a82929',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flexDirection: 'row'
                        }}
                    >
                        <div
                            style={{
                                color: '#ede133',
                                display: 'flex',
                                alignItems: 'center',
                                justifySelf: 'flex-start',
                                marginRight: '20px'
                            }}
                        >
                            step:{error.stepId}
                        </div>
                        <div
                            style={{
                                color: '#cacaca',
                                display: 'flex',
                                alignItems: 'center',
                                justifySelf: 'flex-start',
                                marginRight: '20px'
                            }}
                        >
                            {error.fieldName}
                        </div>
                        <div
                            style={{
                                color: '#cacaca',
                                display: 'flex',
                                alignItems: 'center',
                                justifySelf: 'flex-end',
                                marginRight: '20px'
                            }}
                        >
                            {error.error?.message}
                        </div>
                    </div>
                )
            })

    const values = () =>
        stepperState.steps &&
        stepperState.steps.map((step: StepItem, index: number) => {
            return (
                <div
                    key={`${step.id}${index}`}
                    style={{
                        cursor: 'pointer',
                        borderColor: step.isActive ? '#ff00002' : '#582121',
                        borderStyle: 'solid',
                        borderWidth: step.isActive ? '1px' : '0px'
                    }}
                    onClick={() => goToStep(step.id)}
                >
                    <div
                        style={{
                            padding: '3px',
                            color: step.isVisible ? ' #ffffff' : '#767676',
                            background: step.isVisible ? '#c90202' : '#2f2f2f',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}
                    >
                        {step.id} {step.label}
                        {stepperState.errors &&
                            stepperState.errors.filter((o) => o.stepId === step.id)?.length}
                        <div
                            style={{
                                position: 'relative',
                                display: 'flex',
                                minWidth: '10px',
                                minHeight: '10px',
                                borderRadius: '100%',
                                background: stepperState?.isValid ? '#8fcb85' : '#b69898'
                            }}
                        ></div>

                        {step.isVisible && (
                            <>
                                <button onClick={() => fillAllValues(step.fields, step.id)}>
                                    fill all
                                </button>
                                <button onClick={() => resetStep(step.fields, step.id)}>
                                    reset
                                </button>
                                <div
                                    style={{
                                        color: '#ffffff',
                                        background:
                                            step.isValid === true
                                                ? '#399d11'
                                                : step.isValid === false
                                                    ? '#8f2323'
                                                    : '#ffbb00',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '20px',
                                        minHeight: '20px',
                                        borderRadius: '100%'
                                    }}
                                >
                                    {step.isValid === true ? 'V' : <></>}
                                </div>
                                <div
                                    style={{
                                        color: '#fafafa',
                                        background:
                                            step.isDirty === true ? '#886808' : 'transparent',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '20px',
                                        minHeight: '20px',
                                        borderRadius: '100%'
                                    }}
                                >
                                    {step.isDirty === true ? 'D' : <></>}
                                </div>
                                <div
                                    style={{
                                        color: '#fafafa',
                                        background:
                                            step.isTouched === true ? '#124a5f' : 'transparent',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '20px',
                                        minHeight: '20px',
                                        borderRadius: '100%'
                                    }}
                                >
                                    {step.isTouched === true ? 'T' : <></>}
                                </div>
                                <div
                                    style={{
                                        color: '#ffffff',
                                        background:
                                            step.isLocked === true ? '#3a1046' : 'transparent',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '20px',
                                        minHeight: '20px',
                                        borderRadius: '100%'
                                    }}
                                >
                                    {step.isLocked === true ? 'L' : <></>}
                                </div>

                            </>
                        )}
                        <button onClick={() => fillUpTo(step.id)}>
                            fill up to here
                        </button>
                    </div>

                    <div>
                        {step.fields?.map((field: StepField, sfindex: number) => {
                            const hasError =
                                stepperState.errors &&
                                stepperState.errors.find((o) => o.fieldName === field.name) !==
                                undefined
                            return (
                                <div
                                    style={{
                                        width: '100%',
                                        background: hasError ? '#d9a0a0' : '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'stretch'
                                    }}
                                    key={`${field.name}${sfindex}`}
                                >
                                    <div
                                        style={{
                                            marginLeft: '5px',
                                            marginRight: '5px',
                                            width: '200px',
                                            overflow: 'hidden',
                                            background: hasError ? '#e89c9c' : 'transparent',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        {field.name}
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: '5px',
                                            marginRight: '5px',
                                            width: '300px',
                                            overflow: 'hidden',
                                            background: hasError ? '#ffc2c2' : 'transparent',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        {parseValue(field.name)}
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: '5px',
                                            width: '50px',
                                            overflow: 'hidden',
                                            background: hasError ? '#ffda53' : 'transparent',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        {field.defaultValue && JSON.stringify(field.defaultValue)}
                                    </div>
                                    <button onClick={() => goToField(field.name)}>goto</button>
                                    <button onClick={() => fillValue(field.name, step.id, false)}>
                                        fill
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ borderBottom: '1px black solid', background: '#f5f5f52' }}>
                        ERRORS
                    </div>
                    <div>{errors(step.id)}</div>
                    {index === 0 && (
                        <>
                            <div
                                style={{ borderBottom: '1px black solid', background: '#f5f5f52' }}
                            >
                                DEFAULT STEPPER VALUES
                            </div>
                            <div> {customStepperDefaultValue()}</div>{' '}
                        </>
                    )}
                </div>
            )
        })

    return (
        <>
            <div className="setp-fillAll-toggle" onClick={fillUpHandleClick}>
                fill all
            </div>
            <div className="setp-debug-toggle" onClick={handleClick}>
                Debug
            </div>
            {open && (
                <div className="stepper-debug">
                    {values()}
                </div>
            )}
        </>
    )
}
export default StepperDebug
