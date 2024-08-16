const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    bussiness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bussiness",
        required: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }]
});

module.exports = mongoose.model("Menu", menuSchema);
