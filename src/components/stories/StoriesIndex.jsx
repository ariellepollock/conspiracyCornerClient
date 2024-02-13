import React, { useState, useEffect } from 'react'
import { getAllStories } from '../../api/story'

const StoriesIndex = ({ onStorySelect }) => {
    const [stories, setStories] = useState([])
    const [error, setError] = useState(false)

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

    if (error) {
        return <p>There was an issue loading the stories.</p>
    }

    return (
        <select onChange={(e) => onStorySelect(e.target.value)} defaultValue="">
            <option value="" disabled>Select a Storyline</option>
            {stories.map(story => (
                <option key={story._id} value={story._id}>{story.title}</option>
            ))}
        </select>
    )
}

export default StoriesIndex