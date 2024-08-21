import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartData: {}, // Stores items with quantity and price
    menuData: {}, 
    loading: false,
    customerToken: localStorage.getItem("customerToken") || null
};

const customerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {
        setData(state, action) {
            // console.log(action.payload);
            const payload = action.payload; 
            payload.forEach((item) => {
                state.menuData[item.name] = item.items;
               
            });  
        },
        addToCart(state, action) {
            const itemName = action.payload.item.name;
            const itemPrice = action.payload.item.price;
            const itemThubnail =action.payload.item.thumbnail
// console.log(itemThubnail)
            if (state.cartData[itemName]) {
                // Increment the quantity if the item is already in the cart
                state.cartData[itemName].quantity++;
            } else {
                // Initialize the quantity and price if the item is not in the cart
                state.cartData[itemName] = {
                    quantity: 1,
                    price: itemPrice,
                    thumbnail:itemThubnail
                };
            }
        },
        removeFromCart(state, action) {
            const itemName = action.payload.item.name;

            if (state.cartData[itemName]) {
                if (state.cartData[itemName].quantity > 1) {
                    // Decrease the quantity if more than one exists
                    state.cartData[itemName].quantity--;
                } else {
                    // Remove the item from the cart if quantity is 1
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
