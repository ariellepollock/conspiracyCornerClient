import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Conpsiracies Index (all user conspiracies conspiracies)
// export const getAllConspiracies = (user) => {
//     return axios({
//         url: `${apiUrl}/conspiracies`,
//         method: 'GET',    
//     })
// }

// READ -> My Conpsiracies Index (my conspiracies)
export const getMyConspiracies = (user) => {
    return axios({
        url: `${apiUrl}/conspiracies/mine`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        },        
    })
}

// READ -> Conspiracy Show (conspiracy's details)
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
export const updateConspiracy = (user, updatedConspiracy) => {
    return axios({
        url: `${apiUrl}/conspiracies/${updatedConspiracy._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { conspiracy: updatedConspiracy }
    })
}

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