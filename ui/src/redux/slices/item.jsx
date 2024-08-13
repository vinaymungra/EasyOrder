// ownerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemData: [],
    loading: false,
};

const itemSlice = createSlice({
    name: "item",
    initialState: initialState,
    reducers: {
        setItemData(state, action) {
            
            state.itemData = action.payload;
        },
        addItem(state, action) {
            
            state.itemData.push(action.payload);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    },
});

export const { setItemData, setLoading,addItem} = itemSlice.actions;
export default itemSlice.reducer;
