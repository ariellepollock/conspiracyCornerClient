import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Conpsiracies Index (my conspiracies)
export const getAllConspiracies = () => {
    return axios(`${apiUrl}/conspiracies`)
}

// READ -> Conspiracy Show (my conspiracy's details)
export const getOneConspiracy = (id) => {
    return axios(`${apiUrl}/conspiracies/${id}`)
}

// CREATE -> Create a Conspiracy
export const createConspiracy = (user, conspiracyData) => {
    return axios({
        url: '/api/conspiracies',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: conspiracyData
    })
}

// UPDATE -> Adjust a Conspiracy

// DELETE -> Quash a Conspiracy
export const removeConspiracy = (user, id) => {
    return axios({
        url: `${apiUrl}/conspiracies/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}