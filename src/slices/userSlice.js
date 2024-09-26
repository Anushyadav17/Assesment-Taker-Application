import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading : false,
    login : false,
};

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers: {
        setToken(state, value) {
            state.token = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setLogin(state, value) {
            state.login = value.payload;
        }
    },
});

export const { setToken, setLoading, setLogin} = authSlice.actions;

export default authSlice.reducer;