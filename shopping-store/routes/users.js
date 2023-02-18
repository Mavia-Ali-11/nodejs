const express = require("express");
const router = express.Router();

const { signupUser } = require("../controllers/users");

router.post("/signup", signupUser);

module.exports = router;