import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/userSlice"
import profileReducer from "../slices/profileSlice"
import testReducer from "../slices/testSlice"

const rootReducer = combineReducers({
    auth : authReducer,
    profile: profileReducer,
    test : testReducer,
})

export default rootReducer