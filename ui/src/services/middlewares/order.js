import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { orderEndpoints} from "../apis"
import {setLoading } from "../../redux/slices/item"

const {
   PLACE_ORDER,
   GET_ORDER
} = orderEndpoints


export const paymentSuccessfull=(navigate,location,cartData,menuData)=>{

    return async(dispatch)=>{
        let result={}
        
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
    
        try {
            const tableNo =location.pathname.split("/")[2]
            // console.log(cartData)      
            const response = await apiConnector("POST", PLACE_ORDER,{cartData,menuData,tableNo}, {
                "Content-Type": "application/json",
                
            })
            
            result = await response.data.data       
        } catch (error) {
            console.log("API ERROR in getting menu for customer............", error)
            toast.error("Error in placing order")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }

}

export const getOrders=(token)=>{

    return async(dispatch)=>{
        let result={}
        
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
    
        try {
            
            const response = await apiConnector("GET", GET_ORDER,{}, {
                "Content-Type": "application/json",
                Authorization: `token=${token}`,
            })
            
            result = await response.data.data
            console.log(result)      
        } catch (error) {
            console.log("API ERROR in getting menu for customer............", error)
            toast.error("Error in placing order")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }

}

