import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneConspiracy } from '../../api/conspiracy'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'

const ConspiracyShow = ({ user, msgAlert }) => {
    const { conspiracyId } = useParams()
    const [conspiracy, setConspiracy] = useState(null)

    useEffect(() => {
        getOneConspiracy(user, {}, conspiracyId)
            .then(res => setConspiracy(res.data.conspiracy))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'something went wrong.',
                    variant: 'danger'
                })
            })
    }, [conspiracyId, user, msgAlert])

    if (!conspiracy) {
        return <LoadingScreen />
    }

    return (
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
    )
}

export default ConspiracyShow