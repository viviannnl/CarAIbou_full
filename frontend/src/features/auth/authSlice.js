import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//console.log(localStorage.getItem('user'))
var user = JSON.parse(localStorage.getItem('user'))


const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isRejected: false,
    message: '',
}

// Register the user
export const register = createAsyncThunk ('auth/register', async (userData, thunkAPI) => {
    try {
        //console.log(`from authSlice: ${userData.name}`)
        return await authService.register(userData)
    } catch(error) {
        const err_message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(err_message)
    }
})

// Login the user
export const login = createAsyncThunk ('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch(error) {
        const err_message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(err_message)
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.user = null
            state.isLoading = false
            state.isSuccess = false
            state.isRejected = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isRejected = true
            state.message = action.payload
            state.user = null
        })
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isRejected = true
            state.message = action.payload
            state.user = null
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})

export const { resetAuth } = authSlice.actions
export default authSlice.reducer