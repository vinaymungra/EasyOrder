const express = require("express")
const router = express.Router()

const {
    create,
    getMenu,
    addItemToCart,
    sendotp
} = require("../controllers/Customer")

// const { auth } = require("../middlewares/auth")

router.post("/create", create)
router.post("/sendotp", sendotp)
router.get("/getMenu/:bussinessId", getMenu)
router.post("/addItemToCart",addItemToCart)


module.exports = router