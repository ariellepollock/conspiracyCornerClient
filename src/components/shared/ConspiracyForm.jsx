import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const ConspiracyForm = ({ match }) => {
    const { storyId, conspiracyId } = useParams()
    const navigate = useNavigate()
    const [story, setStory] = useState(null)
    const [inputs, setInputs] = useState({})
    const [error, setError] = useState('')

    // fetch story details by id
    useEffect(() => {
        axios.get(`/api/stories/${storyId}`)
            .then(res => {
                setStory(res.data)
                // initialize form fields for each placeholder in story template
                const initialInputs = extractPlaceholders(res.data.template).reduce((acc, placeholder) => {
                    acc[placeholder] = ''
                    return acc
                }, {})
                setInputs(initialInputs)
            })
            .catch(err => setError('Failed to fetch story details.'))
    }, [storyId])

    // extract placeholders from story template
    function extractPlaceholders(template) {
        const regex = /{([^}]+)}/g
        let placeholders = []
        let match
        while ((match = regex.exec(template)) !== null) {
            placeholders.push(match[1])
        }
        return placeholders
    }

    // handle input change
    const handleChange = (event) => {
        const { name, value } = event.target
        setInputs(inputs => ({ ...inputs, [name]: value }))
    }

    // handle form submission
    const handleSubmit = (event) => {
        event.preventDefault()
        const url = conspiracyId ? `/api/conspiracies/${conspiracyId}` : '/api/conspiracies'
        const method = conspiracyId ? 'put' : 'post'

        axios[method](url, {
            story: storyId,
            elements: Object.entries(inputs).map(([placeholder, content]) => ({ placeholder, content }))
        })
        .then(() => {
            navigate('/conspiracies')
        })
        .catch(() => setError('Failed to submit conspiracy.'))
    }

    // render form
    return (
        <form onSubmit={handleSubmit}>
            <h2>{story?.title || 'Loading story...'}</h2>
            {story && Object.keys(inputs).map((placeholder, index) => (
                <div key={index}>
                    <label>{placeholder}</label>
                    <input 
                        type='text'
                        name={placeholder}
                        value={inputs[placeholder]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            {error && <p>{error}</p>}
            <button type='submit'>Create Conspiracy</button>
        </form>
    )
}

export default ConspiracyForm