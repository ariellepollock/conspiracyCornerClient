import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Stories Index
export const getAllStories = () => {
    return axios(`${apiUrl}/stories`)
}
