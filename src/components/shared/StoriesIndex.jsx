import React, { useState, useEffect } from 'react'
import { getAllStories } from '../../api/story'
// import { useNavigate } from 'react-router-dom'
import { Form, Container } from 'react-bootstrap'

const StoriesIndex = ({ selectedStoryId, onStorySelect }) => {
    const [stories, setStories] = useState([])
    const [error, setError] = useState(false)
    // const navigate = useNavigate()

    useEffect(() => {
        getAllStories()
            .then(res => {
                setStories(res.data.stories)
            })
            .catch(err => {
                setError(true)
                console.error('Error loading stories: ', err)
            })
    }, [])

    return (
        <Container className='justify-content-center mt-5'>
            <Form>
                <Form.Group controlId="storySelect" className='mx-4' style={{ color: '#b4cbff' }}>
                    <h2 className='text-center mb-3'>Select a Storyline</h2>
                    <Form.Control as="select" value={selectedStoryId} onChange={onStorySelect}>
                        <option className='text-center'>-- eeny meeny miny moe --</option>
                        {stories.map(story => (
                            <option key={story._id} value={story._id}>{story.title}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
            {error && <p className='mt-3'>There was an issue loading the stories.</p>}
        </Container>
    )
}

export default StoriesIndex