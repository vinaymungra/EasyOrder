import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartData: {}, // Changed to an object for better tracking of items and their quantities
    menuData: {}, 
    loading: false,
    customerToken:localStorage.getItem("customerToken")||null
};

const customerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {
        setData(state, action) {
            console.log(action.payload);
            const payload  = action.payload; 
            payload.forEach((item) => {
                state.menuData[item.name] = item.items;
                console.log(item.name);
            });  
        },
        addToCart(state, action) {
            const itemName = action.payload.item.name;
            
            if (state.cartData[itemName]) {
                state.cartData[itemName] ++;
            } else {
                state.cartData[itemName] = 1;
            }
        },
        removeFromCart(state, action) {
            const itemName = action.payload.item.name;

            if (state.cartData[itemName]) {
                if (state.cartData[itemName] > 1) {
                    state.cartData[itemName] --;
                } else {
                    delete state.cartData[itemName];
                }
            }
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setData, addToCart, removeFromCart, setLoading } = customerSlice.actions;
export default customerSlice.reducer;
