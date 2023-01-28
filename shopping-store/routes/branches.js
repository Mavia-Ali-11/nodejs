const express = require("express");
const router = express.Router();
const { createBranch, getBranches } = require("../controllers/branches");

router.post("/", createBranch);
router.get("/", getBranches);

module.exports = router;