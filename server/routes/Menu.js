const express = require("express")
const router = express.Router()

const {
    get,
    editMenu
} = require("../controllers/Menu")

const { owner } = require("../middlewares/owner")
const { bussiness } = require("../middlewares/bussiness")


router.get('/get',owner,bussiness,get)
router.put('/edit',owner,bussiness,editMenu)


module.exports = router