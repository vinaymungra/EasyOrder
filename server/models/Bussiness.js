const mongoose = require("mongoose");

const bussinessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    tables: {
        type: Number,
        required: true
    },
    thumbnail: {
		type: String,
	},
    emergencyNumber: {
        type: String,
        required: true,
        trim: true
    },
    billing: {
        type: Boolean, // true for Pre-billing, false for Post-billing
        required: true, 
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    },
    qrcode:[{
        type:String,
    }],
    category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }]
});

module.exports = mongoose.model("Bussiness", bussinessSchema)
