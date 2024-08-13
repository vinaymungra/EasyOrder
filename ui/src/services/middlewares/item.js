import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { itemEndpoints } from "../apis"
import {setLoading } from "../../redux/slices/item"

const {
    ITEM_CREATE_API,
    ITEM_DELETE_API,
    ITEM_EDIT_TEXT_API,
    ITEM_EDIT_THUMBNAIL_API,
    ITEM_GET_ALL_ITEMS_API
} = itemEndpoints

export const createItem =  (data, token) => {
    return async (dispatch) => {
        var responseData=""
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
        
            const response = await apiConnector("POST", ITEM_CREATE_API, data, {
                "Content-Type": "multipart/form-data",
                Authorization: `token=${token}`,
            })
            
            toast.success("Item Created Successfully")
            console.log(response)
            responseData= response.data?.data;
        } catch (error) {
            console.log("Item create API ERROR............", error)
            toast.error("Failed to create item")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
        return responseData
    }
}

export const getItemsData=(token) =>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        let result = []
        try {
            
            const response = await apiConnector("GET",
                ITEM_GET_ALL_ITEMS_API,{},
            {
                "Content-Type": "application/json",
                Authorization: `token=${token}`,
            }
        )
        result = await response.data.data
        // console.log(result);
        
        } catch (error) {
        console.log("API ERROR in getting items of user............", error)
        toast.error("Could Not Get User's Items")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }
    
  }
