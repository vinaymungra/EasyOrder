// ownerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem('token') || null,
    
};

const ownerSlice = createSlice({
    name: "owner",
    initialState: initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
           
            state.token = action.payload;
           
        },
    },
});

export const { setSignupData, setLoading, setToken } = ownerSlice.actions;
export default ownerSlice.reducer;
