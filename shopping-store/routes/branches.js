const express = require("express");
const router = express.Router();
const { createBranch, getBranches, getBranchProducts } = require("../controllers/branches");

router.post("/", createBranch);
router.get("/", getBranches);
router.get("/products", getBranchProducts);

module.exports = router;