import React from 'react'
import ConspiracyForm from '../shared/ConspiracyForm'
import { useNavigate } from 'react-router-dom'
import { createConspiracy } from '../../api/conspiracy'

const ConspiracyCreate = ({ user, msgAlert, storyId }) => {
    const navigate = useNavigate()

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

    return (
        <ConspiracyForm
            user={user}
            storyId={storyId}
            handleSubmit={handleSubmit}
        />
    )
}

export default ConspiracyCreate