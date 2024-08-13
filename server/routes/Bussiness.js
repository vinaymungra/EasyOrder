const express = require("express")
const router = express.Router()

const {
    create,
    editTables,
    editBilling,
    getBussinessCodes,
    getUserBussiness
} = require("../controllers/Bussiness")

const { owner } = require("../middlewares/owner")
const { bussiness } = require("../middlewares/bussiness")

router.post('/create',owner,create);
router.put('/editTables',owner,bussiness,editTables);
router.put('/editBilling',owner,bussiness,editBilling);
router.put('/generateCodes',owner,bussiness,getBussinessCodes);
router.get('/getUserBussiness',owner,bussiness,getUserBussiness)
module.exports = router