const express = require("express")
const router = express.Router()

const {
    create,
    get
} = require("../controllers/Order")

// const { auth } = require("../middlewares/auth")

router.post("/create", create)
module.exports = router