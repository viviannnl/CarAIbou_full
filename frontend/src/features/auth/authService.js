import axios from 'axios'

const API_URL = 'https://caraibou-demo-api.onrender.com/api/users/'

// Register user
const register = async (userData) => {
    //console.log(`from Service: ${userData.name}`)
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', response.data)
    }
    //console.log(typeof response.userData)

    return response.data
}

// Login user
const login = async (userData) => {
    console.log(API_URL)
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(JSON.stringify(response.data))


    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService