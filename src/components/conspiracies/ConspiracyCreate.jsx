import React, { useState } from 'react'
import StoriesIndex from '../shared/StoriesIndex'
import ConspiracyForm from '../shared/ConspiracyForm'
import { useNavigate } from 'react-router-dom'

const ConspiracyCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()
    const [selectedStoryId, setSelectedStoryId] = useState(null)

    // cb function - update selectedStoryId when story is selected
    const handleStorySelect = (e) => {
        setSelectedStoryId(e.target.value)
    }

    // render StoriesIndex component if no story has been selected
    if (!selectedStoryId) {
        return <StoriesIndex onStorySelect={handleStorySelect} selectedStoryId={selectedStoryId} />
    } else {
        return (
            <ConspiracyForm
                user={user}
                storyId={selectedStoryId}
                msgAlert={msgAlert}
                onSubmissionSuccess={(conspiracyId) => navigate(`/conspiracies/${conspiracyId}`)}
            />
        )
    }
}

export default ConspiracyCreate