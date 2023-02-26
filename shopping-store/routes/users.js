const express = require("express");
const router = express.Router();
const { roles } = require("../middlewares");

const { signupUser, loginUser, verifyUser, getUsers } = require("../controllers/users");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/", roles(["sadmin", "manager"]), getUsers);

module.exports = router;