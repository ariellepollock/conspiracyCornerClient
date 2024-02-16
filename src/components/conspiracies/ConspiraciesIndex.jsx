import { useState, useEffect } from "react"
import { getAllConspiracies } from "../../api/conspiracy"

import LoadingScreen from '../shared/LoadingScreen'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const cardStyle = {
    backgroundColor: 'rgba(4, 16, 43, .5)',
    borderColor: '#b4cbff',
    alignItems: 'center'
}

const ConspiraciesIndex = (props) => {
    const [conspiracies, setConspiracies] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

        useEffect(() => {
            getAllConspiracies()
                .then(res => {
                    console.log('use Effect hook ran')
                    setConspiracies(res.data.conspiracies)
                })
                .catch(error => {
                    msgAlert({
                        heading: 'Oh no!',
                        message: 'could not get conspiracies.',
                        variant: 'danger'
                    })
                    setError(true)
                })
        }, [])

    if (error) {
        return <LoadingScreen />
    }

    if (!conspiracies) {
        return <LoadingScreen />
    } else if (conspiracies.length === 0) {
        return <p>You haven't created any conspiracies yet.</p>
    }

    const conspiracyCards = conspiracies.map(conspiracy => (
        <Col xs={12} key={conspiracy._id}>       
            <Card style={cardStyle} className="mt-3 mx-5">
                <Card.Header
                    style={{ 
                        color: '#fff', 
                        fontSize: '1.25rem', 
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        backgroundColor: 'rgb(4, 16, 43)',
                        width: '100%',
                        height: '100%'
                    }}>
                        {conspiracy.story?.title || 'View to Unlock'}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link 
                            to={`/conspiracies/${conspiracy._id}`} 
                            style={{ 
                                color: '#dc1f52', 
                                fontSize: '1rem',
                            }} 
                            >
                            VIEW CONSPIRACY
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col> 
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { conspiracyCards }
        </div>
    )
}

export default ConspiraciesIndex