import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { menuEndpoints } from "../apis"
import {setLoading } from "../../redux/slices/item"

const {
    MENU_CREATE_API,
    MENU_EDIT_API,
    MENU_GET_API
} = menuEndpoints

export const editMenu =  (data, token, addOrRemove) => {
    return async (dispatch) => {
        let result={}
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            var dataItem={}
            if(addOrRemove)
            {
                dataItem={
                    itemAdd:data._id
                }
            }
            else{
                dataItem={
                    itemRemove:data._id
                }
            }
            
            const response = await apiConnector("PUT", MENU_EDIT_API, dataItem, {
                "Content-Type": "application/json",
                Authorization: `token=${token}`,
            })
            result=await response.data.data.category
            if(addOrRemove)
                toast.success("Item added successfully")
            else 
                toast.success("Item removed successfully")
        
            // console.log(response)
            
        } catch (error) {
            console.log("Error in adding item to menu, API ERROR............", error)
            toast.error("Failed to add item to menu")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
        return result
      
    }
}

export const getMenu=(token) =>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        let result = {}
        try {
            const response = await apiConnector("GET", MENU_GET_API, {},
                {
                    "Content-Type": "application/json",
                    Authorization: `token=${token}`,
                }
            )
            // console.log(response);
            result = await response.data.data.category
        
        } catch (error) {
        console.log("API ERROR in getting menu of user............", error)
        toast.error("Unable to get your Menu")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }
    
  }
