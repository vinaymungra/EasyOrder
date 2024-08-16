import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuData: {}, // Created object because i want to utilize it like map: { category: [items] }
    loading: false,
};

const menuSlice = createSlice({
    name: "menu",
    initialState: initialState,
    reducers: {
        setMenuData(state, action) {
            console.log(action.payload)

            const payload  = action.payload; 
            payload.map((item)=>{
                state.menuData[item.name]=item.items;
                console.log(item.name)
            })  
            
            // const menuItems = action.payload;
            // const categorizedMenu = menuItems.reduce((acc,item)=>{
            //     if(!acc[item.category.name]){
            //         acc[item.category.name]=[]
            //     }
            //     acc[item.category.name].push(item);
            //     return acc
            // },{})
            
            // state.menuData = categorizedMenu;
        },
        addItemToMenu(state, action) {
            console.log(action.payload)

            const payload  = action.payload; 
            payload.map((item)=>{
                state.menuData[item.name]=item.items;
            })  
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setMenuData, addItemToMenu, setLoading } = menuSlice.actions;
export default menuSlice.reducer;

