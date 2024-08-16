import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { customerEndpoints} from "../apis"
import {setLoading } from "../../redux/slices/item"

const {
    GET_MENU
} = customerEndpoints

export const getMenu=(data) =>{
    return async(dispatch)=>{
        let result={}
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
    
        try {
            const response = await apiConnector("GET",GET_MENU,data)
            result = await response.data.data
            console.log(result);
        
        } catch (error) {
        console.log("API ERROR in getting menu for customer............", error)
        toast.error("Could Not Get Customers's Menus")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }
    
  }
