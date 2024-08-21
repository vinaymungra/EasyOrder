const express = require("express")
const router = express.Router()

const {
    create,
   
} = require("../controllers/Order")

const { owner } = require("../middlewares/owner")
const { bussiness } = require("../middlewares/bussiness")


router.post("/placeOrder", create)

module.exports = router