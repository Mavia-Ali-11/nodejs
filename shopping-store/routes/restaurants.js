const express = require("express");
const router = express.Router();
const {
    getAllRestaurants,
    getRestaurantsMeta,
    getBoroughSpecific,
    getAgainstScores,
    getAgainstLocation,
    getAgainstSearch
} = require("../controllers/restaurants");

router.get("/", getAllRestaurants);
router.get("/meta", getRestaurantsMeta);
router.get("/borough", getBoroughSpecific);
router.get("/score/:score", getAgainstScores);
router.get("/location", getAgainstLocation);
router.get("/search", getAgainstSearch);

module.exports = router;