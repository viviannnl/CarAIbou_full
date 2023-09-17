import axios from 'axios'

const API_URL = process.env.SERVER_URL + '/api/goals/'


// submit goals
const submitGoals = async (goalsData, token) => {
    //const tokenData = JSON.parse(token)
    //console.log(`Bearer ${token}`)
    //console.log(goalsData)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.post(API_URL, goalsData, config)

    return response.data
}

// get goals
const getGoals = async (token) => {
    //const tokenData = JSON.parse(token)
    //console.log(`Bearer ${token}`)
    //console.log(goalsData)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(API_URL, config)

    return response.data[-1]
}

const goalsService = {
    submitGoals,
    getGoals,
}

export default goalsService