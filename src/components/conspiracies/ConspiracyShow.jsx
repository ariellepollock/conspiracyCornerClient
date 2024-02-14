import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneConspiracy } from '../../api/conspiracy'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

// card container
const conspiracyCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ConspiracyShow = (props) => {
    const { conspiracyId } = useParams()
    const { user, msgAlert } = props

    const [conspiracy, setConspiracy] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getOneConspiracy(conspiracyId)
            .then(res => setConspiracy(res.data.conspiracy))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [])

    if (!conspiracy) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
                <Card>
                    <Card.Header>
                        { conspiracy.story.title }
                    </Card.Header>
                    <Card.Body>
                        {Object.entries(conspiracy.elements).map(([placeholder, content], index) => (
                            <Card.Text key={index}>
                                {content}
                            </Card.Text>
                        ))}
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ConspiracyShow