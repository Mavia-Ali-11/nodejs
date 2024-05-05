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
    // const data = await Restaurant.find({ "grades.score": { $not: { $gt: 10 } } })
    //     .select("-_id restaurant_id name borough cuisine grades.score");

    // 21. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.
    // const data = await Restaurant.find({
    //     $or: [
    //         { cuisine: { $nin: ["American", "Chinees"] } },
    //         { name: /^Wil/ }
    //     ]
    // })
    //     .select("-_id restaurant_id name borough cuisine grades.score");

    // 22. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates.
    // const data = await Restaurant.find({
    //     grades: {
    //         $elemMatch: {
    //             grade: "A",
    //             score: 11,
    //             date: new Date("2014-08-11T00:00:00Z")
    //         }
    //     }
    // })
    //     .select("-_id restaurant_id name grades");

    // 23. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z"
    // const data = await Restaurant.find({
    //     "grades.1.grade": "A",
    //     "grades.1.score": 9,
    //     "grades.1.date": new Date("2014-08-11T00:00:00Z")
    // })
    //     .select("-_id restaurant_id name grades");

    // 24. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52.
    const data = await Restaurant.find({ "address.coord.1": { $gte: 43, $lte: 52 } })
        .select("-_id restaurant_id name address");

    return res.json({ count: data.length, data }).end();
});

const getAgainstSortedOrder = asyncHandler(async (req, res) => {
    // 25. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.
    // const data = await Restaurant.find({}).sort("name");

    // 26. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.
    // const data = await Restaurant.find().sort("-name");

    // 27. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.
    const data = await Restaurant.find().sort("cuisine -borough");

    return res.json({ count: data.length, data }).end();
});

const getAgainstConditions = asyncHandler(async (req, res) => {
    // 28. Write a MongoDB query to know whether all the addresses contains the street or not.
    // const data = await Restaurant.find({ "address.street": { $exists: true } });

    // 29. Write a MongoDB query which will select all documents in the restaurants collection where the coord field value is Double.
    // const data = await Restaurant.find({ "address.coord": { $type: "double" } });

    // 30. Write a MongoDB query which will select the restaurant Id, name and grades for those restaurants which returns 0 as a remainder after dividing the score by 7.
    // const data = await Restaurant.find({ "grades.score": { $mod: [7, 0] } })
    //     .select("-_id restaurant_id name grades");

    // 31. Write a MongoDB query to find the restaurant name, borough, longitude and attitude and cuisine for those restaurants which contains 'mon' as three letters somewhere in its name.
    // const data = await Restaurant.find({ name: /mon/i })
    //     .select("-_id  name borough cuisine address.coord");

    // 32. Write a MongoDB query to find the restaurant name, borough, longitude and latitude and cuisine for those restaurants which contain 'Mad' as first three letters of its name. (search text should be dynamic)
    // const data = await Restaurant.find({ name: { $regex: "^" + req.query.search } })
    //     .select("-_id  name borough cuisine address.coord");

    // 33. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5.
    // const data = await Restaurant.find({ "grades.score": { $lt: 5 } });

    // 34, 35, 36 are kind of similar to previous ones

    // 37. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
    // const data = await Restaurant.find({
    //     "grades.score": { $lt: 5 },
    //     $or: [
    //         { borough: "Manhattan" },
    //         { borough: "Brooklyn" }
    //     ],
    //     $nor: [
    //         { cuisine: "American" },
    //         { cuisine: "Chinese" }
    //     ]
    // });

    // 38. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6.
    // 39. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan.
    // 40. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
    // 41. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
    // 42. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
    // const data = await Restaurant.find({
    //     // $and: [
    //     //     { "grades.score": 2 },
    //     //     { "grades.score": 6 }
    //     // ]
    //     "grades.score": { $all: [2, 6] },

    //     borough: { $in: ["Manhattan", "Brooklyn"] },
    //     cuisine: { $nin: ["American", "Chinese"] }
    // });

    // 43. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6.
    // 44. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan.
    // 45. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
    // 46. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
    // 47. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
    const data = await Restaurant.find({
        // $or: [
        //     { "grades.score": 2 },
        //     { "grades.score": 6 }
        // ],
        grades: { $elemMatch: { score: { $in: [2, 6] } } },

        borough: { $nin: ["Manhattan", "Brooklyn"] },
        cuisine: { $in: ["American", "Chinese"] }
    });

    return res.json({ count: data.length, data }).end();
});


module.exports = {
    getAllRestaurants,
    getRestaurantsMeta,
    getBoroughSpecific,
    getAgainstScores,
    getAgainstLocation,
    getAgainstSearch,
    getAgainstRandomOptions,
    getAgainstSortedOrder,
    getAgainstConditions
};