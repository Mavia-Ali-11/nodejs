const express = require("express");
const router = express.Router();
const { getAllRestaurants, getRestaurantsMeta, getBoroughSpecific } = require("../controllers/restaurants");

router.get("/", getAllRestaurants);
router.get("/meta", getRestaurantsMeta);
router.get("/borough", getBoroughSpecific);

module.exports = router;