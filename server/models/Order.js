const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);
