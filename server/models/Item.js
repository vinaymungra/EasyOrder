const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    bussiness:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Bussiness",
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail:{
        type:String
    },
    available: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model("Item", itemSchema)
