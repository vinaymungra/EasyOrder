const express = require("express")
const router = express.Router()

const {
    createCategory,
    editCategory,
    getAllCategories
} = require("../controllers/Category")

const { owner } = require("../middlewares/owner")
const { bussiness } = require("../middlewares/bussiness")

router.post('/create',owner,bussiness,createCategory)
router.put('/edit',owner,bussiness,editCategory);
router.get('/getAllCategory',owner,bussiness,getAllCategories);

module.exports = router