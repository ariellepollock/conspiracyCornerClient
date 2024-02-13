import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Conpsiracies Index (my conspiracies)
export const getAllConspiracies = () => { // and user to () if using auth
    return axios({
        url: apiUrl + '/conspiracies',
        method: 'GET',
        // headers: {
        //     Authorization: `Token token=${user.token}`,
        // },
    })
}

// READ -> Conspiracy Show (my conspiracy's details)
export const getOneConspiracy = (id) => {
    return axios(`${apiUrl}/conspiracies/${id}`)
}

// CREATE -> Create a Conspiracy
// UPDATE -> Adjust a Conspiracy
// DELETE -> Quash a Conspiracy