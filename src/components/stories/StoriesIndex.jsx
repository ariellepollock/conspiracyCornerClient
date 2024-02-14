import React, { useState, useEffect } from 'react'
import { getAllStories } from '../../api/story'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

const StoriesIndex = ({ selectedStoryId, onStorySelect }) => {
    const [stories, setStories] = useState([])
    const [error, setError] = useState(false)
    const navigate = useNavigate()

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

    // This function navigates to the selected story's conspiracy creation page
    const handleNavigate = () => {
        if (selectedStoryId) {
            navigate(`/create-conspiracy/${selectedStoryId}`);
        }
    }

    return (
        <Container className='justify-content-center mt-4'>
            <Form>
                <Form.Group controlId="storySelect">
                    <Form.Label>Select a Storyline</Form.Label>
                    <Form.Control as="select" value={selectedStoryId} onChange={onStorySelect}>
                        <option value="">-- Please choose a story --</option>
                        {stories.map(story => (
                            <option key={story._id} value={story._id}>{story.title}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleNavigate} className='mt-2'>Create Conspiracy</Button>
            </Form>
            {error && <p className='mt-3'>There was an issue loading the stories.</p>}
        </Container>
    )
}

export default StoriesIndex