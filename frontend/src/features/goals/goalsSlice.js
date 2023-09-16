import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalsService from './goalsService'


const initialState = {
    goals: null,
    isLoading: false,
    isSuccess: false,
    isRejected: false,
    message: '',
}

// submit habits
export const submitGoals = createAsyncThunk ('goals/submit', async (goalsData, thunkAPI) => {
    
    try {
        
        const user = thunkAPI.getState().auth.user
        const token = JSON.parse(user).token
        //console.log(goalsData)
        
        return await goalsService.submitGoals(goalsData, token)
    } catch(error) {
        const err_message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(err_message)
    }
})

// get goals
export const getGoals = createAsyncThunk ('goals/get', async (_,thunkAPI) => {
    
    try {
        
        const user = thunkAPI.getState().auth.user
        const token = JSON.parse(user).token
        //console.log(token)
        
        return await goalsService.getGoals(token)
    } catch(error) {
        const err_message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(err_message)
    }
})


export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        resetGoals: (state) => {
            state.goals = null
            state.isLoading = false
            state.isSuccess = false
            state.isRejected = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(submitGoals.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(submitGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        builder.addCase(submitGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isRejected = true
            state.message = action.payload
            state.goals = null
        })
        builder.addCase(getGoals.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        builder.addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isRejected = true
            state.message = action.payload
            state.goals = null
        })
    }
})

export const { resetGoals } = goalsSlice.actions
export default goalsSlice.reducer