// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuData: {}, // map-like structure: { category: [items] }
    loading: false,
};

const menuSlice = createSlice({
    name: "menu",
    initialState: initialState,
    reducers: {
        setMenuData(state, action) {
            const menuItems = action.payload;
            const categorizedMenu = menuItems.reduce((acc, item) => {
                // Ensure category key exists
                if (!acc[item.category]) {
                    acc[item.category] = [];
                }
                // Push item into the appropriate category
                acc[item.category].push(item);
                return acc;
            }, {});
            
            state.menuData = categorizedMenu;
        },
        addItemToMenu(state, action) {
            const { item } = action.payload;
            if (!state.menuData[item.category]) {
                state.menuData[item.category] = [];
            }
            state.menuData[item.category].push(item);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setMenuData, addItemToMenu, setLoading } = menuSlice.actions;
export default menuSlice.reducer;
