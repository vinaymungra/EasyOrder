import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bussiness:{},
    menuData: {}, // Created object because i want to utilize it like map: { category: [items] }
    loading: false,
};

const customerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {
        setData(state, action) {
            console.log(action.payload)

            // const payload  = action.payload; 
            // payload.map((item)=>{
            //     state.menuData[item.name]=item.items;
            //     console.log(item.name)
            // })  
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setData, setLoading } = customerSlice.actions;
export default customerSlice.reducer;

