import React, { useState, useEffect } from 'react'
import { getAllStories } from '../../api/story'
import { useNavigate } from 'react-router-dom'

const StoriesIndex = ({ onStorySelect }) => {
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

    const handleSelect = (e) => {
        const storyId = e.target.value
        console.log("Navigating to storyId:", storyId)
        navigate(`/create-conspiracy/${storyId}`)
    }

    if (error) {
        return <p>There was an issue loading the stories.</p>
    }

    return (
        <select onChange={handleSelect} defaultValue="">
            <option value="" disabled>Select a Storyline</option>
            {stories.map(story => (
                <option key={story._id} value={story._id}>{story.title}</option>
            ))}
        </select>
    )
}

export default StoriesIndex