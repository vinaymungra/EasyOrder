// ownerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem('token') || null,
    order:[]
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
        setOrderData(state,action){
            // console.log(action.payload)
            state.order=action.payload
        }
    },
});

export const { setSignupData, setLoading, setToken,setOrderData } = ownerSlice.actions;
export default ownerSlice.reducer;
