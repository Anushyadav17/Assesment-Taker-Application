import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  startTest: localStorage.getItem("startTest") ? JSON.parse(localStorage.getItem("startTest")) : 0,
};

const testSlice = createSlice({
    name: "test",
    initialState: initialState,
    reducers: {
        startTest(state, action) {
            state.startTest = action.payload;
            localStorage.setItem("startTest", JSON.stringify(action.payload));
        },
    },
});

export const { startTest } = testSlice.actions;

export default testSlice.reducer;
