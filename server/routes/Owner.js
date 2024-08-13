const express = require("express")
const router = express.Router()

const {
    login,
    signup,
    sendotp,
    changePassword
} = require("../controllers/Owner")

// const {
//   resetPasswordToken,
//   resetPassword,
// } = require("../controllers/ResetPassword")

// const { auth } = require("../middlewares/auth")

router.post("/login", login)
router.post("/signup", signup)
router.post("/sendotp", sendotp)
// router.post("/changepassword", auth, changePassword) // Inside Owners Profile Option to Change Password

//Forgot Password 
// router.post("/reset-password-token", resetPasswordToken)
// router.post("/reset-password", resetPassword)


module.exports = router