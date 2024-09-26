import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: localStorage.getItem("result") ? JSON.parse(localStorage.getItem("result")) : 0,
  loading: false,
};

const resultSlice = createSlice({
  name: "result",
  initialState: initialState,
  reducers: {
    setResult(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    }
  },
});

export const { setResult, setLoading } = resultSlice.actions;

export default resultSlice.reducer;