import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import habitsService from './habitsService'
import { useSelector } from 'react-redux'


const initialState = {
    habits: null,
    isLoading: false,
    isSuccess: false,
    isRejected: false,
    message: '',
}

// submit habits
export const submitHabits = createAsyncThunk ('habits/submit', async (habitsData, thunkAPI) => {
    console.log(habitsData)
    try {
        
        const user = thunkAPI.getState().auth.user
        const token = user.token

        //console.log(habitsData)
        
        return await habitsService.submitHabits(habitsData, token)
    } catch(error) {
        const err_message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(err_message)
    }
})

// get habits
export const getHabits = createAsyncThunk ('habits/get', async (_, thunkAPI) => {
    
    try {
        const user = thunkAPI.getState().auth.user
        const token = user.token
        //console.log(token)
        
        return await habitsService.getHabits(token)
    } catch(error) {
        const err_message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(err_message)
    }
})


export const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        resetHabits: (state) => {
            state.habits = null
            state.isLoading = false
            state.isSuccess = false
            state.isRejected = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(submitHabits.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(submitHabits.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.habits = action.payload
        })
        builder.addCase(submitHabits.rejected, (state, action) => {
            state.isLoading = false
            state.isRejected = true
            state.message = action.payload
            state.habits = null
        })
        builder.addCase(getHabits.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getHabits.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.habits = action.payload
        })
        builder.addCase(getHabits.rejected, (state, action) => {
            state.isLoading = false
            state.isRejected = true
            state.message = action.payload
            state.habits = null
        })
    }
})

export const { resetHabits } = habitsSlice.actions
export default habitsSlice.reducer