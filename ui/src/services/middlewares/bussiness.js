import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../redux/slices/owner"
import { apiConnector } from "../apiconnector"
import { bussinessEndpoints } from "../apis"
import { setBussinessData,setQRLinks } from "../../redux/slices/bussiness"

const {
    BUSSINESS_CREATE_API,
    BUSSINESS_GENERATE_CODES_API,
    BUSSINESS_EDIT_BILLING_API,
    BUSSINESS_EDIT_TABLES_API,
    BUSSINESS_OF_USER   
} = bussinessEndpoints

export const createBussiness =  (closeModal, data, token, navigate) => {
    return async (dispatch) => {
       
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", BUSSINESS_CREATE_API, data, {
                "Content-Type": "multipart/form-data",
                Authorization: `token=${token}`,
            })
            
            if (!response?.data?.success) {
                throw new Error("Could Not create bussiness")
            }
            toast.success("Bussiness Created Successfully")
            closeModal()
            data=await response.data.data;
            // console.log(data);
            await dispatch(setBussinessData(data));
            navigate('/dashboard')
        } catch (error) {
            console.log("Bussiness API ERROR............", error)
            toast.error("Failed to create bussiness")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
        
    }
}

// export function createBussiness(closeModal, data) {
//     return async (dispatch) => {

//         const toastId = toast.loading("Loading...")
//         dispatch(setLoading(true))
//         try {

//             const response = await apiConnector("POST", BUSSINESS_CREATE_API, data)

//             console.log(response.data.success)

//             if (!response.data.success) {
//                 throw new Error("Error " + response.data.message)
//             }

//             toast.success("Bussiness Created Successfully")
//             closeModal()
//         } catch (error) {
//             console.log("Bussiness API ERROR............", error)
//             toast.error("Failed to create bussiness")
//         }
//         dispatch(setLoading(false))
//         toast.dismiss(toastId)
//     }
// }


export const generateQRCodes =  (token) => {
    return async (dispatch) => {
       
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("PUT", BUSSINESS_GENERATE_CODES_API,{}, {
                "Content-Type": "multipart/form-data",
                Authorization: `token=${token}`,
            })
            
            if (!response?.data?.success) {
                throw new Error("Could Not get QR codes")
            }
            const result=await response.data.qrLinks;
            // toast.success("QR codes generated successfully")
            dispatch(setQRLinks(result))       
        } catch (error) {
            console.log("QR Codes API ERROR............", error)
            toast.error("Failed to generate QR codes")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export const handleBussinessData=(token) =>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        let result = []
        try {
            
            const response = await apiConnector("GET",
            BUSSINESS_OF_USER,{},
            {
                "Content-Type": "multipart/form-data",
                Authorization: `token=${token}`,
            }
        )
        
        result = await response.data.data
        
        } catch (error) {
            console.log("API ERROR in getting bussiness of user............", error)
            
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result
    }
}
  