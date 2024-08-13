const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    bussiness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bussiness",
        required: true
    },
    orderedItems: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    tableNo: {
        type: Number,
        required: false
    }
});


module.exports = mongoose.model("Order", orderSchema)

