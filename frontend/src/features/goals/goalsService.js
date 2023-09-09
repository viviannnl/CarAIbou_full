import axios from 'axios'

const API_URL = '/api/goals/'


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

const goalsService = {
    submitGoals,
}

export default goalsService