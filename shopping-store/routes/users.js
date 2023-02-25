const express = require("express");
const router = express.Router();

const { signupUser, verifyUser, loginUser } = require("../controllers/users");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/verify", verifyUser);

module.exports = router;