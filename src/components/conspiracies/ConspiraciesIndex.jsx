import { useState, useEffect } from "react"
import { getAllConspiracies } from "../../api/conspiracy"

import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
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
        <Card key={conspiracy.id} style={{ width: '30%', margin: 5 }}>
            <Card.Header>{conspiracy.story}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/conspiracies/${conspiracy._id}`} className='btn btn-info'>
                        SEE DETAILS
                    </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { conspiracyCards }
        </div>
    )
}

export default ConspiraciesIndex