const express = require("express")
const router = express.Router()

const {
    add,
    editTextData,
    editThumbnail,
    deleteItem,
    getAllItems
} = require("../controllers/Item")

const { owner } = require("../middlewares/owner")
const { bussiness } = require("../middlewares/bussiness")

router.post('/add',owner,bussiness,add)
router.put('/editText',owner,bussiness,editTextData);
router.put('/editThumbnail',owner,bussiness,editThumbnail);
router.get('/getAllItems',owner,bussiness,getAllItems)
router.delete('/delete',owner,bussiness,deleteItem)

module.exports = router