import axios from 'axios'

const API_URL = '/api/habits/'


// submit habits
const submitHabits = async (habitsData, token) => {
    //const tokenData = JSON.parse(token)
    //console.log(`Bearer ${token}`)
    console.log(habitsData)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.post(API_URL, habitsData, config)

    return response.data
}

const habitsService = {
    submitHabits,
}

export default habitsService