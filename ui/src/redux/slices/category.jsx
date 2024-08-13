// ownerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryData: [],
    loading: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        setCategoryData(state, action) {
            state.categoryData = action.payload;
        },
        addCategory(state, action) {
            state.categoryData.push(action.payload);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    },
});

export const { setCategoryData, setLoading, addCategory} = categorySlice.actions;
export default categorySlice.reducer;
