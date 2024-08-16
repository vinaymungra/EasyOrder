const express = require("express")
const router = express.Router()

const {
    create,
    getMenu
} = require("../controllers/Customer")

// const { auth } = require("../middlewares/auth")

router.post("/create", create)
router.get("/getMenu", getMenu)

module.exports = router