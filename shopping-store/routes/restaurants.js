const express = require("express");
const router = express.Router();
const {
    getAllRestaurants,
    getRestaurantsMeta,
    getBoroughSpecific,
    getAgainstScores,
    getAgainstLocation,
    getAgainstSearch,
    getAgainstRandomOptions,
    getAgainstSortedOrder,
    getAgainstConditions
} = require("../controllers/restaurants");

router.get("/", getAllRestaurants);
router.get("/meta", getRestaurantsMeta);
router.get("/borough", getBoroughSpecific);
router.get("/score/:score", getAgainstScores);
router.get("/location", getAgainstLocation);
router.get("/search", getAgainstSearch);
router.get("/random-search", getAgainstRandomOptions);
router.get("/sort", getAgainstSortedOrder);
router.get("/conditions", getAgainstConditions);

module.exports = router;