import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneConspiracy, removeConspiracy } from '../../api/conspiracy'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// card container
const conspiracyCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ConspiracyShow = ({ user, msgAlert }) => {
    const { conspiracyId } = useParams()
    const [conspiracy, setConspiracy] = useState(null)
    const navigate = useNavigate()

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

    // update button click
    const handleUpdateClick = () => {
        navigate(`/conspiracies/${conspiracyId}/edit`, { state: { conspiracy }})
    }

    // quash a conspiracy
    const quashConspiracy = () => {
        removeConspiracy(user, conspiracy._id)
            .then(() => {
                msgAlert({
                    heading: 'success!',
                    message: 'you quashed that conspiracy!',
                    variant: 'success'
                })
            })
            .then(() => navigate('/conspiracies'))
            .catch(err => {
                msgAlert({
                    heading: 'Darn!',
                    message: 'this conspiracy is strong',
                    variant: 'danger'
                })
            })
    }

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
                    <Button
                        className='m-2'
                        variant='danger'
                        onClick={() => quashConspiracy()}
                    >
                        Quash this Conspiracy
                    </Button>
                    <Button
                        className='m-2'
                        variant='warning'
                        onClick={handleUpdateClick}
                    >
                        Adjust this Conspiracy
                    </Button>                    
                </Card>
            </Container>
        </>
    )
}

export default ConspiracyShow