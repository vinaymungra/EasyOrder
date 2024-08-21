import {combineReducers} from '@reduxjs/toolkit'

import ownerReducer from './slices/owner'
import bussinessReducer from './slices/bussiness'
import itemReducer from './slices/item'
import category from './slices/category'
import menuReducer from './slices/menu'
import customer from './slices/customer'


const rootReducer = combineReducers({
    owner:ownerReducer,
    bussiness:bussinessReducer,
    item:itemReducer,
    category:category,
    menu: menuReducer,
    customer:customer
})

export default rootReducer