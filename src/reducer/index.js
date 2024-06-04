import authReducer from '../slices/authSlice'
import projectReducer from '../slices/projectSlice'
// import profileReducer from '../slices/profileSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    auth: authReducer,
    // profile:profileReducer,
    project:projectReducer,
})

export default rootReducer;