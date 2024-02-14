import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneConspiracy } from '../../api/conspiracy'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'

// card container
const conspiracyCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ConspiracyShow = ({ user, msgAlert }) => {
    const { conspiracyId } = useParams()
    const [conspiracy, setConspiracy] = useState(null)

    useEffect(() => {
        getOneConspiracy(conspiracyId)
            .then(res => {
                setConspiracy(res.data.conspiracy)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Failed to load conspiracy details',
                    variant: 'danger'
                })
            })
    }, [conspiracyId, msgAlert])

    if (!conspiracy) {
        return <LoadingScreen />
    }

    // Format the date for display using toLocaleDateString()
    const displayDate = conspiracy.date ? new Date(conspiracy.date).toLocaleDateString('en-US', {
        year: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
        day: 'numeric', // numeric, 2-digit
    }) : 'Unknown date'

    return (
        <>
            <Container className='m-2' style={conspiracyCardContainerLayout}>
                <Card>
                    <Card.Header>
                        { conspiracy.story?.title || 'Story title not available'}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            Created on {displayDate}
                        </Card.Subtitle>
                        <Card.Text>
                        {conspiracy.filledStory || 'Story content not available'}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ConspiracyShow