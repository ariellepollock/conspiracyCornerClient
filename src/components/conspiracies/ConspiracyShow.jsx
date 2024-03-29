import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneConspiracy, removeConspiracy } from '../../api/conspiracy'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button, ButtonGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// card container
const conspiracyCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap',
}

const cardStyle = {
    backgroundColor: 'rgba(4, 16, 43, .5)',
    borderColor: '#b4cbff',
    color: '#fff'
}

const ConspiracyShow = ({ user, msgAlert }) => {
    const { conspiracyId } = useParams()
    const [conspiracy, setConspiracy] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getOneConspiracy(conspiracyId)
            .then(res => {
                // Replace \n\n with <br><br> in the filledStory
                const formattedStory = res.data.conspiracy.filledStory.replace(/\n\n/g, '<br><br>')
                setConspiracy({...res.data.conspiracy, filledStory: formattedStory})
            })
            .catch(err => {
                msgAlert({
                    heading: 'Good Riddance!',
                    message: 'you quashed that conspiracy.',
                    variant: 'secondary'
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
                    heading: 'Good Riddance!',
                    message: 'you quashed that conspiracy.',
                    variant: 'secondary'
                })
            })
            .then(() => navigate('/conspiracies/mine'))
            .catch(err => {
                msgAlert({
                    heading: 'Darn!',
                    message: 'this conspiracy is strong.',
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
            <Container className='mt-5 mb-5' style={conspiracyCardContainerLayout}>
                <Card style={cardStyle}>
                    <Card.Header className='mt-2' style={{ color: '#dc1f52', fontSize: '1.25rem', textTransform: 'uppercase' }}>
                        { conspiracy.story?.title || 'Story title not available'}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className='mb-2' style={{ color: '#b4cbff' }}>
                            Created on {displayDate}
                        </Card.Subtitle>
                        <Card.Text 
                            dangerouslySetInnerHTML={{ 
                                __html: conspiracy.filledStory || 'Story content not available' 
                            }}
                        >
                        </Card.Text>
                    </Card.Body>
                    <div className='d-flex justify-content-left ms-3 mb-4'>
                        <Button
                            className='mt-2 me-3 purp'
                            onClick={() => navigate('/conspiracies/mine')}
                        >
                            All My Conspiracies
                        </Button><br />
                        <ButtonGroup>
                            <Button
                                className='mt-2'
                                onClick={handleUpdateClick}
                            >
                                Adjust
                            </Button>                            
                            <Button
                                className='mt-2 purp'
                                onClick={() => quashConspiracy()}
                            >
                                Quash
                            </Button>
                        </ButtonGroup>
                    </div>
                </Card>
            </Container>
        </>
    )
}

export default ConspiracyShow