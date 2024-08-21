const BASE_URL = "http://localhost:4000/api/v1"

// OWNER ENDPOINTS
export const endpoints = {
  SENDOTP_API:        BASE_URL + "/owner/sendotp",
  SIGNUP_API:         BASE_URL + "/owner/signup",
  LOGIN_API:          BASE_URL + "/owner/login",
  RESETPASSTOKEN_API: BASE_URL + "/owner/reset-password-token",
  RESETPASSWORD_API:  BASE_URL + "/owner/reset-password",
}

// BUSSINESS ENDPOINTS
export const bussinessEndpoints = {
  BUSSINESS_CREATE_API:         BASE_URL + "/bussiness/create",
  BUSSINESS_EDIT_TABLES_API:    BASE_URL + "/bussiness/editTables",
  BUSSINESS_EDIT_BILLING_API:   BASE_URL + "/bussiness/editBilling",
  BUSSINESS_GENERATE_CODES_API: BASE_URL + "/bussiness/generateCodes",
  BUSSINESS_OF_USER :           BASE_URL + "/bussiness/getUserBussiness" 
}

// ITEM ENDPOINTS
export const itemEndpoints = {  
  ITEM_CREATE_API:         BASE_URL + "/item/add",
  ITEM_EDIT_TEXT_API:      BASE_URL + "/item/editText",
  ITEM_EDIT_THUMBNAIL_API: BASE_URL + "/item/editThumbnail",
  ITEM_GET_ALL_ITEMS_API:  BASE_URL + "/item/getAllItems",
  ITEM_DELETE_API:         BASE_URL + "/item/delete",

}


// CUSTOMER ENDPOINTS
export const customerEndpoints = {
  PAYMENT_API: BASE_URL + "/customer/capturePayment",
  VERIFY_API: BASE_URL + "/customer/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/customer/sendPaymentSuccessEmail",
  GET_MENU: BASE_URL + "/customer/getMenu",
  ADD_ITEM_TO_CART: BASE_URL + "/customer/addItemToCart",
  // CHECK_BUSSINESS_EXISTS: BASE_URL + "/customer/checkBussiness",

}

// ORDER ENDPOINTS
export const orderEndpoints = {
  PLACE_ORDER : BASE_URL + "/order/placeOrder",
  GET_ORDER : BASE_URL + "/order/getOrder" 
}

// MENU ENDPOINTS
export const menuEndpoints = {
  MENU_CREATE_API: BASE_URL + "/menu/create",
  MENU_EDIT_API: BASE_URL + "/menu/edit",
  MENU_GET_API: BASE_URL + "/menu/get",
}
//CATEGORY ENDPOINTS
export const categoryEndpoints = {
  CATEGORY_CREATE_API: BASE_URL + "/category/create",
  CATEGORY_EDIT_API: BASE_URL + "/category/edit",
  GET_ALL_CATEGORY: BASE_URL + "/category/getAllCategory",

}
