const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

    number: {
        type: String,
        required: true,
        trim: true,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]
});


module.exports = mongoose.model("Customer", customerSchema)

