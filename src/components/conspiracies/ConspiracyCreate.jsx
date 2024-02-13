import React, { useState } from 'react'
import StoriesIndex from '../stories/StoriesIndex'
import ConspiracyForm from '../shared/ConspiracyForm'
import { useNavigate } from 'react-router-dom'
import { createConspiracy } from '../../api/conspiracy'

const ConspiracyCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()
    const [selectedStoryId, setSelectedStoryId] = useState(null)

    // cb function - update selectedStoryId when story is selected
    const handleStorySelect = (storyId) => {
        setSelectedStoryId(storyId)
    }

    const handleSubmit = (conspiracyData) => {
        createConspiracy(user, conspiracyData)
            .then(res => navigate(`/conspiracies/${res.data.conspiracy._id}`))
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Conspiracy created successfully!',
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'Failed to create conspiracy',
                    variant: 'danger'
                })
            })
    }

    // render StoriesIndex component if no story has been selected
    if (!selectedStoryId) {
        return <StoriesIndex onStorySelect={handleStorySelect} />
    }

    // render ConspiracyForm - after selected story
    return (
        <ConspiracyForm
            user={user}
            storyId={selectedStoryId}
            handleSubmit={handleSubmit}
        />
    )
}

export default ConspiracyCreate