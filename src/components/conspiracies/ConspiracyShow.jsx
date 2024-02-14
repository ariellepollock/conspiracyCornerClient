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

    return (
        <>
            <Container className='m-2' style={conspiracyCardContainerLayout}>
                <Card>
                    <Card.Header>
                        { conspiracy.story?.title }
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                        {conspiracy.story.title || 'Story content not available'}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ConspiracyShow