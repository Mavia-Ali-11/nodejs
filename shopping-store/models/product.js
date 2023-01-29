const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        max: [5, "Rating should be between 0-5"]
    },
    company: {
        type: String,
        enum: {
            values: ["apple", "samsung", "mi", "motrolla", "oppo", "dell", "hp"],
            message: "We didn't sell products of {VALUE}."
        }
    },
    sellingBranch: {
        type: Array,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;