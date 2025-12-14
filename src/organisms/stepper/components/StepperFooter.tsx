import './stepperFooter.css'

import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { LoadingStatusEnum } from 'core/enums/LoadingStatusEnum'
import AssuraButton from 'shared/components/AssuraButton/AssuraButton'
import { getAccidentSubmitStatus } from 'shared/store/services/accidentReport/accidentReport.slice'

import { useStepperContext } from '../Stepper'

interface FooterButtonsVisibility {
    canGoBack: boolean
    canGoNext: boolean
    canSubmit: boolean
}

/**
 *StepperFooter description:
 */
const StepperFooter = (): JSX.Element => {
    const { t } = useTranslation()
    const { goBack, goNext, watchSiblings, currentState, submit } = useStepperContext()
    const accidentReportSubmitStatus = useSelector(getAccidentSubmitStatus) as LoadingStatusEnum
    const siblings = watchSiblings()
    const state = currentState()

    const [canFocus, setCanFocus] = useState(true)
    const [footerState, setFooterState] = useState<FooterButtonsVisibility>({
        canGoBack: false,
        canGoNext: false,
        canSubmit: false
    })

    const handleGoNext = () => {
        setCanFocus(true)
        goNext()
    }

    useEffect(() => {
        const displayButtons = {
            canGoBack: false,
            canGoNext: false,
            canSubmit: false
        }

        displayButtons.canGoBack = !!siblings?.canGoBack
        displayButtons.canSubmit =
            siblings?.currentStep?.id === state.steps?.length - 1 && !!siblings?.isLast

        displayButtons.canGoNext = !displayButtons.canSubmit

        setFooterState((_o) => (_o = { ...displayButtons }))
    }, [JSON.stringify(siblings)])

    const preSubmit = () => {
        setCanFocus(true)
        submit()
    }

    const backButton = () => (
        <AssuraButton
            id="stepper-footer-back"
            classNames="stepper-footer-back"
            onClick={goBack}
            text={t('COMMON.PREVIOUS')}
            variant={'secondary'}
            icon={{
                name: 'assura-back',
                size: 24
            }}
        />
    )
    const nextButton = () => (
        <AssuraButton
            id="stepper-footer-next"
            onClick={handleGoNext}
            text={t('COMMON.NEXT')}
            variant={'primary'}
            classNames="stepper-footer-next"
            iconPosition={'right'}
            icon={{
                name: 'assura-next',
                size: 24,
                marginLeft: 12
            }}
        />
    )

    const submitButton = () => (
        <AssuraButton
            id="stepper-footer-submit"
            onClick={preSubmit}
            text={t('COMMON.STEPPER_SUBMIT')}
            variant={'primary'}
            hasLoader={accidentReportSubmitStatus === LoadingStatusEnum.LOADING}
        />
    )

    useEffect(() => {
        if (state.errors && canFocus) {
            const elements = Object.values(state.errors).reduce<HTMLElement[]>((acc, error) => {
                const rhfRef = document.getElementById(error.fieldName)
                if (rhfRef) {
                    acc.push(rhfRef)
                }
                return acc
            }, [])

            elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)

            if (elements.length > 0) {
                const errorElement = elements[0]
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                errorElement.focus({ preventScroll: true })
                setCanFocus(false)
            }
        }
    }, [state, canFocus])

    return (
        <footer className={'stepper-footer m-bottom-40'}>
            <Container className="stepper-footer-container p-0 m-0">
                <Row style={{ flexDirection: 'row' }}>
                    <Col
                        xs={12}
                        md={12}
                        className="justify-space-between "
                        style={{ flexDirection: 'row' }}
                    >
                        <>
                            {footerState.canGoBack && backButton()}
                            {footerState.canGoNext && nextButton()}
                            {footerState.canSubmit && submitButton()}
                        </>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
export default StepperFooter
