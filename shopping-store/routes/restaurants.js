const express = require("express");
const router = express.Router();
const { getAllRestaurants, getRestaurantsMeta, getBoroughSpecific, getRestaurantAgainstScores } = require("../controllers/restaurants");

router.get("/", getAllRestaurants);
router.get("/meta", getRestaurantsMeta);
router.get("/borough", getBoroughSpecific);
router.get("/score/:score", getRestaurantAgainstScores);

module.exports = router;