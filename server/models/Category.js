const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true 
    },
    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
});

module.exports = mongoose.model("Category", CategorySchema);
