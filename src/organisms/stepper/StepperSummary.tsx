import './step.css'

import { Col, Container, Row } from 'react-bootstrap'

import StepperFooter from './components/StepperFooter'
import { useStepperContext } from './Stepper'

/**
 *Step description:
 */
const StepperSummary = (): JSX.Element => {
    const { summary } = useStepperContext()
    const summaryData = summary()

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Container className="av-travel-details-block bg-white m-bottom-32 bc-gray100">
                {summaryData &&
                    summaryData.map((s, i) => {
                        {
                            return (
                                <Row key={i} className="justify-content-start  m-bottom-48">
                                    <Col className={'bg-gray100'}>{s.name}</Col>
                                    <Col>{s.value}</Col>
                                </Row>
                            )
                        }
                    })}
            </Container>

            <StepperFooter />
        </div>
    )
}

export default StepperSummary
