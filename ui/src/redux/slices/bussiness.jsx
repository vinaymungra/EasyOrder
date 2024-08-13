// ownerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bussinessData: localStorage.getItem("bussiness") || null,
    qrUrls:  [],
    loading: false,
};

const bussinessSlice = createSlice({
    name: "bussiness",
    initialState: initialState,
    reducers: {
        setBussinessData(state, action) {
            // console.log(action.payload);
            state.bussinessData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setQRLinks(state,action){
            state.qrUrls=action.payload;
        }
    },
});

export const { setBussinessData, setLoading, setQRLinks} = bussinessSlice.actions;
export default bussinessSlice.reducer;
