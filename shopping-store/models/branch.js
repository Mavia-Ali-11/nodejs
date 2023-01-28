const mongoose = require("mongoose");

const branchesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    },
    delivery: {
        type: Boolean,
        default: true
    }
});

const Branch = mongoose.model("Branch", branchesSchema);
module.exports = Branch;