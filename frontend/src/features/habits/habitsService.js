import axios from 'axios'

const API_URL = process.env.SERVER_URL + '/api/habits/'


// submit habits
const submitHabits = async (habitsData, token) => {
    //const tokenData = JSON.parse(token)
    //console.log(`Bearer ${token}`)
    //console.log(habitsData)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.post(API_URL, habitsData, config)

    return response.data
}

// get habits
const getHabits = async (token) => {
    //const tokenData = JSON.parse(token)
    //console.log(`Bearer ${token}`)
    //console.log(habitsData)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(API_URL, config)

    return response.data[-1]
}

const habitsService = {
    submitHabits,
    getHabits,
}

export default habitsService