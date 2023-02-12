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
    rating: {
        type: Number,
        max: [5, "Rating should be between 0-5"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    company: {
        type: String,
        required: true,
        enum: {
            values: ["apple", "samsung", "mi", "motrolla", "oppo", "dell", "hp"],
            message: "We didn't sell products of {VALUE}."
        }
    },
    image: {
        type: String
    },
    sellingBranches: {
        type: Array,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;