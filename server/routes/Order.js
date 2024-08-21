const express = require("express")
const router = express.Router()

const {
    create,
    get
   
} = require("../controllers/Order")

const { owner } = require("../middlewares/owner")
const { bussiness } = require("../middlewares/bussiness")


router.post("/placeOrder", create)
router.get("/getOrder", owner,bussiness,get)

module.exports = router