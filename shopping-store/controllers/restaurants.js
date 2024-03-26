const asyncHandler = require("express-async-handler");
const { Restaurant } = require("../models");

// 1. Write a MongoDB query to display all the documents in the collection restaurants.
const getAllRestaurants = asyncHandler(async (req, res) => {
    const data = await Restaurant.find();
    return res.json({ count: data.length, data }).end();
});

// 2. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine for all the documents in the collection restaurant.
// 3. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine, but exclude the field _id for all the documents in the collection restaurant.
// 4. Write a MongoDB query to display the fields restaurant_id, name, borough and zip code, but exclude the field _id for all the documents in the collection restaurant.
const getRestaurantsMeta = asyncHandler(async (req, res) => {
    const data = await Restaurant.find().select("-_id restaurant_id name borough cuisine address.zipcode");
    return res.json({ count: data.length, data }).end();
});

// 5. Write a MongoDB query to display all the restaurant which is in the borough Bronx.
// 6. Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
const getBoroughSpecific = asyncHandler(async (req, res) => {
    const data = await Restaurant.find({ borough: "Bronx" }).limit(5);

    // 7. Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx.
    // const data = await Restaurant.find({ borough: "Bronx" }).skip(5).limit(5);

    return res.json({ count: data.length, data }).end();
});

// 8. Write a MongoDB query to find the restaurants who achieved a score more than 90.
const getRestaurantAgainstScores = asyncHandler(async (req, res) => {
    // const data = await Restaurant.find({ "grades.score": { $gt: req.params.score } });

    // 9. Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
    const data = await Restaurant.find({ grades: { $elemMatch: { score: { $gt: req.params.score, $lt: 100 } } } });
    return res.json({ count: data.length, data }).end();
});

module.exports = { getAllRestaurants, getRestaurantsMeta, getBoroughSpecific, getRestaurantAgainstScores };