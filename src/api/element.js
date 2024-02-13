import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE -> Create an element
export const createElement = (conspiracy, newElement) => {
    return axios({
        url: `${apiUrl}/elements/${conspiracy._id}`,
        method: 'POST',
        data: { element: newElement }
    })
}

// UPDATE -> Edit an element
export const updateElement = (user, conspiracy, updatedElement) => {
    return axios({
        url: `${apiUrl}/elements/${conspiracy._id}/${updateElement._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { element: updatedElement }
    })
}

// DELETE -> Edit an element
export const removeElement = (user, conspiracyId, elementId) => {
    return axios({
        url: `${apiUrl}/elements/${conspiracyId}/${elementId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}