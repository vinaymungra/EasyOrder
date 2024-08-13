const express = require("express")
const router = express.Router()

const {
    create
} = require("../controllers/Customer")

// const { auth } = require("../middlewares/auth")

router.post("/create", create)
module.exports = router