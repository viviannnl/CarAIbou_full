import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import habitsReducer from '../features/habits/habitsSlice'
import goalsReducer from '../features/goals/goalsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsReducer,
    goals: goalsReducer
  },
});
