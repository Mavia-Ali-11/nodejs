const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    restaurant_id: String,
    name: String,
    address: {
        building: String,
        coord: Array,
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [{ date: Date, grade: String, score: Number }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;