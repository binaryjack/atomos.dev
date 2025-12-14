/* eslint-disable @typescript-eslint/no-explicit-any */
///  this type { [x: string]: any } requires any because it must match the type as it is in RHF.
import './stepperHeader.css'

import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import useWindowSize from 'core/services/useWindowSize'

import { StepItem } from '../core/models'
import { useStepperContext } from '../Stepper'
import StepperTab from './StepperTab'

export interface StepperHeaderProps {
    debug?: boolean
}
/**
 *StepperHeader description:
 */
const StepperHeader = ({ debug }: StepperHeaderProps): JSX.Element => {
    const { isMobile, isMD } = useWindowSize()
    const { t } = useTranslation()
    const { goToStep, currentState } = useStepperContext()
    const stepperState = currentState()

    const currentStepLabel =
        stepperState &&
        stepperState?.sibling &&
        stepperState?.sibling?.currentStep &&
        t(stepperState?.sibling?.currentStep?.label)

    return (
        <header className={'stepper-header bg-gray50'}>
            <Container>
                <Row>
                    <Col xl={12} sm={12} xs={12} className="stepper-header-inner-frame">
                        {(isMobile || isMD) && (
                            <div className="stepper-header-breadcrumb-paging headlineSmallMedium m-bottom-24">
                                <span className="">{`${t('COMMON.STEP_TITLE_LABEL')} ${
                                    stepperState &&
                                    stepperState?.currentStepId &&
                                    stepperState?.currentStepId + 1
                                }/${stepperState?.steps?.length} : ${currentStepLabel}`}</span>
                            </div>
                        )}
                        <div className={'stepper-header-breadcrumb'}>
                            {stepperState &&
                                stepperState.steps &&
                                stepperState.steps.map((stepItem: StepItem) => {
                                    return (
                                        <StepperTab
                                            key={`${stepItem.id}`}
                                            stepItem={stepItem}
                                            goToStep={goToStep}
                                            debug={debug}
                                        />
                                    )
                                })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}
export default StepperHeader
