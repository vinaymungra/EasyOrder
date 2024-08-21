import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { customerEndpoints} from "../apis"
import {setLoading } from "../../redux/slices/item"

const {
    GET_MENU,
    ADD_ITEM_TO_CART,
} = customerEndpoints



export const getMenu=(data) =>{
    return async(dispatch)=>{
        let result={}
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        console.log(GET_MENU+`/${data.bussinessId}`)
        try {
            
            const response = await apiConnector("GET", GET_MENU+`/${data.bussinessId}` );
            
            // console.log(response);
            result = await response.data.data.category        
        } catch (error) {
            console.log("API ERROR in getting menu for customer............", error)
            toast.error("Could Not Get Customers's Menus")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }
}

export const addItemToCart=(data,navigate)=>{

    return async(dispatch)=>{
        let result={}
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
    
        try {
            // console.log(data.bussinessId);
            
            const response = await apiConnector("POST", ADD_ITEM_TO_CART,data, {
                "Content-Type": "application/json"
            })
            
            result = await response.data.data.category        
        } catch (error) {
            console.log("API ERROR in getting menu for customer............", error)
            toast.error("Could Not Get Customers's Menus")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }

}

export const checkingBussinessExistence=(data,navigate)=>{

    return async(dispatch)=>{
        let result={}
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
    
        try {
            // console.log(data.bussinessId);
            
            const response = await apiConnector("POST", ADD_ITEM_TO_CART,data, {
                "Content-Type": "application/json"
            })
            
            result = await response.data.data.category        
        } catch (error) {
            console.log("API ERROR in getting menu for customer............", error)
            toast.error("Could Not Get Customers's Menus")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }

}

