/* eslint-disable sonarjs/cognitive-complexity */
import './stepperTab.css'

import { PropsWithChildren } from 'react'

import useWindowSize from 'core/services/useWindowSize'
import CheckMark from 'shared/assets/images/check.svg'
import ExclamationMark from 'shared/assets/images/exclamationMark.svg'

import { StepItem, StepperError } from '../core/models'

export interface StepperTabProps extends Partial<PropsWithChildren<JSX.Element>> {
    goToStep: (id: number) => void
    stepItem: StepItem
    debug?: boolean
}

export const newError = (
    stepId: number,
    fieldName: string,
    errorName: string,
    message: string
): StepperError => {
    return { stepId, fieldName, error: { name: errorName, message: message } } as StepperError
}

/**
 * StepperTab description:
 * This is the breadcrumb tab
 */
const StepperTab = ({ goToStep, stepItem, debug }: StepperTabProps): JSX.Element => {
    const { isMobile, isMD } = useWindowSize()

    const coll = [
        stepItem.isActive ? 'A' : '',
        stepItem.isDirty ? 'D' : '',
        stepItem.isLocked ? 'L' : '',
        stepItem.isTouched ? 'T' : '',
        stepItem.hasBeenValidated ? 'H' : '',
        stepItem.isValid !== undefined && stepItem.isValid === true
            ? 'V'
            : stepItem.isValid !== undefined && stepItem.isValid === false
            ? 'NV'
            : ''
    ]

    const stateOne = coll.filter((o) => o !== undefined && o.length > 0).join('-')
    const stepperTabIconStyle = (): string => {
        if (stepItem.isActive) return 'bg-primary'
        if (!stepItem.isVisible) return 'not-available'
        if (stepItem.isValid === true) return 'valid'
        return 'c-gray100'
    }

    const stepperTabIconType = (): JSX.Element => {
        if (stepItem.isActive)
            return <div className={'labelExtraSmallMedium c-white'}>{stepItem.id + 1}</div>

        if (stepItem.isValid === true) return <CheckMark />

        if (stepItem.isValid === false) return <ExclamationMark />

        if (!stepItem.isActive && !stepItem.isVisible)
            return <i className="not-available-icon icon assura-close c-gray500" />

        return <div className={'labelExtraSmallMedium c-gray500'}>{stepItem.id + 1}</div>
    }

    const stepperTabTextStyle = (): string => {
        if (stepItem.isActive && stepItem.isValid === false) return 'c-primary labelSmallMedium'
        if (stepItem.isActive) return 'c-black labelSmallMedium'
        if (!stepItem.isVisible) return 'c-gray500 labelSmall'
        if (stepItem.isValid === false) return 'c-primary labelSmall'
        if (stepItem.isValid === undefined) return 'c-gray500 labelSmall'
        return 'c-black labelSmall'
    }

    const stepperTabUnderlineStyle = (): string => {
        if (stepItem.isActive) return 'bg-primary'
        if (stepItem.isValid === true) return 'bg-gray300'
        return 'bg-gray100'
    }

    return (
        <div
            style={{
                width: isMobile ? '100%' : isMD ? '94px' : '140px',
                height: isMobile || isMD ? '2px' : '55px'
            }}
            onClick={() => goToStep(stepItem.id)}
            className={`stepper-tab`}
            data-testid={`stepper-tab-${stepItem?.id}`}
            data-test-is-active={stepItem.isActive ? true : false}
            data-test-is-enabled={stepItem.isVisible ? true : false}
            data-test-is-valid={stepItem?.isValid ? true : false}
            data-test-is-touched={stepItem?.isTouched ? true : false}
        >
            {!(isMobile || isMD) && (
                <div className="stepper-tab-top">
                    <span className={`stepper-icon ${stepperTabIconStyle()}`}>
                        {stepperTabIconType()}
                    </span>
                    <div className={`stepper-header-step-text ${stepperTabTextStyle()}`}>
                        {stepItem.label} {debug && stateOne}
                    </div>
                </div>
            )}

            <div
                style={{
                    width: isMobile ? '100%' : isMD ? '94px' : '140px'
                }}
                className={`underline ${stepperTabUnderlineStyle()}`}
            ></div>
        </div>
    )
}
export default StepperTab
