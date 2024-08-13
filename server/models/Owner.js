const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        // required: true,
        trim: true
    },
    bussiness:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bussiness"
    }
});


module.exports = mongoose.model("Owner", ownerSchema)
