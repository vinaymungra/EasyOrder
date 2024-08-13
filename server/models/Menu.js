const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    bussiness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bussiness",
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    }]
});

module.exports = mongoose.model("Menu", menuSchema);
