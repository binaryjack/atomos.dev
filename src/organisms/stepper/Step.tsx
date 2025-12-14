/* eslint-disable sonarjs/cognitive-complexity */
import './step.css'

import React from 'react'

import { StepperActionsKind } from './core/actions'
import { newStepAction } from './core/helpers'
import { StepField, StepItem } from './core/models'
import { useStepperContext } from './Stepper'

export interface StepProps {
    id: number
    label: string
    fieldList: string[]
    children?: React.ReactNode
}
/**
 *Step description:
 */
const Step = ({ id, label, fieldList, children }: StepProps): JSX.Element => {
    const { stepWatch, dispatch, registerField } = useStepperContext()

    const step = stepWatch(id) as StepItem

    const fields: StepField[] = []

    /** register the step */
    React.useEffect(() => {
        const newStep: StepItem = {
            id: id,
            label: label,
            isActive: false,
            isValid: undefined,
            isVisible: true,
            isLocked: false,
            isTouched: false,
            isDirty: false,
            fields: fields,
            hasBeenValidated: false
        }

        dispatch(newStepAction(StepperActionsKind.ADD_STEP, id, newStep))

        registerField(id, fieldList)
    }, [])

    if (!step) return <></>
    return (
        <div
            className={`step`}
            style={{
                width: '100%',
                display: step.isActive ? 'flex' : 'none'
            }}
        >
            {step.isActive && <div className={`step-content`}>{children}</div>}
        </div>
    )
}

export default Step
