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
    
    try {
        
        const user = thunkAPI.getState().auth.user
        const token = JSON.parse(user).token
        console.log(habitsData)
        
        return await habitsService.submitHabits(habitsData, token)
    } catch(error) {
        const err_message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(err_message)
    }
})


export const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        reset: (state) => {
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
    }
})

export const { reset } = habitsSlice.actions
export default habitsSlice.reducer