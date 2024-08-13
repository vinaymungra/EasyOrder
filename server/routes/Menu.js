const express = require("express")
const router = express.Router()

const {
    edit,
    get
} = require("../controllers/Menu")

const { owner } = require("../middlewares/owner")

router.put('/edit',owner,edit);
router.get('/get',owner,get)


module.exports = router