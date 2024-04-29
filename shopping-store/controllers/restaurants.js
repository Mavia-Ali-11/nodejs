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
const getAgainstScores = asyncHandler(async (req, res) => {
    // const data = await Restaurant.find({ "grades.score": { $gt: req.params.score } });

    // 9. Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
    const data = await Restaurant.find({
        grades: {
            $elemMatch: {
                score: {
                    $gt: req.params.score, $lt: 100
                }
            }
        }
    }, { "grades.$": 1 });

    return res.json({ count: data.length, data }).end();
});


// 10. Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.
const getAgainstLocation = asyncHandler(async (req, res) => {
    // const data = await Restaurant.find({ "address.coord.0": { $lt: -95.754168 } }).select("address.$");

    // (Practice). Write a MongoDB query to find the restaurants where either latitude or longitude value less than -95.754168.
    // const data = await Restaurant.find({ "address.coord": { $lt: -81 } }).select("address.$");

    // 11. Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' and their grade score more than 70 and latitude less than -65.754168.
    // const data = await Restaurant.find({
    //     cuisine: { $ne: "American" },
    //     "grades.score": { $gt: 70 },
    //     "address.coord.0": { $lt: -65.754168 }
    // });

    // 12. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a score more than 70 and located in the longitude less than -65.754168.
    // const data = await Restaurant.find({
    //     cuisine: { $ne: "American" },
    //     "grades.score": { $gt: 70 },
    //     "address.coord.1": { $lt: -65.754168 }
    // });

    // 13. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a grade point 'A' not belongs to the borough Brooklyn. The document must be displayed according to the cuisine in descending order.
    const data = await Restaurant.find({
        cuisine: { $ne: "American" },
        "grades.grade": "A",
        borough: { $ne: "Brooklyn" }
    }).sort("-cuisine");

    return res.json({ count: data.length, data }).end();
});

// 14. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name.
const getAgainstSearch = asyncHandler(async (req, res) => {
    // const data = await Restaurant.find({ name: /^Wil/ })
    //     .select("-_id restaurant_id name borough cuisine");

    // 15. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'ces' as last three letters for its name.
    // const data = await Restaurant.find({ name: /ces$/ })
    //     .select("-_id restaurant_id name borough cuisine");

    // 16. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
    const data = await Restaurant.find({ name: /Reg/ })
        .select("-_id restaurant_id name borough cuisine");

    return res.json({ count: data.length, data }).end();
});

// 17. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.
const getAgainstRandomOptions = asyncHandler(async (req, res) => {
    // const data = await Restaurant.find({
    //     borough: "Bronx",
    //     $or: [
    //         { cuisine: "American" },
    //         { cuisine: "Chinese" }
    //     ]
    // });

    // 18. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronx or Brooklyn.
    // const data = await Restaurant.find({
    //     borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] }
    // })
    //     .select("-_id restaurant_id name borough cuisine");

    // 19. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronx or Brooklyn.
    // const data = await Restaurant.find({
    //     borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] }
    // })
    //     .select("-_id restaurant_id name borough cuisine");

    // 20. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.
    const data = await Restaurant.find({ "grades.score": { $not: { $gt: 10 } } })
        .select("-_id restaurant_id name borough cuisine grades.score");

    return res.json({ count: data.length, data }).end();
});

module.exports = {
    getAllRestaurants,
    getRestaurantsMeta,
    getBoroughSpecific,
    getAgainstScores,
    getAgainstLocation,
    getAgainstSearch,
    getAgainstRandomOptions
};