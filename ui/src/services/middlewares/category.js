import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { categoryEndpoints } from "../apis"
import { setLoading } from "../../redux/slices/item"

const {
    CATEGORY_CREATE_API,
    CATEGORY_EDIT_API,
    GET_ALL_CATEGORY

} = categoryEndpoints

export const createCategory = (token,name) => {
    return async (dispatch) => {
        var responseData = ""
        const toastId = toast.loading("Loading...")
        
        try {

            const response = await apiConnector("POST", CATEGORY_CREATE_API, {name}, {
                "Content-Type": "application/json",
                Authorization: `token=${token}`,
            })

            toast.success("Category Created Successfully")
            // console.log(response)
            responseData = await response.data?.data;
        } catch (error) {
            console.log("Category create API ERROR............", error)
            toast.error("Failed to create category")
        }
        toast.dismiss(toastId)
        
        return responseData
    }
}

export const getAllCatogoryData = (token) => {
    return async (dispatch) => {
      
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        let result = []
        try {

            const response = await apiConnector("GET",
                GET_ALL_CATEGORY, {},
                {
                    "Content-Type": "application/json",
                    Authorization: `token=${token}`,
                }
            )
            
            // console.log(response.data.data);
            result = await response.data.data

        } catch (error) {
            console.log("API ERROR in getting categories of user............", error)
            toast.error("Could Not Get User's Categoriess")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }

}
